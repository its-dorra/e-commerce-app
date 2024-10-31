import NavBar from "@/lib/components/Navbar";
import "./globals.css";
import { Inter } from "next/font/google";
import Footer from "@/lib/components/Footer";
import ReactQueryClientProvider from "@/lib/providers/query-client";

const inter = Inter({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactQueryClientProvider>
      <html lang="en">
        <body className={`${inter.className} flex items-center justify-center`}>
          <div className="grid min-h-screen w-screen grid-rows-[auto_1fr_auto] px-8 py-1 md:px-12 lg:px-16 xl:px-20">
            <NavBar />
            {children}
            <Footer />
          </div>
        </body>
      </html>
    </ReactQueryClientProvider>
  );
}
