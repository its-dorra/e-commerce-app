import UserPageLayout from "@/lib/components/UserPageLayout";
import AddressForm from "@/lib/features/address/components/address-form";

import { HydrateClient, serverTrpc } from "@/lib/trpc/server";
import { assertAuthenticated } from "@/server/lucia/utils";

import { redirect } from "next/navigation";

export default async function AddressPage() {
  const user = await assertAuthenticated();

  const userRole = user.role;

  if (userRole === "admin") {
    return redirect("/dashboard");
  }

  await serverTrpc.address.getUserAddress.prefetch();

  return (
    <UserPageLayout title="Shipping address">
      <HydrateClient>
        <AddressForm />
      </HydrateClient>
    </UserPageLayout>
  );
}
