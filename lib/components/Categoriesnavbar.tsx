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

import { categories } from "../constants";
import { Button } from "@/components/ui/button";

export default function CategoriesNavBar() {
  // const categories = await getCategories();

  return (
    <li>
      <Accordion type="single" collapsible className="lg:hidden">
        <AccordionItem className="border-none" value="categories">
          <AccordionTrigger className="border-none p-0 text-2xl font-semibold uppercase tracking-wider lg:text-base lg:font-normal">
            Categories
          </AccordionTrigger>
          <AccordionContent className="text my-6 space-y-1 underline">
            {categories.map(({ id, category: name }) => {
              return (
                <Button variant="link" key={id} asChild>
                  <Link
                    href={`/listing/1?categories=${name}`}
                    className="block text-center text-lg font-normal"
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
        <DropdownMenuTrigger className="hidden items-center gap-1 lg:flex">
          <span className="text-2xl font-semibold lg:text-base lg:font-normal">
            Categories
          </span>
          <Image src={chevronDownIcon} alt="chevron down" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="space-y-1 rounded-sm bg-primaryWhite p-4">
          {categories.map(({ id, category: name }) => {
            return (
              <DropdownMenuItem
                key={id}
                asChild
                className="text-base font-normal"
              >
                <Button variant="link" key={id} asChild>
                  <Link
                    href={`/listing/1?categories=${name}`}
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
    </li>
  );
}
