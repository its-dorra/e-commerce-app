"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

import { useState } from "react";
import { useDeleteQuery } from "../hooks/useDeleteQuery";
import { useAppendQuery } from "../hooks/useAppendQuery";
import { useSearchParams } from "next/navigation";

interface CategoryProps {
  name: string;
}

export function CategoryFilter({ name }: CategoryProps) {
  const isQueryParamInUrl = !!useSearchParams()
    .getAll("categories")
    .find((params) => params === name);

  const deleteQuery = useDeleteQuery();
  const appendQuery = useAppendQuery();

  return (
    <div
      className={`flex items-center gap-x-3 rounded-lg border px-3 py-3 transition-colors ${
        isQueryParamInUrl
          ? "border-amber-700/60 bg-amber-50/50"
          : "border-stone-200/80 bg-white hover:bg-stone-50"
      }`}
    >
      <Checkbox
        id={name}
        checked={isQueryParamInUrl}
        onCheckedChange={() => {
          isQueryParamInUrl
            ? deleteQuery("categories", name)
            : appendQuery("categories", name);
        }}
      />
      <Label
        htmlFor={name}
        className="cursor-pointer font-body text-xs font-medium tracking-wide text-stone-700"
      >
        {name}
      </Label>
    </div>
  );
}
