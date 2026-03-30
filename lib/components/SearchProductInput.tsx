import { searchIcon } from "@/assets";
import { Label } from "@/components/ui/label";

import Image from "next/image";

export default function SearchProductInput({
  className,
}: {
  className?: string;
}) {
  return (
    <div
      className={`flex items-center gap-x-2 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-2 shadow-sm transition-all duration-300 focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/20 ${className && className}`}
    >
      <Label htmlFor="input">
        <Image src={searchIcon} alt="search icon" width={20} height={20} />
      </Label>

      <input
        id="input"
        className="h-full w-full border-none bg-transparent px-1 text-sm outline-none ring-0 placeholder:text-zinc-500"
        placeholder="Search products"
      />
    </div>
  );
}
