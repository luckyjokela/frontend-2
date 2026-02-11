import { UserProvider } from "./components/UserProvider";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { NavTop } from './components/NavTop';
import SiteFooter from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
