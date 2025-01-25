"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { FieldApi } from "@tanstack/react-form";
import { ReactNode } from "react";

type SharedProps = {
  label: string;
  name: string;
  field: FieldApi<any, any, any, any>;
};

export default function FormField<T>({
  type = "input",
  field,
  name,
  label,
}:
  | (SharedProps & { type?: "input"; placeholder?: string })
  | (SharedProps & { type?: "textArea"; rows?: number })) {
  const isPassword = label === "Password" || label === "Confirm password";

  return (
    <div className="space-y-1">
      <Label htmlFor={field.name}>{label}</Label>

      {type === "textArea" && (
        <Textarea
          rows={4}
          className="px-2 focus-visible:ring-0"
          id={field.name}
          name={name}
          value={field.state.value}
          onBlur={field.handleBlur}
          onChange={(e) => field.handleChange(e.target.value)}
        />
      )}
      {type === "input" && (
        <Input
          className="px-2 focus-visible:ring-0"
          type={`${isPassword ? "password" : "text"}`}
          id={field.name}
          name={field.name}
          value={field.state.value}
          onBlur={field.handleBlur}
          onChange={(e) => field.handleChange(e.target.value)}
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
