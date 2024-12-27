import { redirect, RedirectType } from "next/navigation";

export default function Page() {
  return redirect("/account/orders", RedirectType.replace);
}