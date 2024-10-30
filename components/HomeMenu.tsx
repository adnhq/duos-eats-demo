import { Spline_Sans } from "next/font/google";
import HeroSection from "./HeroSection";
import Restaurants from "./Restaurants";
import Cart from "./Cart";

const splineSans = Spline_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export default function HomePage() {
  return (
    <div
      className={`bg-background min-h-screen text-foreground ${splineSans.className}`}
    >
      <HeroSection />
      <Restaurants />
      <Cart />
    </div>
  );
}
