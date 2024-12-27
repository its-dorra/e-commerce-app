import BestSellingSection from "@/lib/components/BestSellingSection";
import BrowseFashion from "@/lib/components/BrowseFashionSection";
import FeaturesSection from "@/lib/components/FeaturesSection";
import HeroSection from "@/lib/components/HeroSection";
import LatestProducts from "@/lib/components/LatestProducts";

export default function Home() {
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
