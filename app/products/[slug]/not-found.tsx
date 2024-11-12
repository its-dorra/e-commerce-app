import Link from "next/link";
import { MoveLeft } from "lucide-react";
export default function ErrorPage() {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div>Product cannot be found ...</div>
      <Link className="flex items-center gap-x-2" href="/products">
        <MoveLeft />
        Go to Listing
      </Link>
    </div>
  );
}
