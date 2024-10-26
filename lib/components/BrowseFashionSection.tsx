import { upperWoman } from "@/assets";
import Image from "next/image";

export default function BrowseFashion() {
  return (
    <section className="flex h-[20rem] items-center justify-around bg-secondaryWhite px-4 py-16">
      <div>
        <h2 className="h2">Browse Our fashion paradise!</h2>
        <p className="body-2 text-black/60">
          Step into a world of style and explore our diverse collection of{" "}
          {"\n"} cloting categories
        </p>
      </div>
      <Image
        className="hidden h-full object-contain lg:block"
        src={upperWoman}
        alt="woman topper"
      />
    </section>
  );
}
