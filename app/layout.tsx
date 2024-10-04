import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster"
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";


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
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <main className="max-w-7xl mx-auto">
          <Navbar></Navbar>
          {children}
          <Toaster />
          <Footer></Footer>
        </main>
      </body>
    </html>
  );
}
