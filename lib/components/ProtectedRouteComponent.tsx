import { validateRequest } from "@/server/lucia/utils";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";

export default async function ProtectedRouteComponent({
  children,
}: PropsWithChildren) {
  const { session } = await validateRequest();

  if (!session) return redirect("/login");

  return <>children</>;
}
