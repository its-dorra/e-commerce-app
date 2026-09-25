import UserPageLayout from "@/lib/components/UserPageLayout";
import AddressForm from "@/lib/features/address/components/address-form";
import { assertAuthenticated } from "@/lib/auth";
import { getUserAddress } from "@/server/data-access/address";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { AddressSkeleton } from "@/lib/components/skeletons/account-skeletons";

export const prefetch = "partial";

async function AddressContent() {
  const user = await assertAuthenticated();

  if (user.role === "admin") {
    return redirect("/dashboard");
  }

  const address = await getUserAddress({ userId: user.id });

  return <AddressForm address={address} />;
}

export default function AddressPage() {
  return (
    <UserPageLayout title="Shipping address">
      <Suspense fallback={<AddressSkeleton />}>
        <AddressContent />
      </Suspense>
    </UserPageLayout>
  );
}
