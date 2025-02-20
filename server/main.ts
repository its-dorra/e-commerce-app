import { router } from "./trpc";
import productsRouter from "@/server/routers/products";
import cartsRouter from "@/server/routers/carts";
import wishlistsRouter from "@/server/routers/wishlists";
import addressRouter from "@/server/routers/address";
import filtersRouter from "@/server/routers/filters";
import authRouter from "./routers/users";
import ordersRouter from "@/server/routers/orders";

export const appRouter = router({
  products: productsRouter,
  auth: authRouter,
  carts: cartsRouter,
  wishlists: wishlistsRouter,
  address: addressRouter,
  filters: filtersRouter,
  orders: ordersRouter,
});

export type AppRouter = typeof appRouter;
