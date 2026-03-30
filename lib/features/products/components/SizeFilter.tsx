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
      className={`w-10 rounded-xl border ${isQueryParamInUrl ? "border-zinc-900 bg-zinc-900 text-zinc-50" : "border-zinc-300 bg-zinc-50 text-zinc-700"}`}
    >
      {name}
    </Button>
  );
}
