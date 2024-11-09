import { Hono } from "hono";
import { isAdmin, isAuth } from "../middlewares/users";
import { zValidator } from "@hono/zod-validator";
import { productQuerySchema } from "../schemas/products";
import {
  getCategories,
  getColors,
  getProductById,
  getProducts,
  getSizes,
} from "../data-access/products";
import { toArray } from "../../lib/utils";

const route = new Hono()
  .get("/categories", async (c) => {
    const categories = await getCategories();

    return c.json({ categories });
  })
  .get("/colors", async (c) => {
    const colors = await getColors();

    return c.json({ colors });
  })
  .get("/sizes", async (c) => {
    const sizes = await getSizes();

    return c.json({ sizes });
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

      const { products, pagination } = await getProducts(page, filters);

      return c.json({ products, pagination });
    },
  )
  .get("/products/:id", async (c) => {
    const { id } = c.req.param();

    const product = await getProductById(id);
  });

export default route;
