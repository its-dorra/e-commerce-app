import { getCart } from "../services";

export type CartItem = Exclude<
  Awaited<ReturnType<typeof getCart>>,
  undefined
>["cartItems"][number];
