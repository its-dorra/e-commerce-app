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
import { useProducts } from "../../products/hooks/useProducts";
import ProductImage from "../../products/components/ProductImage";
import PaginationComponent from "@/lib/components/PaginationComponent";
import LoadingSpinner from "@/lib/components/LoadingSpinner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  // DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis } from "lucide-react";
import DeleteProductDialog from "./delete-product-dialog";
import { useState } from "react";
import Link from "next/link";

export default function AdminProductsContainer() {
  const { data, isLoading } = useProducts();
  const [productToDelete, setProductToDelete] = useState<number | null>(null);
  // const [productToEdit, setProductToEdit] = useState<number | null>(null);

  const toggleDeleteDialog = (productId: number | null) => {
    setProductToDelete(productId);
  };

  // const toggleEditDialog = (productId: number | null) => {
  //   setProductToEdit(productId);
  // };

  if (isLoading)
    return (
      <div className="flex h-full w-full grow items-center justify-center">
        <LoadingSpinner size="xl" />
      </div>
    );

  return (
    <main className="flex flex-col gap-y-4 rounded-lg bg-white p-6">
      <div className="inline-flex items-center justify-between">
        <h4 className="h4">Products</h4>
        <Link href="/admin/products/add-product">
          <Button>Add product</Button>
        </Link>
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
        <TableBody>
          {data?.products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>
                <ProductImage
                  className="size-10"
                  imageUrl={product.imageUrl}
                  alt="product image"
                />
              </TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.basePrice}</TableCell>
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
                          variant="ghost"
                          className="w-full justify-start border-none outline-none"
                          onClick={(e) => {
                            e.preventDefault();
                            // toggleEditDialog(product.id);
                          }}
                        >
                          Edit
                        </Button>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Button
                          variant="ghost"
                          className="w-full justify-start border-none outline-none"
                          onClick={(e) => {
                            e.preventDefault();
                            toggleDeleteDialog(product.id);
                          }}
                        >
                          Delete
                        </Button>
                        {productToDelete === product.id && (
                          <DeleteProductDialog
                            productId={product.id}
                            handleToggle={toggleDeleteDialog}
                          />
                        )}
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <PaginationComponent
        count={data?.pagination.total || 0}
        perPage={data?.pagination.perPage || 0}
      />
    </main>
  );
}
