import NavBar from "@/lib/components/Navbar";
import "./globals.css";
import { Inter } from "next/font/google";
import Footer from "@/lib/components/Footer";

const inter = Inter({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex items-center justify-center`}>
        <div className="container grid min-h-screen grid-rows-[auto_1fr_auto]">
          <NavBar />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
