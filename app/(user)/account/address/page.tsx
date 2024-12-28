import { assertAuthenticated } from "@/server/lucia/utils";
import { redirect } from "next/navigation";

export default async function AddressPage() {
  const user = await assertAuthenticated();

  const userRole = user.role;

  if (userRole === "admin") {
    return redirect("/dashboard");
  }

  return <div>address</div>;
}
