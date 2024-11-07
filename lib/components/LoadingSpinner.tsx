import { cva, VariantProps } from "class-variance-authority";

const spinnerVariants = cva(
  "border-4 rounded-full border-gray-200 border-t-gray-400 animate-spin duration-600",
  {
    variants: {
      size: {
        sm: "size-4 border-2",
        md: "size-6 border-4",
        lg: "size-8 border-8",
        xl: "size-12 border-12",
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
