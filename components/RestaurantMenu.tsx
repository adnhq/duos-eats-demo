// pages/RestaurantMenu.tsx

"use client";

import React, { useState } from "react";
import Link from "next/link";
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
import { ShoppingBag } from "lucide-react";
import MenuHeader from "@/components/MenuHeader";

import MenuCategory from "@/components/MenuCategory";
import CartItem from "@/components/CartItem";
import {
  RestaurantData,
  CartItem as CartItemType,
  MenuItem,
} from "@/lib/types";
import RestaurantDeals from "./RestaurantDeals";

// Note: You would typically fetch this data from an API
const restaurantData: RestaurantData = {
  name: "The Tehari Ghor- Banani",
  category: "Rice Dishes",
  rating: 4.7,
  reviews: 176,
  freeDelivery: true,
  minOrder: 50,
  deals: [
    {
      type: "PRO",
      discount: "15% off",
      description: "Min. order Tk 50, and special savings for pandapro members",
    },
    {
      type: "REGULAR",
      discount: "12% off",
      description: "Min. order Tk 50. Valid for all items. Auto applied.",
    },
  ],
  menu: {
    Popular: [
      {
        id: 1,
        name: "Beef Tehari",
        price: 141,
        originalPrice: 160,
        description:
          "Flavorful rice dish prepared with beef cubes, rice & aromatic spices",
        image:
          "https://images.unsplash.com/photo-1655673653795-f608f4b9dced?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        id: 2,
        name: "Morog Polao",
        price: 158,
        originalPrice: 180,
        description:
          "Full- Tender chicken mixed with flavor-ful deshi masalas & aromatic rice",
        image:
          "https://images.unsplash.com/photo-1655673653795-f608f4b9dced?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
    ],
    Rice: [
      {
        id: 3,
        name: "Plain Rice",
        price: 40,
        description: "Steamed white rice",
        image:
          "https://images.unsplash.com/photo-1655673653795-f608f4b9dced?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        id: 4,
        name: "Vegetable Fried Rice",
        price: 120,
        description: "Rice stir-fried with mixed vegetables",
        image:
          "https://images.unsplash.com/photo-1655673653795-f608f4b9dced?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
    ],
    Beverage: [
      {
        id: 5,
        name: "Coca Cola",
        price: 40,
        description: "330ml can",
        image:
          "https://images.unsplash.com/photo-1655673653795-f608f4b9dced?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        id: 6,
        name: "Mineral Water",
        price: 25,
        description: "500ml bottle",
        image:
          "https://images.unsplash.com/photo-1655673653795-f608f4b9dced?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <Button asChild variant="outline">
          <Link href="/">&larr; Go back</Link>
        </Button>
        <div className="flex gap-2">
          <Button variant="outline">Log in</Button>
          <Button>Sign up</Button>
        </div>
      </div>

      <MenuHeader restaurantData={restaurantData} />
      <RestaurantDeals deals={restaurantData.deals} />

      <div className="mb-6">
        <Input type="text" placeholder="Search in menu" className="w-full" />
      </div>

      <Tabs defaultValue="Popular" className="mb-6">
        <TabsList className="mb-4">
          {Object.keys(restaurantData.menu).map((category) => (
            <TabsTrigger key={category} value={category}>
              {category} ({restaurantData.menu[category].length})
            </TabsTrigger>
          ))}
        </TabsList>
        <ScrollArea className="h-full w-full rounded-md border p-4">
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
          <Button className="fixed bottom-4 right-4 rounded-full w-16 h-16 shadow-lg">
            <ShoppingBag className="h-6 w-6" />
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
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
              <p className="text-center text-gray-500 mt-4">
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
            <Button className="w-full" disabled={cart.length === 0}>
              Checkout
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
