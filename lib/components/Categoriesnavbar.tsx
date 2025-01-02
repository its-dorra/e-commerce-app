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
          <AccordionTrigger className="rounded-lg border-none px-2 py-1 text-2xl font-semibold uppercase tracking-wider no-underline hover:bg-white/50 hover:no-underline lg:text-base lg:font-normal">
            Categories
          </AccordionTrigger>
          <AccordionContent className="text my-6 space-y-1 no-underline">
            {categories?.map(({ name }) => {
              return (
                <Button
                  className="block cursor-pointer"
                  variant="ghost"
                  key={name}
                >
                  <Link
                    href={`/products/categories=${name}`}
                    className="text block text-center text-lg font-normal"
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
        <DropdownMenuTrigger className="hidden items-center gap-1 rounded-lg border-none px-2 py-1 outline-none hover:bg-gray-100 lg:flex">
          <span className="text-2xl font-semibold lg:text-base lg:font-normal">
            Categories
          </span>
          <Image src={chevronDownIcon} alt="chevron down" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="space-y-1 rounded-sm bg-white p-4">
          {categories?.map(({ name }) => {
            return (
              <DropdownMenuItem
                key={name}
                asChild
                className="text-base font-normal"
              >
                <Button
                  className="w-full border-none outline-none hover:bg-gray-100"
                  variant="ghost"
                >
                  <Link
                    href={`/products/?categories=${name}`}
                    className="block text-center text-lg font-normal"
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
