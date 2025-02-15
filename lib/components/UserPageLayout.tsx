import { PropsWithChildren } from "react";

export default function UserPageLayout({
  title,
  children,
}: PropsWithChildren<{ title: string }>) {
  return (
    <div className="container flex h-full max-w-6xl flex-col items-start gap-16 py-8">
      <h2 className="h3">{title}</h2>
      {children}
    </div>
  );
}
