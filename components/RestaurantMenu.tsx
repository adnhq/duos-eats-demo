// pages/RestaurantMenu.tsx

"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShoppingBag, Instagram, Search } from "lucide-react";
import MenuHeader from "@/components/MenuHeader";

import MenuCategory from "@/components/MenuCategory";
import CartItem from "@/components/CartItem";
import {
  RestaurantData,
  CartItem as CartItemType,
  MenuItem,
} from "@/lib/types";
import RestaurantDeals from "./RestaurantDeals";
import { Spline_Sans } from "next/font/google";

const splineSans = Spline_Sans({ subsets: ["latin"], weight: ["400", "600", "700"] });

// Note: You would typically fetch this data from an API
const restaurantData: RestaurantData = {
  name: "The Tehari Ghor - Banani",
  image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=2070&auto=format&fit=crop",
  category: "Bengali Cuisine",
  rating: 4.7,
  reviews: 176,
  minOrder: 50,
  instagramVideo: "https://www.instagram.com/reel/AbCdEfGhIjK/",
  deals: [
    {
      type: "DUO",
      discount: "10% off",
      description: "Special discount for dine-in orders through our platform",
    },
  ],
  menu: {
    Popular: [
      {
        id: 1,
        name: "Beef Tehari",
        price: 141,
        originalPrice: 160,
        description: "Flavorful rice dish prepared with beef cubes, rice & aromatic spices",
        image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=2072&auto=format&fit=crop",
      },
      {
        id: 2,
        name: "Morog Polao",
        price: 158,
        originalPrice: 180,
        description: "Full- Tender chicken mixed with flavor-ful deshi masalas & aromatic rice",
        image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?q=80&w=2070&auto=format&fit=crop",
      },
      {
        id: 4,
        name: "Vegetable Fried Rice",
        price: 120,
        description: "Rice stir-fried with mixed vegetables",
        image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?q=80&w=2025&auto=format&fit=crop",
      },
      {
        id: 7,
        name: "Biryani",
        price: 180,
        description: "Aromatic rice dish with tender meat and spices",
        image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=2070&auto=format&fit=crop",
      }
    ],
    Rice: [
      {
        id: 3,
        name: "Plain Rice",
        price: 40,
        description: "Steamed white rice",
        image: "https://images.unsplash.com/photo-1516684732162-798a0062be99?q=80&w=2070&auto=format&fit=crop",
      },
      {
        id: 4,
        name: "Vegetable Fried Rice",
        price: 120,
        description: "Rice stir-fried with mixed vegetables",
        image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?q=80&w=2025&auto=format&fit=crop",
      },
      {
        id: 7,
        name: "Biryani",
        price: 180,
        description: "Aromatic rice dish with tender meat and spices",
        image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=2070&auto=format&fit=crop",
      },
    ],
    Beverage: [
      {
        id: 5,
        name: "Coca Cola",
        price: 40,
        description: "330ml can",
        image: "https://images.unsplash.com/photo-1629203851288-7ececa5f05c4?q=80&w=2072&auto=format&fit=crop",
      },
      {
        id: 6,
        name: "Mineral Water",
        price: 25,
        description: "500ml bottle",
        image: "https://images.unsplash.com/photo-1560023907-5f335c9cd15f?q=80&w=2070&auto=format&fit=crop",
      },
      {
        id: 8,
        name: "Mango Lassi",
        price: 60,
        description: "Refreshing yogurt-based drink with mango",
        image: "https://images.unsplash.com/photo-1624781748172-7151704a42b3?q=80&w=2070&auto=format&fit=crop",
      },
    ],
  },
};

export default function RestaurantMenu() {
  const [cart, setCart] = useState<CartItemType[]>([]);

  const handleAddToCart = (item: MenuItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  const handleUpdateQuantity = (id: number, change: number) => {
    setCart((prevCart) => {
      return prevCart.reduce((newCart, item) => {
        if (item.id === id) {
          const newQuantity = item.quantity + change;
          return newQuantity > 0
            ? [...newCart, { ...item, quantity: newQuantity }]
            : newCart;
        }
        return [...newCart, item];
      }, [] as CartItemType[]);
    });
  };

  const handleRemoveItem = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="container mx-auto p-8">
      <div className="mb-8">
        <div className="relative h-64 w-full overflow-hidden rounded-xl mb-6">
          <Image
            src={restaurantData.image}
            alt={restaurantData.name}
            layout="fill"
            objectFit="cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6 text-white">
            <h1 className={`text-4xl font-semibold mb-2 ${splineSans.className}`}>{restaurantData.name}</h1>
            <p className="text-lg opacity-90 mb-2">{restaurantData.category}</p>
            <div className="flex items-center">
              <span className="text-yellow-400 mr-1">★</span>
              <span className="font-semibold">{restaurantData.rating}</span>
              <span className="mx-2">•</span>
              <span>{restaurantData.reviews} reviews</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-between items-center gap-4">
          <div className="flex-grow">
            <RestaurantDeals deals={restaurantData.deals} />
          </div>
          <Link href={restaurantData.instagramVideo} target="_blank" rel="noopener noreferrer">
            <Button variant="secondary" size="lg" className="flex items-center gap-2 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105">
              <Instagram className="h-5 w-5" />
              Watch on Instagram
            </Button>
          </Link>
        </div>
      </div>

      <div className="mb-6 relative">
        <Input 
          type="text" 
          placeholder="Search in menu" 
          className="w-full pl-10 shadow-sm transition-shadow duration-300 hover:shadow-md focus:shadow-md" 
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
      </div>

      <Tabs defaultValue="Popular" className="mb-6">
        <TabsList className="mb-4">
          {Object.keys(restaurantData.menu).map((category) => (
            <TabsTrigger 
              key={category} 
              value={category}
            >
              {category} ({restaurantData.menu[category].length})
            </TabsTrigger>
          ))}
        </TabsList>
        <ScrollArea className="h-[calc(100vh-400px)] w-full rounded-md border p-4">
          {Object.entries(restaurantData.menu).map(([category, items]) => (
            <TabsContent key={category} value={category}>
              <MenuCategory
                category={category}
                items={items}
                onAddToCart={handleAddToCart}
              />
            </TabsContent>
          ))}
        </ScrollArea>
      </Tabs>

      <Sheet>
        <SheetTrigger asChild>
          <Button className="fixed bottom-4 right-4 rounded-full w-16 h-16 transition-all duration-300  hover:scale-105">
            <ShoppingBag className="h-6 w-6" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm">
                {totalItems}
              </span>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent className="w-full sm:max-w-md flex flex-col">
          <SheetHeader>
            <SheetTitle>Your Cart</SheetTitle>
          </SheetHeader>
          <ScrollArea className="flex-grow">
            {cart.length === 0 ? (
              <p className="text-center text-muted-foreground mt-4">
                Your cart is empty.
              </p>
            ) : (
              cart.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onUpdateQuantity={handleUpdateQuantity}
                  onRemove={handleRemoveItem}
                />
              ))
            )}
          </ScrollArea>
          <div className="mt-auto pt-4 border-t">
            <div className="flex justify-between items-center mb-4">
              <span className="font-semibold">Total:</span>
              <span className="font-semibold">Tk {totalPrice.toFixed(2)}</span>
            </div>
            <Button className="w-full shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105" disabled={cart.length === 0}>
              Checkout
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}