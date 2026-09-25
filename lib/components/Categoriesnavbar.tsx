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

interface CategoriesNavBarProps {
  categories?: { id?: string; name: string }[];
}

export default function CategoriesNavBar({
  categories = [],
}: CategoriesNavBarProps) {
  return (
    <>
      <Accordion
        type="single"
        collapsible
        className="w-full no-underline lg:hidden"
      >
        <AccordionItem className="border-none no-underline" value="categories">
          <AccordionTrigger className="font-body w-full justify-center px-3 py-2 text-base font-medium tracking-wide text-stone-700 hover:text-stone-950 hover:no-underline">
            Categories
          </AccordionTrigger>
          <AccordionContent className="my-2 space-y-1 no-underline">
            {categories.map(({ name }) => {
              return (
                <Button
                  className="font-body block w-full cursor-pointer justify-start rounded-lg text-sm font-medium text-stone-600 hover:bg-stone-200/50 hover:text-stone-950"
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
        <DropdownMenuTrigger className="font-body group hidden items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-stone-700 outline-none transition-colors hover:text-stone-950 lg:flex">
          <span>Categories</span>
          <Image
            src={chevronDownIcon}
            alt="chevron down"
            className="opacity-70 transition-transform duration-200 group-data-[state=open]:rotate-180"
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="space-y-1 rounded-xl border-stone-200/80 bg-stone-50/95 p-2 shadow-lg backdrop-blur-md">
          {categories.map(({ name }) => {
            return (
              <DropdownMenuItem
                key={name}
                asChild
                className="font-body rounded-lg text-xs font-medium text-stone-700 hover:bg-stone-200/70 hover:text-stone-950"
              >
                <Button
                  className="w-full justify-start border-none outline-none hover:bg-stone-200/70"
                  variant="ghost"
                  size="sm"
                >
                  <Link
                    href={`/products/?categories=${name}`}
                    className="block w-full text-left"
                    prefetch
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
