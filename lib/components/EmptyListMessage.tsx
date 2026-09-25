import { arrowRightIcon } from "@/assets";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
export default function EmptyListMessage({
  listName,
  message,
}: {
  listName: string;
  message?: string;
}) {
  return (
    <div className="flex h-full min-h-[18rem] w-full grow flex-col items-center justify-center gap-y-4 rounded-2xl border border-dashed border-stone-300 bg-stone-50/60 p-10 text-center">
      <h4 className="font-display text-2xl font-normal text-stone-800">
        Your {listName} is Empty
      </h4>
      <p className="font-body max-w-md text-xs font-light leading-relaxed text-stone-500">
        {message
          ? message
          : `Explore our collection to add pieces to your ${listName.toLowerCase()}.`}
      </p>
      <Link href="/products" className="pt-2">
        <Button variant="primary" size="default" className="font-medium">
          <span>Explore Collection</span>
          <Image
            src={arrowRightIcon}
            className="h-3.5 w-3.5 brightness-200 invert filter"
            width={16}
            height={16}
            alt="arrow right"
          />
        </Button>
      </Link>
    </div>
  );
}
