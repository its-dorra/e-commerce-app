import UserPageLayout from "@/lib/components/UserPageLayout";
import WishlistContainer from "@/lib/features/wishlist/components/wishlist-container";
import { HydrateClient, serverTrpc } from "@/lib/trpc/server";

import { assertAuthenticated } from "@/server/lucia/utils";

import { redirect } from "next/navigation";

export default async function WishListPage() {
  const user = await assertAuthenticated();

  const userRole = user.role;

  if (userRole === "admin") {
    return redirect("/dashboard");
  }

  await serverTrpc.wishlists.getWishlistItems.prefetch();

  return (
    <UserPageLayout title="Wishlist">
      <HydrateClient>
        <WishlistContainer />
      </HydrateClient>
    </UserPageLayout>
  );
}
