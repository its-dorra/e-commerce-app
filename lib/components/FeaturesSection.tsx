import Image from "next/image";
import { features } from "../constants";

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
    <div className="space-y-2">
      <div className="grid aspect-square w-10 place-items-center rounded-full bg-secondaryWhite p-0.5">
        <Image src={featureIcon} alt="icon" />
      </div>
      <h3 className="h3">{featureTitle}</h3>
      <p className="body-2 text-black/60">{featureContent}</p>
    </div>
  );
}

export default function FeaturesSection() {
  return (
    <section className="container mx-auto grid grid-cols-[280px] justify-around gap-y-12 py-16 lg:grid-cols-[repeat(3,280px)]">
      {features.map((feature) => {
        return <Feature {...feature} key={feature.id} />;
      })}
    </section>
  );
}
