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

export default function NavBar() {
  const [isNavigationOpen, setIsNavigationOpen] = useState(false);

  const { inView, ref } = useInView({
    root: null,
    triggerOnce: false,
  });

  return (
    <>
      <div ref={ref} />
      <header
        className={`sticky left-0 right-0 top-0 z-50 flex w-full items-center justify-center border-b border-zinc-200/70 py-3 transition-all duration-300 ${
          inView
            ? "bg-transparent"
            : "bg-background/90 shadow-sm backdrop-blur-xl"
        }`}
      >
        <nav className="page-shell flex items-center gap-4">
          <Link href="/" className="shrink-0">
            <Image src={completeLogo} alt="logo" />
          </Link>
          <ul
            className={`${isNavigationOpen ? "flex" : "hidden"} fixed bottom-0 left-0 right-0 top-[4.75rem] z-50 mx-auto flex-col items-center justify-center gap-8 bg-zinc-50/95 text-sm backdrop-blur lg:static lg:flex lg:flex-row lg:gap-2 lg:bg-transparent lg:backdrop-blur-none`}
          >
            <li className="w-full max-w-xs px-4 lg:hidden">
              <SearchProductInput className="w-full" />
            </li>
            <li className="rounded-xl px-3 py-2 text-xl font-semibold uppercase tracking-wider text-zinc-800 transition-colors hover:bg-zinc-200/80 lg:text-sm lg:font-medium lg:normal-case lg:tracking-normal">
              <Link
                onClick={() => {
                  setIsNavigationOpen(false);
                }}
                href="/#home"
              >
                Home
              </Link>
            </li>
            <li>
              <CategoriesNavBar />
            </li>
            <li className="rounded-xl px-3 py-2 text-xl font-semibold uppercase tracking-wider text-zinc-800 transition-colors hover:bg-zinc-200/80 lg:text-sm lg:font-medium lg:normal-case lg:tracking-normal">
              <Link
                onClick={() => {
                  setIsNavigationOpen(false);
                }}
                href="#about"
              >
                About
              </Link>
            </li>
            <li className="rounded-xl px-3 py-2 text-xl font-semibold uppercase tracking-wider text-zinc-800 transition-colors hover:bg-zinc-200/80 lg:text-sm lg:font-medium lg:normal-case">
              <Link
                onClick={() => {
                  setIsNavigationOpen(false);
                }}
                href="/cart"
              >
                Cart
              </Link>
            </li>
            <li className="rounded-xl px-3 py-2 text-xl font-semibold uppercase tracking-wider text-zinc-800 transition-colors hover:bg-zinc-200/80 lg:hidden">
              <Link
                onClick={() => {
                  setIsNavigationOpen(false);
                }}
                href="/account"
              >
                User
              </Link>
            </li>
          </ul>
          <div className="ml-auto hidden items-center gap-x-3 lg:flex">
            <SearchProductInput className="w-64" />

            <Link className="rounded-full" href="/account">
              <Button variant="secondary" size="icon" className="rounded-full">
                <UserRound className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <CartButton />
          <SideBarButton
            isOpen={isNavigationOpen}
            toggleSideBar={() => setIsNavigationOpen(!isNavigationOpen)}
          />
        </nav>
      </header>
    </>
  );
}
