"use client";

import { filterIcon } from "@/assets";
import { Button } from "@/components/ui/button";
import { useToggleFilter } from "@/lib/stores/filter-sidebar.store";
import Image from "next/image";

export default function FilterButton() {
  const { toggle } = useToggleFilter();
  return (
    <Button className="space-x-2 lg:hidden" onClick={toggle} variant="outline">
      <Image src={filterIcon} className="h-4 w-4" alt="filter icon" />
      <span className="body-2">Filter</span>
    </Button>
  );
}
