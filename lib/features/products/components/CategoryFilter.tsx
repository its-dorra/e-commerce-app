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
    <div className="flex items-center gap-x-3 rounded-xl border border-zinc-200/70 bg-zinc-100/70 px-3 py-2">
      <Checkbox
        id={name}
        checked={isQueryParamInUrl}
        onCheckedChange={() => {
          isQueryParamInUrl
            ? deleteQuery("categories", name)
            : appendQuery("categories", name);

          // setIsActive(!isActive);
        }}
      />
      <Label htmlFor={name} className="text-sm text-zinc-700">
        {name}
      </Label>
    </div>
  );
}
