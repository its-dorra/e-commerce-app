import { redirect, RedirectType } from "next/navigation";

export default function Page() {
  return redirect("/account/account-details", RedirectType.replace);
}
