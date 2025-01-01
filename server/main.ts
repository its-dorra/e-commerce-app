import productsRouter from "@/server/routers/products";
import cartsRouter from "@/server/routers/carts";
import wishlistsRouter from "@/server/routers/wishlists";
import addressRouter from "@/server/routers/address";
import { router } from "./trpc";
import authRouter from "./routers/users";

export const appRouter = router({
  products: productsRouter,
  auth: authRouter,
  carts: cartsRouter,
  wishlists: wishlistsRouter,
  address: addressRouter,
});

export type AppRouter = typeof appRouter;
