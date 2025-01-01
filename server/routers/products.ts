import { productQuerySchema } from "../schemas/products";
import {
  getCategories,
  getColors,
  getProductById,
  getProducts,
  getSizes,
} from "../data-access/products";
import { toArray } from "../../lib/utils";
import { z } from "zod";
import { procedure, router } from "../trpc";

const productsRouter = router({
  categories: procedure.query(async () => {
    const categories = await getCategories();
    return categories;
  }),
  colors: procedure.query(async () => {
    const colors = await getColors();
    return colors;
  }),
  sizes: procedure.query(async () => {
    const sizes = await getSizes();
    return sizes;
  }),
  products: procedure.input(productQuerySchema).query(async ({ input }) => {
    const { page, categories, colors, sizes } = input;
    const filters = {
      categories: toArray(categories),
      colors: toArray(colors),
      sizes: toArray(sizes),
    };

    const result = await getProducts(page, filters);

    return result;
  }),
  productById: procedure
    .input(z.object({ id: z.coerce.number().min(1) }))
    .query(async ({ input }) => {
      const { id } = input;

      const product = await getProductById(id);

      return product;
    }),
});

export default productsRouter;
