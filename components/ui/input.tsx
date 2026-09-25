import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "font-body shadow-2xs flex h-10 w-full rounded-lg border border-stone-200/90 bg-white px-3.5 py-2 text-xs text-stone-900 ring-offset-background file:border-0 file:bg-transparent file:text-xs file:font-medium file:text-foreground placeholder:text-stone-400 focus-visible:border-amber-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-700 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
