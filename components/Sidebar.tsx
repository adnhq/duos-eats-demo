"use client";

import { ChefHat, CreditCard, Utensils, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Sidebar({
  restaurantName,
}: {
  restaurantName: string;
}) {
  const sidebarItems = [
    {
      id: "orders",
      name: "Order Stats",
      href: "/restaurant/OrderStats",
      icon: Utensils,
    },
    { id: "menu", name: "Menu", href: "/restaurant/Menu", icon: ChefHat },
    {
      id: "settings",
      name: "Settings",
      href: "/restaurant/Settings",
      icon: CreditCard,
    },
  ];

  const pathName = usePathname();

  return (
    <div className="flex flex-col h-full w-full md:border-r md:w-64">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center space-x-2 pl-4">
          <Utensils className="h-6 w-6 text-primary" />
          <div>
            <h2 className="font-semibold">{restaurantName}</h2>
            <p className="text-xs text-muted-foreground">Dashboard</p>
          </div>
        </div>
      </div>

      <nav className="flex flex-col gap-2 p-4">
        {sidebarItems.map((item) => (
          <Link
            href={item.href}
            key={item.id}
            className={cn(
              "flex items-center w-full space-x-2 pl-4 py-2 rounded-lg mb-1 transition-colors text-sm font-semibold",
              pathName === item.href
                ? "bg-primary text-primary-foreground"
                : "hover:bg-gray-100 text-gray-700"
            )}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
