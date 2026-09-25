import "./globals.css";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import { ReactNode } from "react";
import UserProvider from "@/lib/providers/user-provider";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "react-hot-toast";
import Providers from "@/lib/providers/providers";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${cormorant.variable} ${montserrat.variable}`}
    >
      <body
        className={`${montserrat.className} flex items-center justify-center`}
      >
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
