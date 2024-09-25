'use client'
import React from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ChevronRight, Upload } from 'lucide-react'

export default function RestaurantRegistration() {
  const cuisineTypes = [
    "Chinese", "Indian", "Italian", "Japanese", "Mediterranean", "Mexican", "Thai", "American", "French", "Greek", "Korean", "Vietnamese", "Other"
  ]

  return (
    <div className="min-h-screen bg-white flex items-center justify-center relative overflow-hidden">
      {/* Background illustration */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern
            id="grid"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M0 40L40 0M0 0L40 40"
              stroke="rgba(245, 158, 11, 0.1)"
              strokeWidth="1"
            />
          </pattern>
          <mask id="fade-mask">
            <rect x="0" y="0" width="100%" height="100%" fill="white" />
            <rect x="0" y="40%" width="100%" height="60%" fill="black" />
          </mask>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" mask="url(#fade-mask)" />
        <g mask="url(#fade-mask)">
          <circle cx="500" cy="0" r="400" fill="rgba(245, 158, 11, 0.05)" />
          <circle cx="500" cy="0" r="300" fill="rgba(245, 158, 11, 0.05)" />
          <circle cx="500" cy="0" r="200" fill="rgba(245, 158, 11, 0.05)" />
        </g>
      </svg>
      {/* Centered form */}
      <Card className="w-full max-w-md z-10 bg-white shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-900">Join Duos as a Partner</CardTitle>
          <CardDescription className="text-gray-600">Grow your restaurant with us</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" action="#" method="POST" encType="multipart/form-data">
            <div>
              <Label htmlFor="restaurant-name" className="text-gray-700">Restaurant Name</Label>
              <Input id="restaurant-name" name="restaurant-name" type="text" required className="mt-1" />
            </div>

            <div>
              <Label htmlFor="email" className="text-gray-700">Email address</Label>
              <Input id="email" name="email" type="email" autoComplete="email" required className="mt-1" />
            </div>

            <div className="space-y-1">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                      +880
                    </span>
                    <Input 
                      id="phone" 
                      type="tel" 
                      className="flex-1 rounded-l-none" 
                    />
                  </div>
            </div>

            <div>
              <Label htmlFor="cuisine" className="text-gray-700">Cuisine Type</Label>
              <Select name="cuisine">
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select cuisine type" />
                </SelectTrigger>
                <SelectContent>
                  {cuisineTypes.map((cuisine) => (
                    <SelectItem key={cuisine} value={cuisine.toLowerCase()}>{cuisine}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="address" className="text-gray-700">Restaurant Address</Label>
              <Textarea id="address" name="address" rows={3} className="mt-1" />
            </div>

            <div>
              <Label htmlFor="description" className="text-gray-700">About Your Restaurant</Label>
              <Textarea id="description" name="description" rows={3} className="mt-1" />
            </div>

            <div>
              <Label htmlFor="menu-pdf" className="text-gray-700">Upload Menu (PDF)</Label>
              <div className="mt-1 flex items-center">
                <Input
                  id="menu-pdf"
                  name="menu-pdf"
                  type="file"
                  accept=".pdf"
                  className="hidden"
                  onChange={(e) => {
                    const fileName = e.target.files?.[0]?.name;
                    if (fileName) {
                      document.getElementById('file-name')!.textContent = fileName;
                    }
                  }}
                />
                <label
                  htmlFor="menu-pdf"
                  className="cursor-pointer bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                >
                  <Upload className="h-4 w-4 inline-block mr-2" />
                  Choose file
                </label>
                <span id="file-name" className="ml-3 text-sm text-gray-500">No file chosen</span>
              </div>
            </div>

            <Button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-600 text-white">
              Apply to become a partner
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}