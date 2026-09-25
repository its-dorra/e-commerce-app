import UserPageLayout from "@/lib/components/UserPageLayout";
import WishlistContainer from "@/lib/features/wishlist/components/wishlist-container";
import { assertAuthenticated } from "@/lib/auth";
import { getAllwishlistItems } from "@/server/data-access/wishlist";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { WishlistSkeleton } from "@/lib/components/skeletons/account-skeletons";

async function WishlistContent() {
  const user = await assertAuthenticated();

  if (user.role === "admin") {
    return redirect("/dashboard");
  }

  const items = await getAllwishlistItems({ userId: user.id });

  return <WishlistContainer items={items} />;
}

export default function WishListPage() {
  return (
    <UserPageLayout title="Wishlist">
      <Suspense fallback={<WishlistSkeleton />}>
        <WishlistContent />
      </Suspense>
    </UserPageLayout>
  );
}
