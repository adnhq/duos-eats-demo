import HeroSection from "@/components/HeroSection";
import Restaurants from "@/components/Restaurants";
import Spinner from "@/components/Spinner";
import { Spline_Sans } from "next/font/google";
import { Suspense } from "react";
const splineSans = Spline_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export default async function Page() {
  return (
    <>
      <HeroSection />
      <div
        className={`max-w-7xl mx-auto text-foreground ${splineSans.className}`}
      >
        <Suspense fallback={<Spinner />}>
          <Restaurants />
        </Suspense>
      </div>
    </>
  );
}
