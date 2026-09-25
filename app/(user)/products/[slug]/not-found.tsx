import Link from "next/link";
import { MoveLeft } from "lucide-react";
export default function ErrorPage() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 text-center">
      <h3 className="font-display text-2xl font-normal text-stone-900">
        Product Not Found
      </h3>
      <p className="font-body max-w-md text-xs text-stone-500">
        This garment or accessory might have been archived or is temporarily
        unavailable.
      </p>
      <Link
        className="font-body mt-2 inline-flex items-center gap-x-2 rounded-lg border border-stone-200 bg-white px-4 py-2 text-xs font-medium text-stone-800 transition-colors hover:border-amber-700 hover:text-amber-800"
        href="/products"
      >
        <MoveLeft className="h-3.5 w-3.5" />
        <span>Return to Catalogue</span>
      </Link>
    </div>
  );
}
