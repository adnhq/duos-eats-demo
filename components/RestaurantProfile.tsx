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
import { editRestaurant } from "@/lib/actions";
import { cuisineTypes, locations } from "@/lib/info";
import { Restaurant } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const updateFormSchema = z.object({
  name: z.string().min(2, {
    message: "Restaurant name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phoneNumber: z
    .string()
    .length(10, "Phone number must be exactly 10 digits")
    .regex(/^\d{10}$/, "Phone number must contain only digits")
    .refine((value) => value !== "0000000000", {
      message: "Phone number cannot be all zeros",
    }),
  cuisine: z.string(),
  address: z.string().min(10, {
    message: "Address must be at least 10 characters.",
  }),
  location: z.string(),
  logo: z.any().optional(),
});

type Props = {
  defaultValues: Restaurant;
  id: string | unknown;
};

export function RestaurantProfile({ defaultValues, id }: Props) {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const updateForm = useForm<z.infer<typeof updateFormSchema>>({
    resolver: zodResolver(updateFormSchema),
    defaultValues,
  });

  async function onUpdateSubmit(values: z.infer<typeof updateFormSchema>) {
    try {
      // Add your update API call here
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        if (value !== null) {
          formData.append(key, value);
        }
      });
      formData.append("id", id as string);
      const result = await editRestaurant(formData);

      if (result.success) {
        toast({
          title: "Settings Updated",
          description:
            "Your restaurant information has been updated successfully.",
        });
      }
    } catch (error) {
      toast({
        title: "Update Failed",
        description: "There was an error updating your information.",
        variant: "destructive",
      });
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Restaurant Profile</CardTitle>
        <CardDescription>
          Update your restaurant&apos;s information
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...updateForm}>
          <form
            onSubmit={updateForm.handleSubmit(onUpdateSubmit)}
            className="space-y-4"
          >
            <FormField
              control={updateForm.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Restaurant Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={updateForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email address</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={updateForm.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                        +880
                      </span>
                      <Input
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
              control={updateForm.control}
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
                        <SelectItem key={cuisine} value={cuisine.toLowerCase()}>
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
              control={updateForm.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Restaurant Address</FormLabel>
                  <FormControl>
                    <Textarea {...field} rows={3} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={updateForm.control}
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
              control={updateForm.control}
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
                  {value && value instanceof File ? (
                    <div className="mt-2 relative w-full h-40">
                      <Image
                        src={URL.createObjectURL(value)}
                        alt="Preview"
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="rounded-md object-cover"
                      />
                    </div>
                  ) : (
                    <div className="mt-2 relative w-full h-40">
                      <Image
                        src={value}
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
              className="w-full"
              disabled={updateForm.formState.isSubmitting}
            >
              <Save className="mr-2 h-4 w-4" />
              {updateForm.formState.isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
