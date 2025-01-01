import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PropsWithChildren } from "react";

interface DashboardCardProps extends PropsWithChildren {
  className?: string;
  title: string;
  subtitle: string;
  description: string;
}

export default function DashboardCard({
  className,
  title,
  description,
  subtitle,
  children,
}: DashboardCardProps) {
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="space-y-1.5">
          <CardTitle className="text-lg">{title}</CardTitle>
          <CardDescription className="uppercase">{subtitle}</CardDescription>
        </div>

        <p className="text-2xl font-bold">{description}</p>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
