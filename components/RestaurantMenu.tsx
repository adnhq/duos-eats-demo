"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MenuItem, Restaurant } from "@/lib/types";
import { Instagram, Search, Sparkles } from "lucide-react";
import { Kalam } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { MenuItemCard } from "./MenuItemCard";

const discountFont = Kalam({ subsets: ["latin"], weight: ["700"] });

type MenuItemsGrouped = {
  [category: string]: MenuItem[];
};

export default function RestaurantMenu({
  restaurantData,
  menuItems,
}: {
  restaurantData: Restaurant;
  menuItems: MenuItem[];
}) {
  const [searchTerm, setSearchTerm] = useState("");

  // First, create a copy of the menuItems to avoid mutation
  const menuItemsCopy = menuItems ? [...menuItems] : [];

  // Get popular items
  const popularItems = menuItemsCopy.filter((item) => item.popular === true);

  // Group remaining items by category
  const categorizedItems = menuItemsCopy.reduce(
    (acc: MenuItemsGrouped, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    },
    {}
  );

  // Only add Popular Items category if there are actually popular items
  const groupedMenuItems: MenuItemsGrouped =
    popularItems.length > 0
      ? { Popular: popularItems, ...categorizedItems }
      : categorizedItems;

  // Get categories, ensuring Popular Items comes first if it exists
  const categories = Object.keys(groupedMenuItems).sort((a, b) => {
    if (a < b) {
      return -1;
    }
    if (a > b) {
      return 1;
    }
    return 0;
  });

  if (popularItems.length > 0) {
    const popularIndex = categories.indexOf("Popular");
    if (popularIndex > 0) {
      categories.splice(popularIndex, 1);
      categories.unshift("Popular");
    }
  }

  // Filter menu items based on search term
  const filteredMenuItems = menuItemsCopy.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
      {/* Restaurant Header Section */}
      <div className="mb-6">
        <div className="relative h-52 sm:h-72 w-full overflow-hidden rounded-xl mb-4">
          <Image
            src={restaurantData.logo}
            alt={restaurantData.name}
            fill
            className="object-cover"
          />

          <div className="absolute top-2 right-2">
            <span className="px-4 py-1 text-xs font-medium tracking-wider text-primary-foreground bg-primary rounded-full uppercase">
              {restaurantData.cuisine}
            </span>
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 p-4 sm:p-6 text-white">
            <h1
              className={`text-3xl sm:text-4xl font-semibold mb-1 sm:mb-2 tracking-wide`}
            >
              {restaurantData.name}
            </h1>

            <p className="text-sm sm:text-lg opacity-90 mb-1 sm:mb-2">
              {restaurantData.address}
            </p>

            <div className="flex items-center text-sm sm:text-base">
              <span className="text-yellow-400 mr-1">★</span>
              <span className="font-semibold">{"0.0"}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[40rem_auto] md:gap-8 items-center sm:items-stretch justify-between gap-4">
          <div className="bg-gradient-to-r from-yellow-400/30 to-orange-400/30 rounded-lg p-4 sm:p-6 shadow-lg">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-yellow-500" />
                <h2 className={`text-lg`}>Duos Eats Exclusive</h2>
              </div>
              <p className={`text-3xl font-semibold ${discountFont.className}`}>
                {restaurantData.discount}% Discount
              </p>
              <p className="text-sm text-primary-foreground/80">
                Applied to each item on the menu only through our platform.
              </p>
            </div>
          </div>
          <div className="flex items-center w-full sm:w-auto">
            <Link
              href={`https://www.instagram.com/duos.eats/`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              <Button
                variant="secondary"
                size="sm"
                className={`w-full sm:w-auto flex items-center justify-center gap-2 
                 px-4 py-2 rounded-md 
                 shadow-md
                 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 
                 text-white
                 transition-all duration-300 
                 hover:shadow-xl hover:scale-105
                 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500
                 `}
              >
                <Instagram />
                Watch on Instagram
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-6 relative">
        <Input
          type="text"
          placeholder="Search in menu"
          className="w-full pl-10 pr-4 py-2 rounded-lg shadow-sm transition-shadow duration-300 hover:shadow-md focus:shadow-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
      </div>

      <Tabs defaultValue="all" className="mb-6">
        <ScrollArea className="w-full whitespace-nowrap pb-4">
          <TabsList className="flex w-max rounded-full bg-muted p-1">
            <TabsTrigger
              value="all"
              className="rounded-full px-3 py-1.5 text-sm font-medium transition-all"
            >
              All
            </TabsTrigger>
            {categories.map((category) => (
              <TabsTrigger
                key={category}
                value={category}
                className="rounded-full px-3 py-1.5 text-sm font-medium transition-all"
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        {/* All Items View - Shows all items grouped by category */}
        <TabsContent value="all" className="mt-6">
          <div className="space-y-8">
            {searchTerm ? (
              <div>
                <h3 className="text-2xl font-semibold mb-3 pl-4">
                  Search Results
                </h3>
                <div className="space-y-4">
                  {filteredMenuItems.map((item: MenuItem) => (
                    <MenuItemCard
                      key={item.id}
                      item={{ ...item, discount: restaurantData.discount }}
                    />
                  ))}
                </div>
              </div>
            ) : (
              categories.map((category) => (
                <div key={category}>
                  <h3 className="text-2xl font-semibold mb-3 pl-4">
                    {category}
                  </h3>
                  <div className="space-y-4">
                    {groupedMenuItems[category].map((item: MenuItem) => (
                      <MenuItemCard
                        key={item.id}
                        item={{ ...item, discount: restaurantData.discount }}
                      />
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </TabsContent>

        {/* Individual Category Views */}
        {categories.map((category) => (
          <TabsContent key={category} value={category} className="mt-6">
            <div className="space-y-4">
              {groupedMenuItems[category]
                .filter((item) =>
                  item.name.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((item) => (
                  <MenuItemCard
                    key={item.id}
                    item={{ ...item, discount: restaurantData.discount }}
                  />
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
