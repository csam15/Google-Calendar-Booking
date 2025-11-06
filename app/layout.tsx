import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";

const roboto = Roboto({
  variable: "--font-roboto-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: siteConfig.siteName,
  description: siteConfig.siteDescription,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.variable} antialiased font-roboto`}
      >
        {children}
      </body>
    </html>
  );
}
