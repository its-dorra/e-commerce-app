"use client";

import { useAccountSidebarStore } from "@/lib/stores/account-sidebar.store";
import { Button } from "@/components/ui/button";

export default function AccountSidebarButton() {
  const { toggleSidebar } = useAccountSidebarStore();

  return (
    <div className="flex w-full justify-end">
      <Button
        className="rounded-xl border-zinc-200 bg-zinc-50 lg:hidden"
        variant="outline"
        onClick={toggleSidebar}
      >
        Menu
      </Button>
    </div>
  );
}
