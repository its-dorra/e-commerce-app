import { Hono } from "hono";
import { handle } from "hono/vercel";
import authRoute from "@/lib/features/user/routes";
import productsRoute from "@/lib/features/products/routes";
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
