import { useCart } from "../hooks/useCart";

export type Cart = Exclude<
  Exclude<ReturnType<typeof useCart>["data"], undefined>["cart"],
  undefined
>;

export type CartItem = Cart["cartItems"][number];
