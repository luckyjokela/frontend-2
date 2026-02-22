import { UserProvider } from "@/components/UserProvider";
import { Geist, Geist_Mono } from "next/font/google";
import "./css/globals.css";
import { NavTop } from '@/components/layout/NavTop';
import SiteFooter from "@/components/layout/Footer";
import { useEffect } from "react";
import { useUserStore } from "@/store/useUserStore";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

useEffect(() => {
  useUserStore.getState().hydrate();
}, []);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`} suppressHydrationWarning
      >
        <NavTop/>
        <UserProvider>{children}</UserProvider>
        <SiteFooter />
      </body>
    </html>
  );
}
