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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%2210 0 100 100%22><text y=%22.90em%22 font-size=%2290%22>💫</text></svg>"
        />
      </head>
      <body
        className={`${font.className} antialiased fixed top-0 left-0 w-screen min-h-screen`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
