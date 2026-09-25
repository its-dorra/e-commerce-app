import { defineRelations } from "drizzle-orm";
import * as schema from "./index";

export const relations = defineRelations(schema, (r) => ({
  userTable: {
    carts: r.many.cartTable(),
    orders: r.many.orderTable(),
    profile: r.one.profileTable(),
    accounts: r.many.accountTable(),
    sessions: r.many.sessionTable(),
    wishList: r.many.wishListTable(),
    address: r.one.addressTable(),
  },
  profileTable: {
    user: r.one.userTable({
      from: r.profileTable.userId,
      to: r.userTable.id,
      optional: false,
    }),
  },
  sessionTable: {
    user: r.one.userTable({
      from: r.sessionTable.userId,
      to: r.userTable.id,
      optional: false,
    }),
  },
  accountTable: {
    user: r.one.userTable({
      from: r.accountTable.userId,
      to: r.userTable.id,
      optional: false,
    }),
  },
  addressTable: {
    user: r.one.userTable({
      from: r.addressTable.userId,
      to: r.userTable.id,
      optional: false,
    }),
  },
  cartTable: {
    cartItems: r.many.cartItemTable(),
    user: r.one.userTable({
      from: r.cartTable.userId,
      to: r.userTable.id,
      optional: false,
    }),
  },
  cartItemTable: {
    size: r.one.sizeTable({
      from: r.cartItemTable.sizeId,
      to: r.sizeTable.id,
      optional: false,
    }),
    cart: r.one.cartTable({
      from: r.cartItemTable.cartId,
      to: r.cartTable.id,
      optional: false,
    }),
  },
  categoryTable: {
    product: r.many.productTable(),
  },
  colorTable: {
    variant: r.many.productVariantTable(),
  },
  imageTable: {
    variant: r.one.productVariantTable({
      from: r.imageTable.productVariantId,
      to: r.productVariantTable.id,
      optional: false,
    }),
  },
  orderTable: {
    user: r.one.userTable({
      from: r.orderTable.userId,
      to: r.userTable.id,
      optional: false,
    }),
    orderItems: r.many.orderItemTable(),
  },
  orderItemTable: {
    order: r.one.orderTable({
      from: r.orderItemTable.orderId,
      to: r.orderTable.id,
      optional: false,
    }),
    size: r.one.sizeTable({
      from: r.orderItemTable.sizeId,
      to: r.sizeTable.id,
      optional: false,
    }),
  },
  productTable: {
    category: r.one.categoryTable({
      from: r.productTable.categoryName,
      to: r.categoryTable.name,
      optional: false,
    }),
    variants: r.many.productVariantTable(),
    wishList: r.many.wishListTable(),
  },
  productVariantTable: {
    product: r.one.productTable({
      from: r.productVariantTable.productId,
      to: r.productTable.id,
      optional: false,
    }),
    color: r.one.colorTable({
      from: r.productVariantTable.colorName,
      to: r.colorTable.name,
      optional: false,
    }),
    images: r.many.imageTable(),
    sizes: r.many.sizeTable(),
  },
  sizeTable: {
    variant: r.one.productVariantTable({
      from: r.sizeTable.productVariantId,
      to: r.productVariantTable.id,
      optional: false,
    }),
    cartItem: r.many.cartItemTable(),
    orderItem: r.many.orderItemTable(),
  },
  wishListTable: {
    user: r.one.userTable({
      from: r.wishListTable.userId,
      to: r.userTable.id,
      optional: false,
    }),
    product: r.one.productTable({
      from: r.wishListTable.productId,
      to: r.productTable.id,
      optional: false,
    }),
  },
}));
