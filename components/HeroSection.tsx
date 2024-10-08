'use client'

import React from 'react';
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Permanent_Marker } from "next/font/google";

const permanent_marker = Permanent_Marker({ subsets: ["latin"], weight: ["400"] });

export default function HeroSection() {
  return (
    <div className="relative overflow-hidden pt-20 pb-40">
      {/* Enhanced Background illustration */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(245, 158, 11, 0.1)" />
            <stop offset="100%" stopColor="rgba(249, 115, 22, 0.1)" />
          </linearGradient>
          <pattern
            id="grid"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M0 40L40 0M0 0L40 40"
              stroke="url(#grad1)"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        <circle cx="500" cy="500" r="400" fill="rgba(245, 158, 11, 0.05)" />
        <circle cx="500" cy="500" r="300" fill="rgba(249, 115, 22, 0.05)" />
        <circle cx="500" cy="500" r="200" fill="rgba(253, 186, 116, 0.05)" />
      </svg>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-semibold text-gray-800 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Save on every order with <br />
            <span className={`text-6xl md:text-7xl lg:text-8xl tracking-wide font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-red-500 ${permanent_marker.className}`}>
              Duos Eats
            </span>
          </motion.h1>
          <motion.p
            className="text-xl text-gray-600 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Enjoy exclusive discounts and more at your favorite restaurants.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white hover:from-yellow-500 hover:to-orange-600 text-lg py-6 px-8 rounded-lg shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
              Order Now
            </Button>
          </motion.div>
        </div>
      </div>


      <motion.div
        className="absolute bottom-0 left-0 right-0 flex justify-around"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
      >
        {['🍔', '🍕', '🍣', '🥗', '🍰'].map((emoji, index) => (
          <span key={index} className="text-4xl md:text-5xl lg:text-6xl opacity-20">
            {emoji}
          </span>
        ))}
      </motion.div>
    </div>
  );
}