import Cart from "@/components/Cart";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import StoreProvider from "./StoreProvider";

const man_rope = Manrope({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Duos Eats",
  description: "Bringing you the best dine-in deals in town!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <html lang="en">
        <body className={`${man_rope.className} antialiased`}>
          <Navbar />
          {children}
          <Toaster />
          <Footer />
          <Cart />
        </body>
      </html>
    </StoreProvider>
  );
}
