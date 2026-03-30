"use client";

import { addIcon, minusIcon } from "@/assets";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface QuantitySelectorProps {
  showLimitMessage?: boolean;
  value: number;
  maxValue: number;
  size?: "default" | "sm" | "lg" | "icon" | null;
  handleIncreaseQuantity: () => void;
  handleDecreaseQuantity: () => void;
}

export default function QuantitySelector({
  showLimitMessage = false,
  value,
  maxValue,
  size,
  handleDecreaseQuantity,
  handleIncreaseQuantity,
}: QuantitySelectorProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-x-1 rounded-xl border border-zinc-200 bg-zinc-50 p-1">
        <Button
          variant="ghost"
          size={size}
          disabled={value === 1}
          onClick={handleDecreaseQuantity}
          className="rounded-lg"
        >
          <Image src={minusIcon} alt="remove icon" />
        </Button>
        <span className="min-w-6 text-center text-sm font-medium text-zinc-700">
          {value}
        </span>
        <Button
          variant="ghost"
          size={size}
          disabled={value === maxValue}
          onClick={handleIncreaseQuantity}
          className="rounded-lg"
        >
          <Image src={addIcon} alt="add icon" />
        </Button>
      </div>
      {showLimitMessage && maxValue < 10 && (
        <p className="text-red-600">There&apos;s only {maxValue} left</p>
      )}
    </div>
  );
}
