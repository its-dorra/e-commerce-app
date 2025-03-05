import BrowseFashion from "@/lib/components/BrowseFashionSection";
import FeaturesSection from "@/lib/components/FeaturesSection";
import HeroSection from "@/lib/components/HeroSection";
import { getCurrentUser } from "@/server/lucia/utils";
import { redirect } from "next/navigation";
import env from "@/server/env";

export const metadata = {
  title: "Fashion Haven | Trendy Clothing for Every Style",
  description:
    "Explore Fashion Haven, your go-to destination for stylish and trendy clothing. Perfect for elevating your wardrobe. Designed as part of a portfolio project.",
  keywords: [
    "clothing website",
    "fashion",
    "trendy clothes",
    "wardrobe essentials",
    "portfolio project",
    "online shopping",
  ],
  openGraph: {
    title: "Fashion Haven | Trendy Clothing for Every Style",
    description:
      "Discover a curated selection of clothing that combines style and comfort. Explore this portfolio project showcasing modern web design and development.",
    url: env.BASE_URL,
    siteName: "Fashion Haven",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Fashion Haven | Trendy Clothing for Every Style",
    description:
      "Discover a curated selection of clothing that combines style and comfort. Explore this portfolio project showcasing modern web design and development.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function Home() {
  const user = await getCurrentUser();

  const userRole = user?.role;

  if (userRole === "admin") {
    return redirect("/admin/dashboard");
  }

  return (
    <main>
      <HeroSection />
      <FeaturesSection />
      <BrowseFashion />
    </main>
  );
}
