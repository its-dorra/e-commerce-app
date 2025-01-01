import { minusIcon } from "@/assets";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

export default function BestSelling() {
  return (
    <Card className="col-span-1 row-span-2">
      <CardHeader>
        <CardTitle className="text-lg">Best Selling</CardTitle>
        <CardDescription className="uppercase">this month</CardDescription>
      </CardHeader>
      <hr />
      <CardContent className="p-6">
        <div>
          <div className="flex items-center gap-x-2">
            <span className="text-xl font-bold">$2400</span>
            <Image src={minusIcon} alt="minus icon" />
            <span className="text-sm text-muted-foreground">Total Sales</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
