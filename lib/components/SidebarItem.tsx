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
        className={`${isCurrentPage ? "bg-zinc-900 text-zinc-50" : ""} group flex h-11 w-full items-center justify-start gap-x-3 rounded-xl px-4 py-2 transition-colors hover:bg-zinc-200/80`}
      >
        <Image width={24} height={24} src={icon} alt="sidebar icon" />
        <p
          className={`${isCurrentPage ? "text-zinc-50" : "text-zinc-600"} text-sm font-semibold transition-colors group-hover:text-zinc-900`}
        >
          {title}
        </p>
      </Button>
    );

  return (
    <Link
      className={`${isCurrentPage ? "bg-zinc-900" : ""} group flex h-11 w-full items-center justify-start gap-x-3 rounded-xl px-4 py-2 transition-colors hover:bg-zinc-200/80`}
      href={href}
    >
      <Image width={24} height={24} src={icon} alt="sidebar icon" />
      <p
        className={`${isCurrentPage ? "text-zinc-50" : "text-zinc-600"} text-sm font-semibold transition-colors group-hover:text-zinc-900`}
      >
        {title}
      </p>
    </Link>
  );
}
