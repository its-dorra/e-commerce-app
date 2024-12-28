import { getCart } from "../services";

export type Cart = Awaited<ReturnType<typeof getCart>>;

export type CartItem = Exclude<
  Awaited<ReturnType<typeof getCart>>,
  undefined
>["cartItems"][number];
