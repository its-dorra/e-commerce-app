import AdminBreadCrumb from "@/lib/features/dashboard/components/admin-breadcrumb";
import BestSelling from "@/lib/features/dashboard/components/best-selling";
import CustomersOfTheMonth from "@/lib/features/dashboard/components/customers-of-the-month";
import NumberOfOrders from "@/lib/features/dashboard/components/number-of-orders";
import RecentOrders from "@/lib/features/dashboard/components/recent-orders";
import TotalSales from "@/lib/features/dashboard/components/total-sales";
import { assertAdmin } from "@/server/lucia/utils";

export default async function Dashboard() {
  await assertAdmin();

  return (
    <div className="flex flex-col gap-y-8 p-12">
      <AdminBreadCrumb href="/admin/dashboard" to="Dashboard" />
      <div className="grid h-full grid-cols-[repeat(3,1fr)] grid-rows-[1fr_auto_auto] gap-12">
        <TotalSales />
        <CustomersOfTheMonth />
        <NumberOfOrders />
        <BestSelling />
        <RecentOrders />
      </div>
    </div>
  );
}
