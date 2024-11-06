"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Permanent_Marker } from "next/font/google";
import Link from "next/link";
import BackgroundSVG from "./BackgroundSVG";

const permanent_marker = Permanent_Marker({
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
    <div className="relative overflow-hidden pt-20 pb-40">
      {/* Enhanced Background illustration */}
      <BackgroundSVG />
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-gray-800 mb-6">
            Enhance Your Dine-In Experience With <br />
            <span
              className={`text-6xl md:text-7xl lg:text-8xl tracking-wide font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-red-500 ${permanent_marker.className}`}
            >
              Duos Eats
            </span>
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

      <div className="absolute bottom-0 left-0 right-0 flex justify-around">
        {["🍔", "🍕", "🍣", "🥗", "🍰"].map((emoji, index) => (
          <span
            key={index}
            className="text-4xl md:text-5xl lg:text-6xl opacity-20"
          >
            {emoji}
          </span>
        ))}
      </div>
    </div>
  );
}
