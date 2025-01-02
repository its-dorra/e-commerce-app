import { Button } from "@/components/ui/button";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function AdminProductsContainer() {
  return (
    <main className="flex flex-col gap-y-4 rounded-lg bg-white p-6">
      <div className="inline-flex items-center justify-between">
        <h4 className="h4">Products</h4>
        <Button>Add product</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead></TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
      </Table>
    </main>
  );
}
