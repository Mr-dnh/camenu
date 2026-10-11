import type { Metadata, Viewport } from "next";
import "./globals.css";
import { cafeName } from "@/data/menu";

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
      <body>
        {children}
      </body>
    </html>
  );
}
