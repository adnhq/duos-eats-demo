"use client";

import { Button } from "@/components/ui/button";
import { Bebas_Neue } from "next/font/google";
import Link from "next/link";
import { useEffect } from "react";
import HeroBackgroundSVG from "./HeroBackgroundSVG";

const bebas_neue = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
});

export default function HeroSection() {
  useEffect(() => {
    const handleSmoothScroll = (e: MouseEvent) => {
      e.preventDefault();
      const href = (e.currentTarget as HTMLAnchorElement).getAttribute("href");
      if (href) {
        const targetId = href.replace(/.*\#/, "");
        const elem = document.getElementById(targetId);
        elem?.scrollIntoView({
          behavior: "smooth",
        });
      }
    };

    const orderButton = document.querySelector('a[href="#restaurants"]');
    orderButton?.addEventListener("click", handleSmoothScroll as EventListener);

    return () => {
      orderButton?.removeEventListener(
        "click",
        handleSmoothScroll as EventListener
      );
    };
  }, []);

  return (
    <div className="relative overflow-hidden pt-40 md:pb-52 pb-72">
      {/* Enhanced Background illustration */}
      <HeroBackgroundSVG />
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h1
            className={`text-4xl md:text-5xl tracking-wide lg:text-6xl font-semibold text-gray-800 mb-4 `}
          >
            Enhance Your Dine-In Experience With
          </h1>
          <h1
            className={`text-6xl md:text-7xl lg:text-8xl tracking-wide font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-red-500 ${bebas_neue.className}`}
          >
            Duos Eats
          </h1>
          <p className="text-base md:text-lg text-gray-600 mb-8 tracking-wide">
            Enjoy exclusive dine-in discounts and more at your favourite
            restaurants.
          </p>
          <Button
            asChild
            className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white hover:from-yellow-500 hover:to-orange-600 text-base py-6 px-8 rounded-lg shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
          >
            <Link href="#restaurants">Order Now</Link>
          </Button>
        </div>
      </div>

      <div className="absolute md:bottom-8 bottom-24 left-0 right-0 flex justify-around">
        {["🍔", "🍕", "🍣", "🥗", "🍰"].map((emoji, index) => (
          <span
            key={index}
            className="text-4xl md:text-5xl lg:text-6xl opacity-50"
          >
            {emoji}
          </span>
        ))}
      </div>
    </div>
  );
}
