'use client'

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function HeroSection() {
  return (
    <div className="relative overflow-hidden pt-20 pb-40">
      {/* Background illustration */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern
            id="grid"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M0 40L40 0M0 0L40 40"
              stroke="rgba(245, 158, 11, 0.1)"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        <circle cx="500" cy="500" r="400" fill="rgba(245, 158, 11, 0.05)" />
        <circle cx="500" cy="500" r="300" fill="rgba(245, 158, 11, 0.05)" />
        <circle cx="500" cy="500" r="200" fill="rgba(245, 158, 11, 0.05)" />
      </svg>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-medium text-gray-800 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Save on every order with <br></br>
            <span className="text-5xl md:text-6xl lg:text-7xl tracking-wide font-semibold text-gray-900">Duos Eats</span>
          </motion.h1>
          <motion.p
            className="text-lg text-gray-600 mb-8"
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
            <Button className="bg-amber-500 text-white hover:bg-amber-600 text-lg py-6 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1">
              Order Now
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Decorative food icons */}
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
  )
}