import { getCategories } from "../services";
import { CategoryFilter } from "./CategoryFilter";

export default async function CategoriesFilter() {
  const categories = await getCategories();

  return (
    <div className="space-y-2">
      <h5 className="h6 mb-4">Categories</h5>
      {categories.map((category) => (
        <CategoryFilter key={category.id} name={category.name} />
      ))}
    </div>
  );
}
