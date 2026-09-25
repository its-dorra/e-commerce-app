"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useAction } from "next-safe-action/hooks";
import { deleteProductAction } from "@/server/actions/products";
import toast from "react-hot-toast";

interface DeleteProductDialogProps {
  productId: string;
  handleToggle: (id: string | null) => void;
}

export default function DeleteProductDialog({
  productId,
  handleToggle,
}: DeleteProductDialogProps) {
  const [open, setOpen] = useState(true);

  const { execute, isPending } = useAction(deleteProductAction, {
    onSuccess: () => {
      toast.success("Product deleted successfully");
      setOpen(false);
      handleToggle(null);
    },
    onError: ({ error }) => {
      toast.error(error.serverError || "Failed to delete product");
    },
  });

  const handleOnClick = () => {
    execute({ id: productId });
  };

  return (
    <Dialog open={open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete the
            product from the catalogue.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            onClick={() => {
              handleToggle(null);
            }}
            variant="outline"
          >
            Cancel
          </Button>
          <Button
            disabled={isPending}
            onClick={handleOnClick}
            variant="destructive"
          >
            {isPending ? "Deleting..." : "Continue"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
