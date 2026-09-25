"use client";
import { useState } from "react";
import { useInView } from "react-intersection-observer";

import { completeLogo } from "@/assets";
import Image from "next/image";
import CategoriesNavBar from "./Categoriesnavbar";
import Link from "next/link";
import SearchProductInput from "./SearchProductInput";
import SideBarButton from "./SideBarButton";
import CartButton from "../features/cart/components/CartButton";
import { UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Cart } from "../features/cart/types";

interface NavBarProps {
  cart?: Cart | null;
  categories?: { id?: string; name: string }[];
}

export default function NavBar({ cart, categories = [] }: NavBarProps = {}) {
  const [isNavigationOpen, setIsNavigationOpen] = useState(false);

  const { inView, ref } = useInView({
    root: null,
    triggerOnce: false,
  });

  return (
    <>
      <div ref={ref} />
      <header
        className={`sticky left-0 right-0 top-0 z-50 flex w-full items-center justify-center border-b transition-all duration-300 ${
          inView
            ? "border-transparent bg-transparent py-4"
            : "shadow-xs border-stone-200/60 bg-stone-50/85 py-3 backdrop-blur-xl"
        }`}
      >
        <nav className="page-shell flex items-center justify-between gap-4">
          <Link
            href="/"
            className="shrink-0 transition-opacity hover:opacity-85"
          >
            <Image src={completeLogo} alt="Fashion Haven logo" priority />
          </Link>
          <ul
            className={`${isNavigationOpen ? "flex" : "hidden"} bg-stone-50/98 fixed bottom-0 left-0 right-0 top-[4.5rem] z-50 mx-auto flex-col items-center justify-center gap-7 p-6 text-sm backdrop-blur-2xl lg:static lg:flex lg:flex-row lg:gap-1 lg:bg-transparent lg:p-0 lg:backdrop-blur-none`}
          >
            <li>
              <Link
                className="font-body group relative px-3 py-2 text-base font-medium tracking-wide text-stone-700 transition-colors hover:text-stone-950 lg:text-sm"
                onClick={() => {
                  setIsNavigationOpen(false);
                }}
                href="/#home"
              >
                <span>Home</span>
                <span className="absolute bottom-0 left-3 right-3 h-[1.5px] scale-x-0 bg-amber-700 transition-transform duration-300 group-hover:scale-x-100" />
              </Link>
            </li>
            <li>
              <CategoriesNavBar categories={categories} />
            </li>
            <li>
              <Link
                className="font-body group relative px-3 py-2 text-base font-medium tracking-wide text-stone-700 transition-colors hover:text-stone-950 lg:text-sm"
                onClick={() => {
                  setIsNavigationOpen(false);
                }}
                href="/#about"
              >
                <span>About</span>
                <span className="absolute bottom-0 left-3 right-3 h-[1.5px] scale-x-0 bg-amber-700 transition-transform duration-300 group-hover:scale-x-100" />
              </Link>
            </li>
            <li>
              <Link
                className="font-body group relative px-3 py-2 text-base font-medium tracking-wide text-stone-700 transition-colors hover:text-stone-950 lg:text-sm"
                onClick={() => {
                  setIsNavigationOpen(false);
                }}
                href="/cart"
              >
                <span>Cart</span>
                <span className="absolute bottom-0 left-3 right-3 h-[1.5px] scale-x-0 bg-amber-700 transition-transform duration-300 group-hover:scale-x-100" />
              </Link>
            </li>
            <li>
              <Link
                className="font-body group relative px-3 py-2 text-base font-medium tracking-wide text-stone-700 transition-colors hover:text-stone-950 lg:hidden"
                onClick={() => {
                  setIsNavigationOpen(false);
                }}
                href="/account"
              >
                <span>Account</span>
              </Link>
            </li>
          </ul>
          <div className="ml-auto hidden items-center gap-x-2 lg:flex">
            <Link className="rounded-full" href="/account">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full text-stone-700 hover:bg-stone-200/70 hover:text-stone-950"
              >
                <UserRound className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="flex items-center gap-1.5">
            <CartButton cart={cart} />
            <SideBarButton
              isOpen={isNavigationOpen}
              toggleSideBar={() => setIsNavigationOpen(!isNavigationOpen)}
            />
          </div>
        </nav>
      </header>
    </>
  );
}
