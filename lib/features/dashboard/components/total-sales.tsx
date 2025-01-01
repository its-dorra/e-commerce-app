"use client";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import DashboardCard from "./dashboard-card";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

const chartData = [
  { date: "2024-04-01", sales: 222 },
  { date: "2024-04-02", sales: 97 },
  { date: "2024-04-03", sales: 167 },
  { date: "2024-04-04", sales: 242 },
  { date: "2024-04-05", sales: 373 },
  { date: "2024-04-06", sales: 301 },
  { date: "2024-04-07", sales: 245 },
  { date: "2024-04-08", sales: 409 },
  { date: "2024-04-09", sales: 59 },
  { date: "2024-04-10", sales: 261 },
  { date: "2024-04-11", sales: 327 },
  { date: "2024-04-12", sales: 292 },
];

export default function TotalSales() {
  const chartConfig = {
    sales: {
      label: "Sales",
      color: "var(--chart-1)",
    },
  } satisfies ChartConfig;

  return (
    <DashboardCard
      className="col-span-1 row-span-1"
      title="Total Sales"
      subtitle="this month"
      description="$4235"
    >
      <ChartContainer config={chartConfig}>
        <BarChart
          accessibilityLayer
          data={chartData}
          margin={{
            left: 12,
            right: 12,
          }}
        >
          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            minTickGap={32}
            tickFormatter={(value) => {
              const date = new Date(value);
              return date.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              });
            }}
          />
          <ChartTooltip
            content={
              <ChartTooltipContent
                className="w-[150px]"
                nameKey="sales"
                labelFormatter={(value) => {
                  return new Date(value).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  });
                }}
              />
            }
          />
          <Bar dataKey="sales" fill={`var(--color-sales)`} />
        </BarChart>
      </ChartContainer>
    </DashboardCard>
  );
}
