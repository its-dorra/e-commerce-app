import { Hono } from "hono";

import authRoute from "@/server/routes/users";
import productsRoute from "@/server/routes/products";
import cartsRoute from "@/server/routes/carts";
import wishlistsRoute from "@/server/routes/wishlists";

import { notFound, onError } from "stoker/middlewares";

const app = new Hono()
  .basePath("/api")
  .route("/auth", authRoute)
  .route("/shop", productsRoute)
  .route("/cart", cartsRoute)
  .route("/wishlist", wishlistsRoute)
  .notFound(notFound)
  .onError(onError);

export default app;

export type AppType = typeof app;
