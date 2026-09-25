import UserPageLayout from "@/lib/components/UserPageLayout";
import AccountDetailsForm from "@/lib/features/user/components/account-details-form";
import { assertAuthenticated } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { AccountDetailsSkeleton } from "@/lib/components/skeletons/account-skeletons";

export const prefetch = "partial";

async function AccountDetailsContent() {
  const user = await assertAuthenticated();

  if (user.role === "admin") {
    return redirect("/dashboard");
  }

  return <AccountDetailsForm userDetails={user} />;
}

export default function AccountDetailsPage() {
  return (
    <UserPageLayout title="Account Details">
      <Suspense fallback={<AccountDetailsSkeleton />}>
        <AccountDetailsContent />
      </Suspense>
    </UserPageLayout>
  );
}
