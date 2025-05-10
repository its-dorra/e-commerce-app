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
    <div className="flex items-center gap-x-3 border-b-[0.5px] py-2">
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
      <Label htmlFor={name}>{name}</Label>
    </div>
  );
}
