"use client";

import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { MouseEvent, MouseEventHandler } from "react";
import { useDeleteQuery } from "../features/products/hooks/useDeleteQuery";
import { useAppendQuery } from "../features/products/hooks/useAppendQuery";

interface PaginationComponentProps {
  count: number;
  perPage: number;
}

export default function PaginationComponent({
  count,
  perPage,
}: PaginationComponentProps) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const params = new URLSearchParams(searchParams);
  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  const pageCount = Math.ceil(count / perPage);

  const previousPage = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
  ) => {
    if (currentPage === 1) return;
    params.set("page", `${currentPage - 1}`);
    replace(`/products?${params.toString()}`);
  };
  const nextPage = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
  ) => {
    if (currentPage === pageCount) return;
    params.set("page", `${currentPage + 1}`);
    replace(`/products?${params.toString()}`);
  };

  if (pageCount <= 1) return null;

  return (
    <Pagination>
      <PaginationContent className="flex w-full justify-between">
        <PaginationItem>
          <Button
            disabled={currentPage === 1}
            variant="outline"
            onClick={previousPage}
            className="flex gap-1.5"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Previous</span>
          </Button>
        </PaginationItem>
        <PaginationItem>
          <Button
            disabled={currentPage === pageCount}
            variant="outline"
            onClick={nextPage}
            className="flex gap-1.5"
          >
            <span>Next</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
