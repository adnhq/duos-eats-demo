import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getRestaurantMenu } from "@/lib/actions";
import { Restaurant } from "@/lib/types";
import { Instagram, Search, ShoppingBag, Sparkles } from "lucide-react";
import { Pacifico, Spline_Sans } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { MenuItemCard } from "./MenuItemCard";

const splineSans = Spline_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const pacificoFont = Pacifico({ subsets: ["latin"], weight: ["400"] });

interface MenuItem {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  popular: boolean;
}

interface MenuItemsGrouped {
  [category: string]: MenuItem[];
}

export default async function RestaurantMenu({
  restaurantData,
}: {
  restaurantData: Restaurant;
}) {
  const menuItems = await getRestaurantMenu(restaurantData.id);

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
      ? { "Popular Items": popularItems, ...categorizedItems }
      : categorizedItems;

  // Get categories, ensuring Popular Items comes first if it exists
  const categories = Object.keys(groupedMenuItems);
  if (popularItems.length > 0) {
    const popularIndex = categories.indexOf("Popular Items");
    if (popularIndex > 0) {
      categories.splice(popularIndex, 1);
      categories.unshift("Popular Items");
    }
  }

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
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 p-4 sm:p-6 text-white">
            <h1
              className={`text-3xl sm:text-4xl font-semibold mb-1 sm:mb-2 tracking-wide ${splineSans.className}`}
            >
              {restaurantData.name}
            </h1>
            <p className="text-sm sm:text-lg opacity-90 mb-1 sm:mb-2 uppercase">
              {restaurantData.cuisine}
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
                <h2 className={`text-lg ${splineSans.className}`}>
                  Duos Eats Exclusive
                </h2>
              </div>
              <p className={`text-3xl font-semibold ${pacificoFont.className}`}>
                {restaurantData.discount}% Discount
              </p>
              <p className="text-sm text-primary-foreground/80">
                Applied to all orders made through our platform
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
                 ${splineSans.className}
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
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
      </div>

      <Tabs defaultValue="all" className="mb-6">
        <ScrollArea className="w-full whitespace-nowrap pb-4">
          <TabsList className="w-max rounded-full bg-muted p-1">
            <TabsTrigger
              value="all"
              className="rounded-full px-3 py-1.5 text-sm font-medium transition-all"
            >
              All Items
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
          <ScrollBar orientation="horizontal" className="invisible" />
        </ScrollArea>

        {/* All Items View - Shows all items grouped by category */}
        <TabsContent value="all" className="mt-6">
          <div className="space-y-8">
            {categories.map((category) => (
              <div key={category}>
                <h3 className="text-2xl font-semibold mb-3 pl-4">{category}</h3>
                <div className="space-y-4">
                  {groupedMenuItems[category].map((item: MenuItem) => (
                    <MenuItemCard
                      key={item.id}
                      item={{ ...item, discount: restaurantData.discount }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* Individual Category Views */}
        {categories.map((category) => (
          <TabsContent key={category} value={category} className="mt-6">
            <div className="space-y-4">
              {groupedMenuItems[category].map((item) => (
                <MenuItemCard
                  key={item.id}
                  item={{ ...item, discount: restaurantData.discount }}
                />
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {/* Cart Sheet */}
      <Sheet>
        <SheetTrigger asChild>
          <Button className="fixed bottom-4 right-4 rounded-full w-14 h-14 shadow-lg transition-all duration-300 hover:scale-105">
            <ShoppingBag className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent className="w-full sm:max-w-md flex flex-col">
          <SheetHeader>
            <SheetTitle className="text-2xl font-bold font-spline-sans">
              Your Cart
            </SheetTitle>
          </SheetHeader>
          <ScrollArea className="flex-grow">
            <p className="text-center text-muted-foreground mt-4">
              Your cart is empty.
            </p>
          </ScrollArea>
          <div className="mt-auto pt-4 border-t">
            <div className="flex justify-between items-center mb-4">
              <span className="font-semibold text-lg">Total:</span>
              <span className="font-bold text-xl">Tk 0</span>
            </div>
            <Button
              className="w-full h-12 text-lg shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105"
              disabled={true}
            >
              Checkout
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
