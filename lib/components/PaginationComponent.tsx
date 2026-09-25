"use client";

import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface PaginationComponentProps {
  count: number;
  perPage: number;
}

export default function PaginationComponent({
  count,
  perPage,
}: PaginationComponentProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const currentPage = Number(searchParams.get("page") || 1);
  const pageCount = Math.ceil(count / perPage);

  const navigateToPage = (page: number) => {
    if (page < 1 || page > pageCount) return;
    params.set("page", `${page}`);
    router.push(`${pathname}?${params.toString()}`);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) navigateToPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < pageCount) navigateToPage(currentPage + 1);
  };

  if (pageCount <= 1) return null;

  return (
    <Pagination className="mt-8">
      <PaginationContent className="flex w-full items-center justify-between font-body text-xs">
        <PaginationItem>
          <Button
            disabled={currentPage === 1}
            aria-disabled={currentPage === 1}
            variant="outline"
            size="sm"
            onClick={handlePreviousPage}
            className="flex gap-1.5 border-stone-200 bg-white font-medium text-stone-700 hover:border-amber-700 hover:text-amber-800"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
            <span>Previous</span>
          </Button>
        </PaginationItem>

        <span className="font-body text-xs text-stone-500">
          Page <strong className="text-stone-900">{currentPage}</strong> of{" "}
          <strong className="text-stone-900">{pageCount}</strong>
        </span>

        <PaginationItem>
          <Button
            disabled={currentPage === pageCount}
            aria-disabled={currentPage === pageCount}
            variant="outline"
            size="sm"
            onClick={handleNextPage}
            className="flex gap-1.5 border-stone-200 bg-white font-medium text-stone-700 hover:border-amber-700 hover:text-amber-800"
          >
            <span>Next</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
