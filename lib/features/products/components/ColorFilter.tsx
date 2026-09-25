"use client";

import { useDeleteQuery } from "../hooks/useDeleteQuery";
import { useAppendQuery } from "../hooks/useAppendQuery";
import { useSearchParams } from "next/navigation";

interface ColorFilterProps {
  name: string;
  hexCode: string;
}

export function ColorFilter({ name, hexCode }: ColorFilterProps) {
  const isQueryParamInUrl = !!useSearchParams()
    .getAll("colors")
    .find((params) => params === name);

  const deleteQuery = useDeleteQuery();
  const appendQuery = useAppendQuery();

  return (
    <div
      title={name}
      onClick={() => {
        isQueryParamInUrl
          ? deleteQuery("colors", name)
          : appendQuery("colors", name);
      }}
      className={`flex h-7 w-7 cursor-pointer items-center justify-center rounded-full p-0.5 transition-all duration-200 ${
        isQueryParamInUrl
          ? "shadow-xs ring-2 ring-amber-700 ring-offset-2"
          : "border border-stone-200 hover:scale-105"
      }`}
    >
      <div
        className="h-full w-full rounded-full shadow-inner"
        style={{ backgroundColor: hexCode }}
      />
    </div>
  );
}
