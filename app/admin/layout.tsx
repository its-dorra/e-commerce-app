import AdminSidebar from "@/lib/features/dashboard/components/admin-sidebar";
import { assertAdmin } from "@/lib/auth";
import { ReactNode, Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

async function AdminGuard({ children }: { children: ReactNode }) {
  await assertAdmin();
  return <>{children}</>;
}

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <main className="grid min-h-screen w-full grid-flow-col grid-cols-[250px_1fr] gap-x-2 bg-gray-100">
      <AdminSidebar />
      <Suspense
        fallback={
          <div className="p-8">
            <Skeleton className="h-96 w-full rounded-2xl" />
          </div>
        }
      >
        <AdminGuard>{children}</AdminGuard>
      </Suspense>
    </main>
  );
}
