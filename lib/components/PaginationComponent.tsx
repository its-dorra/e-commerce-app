"use client";

import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { MouseEvent } from "react";

interface PaginationComponentProps {
  count: number;
  perPage: number;
}

export default function PaginationComponent({
  count,
  perPage,
}: PaginationComponentProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { push } = useRouter();
  const params = new URLSearchParams(searchParams);
  const currentPage = Number(searchParams.get("page") || 1);
  const pageCount = Math.ceil(count / perPage);

  const navigateToPage = (page: number) => {
    if (page < 1 || page > pageCount) return;
    params.set("page", `${page}`);
    // push(`${pathname}?${params.toString()}`);
    window.history.pushState(null, "", `?${params.toString()}`);
  };

  const handlePreviousPage = (e: MouseEvent<HTMLButtonElement>) => {
    if (currentPage > 1) navigateToPage(currentPage - 1);
  };

  const handleNextPage = (e: MouseEvent<HTMLButtonElement>) => {
    if (currentPage < pageCount) navigateToPage(currentPage + 1);
  };

  if (pageCount <= 1) return null;

  return (
    <Pagination className="mt-4">
      <PaginationContent className="flex w-full items-center justify-between">
        <PaginationItem>
          <Button
            disabled={currentPage === 1}
            aria-disabled={currentPage === 1}
            variant="outline"
            onClick={handlePreviousPage}
            className="flex gap-1.5"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Previous</span>
          </Button>
        </PaginationItem>

        <PaginationItem>
          <Button
            disabled={currentPage === pageCount}
            aria-disabled={currentPage === pageCount}
            variant="outline"
            onClick={handleNextPage}
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
