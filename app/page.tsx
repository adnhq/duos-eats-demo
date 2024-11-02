import Cart from "@/components/Cart";
import HeroSection from "@/components/HeroSection";
import Restaurants from "@/components/Restaurants";
import { Spline_Sans } from "next/font/google";
const splineSans = Spline_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export default function Page() {
  return (
    <div className={`min-h-screen text-foreground ${splineSans.className}`}>
      <HeroSection />
      <Restaurants />
      <Cart />
    </div>
  );
}
