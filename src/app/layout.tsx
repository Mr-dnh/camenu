import type { Metadata, Viewport } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "کافه",
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
