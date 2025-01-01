import DashboardCard from "./dashboard-card";

export default function NumberOfOrders() {
  return (
    <DashboardCard
      title="Orders"
      subtitle="monthly goals: 1000"
      description="734"
      className="col-span-1 row-span-1"
    ></DashboardCard>
  );
}
