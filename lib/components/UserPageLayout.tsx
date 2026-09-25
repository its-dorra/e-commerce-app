import { PropsWithChildren } from "react";

export default function UserPageLayout({
  title,
  children,
}: PropsWithChildren<{ title: string }>) {
  return (
    <div className="page-shell flex h-full max-w-7xl flex-col items-start gap-8 py-4 md:gap-10 md:py-6">
      <div className="section-heading mb-4">
        <p className="eyebrow">Maison Haven</p>
        <h2 className="font-display text-3xl font-normal tracking-tight text-stone-900 sm:text-4xl">
          {title}
        </h2>
      </div>
      {children}
    </div>
  );
}
