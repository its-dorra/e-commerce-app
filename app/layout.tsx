import NavBar from "@/lib/components/Navbar";
import "./globals.css";
import { Inter } from "next/font/google";
import Footer from "@/lib/components/Footer";
import { ReactNode } from "react";
import UserProvider from "@/lib/providers/user-provider";

const inter = Inter({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex items-center justify-center`}>
        <UserProvider>{children}</UserProvider>
      </body>
    </html>
  );
}
