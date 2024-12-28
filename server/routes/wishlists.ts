import { Hono } from "hono";
import { isAuth } from "../middlewares/users";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import {
  getAllwishlistItems,
  isProductInWishList,
  toggleProductInWishList,
} from "../data-access/wishlist";
import * as HttpStatusCodes from "stoker/http-status-codes";
import * as HttpStatusPhrases from "stoker/http-status-phrases";

const route = new Hono()
  .use(isAuth)
  .get(
    "/check/:productId",
    zValidator(
      "param",
      z.object({
        productId: z.coerce.number().min(1),
      }),
    ),
    async (c) => {
      const { productId } = c.req.valid("param");
      const { id: userId } = c.var.user;

      try {
        const isInWishlist = await isProductInWishList({ productId, userId });

        return c.json(isInWishlist);
      } catch (error) {
        c.status(HttpStatusCodes.INTERNAL_SERVER_ERROR);
        throw new Error(HttpStatusPhrases.INTERNAL_SERVER_ERROR);
      }
    },
  )
  .get("/", async (c) => {
    const { id: userId } = c.var.user;

    try {
      const res = await getAllwishlistItems({ userId });

      return c.json(res);
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
        productId: z.number().min(1),
      }),
    ),
    async (c) => {
      const { productId } = c.req.valid("json");
      const { id: userId } = c.var.user;

      try {
        const result = await toggleProductInWishList({ productId, userId });

        return c.json(result);
      } catch (error) {
        c.status(HttpStatusCodes.INTERNAL_SERVER_ERROR);
        throw new Error(HttpStatusPhrases.INTERNAL_SERVER_ERROR);
      }
    },
  );

export default route;
