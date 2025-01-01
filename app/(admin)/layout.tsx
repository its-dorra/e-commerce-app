import { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <main className="flex items-center">{children}</main>;
}
