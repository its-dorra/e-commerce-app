"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Textarea } from "@/components/ui/textarea";
import type { FieldApi } from "@tanstack/react-form";
import { HTMLInputTypeAttribute } from "react";

type SharedProps = {
  label: string;
  name: string;
  field: FieldApi<any, any, any, any>;
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
          className="text-xs uppercase tracking-[0.14em] text-zinc-600"
        >
          {label}
        </Label>
      )}

      {type === "textArea" && (
        <Textarea
          rows={4}
          className="resize-none px-3 focus-visible:ring-accent"
          id={name}
          name={name}
          value={field.state.value}
          onBlur={field.handleBlur}
          onChange={(e) => field.handleChange(e.target.value)}
        />
      )}
      {type === "input" && (
        <Input
          className="px-3 focus-visible:ring-accent"
          type={inputType}
          id={name}
          name={field.name}
          value={field.state.value}
          onBlur={field.handleBlur}
          onChange={(e) => field.setValue(e.target.value)}
        />
      )}
      {field.state.meta.isTouched && field.state.meta.errors.length ? (
        <p className="text-xs text-red-500">
          {field.state.meta.errors.join(", ")}
        </p>
      ) : null}
    </div>
  );
}
