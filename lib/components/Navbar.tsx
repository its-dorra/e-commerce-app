"use client";
import { useState } from "react";
import { useInView } from "react-intersection-observer";

import { cartIcon, completeLogo, userProfileIcon } from "@/assets";
import Image from "next/image";
import CategoriesNavBar from "./Categoriesnavbar";
import Link from "next/link";
import SearchProductInput from "./SearchProductInput";
import SideBarButton from "./SideBarButton";
import CartButton from "../features/cart/components/CartButton";

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
        className={`sticky left-0 right-0 top-0 z-50 flex w-full items-center justify-center place-self-center py-4 transition-colors ${inView ? "" : "bg-primaryWhite shadow-md"} `}
      >
        <nav className="container flex items-center">
          <Link href="/">
            <Image src={completeLogo} alt="logo" />
          </Link>
          <ul
            className={`${isNavigationOpen ? "flex bg-white" : "hidden"} fixed bottom-0 left-0 right-0 top-[4.5rem] z-50 mx-auto flex-col items-center justify-center gap-8 bg-transparent text-sm lg:static lg:flex lg:flex-row lg:gap-4`}
          >
            <li className="rounded-lg px-2 py-1 text-2xl font-semibold uppercase tracking-wider hover:bg-black/5 lg:text-base lg:font-normal lg:normal-case lg:tracking-normal">
              <Link href="/#home">Home</Link>
            </li>
            <li>
              <CategoriesNavBar />
            </li>
            <li className="rounded-lg px-2 py-1 text-2xl font-semibold uppercase tracking-wider hover:bg-black/5 lg:text-base lg:font-normal lg:normal-case lg:tracking-normal">
              <Link href="#about">About</Link>
            </li>
            <li className="rounded-lg px-2 py-1 text-2xl font-semibold uppercase tracking-wider hover:bg-black/5 lg:text-base lg:font-normal lg:normal-case">
              <Link href="/cart">Cart</Link>
            </li>
            <li className="rounded-lg px-2 py-1 text-2xl font-semibold uppercase tracking-wider hover:bg-black/5 lg:hidden">
              <Link href="/account">User</Link>
            </li>
          </ul>
          <div className="hidden items-center gap-x-4 lg:flex">
            <SearchProductInput />

            <Link
              className="cursor-pointer rounded-full p-2 hover:bg-gray-100"
              href="/account"
            >
              <Image src={userProfileIcon} alt="user icon" />
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
