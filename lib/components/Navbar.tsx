import {
  cartIcon,
  chevronDownIcon,
  completeLogo,
  searchIcon,
  userIcon,
  userProfileIcon,
  usersIcon,
} from "@/assets";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

export default function NavBar() {
  return (
    <div className="flex items-center justify-center py-4">
      <nav className="flex w-full items-center justify-between">
        <Image src={completeLogo} alt="logo" />
        <div className="hidden items-center justify-between md:flex">
          <ul className="flex items-center gap-4 text-sm">
            <li className="font-normal">Home</li>
            <li className="flex items-center gap-1">
              <span className="font-normal">Categories</span>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Image src={chevronDownIcon} alt="chevron down" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Billing</DropdownMenuItem>
                  <DropdownMenuItem>Team</DropdownMenuItem>
                  <DropdownMenuItem>Subscription</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </li>
            <li className="font-normal">About</li>
            <li className="font-normal">Contact</li>
          </ul>
          <div className="flex items-center gap-x-4">
            <div className="flex items-center gap-x-2 rounded-sm border p-1.5">
              <Image
                src={searchIcon}
                alt="search icon"
                width={20}
                height={20}
              />
              <Input
                className="h-full w-full border-none placeholder:text-sm"
                placeholder="Search products"
              />
            </div>
            <Image src={cartIcon} alt="cart icon" />
            <Image src={userProfileIcon} alt="user icon" />
          </div>
        </div>
      </nav>
    </div>
  );
}
