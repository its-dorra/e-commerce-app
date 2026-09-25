import NavBar from "@/lib/components/Navbar";
import Footer from "@/lib/components/Footer";
import { ReactNode, Suspense } from "react";
import { getCurrentUser } from "@/lib/auth";
import { getCartItems } from "@/server/data-access/cart";
import { getCategories } from "@/server/data-access/products";

async function NavWithCart({
  categories,
}: {
  categories: { id?: string; name: string }[];
}) {
  const user = await getCurrentUser();
  const cart = user ? await getCartItems(user.id) : null;
  return <NavBar cart={cart} categories={categories} />;
}

export default async function UserLayout({
  children,
}: {
  children: ReactNode;
}) {
  const categories = await getCategories();

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Suspense fallback={<NavBar categories={categories} />}>
        <NavWithCart categories={categories} />
      </Suspense>
      <div className="flex-1 pb-16 pt-6 md:pt-8">{children}</div>
      <Footer />
    </div>
  );
}
