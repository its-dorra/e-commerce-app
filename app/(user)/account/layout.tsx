import AccountSidebar from "@/lib/features/user/components/Sidebar";
import { ReactNode } from "react";
import AccountSidebarButton from "@/lib/features/user/components/AccountSidebarButton";
import { assertAuthenticated } from "@/server/lucia/utils";

export default async function AccountLayout({
  children,
}: {
  children: ReactNode;
}) {
  await assertAuthenticated();

  return (
    <section className="page-shell section-shell grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr] lg:items-start">
      <AccountSidebar />
      <main className="section-muted min-h-[28rem] p-4 md:p-6 lg:p-8">
        <AccountSidebarButton />
        {children}
      </main>
    </section>
  );
}
