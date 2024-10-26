import { chevronDownIcon } from "@/assets";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import Link from "next/link";
import { categories } from "../constants";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function CategoriesNavBar() {
  return (
    <li>
      <Accordion type="single" collapsible className="lg:hidden">
        <AccordionItem className="border-none" value="categories">
          <AccordionTrigger className="border-none p-0 text-2xl font-semibold uppercase tracking-wider lg:text-base lg:font-normal">
            Categories
          </AccordionTrigger>
          <AccordionContent className="text my-6 space-y-1 underline">
            {categories.map(({ id, category }) => {
              return (
                <Link
                  key={id}
                  href=""
                  className="block text-center text-lg font-normal"
                >
                  {category}
                </Link>
              );
            })}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <DropdownMenu>
        <DropdownMenuTrigger className="hidden items-center gap-1 lg:flex">
          <span className="text-2xl font-semibold lg:text-base lg:font-normal">
            Categories
          </span>
          <Image src={chevronDownIcon} alt="chevron down" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="space-y-1 rounded-sm bg-primaryWhite p-4">
          {categories.map(({ id, category }) => {
            return (
              <DropdownMenuItem
                key={id}
                asChild
                className="text-base font-normal"
              >
                <Link href="">{category}</Link>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </li>
  );
}
