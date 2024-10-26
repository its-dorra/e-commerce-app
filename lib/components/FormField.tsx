import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { FieldApi } from "@tanstack/react-form";

export default function FormField({
  field,
  label,
}: {
  field: FieldApi<any, any, any, any>;
  label: string;
}) {
  return (
    <div className="space-y-1">
      <Label htmlFor={field.name}>{label}</Label>
      <Input
        className="px-2 outline-black"
        type={`${label === "Password" ? "password" : "text"}`}
        id={field.name}
        name={field.name}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
      />
      {field.state.meta.isTouched && field.state.meta.errors.length ? (
        <p className="body-2 text-red-500">
          {field.state.meta.errors.join(", ")}
        </p>
      ) : null}
    </div>
  );
}
