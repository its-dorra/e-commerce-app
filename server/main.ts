import { Hono } from "hono";

import authRoute from "@/server/routes/users";
import productsRoute from "@/server/routes/products";
import { notFound, onError } from "stoker/middlewares";

const app = new Hono()
  .basePath("/api")
  .route("/auth", authRoute)
  .route("/shop", productsRoute)
  .notFound(notFound)
  .onError(onError);

export default app;

export type AppType = typeof app;
