import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";

const items = [
  {
    orderId: 1,
    date: new Date(),
    total: "75$",
    status: "processing",
    items: 5,
  },
  {
    orderId: 2,
    date: new Date(),
    total: "75$",
    status: "processing",
    items: 5,
  },
  {
    orderId: 3,
    date: new Date(),
    total: "75$",
    status: "processing",
    items: 5,
  },
  {
    orderId: 4,
    date: new Date(),
    total: "75$",
    status: "processing",
    items: 5,
  },
  {
    orderId: 5,
    date: new Date(),
    total: "75$",
    status: "processing",
    items: 5,
  },
];

export default function RecentOrders() {
  return (
    <Card className="col-span-2 row-span-2">
      <CardHeader>
        <CardTitle className="flex flex-row items-center gap-x-8">
          <span className="text-lg">Recent Orders</span>
          <Link href="/admin/orders">
            <Button variant="secondary" className="rounded-full">
              View all
            </Button>
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.orderId}>
                <TableCell>{item.orderId}</TableCell>
                <TableCell>{item.date.toLocaleDateString()}</TableCell>
                <TableCell>{item.total}</TableCell>
                <TableCell>{item.total}</TableCell>
                <TableCell>{item.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
