import AdminPageLayout from "@/lib/components/AdminPageLayout";
import BestSelling from "@/lib/features/dashboard/components/best-selling";
import CustomersOfTheMonth from "@/lib/features/dashboard/components/customers-of-the-month";
import NumberOfOrders from "@/lib/features/dashboard/components/number-of-orders";
import RecentOrders from "@/lib/features/dashboard/components/recent-orders";
import TotalSales from "@/lib/features/dashboard/components/total-sales";
import { assertAdmin } from "@/lib/auth";
import { Suspense } from "react";
import { AdminDashboardSkeleton } from "@/lib/components/skeletons/admin-skeletons";

async function DashboardContent() {
  await assertAdmin();

  return (
    <div className="grid h-full grid-cols-[repeat(3,1fr)] grid-rows-[1fr_auto_auto] gap-12">
      <TotalSales />
      <CustomersOfTheMonth />
      <NumberOfOrders />
      <BestSelling />
      <RecentOrders />
    </div>
  );
}

export default function Dashboard() {
  return (
    <AdminPageLayout to="Dashboard">
      <Suspense fallback={<AdminDashboardSkeleton />}>
        <DashboardContent />
      </Suspense>
    </AdminPageLayout>
  );
}
