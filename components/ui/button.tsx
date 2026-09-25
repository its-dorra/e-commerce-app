import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-xs md:text-sm font-medium tracking-wide ring-offset-background transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-stone-900 text-stone-50 shadow-sm hover:bg-stone-800 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-xs",
        outline:
          "border border-stone-300/80 bg-stone-50/80 text-stone-800 hover:border-stone-900 hover:bg-stone-100/80 hover:text-stone-950",
        secondary:
          "bg-stone-200/80 text-stone-900 hover:bg-stone-300/80 hover:shadow-xs",
        ghost: "text-stone-700 hover:bg-stone-200/60 hover:text-stone-900",
        link: "text-stone-900 underline-offset-4 hover:underline hover:text-amber-800",
        primary:
          "bg-amber-700 text-white shadow-sm hover:bg-amber-800 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-8.5 rounded-md px-3.5 py-2 text-xs",
        lg: "h-11 rounded-lg px-7 text-sm font-semibold",
        icon: "h-9 w-9 rounded-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
