import db from "@/server/db";
import { orderItemTable, orderTable } from "@/server/db/schema";
import {
  deleteCart,
  deleteCartItems,
  getCartItems,
} from "@/server/data-access/cart";
import {
  checkInventoryAvailibilty,
  updateInventoryAfterPurchase,
} from "@/server/data-access/products";
import { count, eq } from "drizzle-orm";
import { PER_PAGE } from "@/lib/constants/app-config";
import { cacheTag } from "next/cache";
import {
  getOrdersGlobalTag,
  getOrderUserTag,
  getOrderIdTag,
  revalidateOrdersCache,
} from "./orders.cache";
import { revalidateCartCache } from "./cart.cache";
import { revalidateProductsCache } from "./products.cache";

export const setOrderAsSeen = async ({ orderId }: { orderId: string }) => {
  const result = await db
    .update(orderTable)
    .set({ isSeen: true })
    .where(eq(orderTable.id, orderId));

  return result;
};

export const getOrder = async (orderId: string) => {
  return db.query.orderTable.findFirst({
    where: { id: orderId },
    with: {
      orderItems: {
        with: {
          size: {
            with: {
              variant: {
                columns: {
                  productId: true,
                },
              },
            },
          },
        },
      },
    },
  });
};

export const getOrders = async ({
  page = 1,
  perPage = PER_PAGE,
}: {
  page?: number;
  perPage?: number;
} = {}) => {
  "use cache";
  cacheTag(getOrdersGlobalTag());

  const ordersQuery = db.query.orderTable.findMany({
    limit: perPage,
    offset: (page - 1) * perPage,
    orderBy: { createdAt: "desc" },
    with: {
      orderItems: {
        with: {
          size: {
            columns: {
              size: true,
              quantity: true,
              priceAdjustment: true,
            },
            with: {
              variant: {
                columns: {
                  id: true,
                },
                with: {
                  color: {
                    columns: {
                      hexCode: true,
                    },
                  },
                  images: {
                    columns: {
                      imagePath: true,
                    },
                    orderBy: { displayOrder: "asc" },
                    limit: 1,
                  },
                  product: {
                    columns: {
                      id: true,
                      name: true,
                      basePrice: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  });

  const totalCountQuery = db
    .select({ totalCount: count() })
    .from(orderTable)
    .then((res) => res[0]);

  const [orders, countResult] = await Promise.all([
    ordersQuery,
    totalCountQuery,
  ]);
  const totalCount = countResult?.totalCount || 0;

  return {
    data: orders,
    pagination: {
      totalCount,
      perPage,
      page,
      totalPages: Math.ceil(totalCount / perPage),
    },
  };
};

export const getOrdersByUser = async ({
  userId,
  perPage = PER_PAGE,
  page = 1,
}: {
  userId: string;
  perPage?: number;
  page?: number;
}) => {
  "use cache";
  cacheTag(getOrderUserTag(userId));

  const ordersQuery = db.query.orderTable.findMany({
    limit: perPage,
    offset: (page - 1) * perPage,
    where: { userId },
    orderBy: { createdAt: "desc" },
    with: {
      orderItems: {
        with: {
          size: {
            columns: {
              size: true,
            },
            with: {
              variant: {
                columns: {
                  id: true,
                },
                with: {
                  color: {
                    columns: {
                      hexCode: true,
                    },
                  },
                  images: {
                    columns: {
                      imagePath: true,
                    },
                    orderBy: { displayOrder: "asc" },
                    limit: 1,
                  },
                  product: {
                    columns: {
                      id: true,
                      name: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  });

  const totalCountQuery = db
    .select({ totalCount: count() })
    .from(orderTable)
    .where(eq(orderTable.userId, userId))
    .then((res) => res[0]);

  const [orders, countResult] = await Promise.all([
    ordersQuery,
    totalCountQuery,
  ]);
  const totalCount = countResult?.totalCount || 0;

  return {
    data: orders,
    pagination: {
      totalCount,
      perPage,
      page,
      totalPages: Math.ceil(totalCount / perPage),
    },
  };
};

export const createOrder = async ({
  userId,
  city,
  wilaya,
  streetAddress,
  phoneNumber,
}: {
  userId: string;
  city: string;
  wilaya: string;
  streetAddress: string;
  phoneNumber: string;
}) => {
  const cart = await getCartItems(userId);

  if (!cart) throw new Error("Cart not found.");

  const newOrder = await db.transaction(async (tx) => {
    await Promise.all(
      cart.cartItems.map((item) =>
        checkInventoryAvailibilty({
          sizeId: item.sizeId,
          quantity: item.quantity,
        }),
      ),
    );

    const totalPrice = +cart.cartItems
      .reduce((cur, item) => cur + item.itemPrice * item.quantity, 0)
      .toFixed(2);

    const [orderRecord] = await tx
      .insert(orderTable)
      .values({
        wilaya,
        city,
        streetAddress,
        phoneNumber,
        userId,
        totalPrice,
      })
      .returning({ id: orderTable.id });

    const orderItems = cart.cartItems.map(
      ({ quantity, itemPrice, sizeId }) => ({
        quantity,
        itemPrice,
        sizeId,
        orderId: orderRecord.id,
      }),
    );
    const cartItemsIds = cart.cartItems.map((item) => item.id);

    await Promise.all([
      tx.insert(orderItemTable).values(orderItems),
      deleteCart({ tx, cartId: cart.id }),
      deleteCartItems({ tx, cartItemsIds }),
    ]);

    return orderRecord;
  });

  const productIds = Array.from(
    new Set(
      cart.cartItems
        .map((item) => item.size?.variant?.product?.id)
        .filter((id): id is string => Boolean(id)),
    ),
  );

  revalidateOrdersCache({ id: newOrder.id, userId, productIds });
  revalidateCartCache(userId);

  return newOrder;
};

export const acceptOrder = async ({ orderId }: { orderId: string }) => {
  const order = await getOrder(orderId);

  if (!order) throw new Error("Order not found");

  const productsToCheck = order.orderItems.map((item) => ({
    quantity: item.quantity,
    sizeId: item.sizeId,
  }));

  await Promise.all(
    productsToCheck.map((item) => checkInventoryAvailibilty(item)),
  );

  const result = await db.transaction(async (tx) => {
    await Promise.all([
      tx
        .update(orderTable)
        .set({ status: "processing" })
        .where(eq(orderTable.id, orderId)),
      ...productsToCheck.map((item) =>
        updateInventoryAfterPurchase({ ...item, tx }),
      ),
    ]);
    return true;
  });

  const productIds = Array.from(
    new Set(
      order.orderItems
        .map((item) => item.size?.variant?.productId)
        .filter((id): id is string => Boolean(id)),
    ),
  );

  revalidateOrdersCache({
    id: orderId,
    userId: order.userId,
    productIds,
  });

  return result;
};

export const cancelOrder = async ({ orderId }: { orderId: string }) => {
  const order = await getOrder(orderId);

  if (!order) throw new Error("Order not found");

  let result;
  if (order.status === "pending") {
    result = await db
      .update(orderTable)
      .set({ status: "canceled" })
      .where(eq(orderTable.id, orderId));
  } else if (order.status === "processing") {
    result = await db.transaction(async (tx) => {
      await Promise.all([
        tx
          .update(orderTable)
          .set({ status: "canceled" })
          .where(eq(orderTable.id, orderId)),
        ...order.orderItems.map((item) =>
          updateInventoryAfterPurchase({
            sizeId: item.sizeId,
            quantity: -item.quantity,
            tx,
          }),
        ),
      ]);
      return true;
    });
  }

  const productIds =
    order.status === "processing"
      ? Array.from(
          new Set(
            order.orderItems
              .map((item) => item.size?.variant?.productId)
              .filter((id): id is string => Boolean(id)),
          ),
        )
      : undefined;

  revalidateOrdersCache({
    id: orderId,
    userId: order.userId,
    productIds,
  });

  return result;
};
