import { redirect, RedirectType } from "next/navigation";

export default function AdminPage() {
  return redirect("/admin/dashboard", RedirectType.replace);
}
