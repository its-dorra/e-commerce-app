import { logout } from "@/lib/features/user/services";
import { redirect, RedirectType } from "next/navigation";

export default async function Logout() {
  const res = await logout();

  redirect("/login", RedirectType.replace);
}
