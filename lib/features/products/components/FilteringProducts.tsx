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
      className={`${isFilterAsideOpen ? "translate-x-0" : "-translate-x-[120%]"} fixed bottom-4 left-4 top-24 z-[60] flex max-h-[calc(100vh-7rem)] w-[calc(100vw-2rem)] max-w-[20rem] flex-col gap-y-8 overflow-y-auto rounded-2xl border border-zinc-200 bg-zinc-50 p-5 shadow-lg transition-transform duration-300 lg:sticky lg:top-28 lg:z-10 lg:max-h-none lg:w-full lg:max-w-none lg:translate-x-0 lg:self-start lg:overflow-visible lg:shadow-sm [&>*]:flex-shrink-0`}
    >
      <Button
        className="absolute right-3 top-3 rounded-full px-2 lg:hidden"
        variant="outline"
        onClick={toggle}
      >
        <Image src={xIcon} alt="exit icon" className="h-4 w-4" />
      </Button>
      {children}
    </aside>
  );
}
