"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useDeleteProduct } from "../../products/hooks/useDeleteProduct";

interface DeleteProductDialogProps {
  productId: number;
  handleToggle: (id: number | null) => void;
}

export default function DeleteProductDialog({
  productId,
  handleToggle,
}: DeleteProductDialogProps) {
  const { mutate, isPending } = useDeleteProduct();
  const [open, setOpen] = useState(true);

  const handleOnClick = () => {
    mutate(
      { id: productId },
      {
        onSuccess: () => {
          setOpen(false);
          handleToggle(null);
        },
      },
    );
  };

  return (
    <Dialog open={open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
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
            Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
