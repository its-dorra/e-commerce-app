import Image from "next/image";
import { features } from "../constants";
import { Card } from "@/components/ui/card";

interface FeatureInterface {
  featureIcon: any;
  featureTitle: string;
  featureContent: string;
}

function Feature({
  featureIcon,
  featureTitle,
  featureContent,
}: FeatureInterface) {
  return (
    <Card className="h-full space-y-4 p-5 md:p-6">
      <div className="grid aspect-square w-11 place-items-center rounded-full bg-zinc-100 p-1">
        <Image src={featureIcon} alt="icon" />
      </div>
      <h3 className="h4">{featureTitle}</h3>
      <p className="text-sm text-zinc-600">{featureContent}</p>
    </Card>
  );
}

export default function FeaturesSection() {
  return (
    <section className="page-shell section-shell">
      <div className="section-heading">
        <p className="eyebrow">Why shop with us</p>
        <h2 className="h2">Premium service for every order.</h2>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => {
          return <Feature {...feature} key={feature.id} />;
        })}
      </div>
    </section>
  );
}
