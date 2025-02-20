import {
  cartTable,
  cartItemTable,
  cartItemRelations,
  cartRelations,
} from "./carts";
import { categoryTable, categoryRelations } from "./categories";
import { colorTable, colorRelations } from "./colors";
import { imageTable, imageRelations } from "./images";
import {
  orderTable,
  orderRelations,
  orderItemRelations,
  orderItemTable,
} from "./orders";
import { productTable, productRelations } from "./products";
import {
  productVariantTable,
  productVariantRelations,
  sizeRelations,
  sizeTable,
} from "./productVariants";
import {
  userTable,
  accountTable,
  profileTable,
  sessionTable,
  userRelations,
  profileRelations,
  accountRelations,
} from "./users";

import { wishListRelations, wishListTable } from "./wishlist";

import { addressRelations, addressTable } from "./address";

export {
  orderItemRelations,
  sizeRelations,
  accountRelations,
  addressRelations,
  wishListRelations,
  profileRelations,
  productRelations,
  colorRelations,
  imageRelations,
  categoryRelations,
  productVariantRelations,
  userRelations,
  orderRelations,
  cartItemRelations,
  cartRelations,
  orderItemTable,
  sizeTable,
  addressTable,
  wishListTable,
  sessionTable,
  profileTable,
  productVariantTable,
  cartTable,
  cartItemTable,
  categoryTable,
  colorTable,
  imageTable,
  orderTable,
  productTable,
  userTable,
  accountTable,
};
