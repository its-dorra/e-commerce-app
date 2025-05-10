import LoginForm from "@/lib/features/user/components/LoginForm";
import { getCurrentUser } from "@/server/lucia/utils";
import { redirect } from "next/navigation";
import env from "@/server/env";

export const metadata = {
  title: "Fashion Haven | Login to Your Account",
  description:
    "Access your Fashion Haven account to explore the latest trends and manage your wardrobe with ease.",
  openGraph: {
    title: "Fashion Haven | Login to Your Account",
    description:
      "Access your Fashion Haven account to explore the latest trends and manage your wardrobe with ease.",
    url: `${env.BASE_URL}/login`,
    siteName: "Fashion Haven",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Fashion Haven | Login to Your Account",
    description:
      "Access your Fashion Haven account to explore the latest trends and manage your wardrobe with ease.",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default async function LoginPage() {
  const user = await getCurrentUser();

  const userRole = user?.role;

  if (userRole) {
    return redirect(userRole === "admin" ? "/dashboard" : "/");
  }

  return <LoginForm />;
}
