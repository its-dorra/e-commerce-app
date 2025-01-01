// import BestSellingSection from "@/lib/components/BestSellingSection";
import BrowseFashion from "@/lib/components/BrowseFashionSection";
import FeaturesSection from "@/lib/components/FeaturesSection";
import HeroSection from "@/lib/components/HeroSection";
import LatestProducts from "@/lib/components/LatestProducts";
import { getCurrentUser } from "@/server/lucia/utils";
import { redirect } from "next/navigation";
import { baseUrl } from "@/lib/utils";

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
    url: baseUrl,
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
      {/*<BestSellingSection />*/}
      <BrowseFashion />
      <LatestProducts />
    </main>
  );
}
