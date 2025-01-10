import type { Metadata } from "next";
import { Onest } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const font = Onest({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "me",
  description: "thats me",
  openGraph: {
    title: "me",
    description: "thats me",
    url: "https://letruxux.vercel.app",
    siteName: "letruxux",
    type: "website",
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
        className={`${font.className} antialiased fixed top-0 left-0 w-screen min-h-screen`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
