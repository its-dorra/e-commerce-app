"use client";

// import { useToggleFilter } from "@/lib/stores/filters.store";
import CategoriesFilter from "./CategoriesFilter";
import { Button } from "@/components/ui/button";

export default function FilteringProducts() {
  // const { isFilterAsideOpen, toggle } = useToggleFilter((state) => state);

  return (
    <aside
      className={`${isFilterAsideOpen ? "translate-x-0" : "-translate-x-full"} relative w-56 rounded-sm border p-6 transition-transform lg:translate-x-0 lg:border-r-[0.5px]`}
    >
      <Button className="absolute right-1 top-1 lg:hidden" variant={"outline"}>
        &times;
      </Button>
      <CategoriesFilter />
    </aside>
  );
}
