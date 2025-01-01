import UserPageLayout from "@/lib/components/UserPageLayout";
import AccountDetailsForm from "@/lib/features/user/components/account-details-form";
import { HydrateClient, serverTrpc } from "@/lib/trpc/server";
import { assertAuthenticated } from "@/server/lucia/utils";
import { redirect } from "next/navigation";

export default async function AccountDetailsPage() {
  const user = await assertAuthenticated();

  const userRole = user.role;

  if (userRole === "admin") {
    return redirect("/dashboard");
  }

  await serverTrpc.auth.getCurrentUser.prefetch();

  return (
    <UserPageLayout title="Account Details">
      <HydrateClient>
        <AccountDetailsForm />
      </HydrateClient>
    </UserPageLayout>
  );
}
