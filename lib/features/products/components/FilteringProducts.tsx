"use client";

import { useToggleFilter } from "@/lib/stores/filters.store";
// import CategoriesFilter from "./CategoriesFilter";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";
import Image from "next/image";
import { xIcon } from "@/assets";

interface FilteringProuctsProps {
  CategoriesFilter: ReactNode;
  ColorsFilter: ReactNode;
  SizesFilter: ReactNode;
}

export default function FilteringProducts({
  CategoriesFilter,
  ColorsFilter,
  SizesFilter,
}: FilteringProuctsProps) {
  const { isFilterAsideOpen, toggle } = useToggleFilter((state) => state);

  return (
    <aside
      className={`${isFilterAsideOpen ? "-translate-x-6" : "-translate-x-[125%]"} absolute bottom-0 left-6 top-0 z-50 flex w-60 flex-col gap-y-8 rounded-sm border bg-white p-6 transition-transform lg:static lg:translate-x-0 lg:border-r-[0.5px] [&>*]:flex-shrink-0`}
    >
      <Button
        className="absolute right-3 top-3 px-2 lg:hidden"
        variant={"outline"}
        onClick={toggle}
      >
        <Image src={xIcon} alt="exit icon" className="h-4 w-4" />
      </Button>
      {CategoriesFilter}
      {ColorsFilter}
      {SizesFilter}
    </aside>
  );
}
