import "./globals.css";
import { Inter } from "next/font/google";
import { ReactNode } from "react";
import UserProvider from "@/lib/providers/user-provider";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "react-hot-toast";
import Providers from "@/lib/providers/providers";

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
        <NextTopLoader showSpinner={false} />
        <Toaster
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
              backgroundColor: "#fff",
              color: "#374151",
            },
            position: "bottom-right",
          }}
        />

        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
