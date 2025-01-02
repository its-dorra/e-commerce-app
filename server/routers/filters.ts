import { getCategories, getColors, getSizes } from "../data-access/products";
import { procedure, router } from "../trpc";

const filterRouter = router({
  categories: procedure.query(async () => {
    const categories = await getCategories();

    return categories;
  }),
  colors: procedure.query(async () => {
    const colors = await getColors();

    return colors;
  }),
  sizes: procedure.query(() => {
    const sizes = getSizes();

    return sizes;
  }),
});

export default filterRouter;
