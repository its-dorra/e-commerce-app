import { assertAuthenticated } from "@/server/lucia/utils";
import { redirect } from "next/navigation";

export default async function AccountDetailsPage() {
  const user = await assertAuthenticated();

  const userRole = user.role;

  if (userRole === "admin") {
    return redirect("/dashboard");
  }

  return <div>account details</div>;
}
