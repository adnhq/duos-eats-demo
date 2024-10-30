'use client'
import React, { useState, ChangeEvent } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ChevronRight, Eye, EyeOff, Upload } from 'lucide-react'
import { useToast } from "@/hooks/use-toast"

interface FormData {
  restaurantName: string;
  email: string;
  password: string;
  phone: string;
  cuisine: string;
  address: string;
  location: string;
  logo?: File | null;
}

export default function RestaurantRegistration() {
  const { toast } = useToast()
  const [showPassword, setShowPassword] = useState(false)
  const [logoFile, setLogoFile] = useState<string>('')
  
  const [formData, setFormData] = useState<FormData>({
    restaurantName: '',
    email: '',
    password: '',
    phone: '',
    cuisine: '',
    address: '',
    location: '',
    logo: null
  })

  const cuisineTypes = [
    "Bengali", "Chinese", "Indian", "Italian", "Japanese", "Mediterranean", 
    "Mexican", "Thai", "American", "French", "Greek", "Korean", "Vietnamese", "Other"
  ]

  const locations = [
    "Uttara", "Mirpur", "Pallabi", "Kazipara", "Kafrul", "Agargaon", "Banani", 
    "Gulshan", "Niketan", "Shahjadpur", "Mohakhali", "Bashundhara", "Banasree", 
    "Aftab Nagar", "Baridhara", "Khilkhet", "Tejgaon", "Farmgate", "Mohammadpur", 
    "Rampura", "Badda", "Khilgaon"
  ]

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSelectChange = (value: string, name: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleLogoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData(prev => ({
        ...prev,
        logo: file
      }))
      setLogoFile(file.name)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    try {
      // Create FormData for multipart/form-data submission
      const submitData = new FormData()
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null) {
          submitData.append(key, value)
        }
      })

      const response = await fetch('/api/restaurant/register', {
        method: 'POST',
        body: submitData,
      })

      if (!response.ok) {
        throw new Error('Registration failed')
      }

      toast({
        title: "Registration Successful!",
        description: "Your restaurant has been registered successfully.",
      })

      // Reset form
      setFormData({
        restaurantName: '',
        email: '',
        password: '',
        phone: '',
        cuisine: '',
        address: '',
        location: '',
        logo: null
      })
      setLogoFile('')
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: "There was an error registering your restaurant. Please try again.",
        variant: "destructive",
      })
    }
  }

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
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="restaurantName" className="text-gray-700">Restaurant Name</Label>
              <Input 
                id="restaurantName" 
                name="restaurantName" 
                value={formData.restaurantName}
                onChange={handleInputChange}
                type="text" 
                required 
                className="mt-1" 
              />
            </div>

            <div>
              <Label htmlFor="email" className="text-gray-700">Email address</Label>
              <Input 
                id="email" 
                name="email" 
                value={formData.email}
                onChange={handleInputChange}
                type="email" 
                autoComplete="email" 
                required 
                className="mt-1" 
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-gray-700">Password</Label>
              <div className="relative">
                <Input 
                  id="password" 
                  name="password" 
                  value={formData.password}
                  onChange={handleInputChange}
                  type={showPassword ? "text" : "password"}
                  required 
                  className="mt-1 pr-10" 
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-1 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-500" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-500" />
                  )}
                </Button>
              </div>
            </div>

            <div className="space-y-1">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                  +880
                </span>
                <Input 
                  id="phone" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  type="tel" 
                  className="flex-1 rounded-l-none" 
                />
              </div>
            </div>

            <div>
              <Label htmlFor="cuisine" className="text-gray-700">Cuisine Type</Label>
              <Select 
                name="cuisine" 
                value={formData.cuisine}
                onValueChange={(value) => handleSelectChange(value, 'cuisine')}
              >
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
              <Textarea 
                id="address" 
                name="address" 
                value={formData.address}
                onChange={handleInputChange}
                rows={3} 
                className="mt-1" 
              />
            </div>

            <div>
              <Label htmlFor="location" className="text-gray-700">Location</Label>
              <Select 
                name="location"
                value={formData.location}
                onValueChange={(value) => handleSelectChange(value, 'location')}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((location) => (
                    <SelectItem key={location} value={location.toLowerCase()}>{location}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="logo" className="text-gray-700">Restaurant Logo</Label>
              <div className="mt-1 flex items-center">
                <Input
                  id="logo"
                  name="logo"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleLogoChange}
                />
                <label
                  htmlFor="logo"
                  className="cursor-pointer bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                >
                  <Upload className="h-4 w-4 inline-block mr-2" />
                  Choose logo
                </label>
                <span className="ml-3 text-sm text-gray-500">
                  {logoFile || "No file chosen"}
                </span>
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