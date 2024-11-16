"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { registerRestaurant } from "@/lib/actions";
import { cuisineTypes, locations } from "@/lib/info";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronRight, Eye, EyeOff, Loader2 } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

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
  phone: z
    .string()
    .length(10, "Phone number must be exactly 10 digits")
    .regex(/^\d{10}$/, "Phone number must contain only digits")
    .refine((value) => value !== "0000000000", {
      message: "Phone number cannot be all zeros",
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
  discount: z
    .string({
      required_error: "Please provide a valid discount percentage e.g. 15",
    })
    .regex(/^(?:[1-9]|[1-4][0-9]|50)$/, {
      message: "This number must be between 1 and 50",
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
      discount: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        if (value !== null) {
          formData.append(key, value);
        }
      });

      const result = await registerRestaurant(formData);

      if (result.success) {
        toast({
          title: "Registration Successful!",
          description: "Your restaurant has been registered successfully.",
        });
      }
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: (error as Error).message,
        variant: "destructive",
      });
    } finally {
      form.reset({
        restaurantName: "",
        email: "",
        password: "",
        phone: "",
        cuisine: "",
        address: "",
        location: "",
        discount: "",
      });
    }
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center relative overflow-hidden pb-16 pt-40">
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <path
          fill="rgb(255, 237, 213)"
          fillOpacity="0.5"
          d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,85.3C672,75,768,85,864,112C960,139,1056,181,1152,181.3C1248,181,1344,139,1392,117.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
        <path
          fill="rgb(254, 215, 170)"
          fillOpacity="0.5"
          d="M0,192L48,197.3C96,203,192,213,288,202.7C384,192,480,160,576,165.3C672,171,768,213,864,218.7C960,224,1056,192,1152,165.3C1248,139,1344,117,1392,106.7L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
        <path
          fill="rgb(251, 146, 60)"
          fillOpacity="0.3"
          d="M0,256L48,261.3C96,267,192,277,288,266.7C384,256,480,224,576,213.3C672,203,768,213,864,224C960,235,1056,245,1152,234.7C1248,224,1344,192,1392,176L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </svg>

      <Card className="w-full max-w-md z-10 bg-white/95 backdrop-blur-sm shadow-[0_0_25px_rgba(0,0,0,0.1)] border-0">
        <CardHeader className="text-center space-y-2">
          <CardTitle className={` text-3xl font-semibold text-gray-900`}>
            Join Duos as a Partner
          </CardTitle>
          <CardDescription className={` text-base text-gray-600`}>
            Grow your restaurant with us
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Rest of the form fields remain exactly the same */}
              {/* ... all form fields ... */}
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
                name="discount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Discount Percentage</FormLabel>
                    <FormControl>
                      <Input placeholder="15" {...field} type="number" />
                    </FormControl>
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
                className="w-full bg-gradient-to-l from-orange-400 to-yellow-400 hover:from-orange-500 hover:to-yellow-500 text-slate-50"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? (
                  <>
                    <span className="">Applying</span>
                    <span className="animate-spin">
                      <Loader2 className="h-4 w-4" />
                    </span>
                  </>
                ) : (
                  <>
                    Apply to become a partner{" "}
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      <div className="absolute bottom-8 left-0 right-0 flex justify-around">
        {["🍔", "🍕", "🍣", "🥗", "🍰"].map((emoji, index) => (
          <span
            key={index}
            className="text-4xl md:text-5xl lg:text-6xl opacity-30"
          >
            {emoji}
          </span>
        ))}
      </div>
    </div>
  );
}
