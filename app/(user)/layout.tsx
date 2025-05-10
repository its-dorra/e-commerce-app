import NavBar from "@/lib/components/Navbar";
import Footer from "@/lib/components/Footer";
import { ReactNode } from "react";

export default function UserLayout({ children }: { children: ReactNode }) {
  return (
    <div className="grid min-h-screen w-screen grid-flow-row grid-rows-[auto_auto_1fr_auto] px-8 py-1 md:px-12 lg:px-16 xl:px-20">
      <NavBar />
      <div>{children}</div>
      <Footer />
    </div>
  );
}
