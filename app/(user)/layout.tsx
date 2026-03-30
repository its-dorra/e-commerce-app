import NavBar from "@/lib/components/Navbar";
import Footer from "@/lib/components/Footer";
import { ReactNode } from "react";

export default function UserLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <NavBar />
      <div className="flex-1 pb-16 pt-6 md:pt-8">{children}</div>
      <Footer />
    </div>
  );
}
