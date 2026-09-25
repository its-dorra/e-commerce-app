"use client";

import { useDeleteQuery } from "../hooks/useDeleteQuery";
import { useAppendQuery } from "../hooks/useAppendQuery";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

interface SizeFilterProps {
  name: string;
}

export default function SizeFilter({ name }: SizeFilterProps) {
  const isQueryParamInUrl = !!useSearchParams()
    .getAll("sizes")
    .find((params) => params === name);

  const deleteQuery = useDeleteQuery();
  const appendQuery = useAppendQuery();

  return (
    <Button
      variant="outline"
      onClick={() => {
        isQueryParamInUrl
          ? deleteQuery("sizes", name)
          : appendQuery("sizes", name);
      }}
      className={`font-body h-9 w-9 rounded-lg border text-xs font-medium uppercase transition-colors ${
        isQueryParamInUrl
          ? "border-stone-900 bg-stone-900 text-stone-50"
          : "border-stone-200 bg-white text-stone-700 hover:border-stone-400 hover:bg-stone-50"
      }`}
    >
      {name}
    </Button>
  );
}
