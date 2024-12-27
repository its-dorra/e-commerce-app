import { assertAuthenticated } from "@/server/lucia/utils";
import { redirect, RedirectType } from "next/navigation";

export default async function Page() {
  const user = await assertAuthenticated();

  const userRole = user.role;

  if (userRole === "admin") {
    return redirect("/dashboard");
  }

  return redirect("/account/orders", RedirectType.replace);
}
