"use client";
import React, { useEffect, useRef, useState } from "react";
import RestaurantCard from "./RestaurantCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

const allRestaurants = [
  {
    id: 1,
    name: "Burger Bliss",
    cuisine: "American",
    rating: 4.6,
    priceLevel: 2,
    category: "Burger",
    location: "Banani",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 2,
    name: "Pizzeria Perfection",
    cuisine: "Italian",
    rating: 4.8,
    priceLevel: 3,
    category: "Pizza",
    location: "Banani",
    image:
      "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 3,
    name: "Sushi Symphony",
    cuisine: "Japanese",
    rating: 4.9,
    priceLevel: 4,
    category: "Sushi",
    location: "Banani",
    image:
      "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 4,
    name: "Taco Fiesta",
    cuisine: "Mexican",
    rating: 4.5,
    priceLevel: 2,
    category: "Tacos",
    location: "Banani",
    image:
      "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 5,
    name: "Pasta Paradise",
    cuisine: "Italian",
    rating: 4.7,
    priceLevel: 3,
    category: "Pasta",
    location: "Banani",
    image:
      "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 6,
    name: "Green Gourmet",
    cuisine: "Vegetarian",
    rating: 4.4,
    priceLevel: 2,
    category: "Vegetarian",
    location: "Banani",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 7,
    name: "Wok & Roll",
    cuisine: "Chinese",
    rating: 4.3,
    priceLevel: 2,
    category: "Chinese",
    location: "Banani",
    image:
      "https://images.unsplash.com/photo-1585032226651-759b368d7246?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 8,
    name: "Curry House",
    cuisine: "Indian",
    rating: 4.6,
    priceLevel: 3,
    category: "Indian",
    location: "Banani",
    image:
      "https://images.unsplash.com/photo-1585937421612-70a008356fbe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 9,
    name: "Mediterranean Oasis",
    cuisine: "Mediterranean",
    rating: 4.5,
    priceLevel: 3,
    category: "Mediterranean",
    location: "Banani",
    image:
      "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 10,
    name: "BBQ Bonanza",
    cuisine: "American",
    rating: 4.7,
    priceLevel: 3,
    category: "BBQ",
    location: "Banani",
    image:
      "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 11,
    name: "Pho-nomenal",
    cuisine: "Vietnamese",
    rating: 4.4,
    priceLevel: 2,
    category: "Vietnamese",
    location: "Banani",
    image:
      "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 12,
    name: "Sweet Tooth",
    cuisine: "Desserts",
    rating: 4.8,
    priceLevel: 2,
    category: "Desserts",
    location: "Banani",
    image:
      "https://images.unsplash.com/photo-1551024709-8f23befc6f87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
  },
];
const popularRestaurants = allRestaurants.slice(3, 11);

export default function PopularRestaurants() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [filteredRestaurants, setFilteredRestaurants] =
    useState(allRestaurants);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const filtered = allRestaurants.filter(
      (restaurant) =>
        restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedLocation === "all" || restaurant.location === selectedLocation)
    );
    setFilteredRestaurants(filtered);
    setCurrentPage(1);
  }, [searchTerm, selectedLocation]);

  useEffect(() => {
    const checkScroll = () => {
      if (scrollContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } =
          scrollContainerRef.current;
        setCanScrollLeft(scrollLeft > 0);
        setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
      }
    };

    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  return (
    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-4 sm:mb-6">
        Popular Restaurants
      </h2>
      <div className="relative">
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide space-x-4 sm:space-x-5"
          onScroll={handleScroll}
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {popularRestaurants.slice(2, 10).map((restaurant, index) => (
            <div
              key={index}
              className="snap-start shrink-0 w-52 sm:w-60 md:w-68 lg:w-76 pt-2 pb-4"
            >
              <RestaurantCard restaurant={restaurant} />
            </div>
          ))}
        </div>
        {canScrollLeft && (
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hidden sm:block"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
        )}
        {canScrollRight && (
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hidden sm:block"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        )}
      </div>
    </section>
  );
}
