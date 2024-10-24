import type { Metadata } from "next";
import { Gulzar } from "next/font/google";
import "./globals.css";

const gulzar = Gulzar({ subsets: ["arabic"], weight: ["400"] });

export const metadata: Metadata = {
  title: "رسانه اجتماعی یکتا",
  description: "بهترین شبکه اجتماعی ایران",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='fa' dir='rtl'>
      <body className={gulzar.className}>{children}</body>
    </html>
  );
}
