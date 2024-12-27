"use client";
import { useAccountSidebarStore } from "@/lib/stores/account-sidebar.store";
import { accountSidebarItems } from "@/lib/constants";
import SidebarItem from "@/lib/components/SidebarItem";

export default function AccountSidebar() {
  const { isSidebarOpen } = useAccountSidebarStore();

  return (
    <aside
      className={`${isSidebarOpen ? "-translate-x-6" : "-translate-x-[125%]"} absolute bottom-0 left-6 top-0 z-50 flex w-64 flex-col items-start gap-y-4 rounded-sm border bg-white p-6 transition-transform lg:static lg:translate-x-0 lg:border-b-0 lg:border-l-0 lg:border-r-[0.5px] lg:border-t-0 [&>*]:flex-shrink-0`}
    >
      {accountSidebarItems.map((item) => (
        <SidebarItem
          key={item.id}
          title={item.title}
          href={item.href}
          icon={item.icon}
        />
      ))}
    </aside>
  );
}
