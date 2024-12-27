import BestSellingSection from "@/lib/components/BestSellingSection";
import BrowseFashion from "@/lib/components/BrowseFashionSection";
import FeaturesSection from "@/lib/components/FeaturesSection";
import HeroSection from "@/lib/components/HeroSection";
import LatestProducts from "@/lib/components/LatestProducts";
import { getCurrentUser } from "@/server/lucia/utils";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await getCurrentUser();

  const userRole = user?.role;

  if (userRole === "admin") {
    return redirect("/dashboard");
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
