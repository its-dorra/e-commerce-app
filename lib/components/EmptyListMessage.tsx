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
    <div className="section-muted flex h-full w-full grow flex-col items-center justify-center gap-y-5 p-8 text-center">
      <p className="text-sm text-zinc-600">
        {message
          ? message
          : `Your ${listName} list is waiting for you to be filled`}
      </p>
      <Button variant="primary">
        <Link className="flex items-center gap-2" href="/products">
          <span>Start Shopping</span>
          <Image
            src={arrowRightIcon}
            className="fill-white text-white"
            width={24}
            height={24}
            alt="arrow right icon"
          />
        </Link>
      </Button>
    </div>
  );
}
