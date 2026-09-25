import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 font-body text-[10px] font-semibold tracking-wider uppercase transition-colors duration-200",
  {
    variants: {
      variant: {
        default: "border-transparent bg-stone-900 text-stone-50",
        secondary: "border-stone-200 bg-stone-100 text-stone-700",
        outline: "border-stone-300 text-stone-700",
        accent: "border-transparent bg-amber-700 text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
