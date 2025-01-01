import AdminSidebar from "@/lib/features/dashboard/components/admin-sidebar";
import { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <main className="grid min-h-screen w-full grid-flow-col grid-cols-[250px_1fr] gap-x-2 bg-gray-100">
      <AdminSidebar />
      {children}
    </main>
  );
}
