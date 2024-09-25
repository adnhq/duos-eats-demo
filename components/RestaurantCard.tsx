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

export default function Component({ restaurant }: RestaurantCardProps) {
  return (
    <Card className="overflow-hidden transition-all duration-300 shadow-md hover:shadow-lg">
      <CardContent className="p-0">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            loader={imageLoader}
            src={restaurant.image}
            alt={restaurant.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
          <div className="absolute top-3 left-3">
            <span className="px-2 py-1 text-xs font-medium text-primary-foreground bg-primary rounded-full">
              {restaurant.category}
            </span>
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold line-clamp-1 mb-1">{restaurant.name}</h3>
          <p className="text-sm text-muted-foreground mb-3">{restaurant.cuisine}</p>
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-1.5">
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
              <span className="font-medium text-sm">{restaurant.rating.toFixed(1)}</span>
            </div>
            <PriceIndicator level={restaurant.priceLevel} />
          </div>
          <Button variant="outline" size="sm" asChild className="w-full group">
            <Link href="/menu" className="flex items-center justify-center">
              <Eye className="w-4 h-4 mr-2 transition-transform group-hover:scale-110" />
              <span className="transition-colors group-hover:text-primary">View Menu</span>
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}