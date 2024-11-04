"use client";

import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Spline_Sans } from "next/font/google";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ChevronRight, Eye, EyeOff, Info, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { registerRestaurant } from "@/lib/actions";
import Image from "next/image";

const splineSans = Spline_Sans({ subsets: ["latin"], weight: ["500", "600"] });

const formSchema = z.object({
  restaurantName: z.string().min(2, {
    message: "Restaurant name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  phone: z.string().min(10, {
    message: "Please enter a valid phone number.",
  }),
  cuisine: z.string({
    required_error: "Please select a cuisine type.",
  }),
  address: z.string().min(10, {
    message: "Address must be at least 10 characters.",
  }),
  location: z.string({
    required_error: "Please select a location.",
  }),
  logo: z.any().optional(),
});

export default function RestaurantRegistration() {
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      restaurantName: "",
      email: "",
      password: "",
      phone: "",
      cuisine: "",
      address: "",
      location: "",
    },
  });

  const cuisineTypes = [
    "Bengali",
    "Chinese",
    "Indian",
    "Italian",
    "Japanese",
    "Mediterranean",
    "Mexican",
    "Thai",
    "American",
    "French",
    "Greek",
    "Korean",
    "Vietnamese",
    "Other",
  ];

  const locations = [
    "Uttara",
    "Mirpur",
    "Pallabi",
    "Kazipara",
    "Kafrul",
    "Agargaon",
    "Banani",
    "Gulshan",
    "Niketan",
    "Shahjadpur",
    "Mohakhali",
    "Bashundhara",
    "Banasree",
    "Aftab Nagar",
    "Baridhara",
    "Khilkhet",
    "Tejgaon",
    "Farmgate",
    "Mohammadpur",
    "Rampura",
    "Badda",
    "Khilgaon",
  ];

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if (value !== null) {
        formData.append(key, value);
      }
    });

    const result = await registerRestaurant(formData);

    if (result.error) {
      toast({
        title: "Registration Failed",
        description: result.error,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Registration Successful!",
        description: "Your restaurant has been registered successfully.",
      });
      form.reset();
    }
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center relative overflow-hidden py-16">
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1600 1000"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient
            id="fadeGradient"
            cx="50%"
            cy="50%"
            r="50%"
            fx="50%"
            fy="50%"
          >
            <stop offset="0%" stopColor="#FFF7ED" />
            <stop offset="40%" stopColor="#FFEDD5" />
            <stop offset="100%" stopColor="#FFFFFF" />
          </radialGradient>

          <pattern
            id="dots"
            x="0"
            y="0"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="20" cy="20" r="1" fill="#FB923C" opacity="0.15" />
          </pattern>

          <filter id="softBlur">
            <feGaussianBlur in="SourceGraphic" stdDeviation="15" />
          </filter>
        </defs>

        <rect width="100%" height="100%" fill="url(#fadeGradient)" />

        <rect width="100%" height="100%" fill="url(#dots)" />

        <circle
          cx="200"
          cy="150"
          r="300"
          fill="#FB923C"
          opacity="0.03"
          filter="url(#softBlur)"
        />
        <circle
          cx="1400"
          cy="200"
          r="250"
          fill="#FB923C"
          opacity="0.03"
          filter="url(#softBlur)"
        />

        <path
          d="M0,300 Q400,250 800,300 T1600,300"
          stroke="#FB923C"
          strokeWidth="1"
          fill="none"
          opacity="0.1"
        />
        <path
          d="M0,350 Q400,300 800,350 T1600,350"
          stroke="#FB923C"
          strokeWidth="1"
          fill="none"
          opacity="0.07"
        />
      </svg>

      <Card className="w-full max-w-md z-10 bg-white/95 backdrop-blur-sm shadow-xl border-0">
        <CardHeader className="text-center space-y-2">
          <CardTitle
            className={`${splineSans.className} text-3xl font-semibold text-gray-900`}
          >
            Join Duos as a Partner
          </CardTitle>
          <CardDescription
            className={`${splineSans.className} text-base text-gray-600`}
          >
            Grow your restaurant with us
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* All form fields remain exactly the same */}
              <FormField
                control={form.control}
                name="restaurantName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Restaurant Name</FormLabel>
                    <FormControl>
                      <Input placeholder="My Restaurant" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email address</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="myrestaurant@example.com"
                        {...field}
                        type="email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          placeholder="••••••••"
                          {...field}
                          type={showPassword ? "text" : "password"}
                          className="pr-10"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <Eye className="h-4 w-4 text-gray-500" />
                          ) : (
                            <EyeOff className="h-4 w-4 text-gray-500" />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <div className="flex">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                          +880
                        </span>
                        <Input
                          placeholder="1234567890"
                          {...field}
                          type="tel"
                          className="flex-1 rounded-l-none"
                        />
                      </div>
                    </FormControl>
                    <FormDescription className="flex gap-2 items-center">
                      <Info className="w-4 h-4" />
                      Must be a bKash number
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cuisine"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cuisine Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select cuisine type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {cuisineTypes.map((cuisine) => (
                          <SelectItem
                            key={cuisine}
                            value={cuisine.toLowerCase()}
                          >
                            {cuisine}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Restaurant Address</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="123 Food Street, Cuisine City"
                        {...field}
                        rows={3}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select location" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {locations.map((location) => (
                          <SelectItem
                            key={location}
                            value={location.toLowerCase()}
                          >
                            {location}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="logo"
                render={({ field: { value, onChange, ...field } }) => (
                  <FormItem>
                    <FormLabel>Image</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/*"
                        className="focus:ring-2 focus:ring-offset-2 focus:ring-ring focus:ring-offset-background"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            onChange(file);
                          }
                        }}
                        {...field}
                        ref={fileInputRef}
                      />
                    </FormControl>
                    {value && (
                      <div className="mt-2 relative w-full h-40">
                        <Image
                          src={URL.createObjectURL(value)}
                          alt="Preview"
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="rounded-md object-cover"
                        />
                      </div>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white"
              >
                Apply to become a partner
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
