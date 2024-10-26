import { Hono } from "hono";
import { isAdmin, isAuth } from "../../user/middlewares";
import { zValidator } from "@hono/zod-validator";
import { productQuerySchema } from "../schemas";
import { getCategories, getProducts } from "../data-access";
import { toArray } from "../utils";

const route = new Hono()
  .get("/categories", async (c) => {
    const categories = await getCategories();

    return c.json({ categories });
  })
  .get(
    "/products",
    // isAuth,
    // isAdmin,
    zValidator("query", productQuerySchema),

    async (c) => {
      const { page, categories, colors, sizes } = c.req.valid("query");

      const filters = {
        categories: toArray(categories),
        colors: toArray(colors),
        sizes: toArray(sizes),
      };

      const { products, pagination } = await getProducts(page, filters)();

      return c.json({ products, pagination });
    },
  );

export default route;
