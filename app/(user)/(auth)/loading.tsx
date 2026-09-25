import { Skeleton } from "@/components/ui/skeleton";

export default function AuthLoading() {
  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-y-7">
      <div className="space-y-2">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-9 w-64" />
        <Skeleton className="h-4 w-full" />
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
        <Skeleton className="h-10 w-full rounded-md" />
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="h-px flex-1 bg-stone-200" />
          <Skeleton className="h-3 w-8" />
          <div className="h-px flex-1 bg-stone-200" />
        </div>
        <Skeleton className="h-10 w-full rounded-md" />
      </div>

      <div className="flex justify-center">
        <Skeleton className="h-4 w-48" />
      </div>
    </div>
  );
}
