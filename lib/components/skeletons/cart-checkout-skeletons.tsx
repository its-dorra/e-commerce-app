import { Skeleton } from "@/components/ui/skeleton";

export function CartSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_360px]">
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="flex items-center gap-4 rounded-xl border border-stone-200/80 p-4"
          >
            <Skeleton className="size-20 shrink-0 rounded-lg" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-3 w-1/4" />
            </div>
            <Skeleton className="h-8 w-24 rounded-md" />
            <Skeleton className="h-5 w-16" />
          </div>
        ))}
      </div>
      <div className="h-fit space-y-4 rounded-2xl border border-stone-200/80 p-6">
        <Skeleton className="h-5 w-32" />
        <div className="space-y-2 pt-2">
          <div className="flex justify-between">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-12" />
          </div>
          <div className="flex justify-between">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-12" />
          </div>
          <div className="flex justify-between border-t pt-2">
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-5 w-20" />
          </div>
        </div>
        <Skeleton className="h-11 w-full rounded-xl" />
      </div>
    </div>
  );
}

export function CheckoutSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_400px]">
      <div className="space-y-6">
        <div className="rounded-2xl border border-stone-200/80 p-6">
          <Skeleton className="mb-4 h-5 w-36" />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Skeleton className="h-10 w-full rounded-md" />
            <Skeleton className="h-10 w-full rounded-md" />
            <Skeleton className="h-10 w-full rounded-md" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
        </div>
      </div>
      <div className="h-fit space-y-4 rounded-2xl border border-stone-200/80 p-6">
        <Skeleton className="h-5 w-32" />
        <div className="space-y-3 pt-2">
          <Skeleton className="h-12 w-full rounded-lg" />
          <Skeleton className="h-12 w-full rounded-lg" />
        </div>
        <Skeleton className="h-11 w-full rounded-xl" />
      </div>
    </div>
  );
}

export function OrderSuccessSkeleton() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center justify-center gap-y-6 rounded-3xl border border-stone-200/80 bg-white px-8 py-16 text-center shadow-sm">
      <Skeleton className="size-20 rounded-2xl" />
      <Skeleton className="h-6 w-40" />
      <Skeleton className="h-8 w-72" />
      <Skeleton className="h-4 w-96 max-w-full" />
      <Skeleton className="h-11 w-44 rounded-md" />
    </div>
  );
}
