import AccountSidebar from "@/lib/features/user/components/Sidebar";
import { ReactNode, Suspense } from "react";
import AccountSidebarButton from "@/lib/features/user/components/AccountSidebarButton";
import { assertAuthenticated } from "@/lib/auth";
import AccountLoading from "./loading";

export const prefetch = "partial";

async function AccountAuthGuard({ children }: { children: ReactNode }) {
  await assertAuthenticated();
  return <>{children}</>;
}

export default function AccountLayout({ children }: { children: ReactNode }) {
  return (
    <section className="page-shell section-shell grid grid-cols-1 gap-8 lg:grid-cols-[260px_1fr] lg:items-start">
      <AccountSidebar />
      <main className="shadow-xs min-h-[28rem] rounded-2xl border border-stone-200/80 bg-white p-6 md:p-8 lg:p-10">
        <AccountSidebarButton />
        <Suspense fallback={<AccountLoading />}>
          <AccountAuthGuard>{children}</AccountAuthGuard>
        </Suspense>
      </main>
    </section>
  );
}
