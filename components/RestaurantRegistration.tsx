"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import { ChevronRight, Eye, EyeOff, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { registerRestaurant } from "@/lib/actions";

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
  const [logoFile, setLogoFile] = useState<string>("");

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
      setLogoFile("");
    }
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center relative overflow-hidden py-16">
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
        <rect
          width="100%"
          height="100%"
          fill="url(#grid)"
          mask="url(#fade-mask)"
        />
        <g mask="url(#fade-mask)">
          <circle cx="500" cy="0" r="400" fill="rgba(245, 158, 11, 0.05)" />
          <circle cx="500" cy="0" r="300" fill="rgba(245, 158, 11, 0.05)" />
          <circle cx="500" cy="0" r="200" fill="rgba(245, 158, 11, 0.05)" />
        </g>
      </svg>

      {/* Centered form */}
      <Card className="w-full max-w-md z-10 bg-white shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-900">
            Join Duos as a Partner
          </CardTitle>
          <CardDescription className="text-gray-600">
            Grow your restaurant with us
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                            <EyeOff className="h-4 w-4 text-gray-500" />
                          ) : (
                            <Eye className="h-4 w-4 text-gray-500" />
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
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Restaurant Logo</FormLabel>
                    <FormControl>
                      <div className="flex items-center">
                        <Input
                          id="logo"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              field.onChange(file);
                              setLogoFile(file.name);
                            }
                          }}
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
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white"
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
