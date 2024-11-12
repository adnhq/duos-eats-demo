import HeroSection from "@/components/HeroSection";
import Restaurants from "@/components/Restaurants";
import Spinner from "@/components/Spinner";
import { Suspense } from "react";

export default async function Page() {
  return (
    <>
      <HeroSection />
      <main className={`max-w-7xl mx-auto text-foreground`}>
        <Suspense fallback={<Spinner />}>
          <Restaurants />
        </Suspense>
      </main>
    </>
  );
}
