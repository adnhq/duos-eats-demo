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
  <div className="flex items-center">
    {Array(3)
      .fill(null)
      .map((_, index) => (
        <DollarSign
          key={index}
          className={`w-4 h-4 ${
            index < level ? "text-green-500" : "text-gray-300"
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
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl bg-white dark:bg-gray-800 group">
      <CardContent className="p-0">
        <div className="relative aspect-video overflow-hidden">
          <Image
            loader={imageLoader}
            src={restaurant.image}
            alt={restaurant.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute top-2 left-2 bg-white dark:bg-gray-800 px-2 py-1 rounded-full text-xs font-medium">
            {restaurant.category}
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-xl font-bold mb-2 line-clamp-1">{restaurant.name}</h3>
          <p className="text-sm text-muted-foreground mb-2">{restaurant.cuisine}</p>
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-1">
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
              <span className="font-medium">{restaurant.rating.toFixed(1)}</span>
            </div>
            <PriceIndicator level={restaurant.priceLevel} />
          </div>
          <Button variant="outline" size="sm" asChild className="w-full">
            <Link href="/menu">
              <Eye className="w-4 h-4 mr-2" />
              View Restaurant
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}