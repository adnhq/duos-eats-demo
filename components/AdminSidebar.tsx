"use client";
import { cn } from "@/lib/utils";
import { ChefHat, PencilRuler, User, Utensils } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";

export default function AdminSidebar() {
  const sidebarItems = [
    {
      id: "dashboard",
      name: "Dashboard",
      href: "/admin/Dashboard",
      icon: Utensils,
    },
    {
      id: "addMenu",
      name: "Add Menu",
      href: "/admin/AddMenu",
      icon: ChefHat,
    },
    {
      id: "editMenu",
      name: "Edit Menu",
      href: "/admin/EditMenu",
      icon: PencilRuler,
    },
  ];

  const pathName = usePathname();

  return (
    <div className="flex flex-col h-full w-full md:border-r md:w-64">
      <div className="flex items-center justify-between pb-2 border-b">
        <div className="flex items-center space-x-2 pl-6">
          <div className="rounded-full p-2 border">
            <User className="h-4 w-4 " />
          </div>

          <h2 className="font-semibold">Admin</h2>
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
