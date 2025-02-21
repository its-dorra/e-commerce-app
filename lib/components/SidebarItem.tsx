"use client";
import Link from "next/link";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useLogout } from "../features/user/hooks/useLogout";

interface SidebarItemProps {
  title: string;
  href: string;
  icon: StaticImport;
}

export default function SidebarItem({ title, icon, href }: SidebarItemProps) {
  const pathName = usePathname();
  const isCurrentPage = pathName.includes(href);

  const { mutate, isPending } = useLogout();

  if (title.toLowerCase() === "logout")
    return (
      <Button
        variant="ghost"
        disabled={isPending}
        onClick={() => mutate()}
        className={`${isCurrentPage ? "bg-gray-100" : ""} group flex h-12 w-full items-center justify-start gap-x-3 rounded-md px-4 py-2 transition-colors hover:bg-gray-100`}
      >
        <Image width={24} height={24} src={icon} alt="sidebar icon" />
        <p
          className={`${isCurrentPage ? "" : "text-gray-500"} text-base font-semibold transition-colors group-hover:text-black`}
        >
          {title}
        </p>
      </Button>
    );

  return (
    <Link
      className={`${isCurrentPage ? "bg-gray-100" : ""} group flex h-12 w-full items-center justify-start gap-x-3 rounded-md px-4 py-2 transition-colors hover:bg-gray-100`}
      href={href}
    >
      <Image width={24} height={24} src={icon} alt="sidebar icon" />
      <p
        className={`${isCurrentPage ? "" : "text-gray-500"} font-semibold transition-colors group-hover:text-black`}
      >
        {title}
      </p>
    </Link>
  );
}
