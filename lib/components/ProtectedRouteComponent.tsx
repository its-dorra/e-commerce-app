import { assertAuthenticated } from "@/lib/auth";
import { PropsWithChildren } from "react";

export default async function ProtectedRouteComponent({
  children,
}: PropsWithChildren) {
  await assertAuthenticated();

  return <>{children}</>;
}
