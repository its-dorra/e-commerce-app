"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ProductImage from "../../products/components/ProductImage";
import PaginationComponent from "@/lib/components/PaginationComponent";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis } from "lucide-react";
import DeleteProductDialog from "./delete-product-dialog";
import { useState } from "react";
import Link from "next/link";
import { getProducts } from "@/server/data-access/products";

type ProductsData = Awaited<ReturnType<typeof getProducts>>;

export default function AdminProductsContainer({
  productsData,
}: {
  productsData: ProductsData;
}) {
  const [productToDelete, setProductToDelete] = useState<string | null>(null);

  const toggleDeleteDialog = (productId: string | null) => {
    setProductToDelete(productId);
  };

  return (
    <main className="flex flex-col gap-y-4 rounded-lg bg-white p-6">
      <div className="inline-flex items-center justify-between">
        <h4 className="h4">Products</h4>
        <Link href="/admin/products/add-product">
          <Button>Add product</Button>
        </Link>
      </div>
      {productsData?.pagination.total === 0 ? (
        <h4 className="h4">There's no product to show</h4>
      ) : (
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
          <TableBody>
            {productsData?.products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <ProductImage
                    className="size-10"
                    imageUrl={product.imageUrl}
                    alt="product image"
                  />
                </TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>${product.basePrice.toFixed(2)}</TableCell>
                <TableCell>
                  {product.quantity > 0 ? "In stock" : "Out of stock"}
                </TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost">
                        <Ellipsis />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuGroup>
                        <DropdownMenuItem>
                          <Button
                            variant="destructive"
                            className="w-full justify-start"
                            onClick={() => toggleDeleteDialog(product.id)}
                          >
                            Delete
                          </Button>
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {productsData && (
        <PaginationComponent
          count={productsData.pagination.total}
          perPage={productsData.pagination.perPage}
        />
      )}

      {productToDelete && (
        <DeleteProductDialog
          productId={productToDelete}
          handleToggle={toggleDeleteDialog}
        />
      )}
    </main>
  );
}
