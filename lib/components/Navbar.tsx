"use client";

import { cartIcon, completeLogo, userProfileIcon } from "@/assets";
import Image from "next/image";
import CategoriesNavBar from "./Categoriesnavbar";
import Link from "next/link";
import SearchProductInput from "./SearchProductInput";
import { useState } from "react";
import SideBarButton from "./SideBarButton";

export default function NavBar() {
  const [isNavigationOpen, setIsNavigationOpen] = useState(false);

  return (
    <header className="sticky left-0 top-0 flex w-full items-center justify-center place-self-center py-4">
      <nav className="container flex items-center justify-between">
        <Image src={completeLogo} alt="logo" />
        <ul
          className={`${isNavigationOpen ? "flex" : "hidden"} fixed bottom-0 left-0 right-0 top-[4.5rem] z-50 flex-col items-center justify-center gap-8 bg-primaryWhite text-sm lg:static lg:flex lg:flex-row lg:gap-4`}
        >
          <li className="text-2xl font-semibold uppercase tracking-wider lg:text-base lg:font-normal lg:normal-case lg:tracking-normal">
            Home
          </li>
          <CategoriesNavBar />
          <li className="text-2xl font-semibold uppercase tracking-wider lg:text-base lg:font-normal lg:normal-case lg:tracking-normal">
            About
          </li>
          <li className="text-2xl font-semibold uppercase tracking-wider lg:text-base lg:font-normal lg:normal-case lg:tracking-normal">
            Contact
          </li>
          <li className="text-2xl font-semibold uppercase tracking-wider lg:hidden">
            Cart
          </li>
          <li className="text-2xl font-semibold uppercase tracking-wider lg:hidden">
            User
          </li>
          <SearchProductInput className="lg:hidden" />
        </ul>
        <div className="hidden items-center gap-x-4 lg:flex">
          <SearchProductInput />
          <Link className="cursor-pointer" href="/profile">
            <Image src={cartIcon} alt="cart icon" />
          </Link>
          <Link className="cursor-pointer" href="/profile">
            <Image src={userProfileIcon} alt="user icon" />
          </Link>
        </div>
        <SideBarButton
          isOpen={isNavigationOpen}
          toggleSideBar={() => setIsNavigationOpen(!isNavigationOpen)}
        />
      </nav>
    </header>
  );
}
