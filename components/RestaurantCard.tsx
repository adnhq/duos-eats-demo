import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star, DollarSign } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Restaurant } from "@/lib/types";

const PriceIndicator: React.FC<{ level: number }> = ({ level }) => (
  <div className="flex items-center space-x-0.5">
    {Array(3)
      .fill(null)
      .map((_, index) => (
        <DollarSign
          key={index}
          className={`w-3 h-3 ${
            index < level ? "text-green-600" : "text-muted-foreground/30"
          }`}
        />
      ))}
  </div>
);

export default function RestaurantCard({
  restaurant,
}: {
  restaurant: Restaurant;
}) {
  return (
    <Link href={`/view-restaurant/${restaurant.id}`}>
      <Card className="overflow-hidden transition-all duration-300 shadow-md hover:shadow-xl group cursor-pointer">
        <CardContent className="p-0">
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={restaurant.logo}
              alt={restaurant.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover group-hover:scale-110 transform transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
            <div className="absolute top-2 right-2">
              <span className="px-4 py-1 text-xs font-medium tracking-wider text-primary-foreground bg-primary rounded-full uppercase">
                {restaurant.cuisine}
              </span>
            </div>
          </div>
          <div className="p-3">
            <h3 className="text-base font-semibold line-clamp-1 mb-0.5">
              {restaurant.name}
            </h3>
            <p className="text-xs text-muted-foreground mb-2 capitalize">
              {restaurant.location}
            </p>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="font-medium text-xs">{"0.0"}</span>
              </div>
              <PriceIndicator level={1} />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
