import { assertAdmin } from "@/server/lucia/utils";
import { redirect, RedirectType } from "next/navigation";

export default async function AdminPage() {
  await assertAdmin();

  return redirect("/admin/dashboard", RedirectType.replace);
}
