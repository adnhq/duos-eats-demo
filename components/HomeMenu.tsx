"use client";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import CategoryCard from "./CategoryCard";
import RestaurantCard from "./RestaurantCard";
import Cart from "./Cart";

const categories = [
  {
    name: "Burger",
    image:
      "https://images.unsplash.com/photo-1655673653795-f608f4b9dced?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Burger",
    image:
      "https://images.unsplash.com/photo-1655673653795-f608f4b9dced?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Burger",
    image:
      "https://images.unsplash.com/photo-1655673653795-f608f4b9dced?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Burger",
    image:
      "https://images.unsplash.com/photo-1655673653795-f608f4b9dced?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Burger",
    image:
      "https://images.unsplash.com/photo-1655673653795-f608f4b9dced?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Burger",
    image:
      "https://images.unsplash.com/photo-1655673653795-f608f4b9dced?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Pizza",
    image:
      "https://images.unsplash.com/photo-1655673653795-f608f4b9dced?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Pasta",
    image:
      "https://images.unsplash.com/photo-1655673653795-f608f4b9dced?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Rice",
    image:
      "https://images.unsplash.com/photo-1655673653795-f608f4b9dced?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Noodles",
    image:
      "https://images.unsplash.com/photo-1655673653795-f608f4b9dced?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Dessert",
    image:
      "https://images.unsplash.com/photo-1655673653795-f608f4b9dced?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Drinks",
    image:
      "https://images.unsplash.com/photo-1655673653795-f608f4b9dced?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const popularRestaurants = [
  {
    id: 1,
    name: "Burger Palace",
    cuisine: "American",
    rating: 4.5,
    deliveryTime: "20-30 min",
    category: "Burger",
    image:
      "https://www.southernliving.com/thmb/3x3cJaiOvQ8-3YxtMQX0vvh1hQw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/2652401_QFSSL_SupremePizza_00072-d910a935ba7d448e8c7545a963ed7101.jpg",
  },
  {
    id: 2,
    name: "Pizza Heaven",
    cuisine: "Italian",
    rating: 4.7,
    deliveryTime: "25-35 min",
    category: "Burger",
    image:
      "https://www.southernliving.com/thmb/3x3cJaiOvQ8-3YxtMQX0vvh1hQw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/2652401_QFSSL_SupremePizza_00072-d910a935ba7d448e8c7545a963ed7101.jpg",
  },
  {
    id: 3,
    name: "Pasta Paradise",
    cuisine: "Italian",
    rating: 4.3,
    deliveryTime: "30-40 min",
    category: "Burger",
    image:
      "https://www.southernliving.com/thmb/3x3cJaiOvQ8-3YxtMQX0vvh1hQw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/2652401_QFSSL_SupremePizza_00072-d910a935ba7d448e8c7545a963ed7101.jpg",
  },
  {
    id: 4,
    name: "Sushi Sensation",
    cuisine: "Japanese",
    rating: 4.8,
    deliveryTime: "35-45 min",
    category: "Burger",
    image:
      "https://www.southernliving.com/thmb/3x3cJaiOvQ8-3YxtMQX0vvh1hQw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/2652401_QFSSL_SupremePizza_00072-d910a935ba7d448e8c7545a963ed7101.jpg",
  },
];

const allRestaurants = [
  {
    id: 1,
    name: "Burger Palace",
    cuisine: "American",
    rating: 4.5,
    deliveryTime: "20-30 min",
    category: "Burger",
    image:
      "https://www.southernliving.com/thmb/3x3cJaiOvQ8-3YxtMQX0vvh1hQw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/2652401_QFSSL_SupremePizza_00072-d910a935ba7d448e8c7545a963ed7101.jpg",
  },
  {
    id: 2,
    name: "Pizza Heaven",
    cuisine: "Italian",
    rating: 4.7,
    deliveryTime: "25-35 min",
    category: "Burger",
    image:
      "https://www.southernliving.com/thmb/3x3cJaiOvQ8-3YxtMQX0vvh1hQw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/2652401_QFSSL_SupremePizza_00072-d910a935ba7d448e8c7545a963ed7101.jpg",
  },
  {
    id: 3,
    name: "Pasta Paradise",
    cuisine: "Italian",
    rating: 4.3,
    deliveryTime: "30-40 min",
    category: "Burger",
    image:
      "https://www.southernliving.com/thmb/3x3cJaiOvQ8-3YxtMQX0vvh1hQw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/2652401_QFSSL_SupremePizza_00072-d910a935ba7d448e8c7545a963ed7101.jpg",
  },
  {
    id: 4,
    name: "Sushi Sensation",
    cuisine: "Japanese",
    rating: 4.8,
    deliveryTime: "35-45 min",
    category: "Burger",
    image:
      "https://www.southernliving.com/thmb/3x3cJaiOvQ8-3YxtMQX0vvh1hQw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/2652401_QFSSL_SupremePizza_00072-d910a935ba7d448e8c7545a963ed7101.jpg",
  },
  {
    id: 5,
    name: "Taco Town",
    cuisine: "Mexican",
    rating: 4.2,
    deliveryTime: "20-30 min",
    category: "Burger",
    image:
      "https://www.southernliving.com/thmb/3x3cJaiOvQ8-3YxtMQX0vvh1hQw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/2652401_QFSSL_SupremePizza_00072-d910a935ba7d448e8c7545a963ed7101.jpg",
  },
  {
    id: 6,
    name: "Curry House",
    cuisine: "Indian",
    rating: 4.6,
    deliveryTime: "30-40 min",
    category: "Burger",
    image:
      "https://www.southernliving.com/thmb/3x3cJaiOvQ8-3YxtMQX0vvh1hQw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/2652401_QFSSL_SupremePizza_00072-d910a935ba7d448e8c7545a963ed7101.jpg",
  },
  {
    id: 7,
    name: "Noodle Nook",
    cuisine: "Chinese",
    rating: 4.4,
    deliveryTime: "25-35 min",
    category: "Burger",
    image:
      "https://www.southernliving.com/thmb/3x3cJaiOvQ8-3YxtMQX0vvh1hQw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/2652401_QFSSL_SupremePizza_00072-d910a935ba7d448e8c7545a963ed7101.jpg",
  },
  {
    id: 8,
    name: "Falafel Factory",
    cuisine: "Middle Eastern",
    rating: 4.1,
    deliveryTime: "20-30 min",
    category: "Burger",
    image:
      "https://www.southernliving.com/thmb/3x3cJaiOvQ8-3YxtMQX0vvh1hQw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/2652401_QFSSL_SupremePizza_00072-d910a935ba7d448e8c7545a963ed7101.jpg",
  },
  {
    id: 9,
    name: "Steak House",
    cuisine: "American",
    rating: 4.9,
    deliveryTime: "35-45 min",
    category: "Burger",
    image:
      "https://www.southernliving.com/thmb/3x3cJaiOvQ8-3YxtMQX0vvh1hQw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/2652401_QFSSL_SupremePizza_00072-d910a935ba7d448e8c7545a963ed7101.jpg",
  },
  {
    id: 10,
    name: "Veggie Delight",
    cuisine: "Vegetarian",
    rating: 4.3,
    deliveryTime: "25-35 min",
    category: "Burger",
    image:
      "https://www.southernliving.com/thmb/3x3cJaiOvQ8-3YxtMQX0vvh1hQw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/2652401_QFSSL_SupremePizza_00072-d910a935ba7d448e8c7545a963ed7101.jpg",
  },
  {
    id: 11,
    name: "Seafood Shack",
    cuisine: "Seafood",
    rating: 4.6,
    deliveryTime: "30-40 min",
    category: "Burger",
    image:
      "https://www.southernliving.com/thmb/3x3cJaiOvQ8-3YxtMQX0vvh1hQw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/2652401_QFSSL_SupremePizza_00072-d910a935ba7d448e8c7545a963ed7101.jpg",
  },
  {
    id: 12,
    name: "Dim Sum Diner",
    cuisine: "Chinese",
    rating: 4.5,
    deliveryTime: "25-35 min",
    category: "Burger",
    image:
      "https://www.southernliving.com/thmb/3x3cJaiOvQ8-3YxtMQX0vvh1hQw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/2652401_QFSSL_SupremePizza_00072-d910a935ba7d448e8c7545a963ed7101.jpg",
  },
  {
    id: 13,
    name: "BBQ Barn",
    cuisine: "American",
    rating: 4.7,
    deliveryTime: "30-40 min",
    category: "Burger",
    image:
      "https://www.southernliving.com/thmb/3x3cJaiOvQ8-3YxtMQX0vvh1hQw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/2652401_QFSSL_SupremePizza_00072-d910a935ba7d448e8c7545a963ed7101.jpg",
  },
  {
    id: 14,
    name: "Pho Palace",
    cuisine: "Vietnamese",
    rating: 4.4,
    deliveryTime: "20-30 min",
    category: "Burger",
    image:
      "https://www.southernliving.com/thmb/3x3cJaiOvQ8-3YxtMQX0vvh1hQw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/2652401_QFSSL_SupremePizza_00072-d910a935ba7d448e8c7545a963ed7101.jpg",
  },
  {
    id: 15,
    name: "Greek Taverna",
    cuisine: "Greek",
    rating: 4.2,
    deliveryTime: "25-35 min",
    category: "Burger",
    image:
      "https://www.southernliving.com/thmb/3x3cJaiOvQ8-3YxtMQX0vvh1hQw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/2652401_QFSSL_SupremePizza_00072-d910a935ba7d448e8c7545a963ed7101.jpg",
  },
  {
    id: 16,
    name: "Burrito Bonanza",
    cuisine: "Mexican",
    rating: 4.3,
    deliveryTime: "20-30 min",
    category: "Burger",
    image:
      "https://www.southernliving.com/thmb/3x3cJaiOvQ8-3YxtMQX0vvh1hQw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/2652401_QFSSL_SupremePizza_00072-d910a935ba7d448e8c7545a963ed7101.jpg",
  },
  {
    id: 17,
    name: "Sushi Spot",
    cuisine: "Japanese",
    rating: 4.8,
    deliveryTime: "30-40 min",
    category: "Burger",
    image:
      "https://www.southernliving.com/thmb/3x3cJaiOvQ8-3YxtMQX0vvh1hQw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/2652401_QFSSL_SupremePizza_00072-d910a935ba7d448e8c7545a963ed7101.jpg",
  },
  {
    id: 18,
    name: "Tandoori Treats",
    cuisine: "Indian",
    rating: 4.5,
    deliveryTime: "25-35 min",
    category: "Burger",
    image:
      "https://www.southernliving.com/thmb/3x3cJaiOvQ8-3YxtMQX0vvh1hQw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/2652401_QFSSL_SupremePizza_00072-d910a935ba7d448e8c7545a963ed7101.jpg",
  },
  {
    id: 19,
    name: "Pasta Perfection",
    cuisine: "Italian",
    rating: 4.6,
    deliveryTime: "25-35 min",
    category: "Burger",
    image:
      "https://www.southernliving.com/thmb/3x3cJaiOvQ8-3YxtMQX0vvh1hQw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/2652401_QFSSL_SupremePizza_00072-d910a935ba7d448e8c7545a963ed7101.jpg",
  },
  {
    id: 20,
    name: "Wok & Roll",
    cuisine: "Chinese",
    rating: 4.2,
    deliveryTime: "20-30 min",
    category: "Burger",
    image:
      "https://www.southernliving.com/thmb/3x3cJaiOvQ8-3YxtMQX0vvh1hQw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/2652401_QFSSL_SupremePizza_00072-d910a935ba7d448e8c7545a963ed7101.jpg",
  },
  {
    id: 21,
    name: "Falafel Feast",
    cuisine: "Middle Eastern",
    rating: 4.4,
    deliveryTime: "25-35 min",
    category: "Burger",
    image:
      "https://www.southernliving.com/thmb/3x3cJaiOvQ8-3YxtMQX0vvh1hQw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/2652401_QFSSL_SupremePizza_00072-d910a935ba7d448e8c7545a963ed7101.jpg",
  },
  {
    id: 22,
    name: "Taco Fiesta",
    cuisine: "Mexican",
    rating: 4.3,
    deliveryTime: "20-30 min",
    category: "Burger",
    image:
      "https://www.southernliving.com/thmb/3x3cJaiOvQ8-3YxtMQX0vvh1hQw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/2652401_QFSSL_SupremePizza_00072-d910a935ba7d448e8c7545a963ed7101.jpg",
  },
  {
    id: 23,
    name: "Curry Corner",
    cuisine: "Indian",
    rating: 4.7,
    deliveryTime: "30-40 min",
    category: "Burger",
    image:
      "https://www.southernliving.com/thmb/3x3cJaiOvQ8-3YxtMQX0vvh1hQw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/2652401_QFSSL_SupremePizza_00072-d910a935ba7d448e8c7545a963ed7101.jpg",
  },
  {
    id: 24,
    name: "Sizzling Steaks",
    cuisine: "American",
    rating: 4.8,
    deliveryTime: "35-45 min",
    category: "Burger",
    image:
      "https://www.southernliving.com/thmb/3x3cJaiOvQ8-3YxtMQX0vvh1hQw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/2652401_QFSSL_SupremePizza_00072-d910a935ba7d448e8c7545a963ed7101.jpg",
  },
  {
    id: 25,
    name: "Vegan Vibes",
    cuisine: "Vegan",
    rating: 4.1,
    deliveryTime: "25-35 min",
    category: "Burger",
    image:
      "https://www.southernliving.com/thmb/3x3cJaiOvQ8-3YxtMQX0vvh1hQw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/2652401_QFSSL_SupremePizza_00072-d910a935ba7d448e8c7545a963ed7101.jpg",
  },
  {
    id: 26,
    name: "Ramen Retreat",
    cuisine: "Japanese",
    rating: 4.6,
    deliveryTime: "25-35 min",
    category: "Burger",
    image:
      "https://www.southernliving.com/thmb/3x3cJaiOvQ8-3YxtMQX0vvh1hQw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/2652401_QFSSL_SupremePizza_00072-d910a935ba7d448e8c7545a963ed7101.jpg",
  },
  {
    id: 27,
    name: "Mediterranean Meze",
    cuisine: "Mediterranean",
    rating: 4.5,
    deliveryTime: "30-40 min",
    category: "Burger",
    image:
      "https://www.southernliving.com/thmb/3x3cJaiOvQ8-3YxtMQX0vvh1hQw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/2652401_QFSSL_SupremePizza_00072-d910a935ba7d448e8c7545a963ed7101.jpg",
  },
  {
    id: 28,
    name: "Deli Delights",
    cuisine: "American",
    rating: 4.2,
    deliveryTime: "15-25 min",
    category: "Burger",
    image:
      "https://www.southernliving.com/thmb/3x3cJaiOvQ8-3YxtMQX0vvh1hQw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/2652401_QFSSL_SupremePizza_00072-d910a935ba7d448e8c7545a963ed7101.jpg",
  },
  {
    id: 29,
    name: "Thai Spice",
    cuisine: "Thai",
    rating: 4.7,
    deliveryTime: "25-35 min",
    category: "Burger",
    image:
      "https://www.southernliving.com/thmb/3x3cJaiOvQ8-3YxtMQX0vvh1hQw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/2652401_QFSSL_SupremePizza_00072-d910a935ba7d448e8c7545a963ed7101.jpg",
  },
  {
    id: 30,
    name: "Kebab King",
    cuisine: "Middle Eastern",
    rating: 4.4,
    deliveryTime: "20-30 min",
    category: "Burger",
    image:
      "https://www.southernliving.com/thmb/3x3cJaiOvQ8-3YxtMQX0vvh1hQw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/2652401_QFSSL_SupremePizza_00072-d910a935ba7d448e8c7545a963ed7101.jpg",
  },
  {
    id: 31,
    name: "Sizzling Szechuan",
    cuisine: "Chinese",
    rating: 4.6,
    deliveryTime: "25-35 min",
    category: "Burger",
    image:
      "https://www.southernliving.com/thmb/3x3cJaiOvQ8-3YxtMQX0vvh1hQw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/2652401_QFSSL_SupremePizza_00072-d910a935ba7d448e8c7545a963ed7101.jpg",
  },
  {
    id: 32,
    name: "Gelato Garden",
    cuisine: "Dessert",
    rating: 4.9,
    deliveryTime: "15-25 min",
    category: "Burger",
    image:
      "https://www.southernliving.com/thmb/3x3cJaiOvQ8-3YxtMQX0vvh1hQw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/2652401_QFSSL_SupremePizza_00072-d910a935ba7d448e8c7545a963ed7101.jpg",
  },
];

export default function HomePage() {
  const [currentPage, setCurrentPage] = useState(1);
  const restaurantsPerPage = 8;
  const totalPages = Math.ceil(allRestaurants.length / restaurantsPerPage);

  const handlePageChange = (newPage: number): void => {
    setCurrentPage(newPage);
  };

  const paginatedRestaurants = allRestaurants.slice(
    (currentPage - 1) * restaurantsPerPage,
    currentPage * restaurantsPerPage
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Food Ordering App</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Categories</h2>
        <ScrollArea className="w-full whitespace-nowrap rounded-md">
          <div className="grid grid-cols-12 gap-4">
            {categories.map((category) => (
              <CategoryCard key={category.name} category={category} />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Popular Restaurants</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {popularRestaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">All Restaurants</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {paginatedRestaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
        <div className="flex justify-center items-center mt-8">
          <Button
            variant="outline"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>
          <span className="mx-4">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </section>

      <Cart />
    </div>
  );
}
