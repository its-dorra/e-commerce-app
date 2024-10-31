import { Hono } from "hono";
import { handle } from "hono/vercel";
import authRoute from "@/server/routes/users";
import productsRoute from "@/server/routes/products";
import { notFound, onError } from "stoker/middlewares";

const app = new Hono()
  .basePath("/api")
  .route("/auth", authRoute)
  .route("/shop", productsRoute)
  .notFound(notFound)
  .onError(onError);

export const GET = handle(app);
export const POST = handle(app);

export type AppType = typeof app;
