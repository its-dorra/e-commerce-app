import AccountSidebar from "@/lib/features/user/components/Sidebar";
import { ReactNode } from "react";
import AccountSidebarButton from "@/lib/features/user/components/AccountSidebarButton";

export default function AccountLayout({ children }: { children: ReactNode }) {
  return (
    <section className="container grid grid-cols-1 justify-self-center lg:grid-cols-[auto_1fr] lg:gap-x-4">
      <AccountSidebar />
      <main>
        <AccountSidebarButton />
        {children}
      </main>
    </section>
  );
}
