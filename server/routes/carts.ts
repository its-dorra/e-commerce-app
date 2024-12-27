import { Hono } from "hono";
import { isAuth } from "../middlewares/users";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import {
  addItemToCart,
  deleteCartItem,
  getCartItems,
  updateCartItemQuantity,
} from "../data-access/cart";
import * as HttpStatusCodes from "stoker/http-status-codes";
import * as HttpStatusPhrases from "stoker/http-status-phrases";
import { catchError } from "@/lib/utils";
import { ErrorWithStatus } from "../types/types";
import { revalidateTag } from "next/cache";
import { getUserTag } from "@/lib/cache";

const route = new Hono()
  .use(isAuth)
  .get("/", async (c) => {
    const { id: userId } = c.var.user;
    try {
      const cart = await getCartItems(userId);
      return c.json({ cart });
    } catch (error) {
      c.status(HttpStatusCodes.INTERNAL_SERVER_ERROR);
      throw new Error(HttpStatusPhrases.INTERNAL_SERVER_ERROR);
    }
  })
  .post(
    "/",
    zValidator(
      "json",
      z.object({
        productVariantId: z.number().min(1),
        quantity: z.number().default(1),
      }),
    ),
    async (c) => {
      const { productVariantId, quantity } = c.req.valid("json");
      const { id: userId } = c.var.user;

      const [cartItem, error] = await catchError(
        addItemToCart({ productVariantId, quantity, userId }),
      );
      if (error) {
        if (error instanceof ErrorWithStatus) {
          c.status(error.status);
          throw error;
        }
        throw error;
      }
      revalidateTag(getUserTag("cart", userId));

      return c.json(cartItem);
    },
  )
  .patch(
    "/:id",
    zValidator("param", z.object({ id: z.coerce.number().min(1) })),
    zValidator(
      "json",
      z.object({
        quantity: z.number().min(0),
      }),
    ),
    async (c) => {
      const { id: cartItemId } = c.req.valid("param");
      const { quantity } = c.req.valid("json");

      const { id: userId } = c.var.user;

      try {
        const [cartItem] = await updateCartItemQuantity({
          cartItemId,
          quantity,
        });

        revalidateTag(getUserTag("cart", userId));

        return c.json(cartItem);
      } catch (error) {
        c.status(HttpStatusCodes.INTERNAL_SERVER_ERROR);
        throw new Error(HttpStatusPhrases.INTERNAL_SERVER_ERROR);
      }
    },
  )
  .delete(
    "/:id",
    zValidator(
      "param",
      z.object({
        id: z.number().min(1),
      }),
    ),
    async (c) => {
      const { id: cartItemId } = c.req.valid("param");
      const { id: userId } = c.var.user;

      try {
        const [cartItem] = await deleteCartItem(cartItemId);

        revalidateTag(getUserTag("cart", userId));

        return c.json(cartItem);
      } catch (error) {
        c.status(HttpStatusCodes.INTERNAL_SERVER_ERROR);
        throw new Error(HttpStatusPhrases.INTERNAL_SERVER_ERROR);
      }
    },
  );

export default route;
