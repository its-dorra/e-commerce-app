import { Skeleton } from "@/components/ui/skeleton";

export default function ProductLoading() {
  return (
    <main className="page-shell">
      <section className="section-shell">
        <div className="grid gap-8 rounded-3xl border border-stone-200/80 bg-white p-5 shadow-sm md:p-8 lg:grid-cols-[1fr_1fr] lg:gap-12 lg:p-10">
          <div className="flex flex-col gap-4">
            <Skeleton className="aspect-square w-full rounded-2xl" />
            <div className="flex gap-3">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-20 w-20 rounded-xl" />
              ))}
            </div>
          </div>

          <div className="flex flex-col items-start justify-between gap-y-7">
            <div className="w-full space-y-3.5 border-b border-stone-200/80 pb-6">
              <Skeleton className="h-4 w-24" />
              <div className="flex items-start justify-between gap-x-4">
                <Skeleton className="h-9 w-3/4" />
                <Skeleton className="h-6 w-20 rounded-full" />
              </div>
              <Skeleton className="h-8 w-28" />
            </div>

            <div className="w-full space-y-3">
              <Skeleton className="h-3 w-28" />
              <div className="flex gap-2.5">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-8 w-8 rounded-full" />
                ))}
              </div>
            </div>

            <div className="w-full space-y-3">
              <Skeleton className="h-3 w-24" />
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Skeleton key={i} className="h-10 w-14 rounded-lg" />
                ))}
              </div>
            </div>

            <div className="w-full space-y-4 pt-4">
              <div className="flex items-center gap-4">
                <Skeleton className="h-11 w-32 rounded-lg" />
                <Skeleton className="h-11 w-11 rounded-lg" />
              </div>
              <Skeleton className="h-12 w-full rounded-full" />
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell pt-0">
        <div className="space-y-3 rounded-2xl border border-stone-200/80 bg-stone-50/70 p-6 md:p-8">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-4 w-full max-w-2xl" />
          <Skeleton className="h-4 w-3/4 max-w-xl" />
        </div>
      </section>
    </main>
  );
}
