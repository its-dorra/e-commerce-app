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
      <div className="flex items-center gap-x-3 rounded-sm border">
        <Button
          variant="ghost"
          size={size}
          disabled={value === 1}
          onClick={handleDecreaseQuantity}
        >
          <Image src={minusIcon} alt="remove icon" />
        </Button>
        <span>{value}</span>
        <Button
          variant="ghost"
          size={size}
          disabled={value === maxValue}
          onClick={handleIncreaseQuantity}
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
