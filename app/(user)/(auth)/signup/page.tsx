import SignupForm from "@/lib/features/user/components/SignupForm";
import { getCurrentUser } from "@/server/lucia/utils";
import { redirect } from "next/navigation";

export default async function SignupPage() {
  const user = await getCurrentUser();

  const userRole = user?.role;

  if (userRole) {
    return redirect(userRole === "admin" ? "/dashboard" : "/");
  }

  return (
    <main className="flex items-center justify-center">
      <SignupForm />
    </main>
  );
}
