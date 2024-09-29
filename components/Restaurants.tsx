import React, { useState, useEffect, useRef  } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from 'next/router'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft, ChevronRight, MapPin, Search } from 'lucide-react'
import RestaurantCard from "./RestaurantCard";

const allRestaurants = [
  {
    id: 1,
    name: "Burger Bliss",
    cuisine: "American",
    rating: 4.6,
    priceLevel: 2,
    category: "Burger",
    location: "Banani",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 2,
    name: "Pizzeria Perfection",
    cuisine: "Italian",
    rating: 4.8,
    priceLevel: 3,
    category: "Pizza",
    location: "Banani",
    image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 3,
    name: "Sushi Symphony",
    cuisine: "Japanese",
    rating: 4.9,
    priceLevel: 4,
    category: "Sushi",
    location: "Banani",
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 4,
    name: "Taco Fiesta",
    cuisine: "Mexican",
    rating: 4.5,
    priceLevel: 2,
    category: "Tacos",
    location: "Banani",
    image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 5,
    name: "Pasta Paradise",
    cuisine: "Italian",
    rating: 4.7,
    priceLevel: 3,
    category: "Pasta",
    location: "Banani",
    image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 6,
    name: "Green Gourmet",
    cuisine: "Vegetarian",
    rating: 4.4,
    priceLevel: 2,
    category: "Vegetarian",
    location: "Banani",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 7,
    name: "Wok & Roll",
    cuisine: "Chinese",
    rating: 4.3,
    priceLevel: 2,
    category: "Chinese",
    location: "Banani",
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 8,
    name: "Curry House",
    cuisine: "Indian",
    rating: 4.6,
    priceLevel: 3,
    category: "Indian",
    location: "Banani",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 9,
    name: "Mediterranean Oasis",
    cuisine: "Mediterranean",
    rating: 4.5,
    priceLevel: 3,
    category: "Mediterranean",
    location: "Banani",
    image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 10,
    name: "BBQ Bonanza",
    cuisine: "American",
    rating: 4.7,
    priceLevel: 3,
    category: "BBQ",
    location: "Banani",
    image: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 11,
    name: "Pho-nomenal",
    cuisine: "Vietnamese",
    rating: 4.4,
    priceLevel: 2,
    category: "Vietnamese",
    location: "Banani",
    image: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 12,
    name: "Sweet Tooth",
    cuisine: "Desserts",
    rating: 4.8,
    priceLevel: 2,
    category: "Desserts",
    location: "Banani",
    image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
  },
];
const popularRestaurants = allRestaurants.slice(3, 11)
const locations = [
  "Uttara", "Mirpur", "Pallabi", "Kazipara", "Kafrul", "Agargaon", "Banani", 
  "Gulshan", "Niketan", "Shahjadpur", "Mohakhali", "Bashundhara", "Banasree", 
  "Aftab Nagar", "Baridhara", "Khilkhet", "Tejgaon", "Farmgate", "Mohammadpur", 
  "Rampura", "Badda", "Khilgaon"
]

export default function Restaurants() {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('all')
  const [filteredRestaurants, setFilteredRestaurants] = useState(allRestaurants)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)
  const restaurantsPerPage = 9
  const totalPages = Math.ceil(filteredRestaurants.length / restaurantsPerPage)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const filtered = allRestaurants.filter(restaurant => 
      restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedLocation === 'all' || restaurant.location === selectedLocation)
    )
    setFilteredRestaurants(filtered)
    setCurrentPage(1)
  }, [searchTerm, selectedLocation])

  useEffect(() => {
    const checkScroll = () => {
      if (scrollContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
        setCanScrollLeft(scrollLeft > 0)
        setCanScrollRight(scrollLeft < scrollWidth - clientWidth)
      }
    }

    checkScroll()
    window.addEventListener('resize', checkScroll)
    return () => window.removeEventListener('resize', checkScroll)
  }, [])

  const handlePageChange = (newPage: number): void => {
    setCurrentPage(newPage)
  }

  const paginatedRestaurants = filteredRestaurants.slice(
    (currentPage - 1) * restaurantsPerPage,
    currentPage * restaurantsPerPage
  )

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' })
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' })
    }
  }

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1)
    }
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-white">
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 sm:mb-6">Popular Restaurants</h2>
        <div className="relative">
          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 space-x-4 sm:space-x-5"
            onScroll={handleScroll}
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {allRestaurants.slice(0, 10).map((restaurant, index) => (
              <div key={index} className="snap-start shrink-0 w-52 sm:w-60 md:w-68 lg:w-76">
                <RestaurantCard restaurant={restaurant} />
              </div>
            ))}
          </div>
          {canScrollLeft && (
            <button 
              onClick={scrollLeft}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hidden sm:block"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
          )}
          {canScrollRight && (
            <button 
              onClick={scrollRight}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hidden sm:block"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          )}
        </div>
      </section>

      <section className="mb-12">
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-grow">
            <Input
              type="text"
              placeholder="Search restaurants..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg shadow-md transition-shadow duration-300 hover:shadow-lg focus:shadow-lg"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
          </div>

          <Select value={selectedLocation} onValueChange={setSelectedLocation}>
            <SelectTrigger className="w-full sm:w-[200px] rounded-lg shadow-sm">
              <MapPin className="h-5 w-5 text-gray-400 mr-2" />
              <SelectValue placeholder="Filter by location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              {Array.from(new Set(allRestaurants.map(r => r.location))).map((location) => (
                <SelectItem key={location} value={location}>
                  {location}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <h2 className="text-2xl font-semibold mb-6">All Restaurants</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {paginatedRestaurants.map((restaurant, index) => (
            <RestaurantCard key={index} restaurant={restaurant} />
          ))}
        </div>
        {filteredRestaurants.length === 0 && (
          <p className="text-center text-gray-500 mt-8">No restaurants found matching your criteria.</p>
        )}
        {filteredRestaurants.length > 0 && (
          <div className="flex justify-center items-center mt-8">
            <Button
              variant="outline"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="mr-2"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>
            <span className="mx-4 text-sm">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="ml-2"
            >
              Next
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        )}
      </section>
    </div>
  )
}