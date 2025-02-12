import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Fragment } from "react";

interface AdminBreadCrumbProps {
  before?: {
    href: string;
    to: string;
  }[];
  to: string;
}

export default function AdminBreadCrumb({ before, to }: AdminBreadCrumbProps) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href={"/admin"}>Admin</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        {before?.map((item) => (
          <Fragment key={`${item.href} ${item.to}`}>
            <BreadcrumbItem>
              <BreadcrumbLink href={item.href}>{item.to}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </Fragment>
        ))}
        <BreadcrumbItem>
          <BreadcrumbPage>{to}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
