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
      className={`${isFilterAsideOpen ? "translate-x-0" : "-translate-x-[120%]"} lg:shadow-xs fixed bottom-4 left-4 top-24 z-[60] flex max-h-[calc(100vh-7rem)] w-[calc(100vw-2rem)] max-w-[20rem] flex-col gap-y-7 overflow-y-auto rounded-2xl border border-stone-200/90 bg-white p-6 shadow-xl transition-transform duration-300 ease-out lg:sticky lg:top-28 lg:z-10 lg:max-h-none lg:w-full lg:max-w-none lg:translate-x-0 lg:self-start lg:overflow-visible lg:border-stone-200/70 lg:bg-stone-50/70 [&>*]:flex-shrink-0`}
    >
      <Button
        className="absolute right-3.5 top-3.5 h-8 w-8 rounded-full p-0 lg:hidden"
        variant="outline"
        onClick={toggle}
      >
        <Image src={xIcon} alt="exit icon" className="h-3.5 w-3.5" />
      </Button>
      {children}
    </aside>
  );
}
