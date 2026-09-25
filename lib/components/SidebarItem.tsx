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
        className={`${
          isCurrentPage
            ? "bg-stone-900 text-stone-50"
            : "text-stone-600 hover:bg-stone-100 hover:text-stone-900"
        } group flex h-10 w-full items-center justify-start gap-x-3 rounded-lg px-3.5 py-2 font-body text-xs font-medium tracking-wide transition-colors`}
      >
        <Image
          width={20}
          height={20}
          src={icon}
          alt="sidebar icon"
          className="opacity-80"
        />
        <p className="transition-colors">{title}</p>
      </Button>
    );

  return (
    <Link
      className={`${
        isCurrentPage
          ? "shadow-2xs bg-stone-900 text-stone-50"
          : "text-stone-600 hover:bg-stone-100/80 hover:text-stone-950"
      } group flex h-10 w-full items-center justify-start gap-x-3 rounded-lg px-3.5 py-2 font-body text-xs font-medium tracking-wide transition-all`}
      href={href}
      prefetch
    >
      <Image
        width={20}
        height={20}
        src={icon}
        alt="sidebar icon"
        className={`${isCurrentPage ? "brightness-200 invert" : "opacity-80"}`}
      />
      <p className="transition-colors">{title}</p>
    </Link>
  );
}
