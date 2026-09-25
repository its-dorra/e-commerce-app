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
    <div className="shadow-2xs hover:shadow-xs group rounded-2xl border border-stone-200/80 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-amber-700/40">
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10 p-2.5 transition-colors group-hover:bg-amber-500/20">
        <Image
          src={featureIcon}
          alt="icon"
          className="h-6 w-6 object-contain transition-transform duration-300 ease-out group-hover:scale-110"
        />
      </div>
      <h3 className="font-display text-lg font-medium text-stone-900">
        {featureTitle}
      </h3>
      <p className="font-body mt-2 text-xs font-light leading-relaxed text-stone-600">
        {featureContent}
      </p>
    </div>
  );
}

export default function FeaturesSection() {
  return (
    <section className="page-shell section-shell">
      <div className="section-heading">
        <p className="eyebrow">Our Commitment</p>
        <h2 className="h2 mt-1">Dedicated Service for Every Order</h2>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => {
          return <Feature {...feature} key={feature.id} />;
        })}
      </div>
    </section>
  );
}
