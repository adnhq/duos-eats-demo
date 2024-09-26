import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, DollarSign, Eye } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

type RestaurantCardProps = {
  restaurant: {
    id: number
    name: string
    image: string
    rating: number
    priceLevel: number
    cuisine: string
    category: string
  }
}

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
)

const imageLoader = ({ src }: { src: string }) => {
  return src
}

export default function RestaurantCard({ restaurant }: RestaurantCardProps) {
  return (
    <Card className="overflow-hidden transition-all duration-300 shadow-md hover:shadow-lg group">
      <CardContent className="p-0">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={restaurant.image}
            alt={restaurant.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
          <div className="absolute top-2 left-2">
            <span className="px-1.5 py-0.5 text-xs font-medium text-primary-foreground bg-primary rounded-full">
              {restaurant.category}
            </span>
          </div>
        </div>
        <div className="p-3">
          <h3 className="text-base font-semibold line-clamp-1 mb-0.5">{restaurant.name}</h3>
          <p className="text-xs text-muted-foreground mb-2">{restaurant.cuisine}</p>
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="font-medium text-xs">{restaurant.rating.toFixed(1)}</span>
            </div>
            <PriceIndicator level={restaurant.priceLevel} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}