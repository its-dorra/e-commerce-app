"use client";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import DashboardCard from "./dashboard-card";
import { LineChart, XAxis, Line } from "recharts";

const chartData = [
  { date: "2024-04-01", customers: 222 },
  { date: "2024-04-02", customers: 97 },
  { date: "2024-04-03", customers: 167 },
  { date: "2024-04-04", customers: 242 },
  { date: "2024-04-05", customers: 373 },
  { date: "2024-04-06", customers: 301 },
  { date: "2024-04-07", customers: 245 },
  { date: "2024-04-08", customers: 409 },
  { date: "2024-04-09", customers: 59 },
  { date: "2024-04-10", customers: 261 },
  { date: "2024-04-11", customers: 327 },
  { date: "2024-04-12", customers: 292 },
  { date: "2024-04-13", customers: 342 },
  { date: "2024-04-14", customers: 137 },
  { date: "2024-04-15", customers: 120 },
  { date: "2024-04-16", customers: 138 },
  { date: "2024-04-17", customers: 446 },
  { date: "2024-04-18", customers: 364 },
  { date: "2024-04-19", customers: 243 },
  { date: "2024-04-20", customers: 89 },
  { date: "2024-04-21", customers: 137 },
  { date: "2024-04-22", customers: 224 },
  { date: "2024-04-23", customers: 138 },
  { date: "2024-04-24", customers: 387 },
  { date: "2024-04-25", customers: 215 },
  { date: "2024-04-26", customers: 75 },
  { date: "2024-04-27", customers: 383 },
  { date: "2024-04-28", customers: 122 },
  { date: "2024-04-29", customers: 315 },
  { date: "2024-04-30", customers: 454 },
];

const chartConfig = {
  customers: {
    label: "Customers",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export default function CustomersOfTheMonth() {
  return (
    <DashboardCard
      title="Customers"
      subtitle="this month"
      description="2,571"
      className="col-span-1 row-span-1"
    >
      <ChartContainer config={chartConfig}>
        <LineChart
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
                nameKey="views"
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
          <Line
            dataKey="customers"
            type="monotone"
            stroke={`var(--color-customers)`}
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ChartContainer>
    </DashboardCard>
  );
}
