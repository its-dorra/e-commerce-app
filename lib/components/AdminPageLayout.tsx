import { PropsWithChildren } from "react";
import AdminBreadCrumb from "../features/dashboard/components/admin-breadcrumb";

interface AdminPageLayoutProps extends PropsWithChildren {
  to: string;
}

export default function AdminPageLayout({
  to,
  children,
}: AdminPageLayoutProps) {
  return (
    <div className="flex flex-col gap-y-8 p-12">
      <AdminBreadCrumb to={to} />
      {children}
    </div>
  );
}
