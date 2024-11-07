import { ICategories } from "../types";
import { CategoryFilter } from "./CategoryFilter";

export default function CategoriesFilter({
  data: { categories },
}: {
  data: ICategories;
}) {
  return (
    <div className="space-y-2">
      <h5 className="h5 mb-4">Categories</h5>
      {categories.map((category) => (
        <CategoryFilter key={category.id} name={category.name} />
      ))}
    </div>
  );
}
