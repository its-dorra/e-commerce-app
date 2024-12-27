import LoginForm from "@/lib/features/user/components/LoginForm";
import { getCurrentUser } from "@/server/lucia/utils";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const user = await getCurrentUser();

  const userRole = user?.role;

  if (userRole) {
    return redirect(userRole === "admin" ? "/dashboard" : "/");
  }

  return (
    <main className="flex items-center justify-center">
      <LoginForm />
    </main>
  );
}
