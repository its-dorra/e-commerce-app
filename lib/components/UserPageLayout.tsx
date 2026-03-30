import { PropsWithChildren } from "react";

export default function UserPageLayout({
  title,
  children,
}: PropsWithChildren<{ title: string }>) {
  return (
    <div className="page-shell flex h-full max-w-7xl flex-col items-start gap-10 py-6 md:gap-12 md:py-8">
      <div className="section-heading">
        <p className="eyebrow">Fashion haven</p>
        <h2 className="h2">{title}</h2>
      </div>
      {children}
    </div>
  );
}
