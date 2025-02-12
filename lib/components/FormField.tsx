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
    <div className="w-full space-y-1">
      {withLabel && <Label htmlFor={name}>{label}</Label>}

      {type === "textArea" && (
        <Textarea
          rows={4}
          className="resize-none px-2 focus-visible:ring-0"
          id={name}
          name={name}
          value={field.state.value}
          onBlur={field.handleBlur}
          onChange={(e) => field.handleChange(e.target.value)}
        />
      )}
      {type === "input" && (
        <Input
          className="px-2 focus-visible:ring-0"
          type={inputType}
          id={name}
          name={field.name}
          value={field.state.value}
          onBlur={field.handleBlur}
          onChange={(e) => field.setValue(e.target.value)}
        />
      )}
      {field.state.meta.isTouched && field.state.meta.errors.length ? (
        <p className="body-2 text-red-500">
          {field.state.meta.errors.join(", ")}
        </p>
      ) : null}
    </div>
  );
}
