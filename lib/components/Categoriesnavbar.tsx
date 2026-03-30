import { chevronDownIcon } from "@/assets";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Button } from "@/components/ui/button";
import { clientTrpc } from "../trpc/client";

export default function CategoriesNavBar() {
  const { data: categories } = clientTrpc.filters.categories.useQuery();

  return (
    <>
      <Accordion type="single" collapsible className="no-underline lg:hidden">
        <AccordionItem className="border-none no-underline" value="categories">
          <AccordionTrigger className="rounded-xl border-none px-3 py-2 text-xl font-semibold uppercase tracking-wider text-zinc-800 no-underline transition-colors hover:bg-zinc-200/70 hover:no-underline lg:text-sm lg:font-medium">
            Categories
          </AccordionTrigger>
          <AccordionContent className="my-6 space-y-1 no-underline">
            {categories?.map(({ name }) => {
              return (
                <Button
                  className="block w-full cursor-pointer justify-start rounded-xl text-base font-medium text-zinc-700"
                  variant="ghost"
                  key={name}
                >
                  <Link
                    href={`/products/?categories=${name}`}
                    className="block w-full text-left"
                  >
                    {name}
                  </Link>
                </Button>
              );
            })}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <DropdownMenu>
        <DropdownMenuTrigger className="hidden items-center gap-1 rounded-xl border-none px-3 py-2 text-zinc-800 outline-none transition-colors hover:bg-zinc-200/70 lg:flex">
          <span className="text-sm font-medium">Categories</span>
          <Image src={chevronDownIcon} alt="chevron down" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="space-y-1 rounded-2xl border-zinc-200/70 bg-zinc-50 p-3 shadow-lg">
          {categories?.map(({ name }) => {
            return (
              <DropdownMenuItem
                key={name}
                asChild
                className="rounded-lg text-sm font-medium text-zinc-700"
              >
                <Button
                  className="w-full justify-start border-none outline-none hover:bg-zinc-200/70"
                  variant="ghost"
                >
                  <Link
                    href={`/products/?categories=${name}`}
                    className="block w-full text-left"
                  >
                    {name}
                  </Link>
                </Button>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
