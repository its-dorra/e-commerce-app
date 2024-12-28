import WishlistContainer from "@/lib/features/wishlist/components/wishlist-container";
import { assertAuthenticated } from "@/server/lucia/utils";
import { redirect } from "next/navigation";

export default async function WishListPage() {
  const user = await assertAuthenticated();

  const userRole = user.role;

  if (userRole === "admin") {
    return redirect("/dashboard");
  }

  return (
    <div className="flex h-full flex-col items-start gap-4">
      <h4 className="h4">Wishlist</h4>
      <WishlistContainer />
    </div>
  );
}
