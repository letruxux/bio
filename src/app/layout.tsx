import type { Metadata } from "next";
import { Onest } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const font = Onest({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "letru",
  description: "thats me",
  openGraph: {
    title: "letru",
    description: "thats me",
    url: "https://letruxux.vercel.app",
    siteName: "letruxux",
    type: "website",
    images: ["https://i.imgur.com/BWwBzsj.png"],
  },
  icons: ["https://letruxux.vercel.app/wawa.png"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head />
      <body
        className={`${font.className} antialiased min-h-screen`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
