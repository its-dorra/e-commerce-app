import { cva, VariantProps } from "class-variance-authority";

const spinnerVariants = cva(
  "rounded-full border-stone-200 border-t-amber-700 animate-spin",
  {
    variants: {
      size: {
        sm: "size-4 border-2",
        md: "size-6 border-2",
        lg: "size-8 border-3",
        xl: "size-10 border-3",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

interface LoadingSpinnerProps extends VariantProps<typeof spinnerVariants> {
  className?: string;
}

export default function LoadingSpinner({
  className,
  size,
}: LoadingSpinnerProps) {
  return (
    <div className="grid place-items-center">
      <div className={spinnerVariants({ size, className })}></div>
    </div>
  );
}
