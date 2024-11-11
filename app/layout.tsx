import Cart from "@/components/Cart";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StoreProvider from "./StoreProvider";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
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
        <body className={`${inter.className} antialiased`}>
          <Navbar />
          {children}
          <Toaster />
          <Footer />
          <Cart />
          {/* new design with new layout */}
        </body>
      </html>
    </StoreProvider>
  );
}
