import type { Metadata, Viewport } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";
import { cafeName } from "@/data/menu";

const vazirmatn = Vazirmatn({ subsets: ["arabic"], display: "swap", variable: "--font-vazirmatn" });

export const metadata: Metadata = {
  title: cafeName,
  description: "منوی غذاها و نوشیدنی‌ها ",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fa" dir="rtl">
      <body className={vazirmatn.className}>
        {children}
      </body>
    </html>
  );
}
