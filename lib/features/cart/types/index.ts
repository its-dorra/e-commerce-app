import { getCartItems } from "@/server/data-access/cart";

export type Cart = NonNullable<Awaited<ReturnType<typeof getCartItems>>>;
export type CartItem = Cart["cartItems"][number];
