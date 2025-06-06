"use client";

import { useToggleFilter } from "@/lib/stores/filter-sidebar.store";

import { Button } from "@/components/ui/button";
import { PropsWithChildren } from "react";
import Image from "next/image";
import { xIcon } from "@/assets";

export default function FilteringProducts({ children }: PropsWithChildren) {
  const { isFilterAsideOpen, toggle } = useToggleFilter();

  return (
    <aside
      className={`${isFilterAsideOpen ? "-translate-x-6" : "-translate-x-[125%]"} absolute bottom-0 left-6 top-0 z-[5] flex h-fit w-60 flex-col gap-y-8 rounded-sm border bg-white p-6 transition-transform duration-700 lg:sticky lg:top-28 lg:translate-x-0 lg:border-r-[0.5px] [&>*]:flex-shrink-0`}
    >
      <Button
        className="absolute right-3 top-3 px-2 lg:hidden"
        variant="outline"
        onClick={toggle}
      >
        <Image src={xIcon} alt="exit icon" className="h-4 w-4" />
      </Button>
      {children}
    </aside>
  );
}
