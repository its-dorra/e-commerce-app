import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="flex h-full items-center justify-center">{children}</main>
  );
}
