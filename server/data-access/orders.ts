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

export const setOrderAsSeen = async ({ orderId }: { orderId: number }) => {
  return db
    .update(orderTable)
    .set({ isSeen: true })
    .where(eq(orderTable.id, orderId));
};

export const getOrder = async (orderId: number) => {
  return db.query.orderTable.findFirst({
    where: (fields, { eq }) => eq(fields.id, orderId),
    with: {
      orderItems: true,
    },
  });
};

export const getOrders = async ({
  page,
  perPage = PER_PAGE,
}: {
  page: number;
  perPage?: number;
}) => {
  const ordersQuery = db.query.orderTable.findMany({
    limit: perPage,
    offset: (page - 1) * perPage,
    orderBy: (fields, { desc }) => desc(fields.createdAt),
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
                    orderBy(fields, operators) {
                      return operators.asc(fields.displayOrder);
                    },
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

  const [orders, { totalCount }] = await Promise.all([
    ordersQuery,
    totalCountQuery,
  ]);

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
  page,
}: {
  userId: string;
  perPage?: number;
  page: number;
}) => {
  const ordersQuery = db.query.orderTable.findMany({
    limit: perPage,
    offset: (page - 1) * perPage,
    where: (fields, { eq, and }) => eq(fields.userId, userId),
    orderBy: (fields, { desc }) => desc(fields.createdAt),
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
                    orderBy(fields, operators) {
                      return operators.asc(fields.displayOrder);
                    },
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
    .then((res) => res[0]);

  const [orders, { totalCount }] = await Promise.all([
    ordersQuery,
    totalCountQuery,
  ]);

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

  return db.transaction(async (tx) => {
    try {
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

      const [newOrder] = await tx
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
          orderId: newOrder.id,
        }),
      );
      const cartItemsIds = cart.cartItems.map((item) => item.id);

      await Promise.all([
        tx.insert(orderItemTable).values(orderItems),

        deleteCart({ tx, cartId: cart.id }),

        deleteCartItems({ tx, cartItemsIds }),
      ]);

      return newOrder;
    } catch (e) {
      throw e;
    }
  });
};

export const acceptOrder = async ({ orderId }: { orderId: number }) => {
  const order = await getOrder(orderId);

  if (!order) throw new Error("Order not found");

  const productsToCheck = order.orderItems.map((item) => ({
    quantity: item.quantity,
    sizeId: item.sizeId,
  }));

  await Promise.all(
    productsToCheck.map((item) => checkInventoryAvailibilty(item)),
  );

  return db.transaction(async (tx) => {
    try {
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
    } catch (e) {
      throw e;
    }
  });
};

export const cancelOrder = async ({ orderId }: { orderId: number }) => {
  const order = await getOrder(orderId);

  if (!order) throw new Error("Order not found");

  if (order.status === "pending") {
    return db
      .update(orderTable)
      .set({ status: "canceled" })
      .where(eq(orderTable.id, orderId));
  } else if (order.status === "processing") {
    return db.transaction(async (tx) => {
      try {
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
      } catch (e) {
        throw e;
      }
    });
  } else {
    return null;
  }
};
