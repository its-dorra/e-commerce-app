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
        isQueryParamInUrl ? deleteQuery("colors") : appendQuery("colors", name);
      }}
      className={`flex h-7 w-7 cursor-pointer items-center justify-center rounded-full p-0.5 shadow-lg ${isQueryParamInUrl ? "border-[1px] border-black" : ""}`}
    >
      <div
        className="h-full w-full rounded-full"
        style={{ backgroundColor: hexCode }}
      ></div>
    </div>
  );
}
