import { PropsWithChildren } from "react";
import AdminBreadCrumb from "../features/dashboard/components/admin-breadcrumb";

interface AdminPageLayoutProps extends PropsWithChildren {
  to: string;
  before?: {
    to: string;
    href: string;
  }[];
}

export default function AdminPageLayout({
  to,
  before,
  children,
}: AdminPageLayoutProps) {
  return (
    <div className="flex flex-col gap-y-8 p-12">
      <AdminBreadCrumb before={before} to={to} />
      {children}
    </div>
  );
}
