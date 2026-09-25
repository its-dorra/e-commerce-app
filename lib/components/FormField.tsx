"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Textarea } from "@/components/ui/textarea";
import type { FieldApi } from "@tanstack/react-form";
import { HTMLInputTypeAttribute } from "react";

type SharedProps = {
  label: string;
  name: string;
  field: any;
  withLabel?: boolean;
  inputType: HTMLInputTypeAttribute;
};

export default function FormField<T>({
  type = "input",
  inputType,
  withLabel = true,
  field,
  name,
  label,
}:
  | (SharedProps & {
      type?: "input";
      placeholder?: string;
    })
  | (SharedProps & { type?: "textArea"; rows?: number })) {
  return (
    <div className="w-full space-y-2">
      {withLabel && (
        <Label
          htmlFor={name}
          className="font-body text-[11px] font-semibold uppercase tracking-wider text-stone-600"
        >
          {label}
        </Label>
      )}

      {type === "textArea" && (
        <Textarea
          rows={4}
          className="resize-none rounded-lg border-stone-200/90 bg-white px-3.5 py-2 font-body text-xs text-stone-900 focus-visible:border-amber-700 focus-visible:ring-1 focus-visible:ring-amber-700"
          id={name}
          name={name}
          value={field.state.value}
          onBlur={field.handleBlur}
          onChange={(e) => field.handleChange(e.target.value)}
        />
      )}
      {type === "input" && (
        <Input
          type={inputType}
          id={name}
          name={field.name}
          value={field.state.value}
          onBlur={field.handleBlur}
          onChange={(e) => field.setValue(e.target.value)}
        />
      )}
      {field.state.meta.isTouched && field.state.meta.errors.length ? (
        <p className="font-body text-[11px] text-red-600">
          {field.state.meta.errors
            .map((error: { message: string }) => error.message)
            .join(", ")}
        </p>
      ) : null}
    </div>
  );
}
