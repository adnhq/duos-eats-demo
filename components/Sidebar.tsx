import { ChefHat, CreditCard, Utensils } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";


export default function Sidebar({
  restaurantName,
  logo,
}: {
  restaurantName: string;
  logo: string;
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


  return (
    <div className="flex flex-col h-full w-full md:border-r md:w-64">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center space-x-2 pl-4">
          <div className="relative h-10 w-10">
            <Image
              src={logo}
              alt={restaurantName}
              fill
              sizes="40px"
              className="object-cover rounded-full"
            />
          </div>
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
              "hover:bg-gray-100 text-gray-700"
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
