import { PropsWithChildren } from "react";

export default function UserPageLayout({
  title,
  children,
}: PropsWithChildren<{ title: string }>) {
  return (
    <div className="flex h-full flex-col items-start gap-4">
      <h4 className="h4">{title}</h4>
      {children}
    </div>
  );
}
