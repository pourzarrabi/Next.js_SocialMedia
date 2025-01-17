import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ClerkProvider } from "@clerk/nextjs";

const rubik = Rubik({ subsets: ["arabic"] });

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
    <ClerkProvider>
      <html lang='fa'>
        <body className={`${rubik.className} bg-slate-100`}>
          <div className='w-full bg-white px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64'>
            <Navbar />
          </div>
          <div className='px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64'>
            {children}
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
