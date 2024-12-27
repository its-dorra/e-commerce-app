"use client";
import Link from "next/link";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import { usePathname } from "next/navigation";

interface SidebarItemProps {
  title: string;
  href: string;
  icon: StaticImport;
}

export default function SidebarItem({ title, icon, href }: SidebarItemProps) {
  const pathName = usePathname();
  const isCurrentPage = pathName === href;

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
