import { searchIcon } from "@/assets";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import Image from "next/image";

export default function SearchProductInput({
  className,
}: {
  className?: string;
}) {
  return (
    <div
      className={`flex items-center gap-x-2 rounded-sm border p-1.5 ${className && className}`}
    >
      <Label htmlFor="input">
        <Image src={searchIcon} alt="search icon" width={20} height={20} />
      </Label>

      <input
        id="input"
        className="h-full w-full border-none bg-transparent px-1 py-2 outline-none ring-0 placeholder:text-sm"
        placeholder="Search products"
      />
    </div>
  );
}
