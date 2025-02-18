import SignupForm from "@/lib/features/user/components/SignupForm";
import { getCurrentUser } from "@/server/lucia/utils";
import { redirect } from "next/navigation";
import env from "@/server/env";

export const metadata = {
  title: "Fashion Haven | Create Your Account",
  description:
    "Join Fashion Haven today and elevate your wardrobe with the latest trends in fashion.",
  openGraph: {
    title: "Fashion Haven | Create Your Account",
    description:
      "Join Fashion Haven today and elevate your wardrobe with the latest trends in fashion.",
    url: `${env.BASE_URL}/signup`,
    siteName: "Fashion Haven",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Fashion Haven | Create Your Account",
    description:
      "Join Fashion Haven today and elevate your wardrobe with the latest trends in fashion.",
  },
  robots: {
    index: false,
    follow: false,
  },
};

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
