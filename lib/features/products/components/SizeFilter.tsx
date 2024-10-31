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
      className={`w-10 border ${isQueryParamInUrl ? "border-black" : "border-gray-300"}`}
    >
      {name}
    </Button>
  );
}
