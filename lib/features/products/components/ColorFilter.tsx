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
      onClick={() => {
        isQueryParamInUrl
          ? deleteQuery("colors", name)
          : appendQuery("colors", name);
      }}
      className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded-full p-0.5 transition-all duration-200 ${isQueryParamInUrl ? "border-2 border-zinc-900 shadow" : "border border-zinc-200 shadow-sm"}`}
    >
      <div
        className="h-full w-full rounded-full"
        style={{ backgroundColor: hexCode }}
      ></div>
    </div>
  );
}
