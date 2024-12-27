"use client";

import { addIcon, minusIcon } from "@/assets";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface QuantitySelectorProps {
  value: number;
  maxValue: number;
  setValue: (val: number) => void;
}

export default function QuantitySelector({
  value,
  maxValue,
  setValue,
}: QuantitySelectorProps) {
  const handleIncrease = () => {
    if (value === maxValue) return;
    setValue(value + 1);
  };

  const handleDescrease = () => {
    if (value === 0) return;
    setValue(value - 1);
  };

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-x-3 rounded-sm border">
        <Button variant="ghost" onClick={handleDescrease}>
          <Image src={minusIcon} alt="remove icon" />
        </Button>
        <span>{value}</span>
        <Button variant="ghost" onClick={handleIncrease}>
          <Image src={addIcon} alt="add icon" />
        </Button>
      </div>
      {maxValue < 10 && (
        <p className="text-red-600">There&apos;s only {maxValue} left</p>
      )}
    </div>
  );
}
