"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { getSession, restaurantLogin } from "@/lib/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function RestaurantLoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const restaurantForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onRestaurantSubmit = async (data: LoginFormValues) => {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value !== null) {
          formData.append(key, value);
        }
      });
      await restaurantLogin(formData);
      const session = await getSession();

      if (session === null) throw new Error("Invalid Session");

      toast({
        title: `Logged in as ${session.name} successfully`,
        description: "Welcome back to Duos Eats!",
      });

      if (session.role === "restaurant") {
        router.push("/restaurant/OrderStats");
      }
    } catch (error) {
      toast({
        title: "Login failed",
        description: (error as Error).message,
        variant: "destructive",
      });
    } finally {
      restaurantForm.reset({
        email: "",
        password: "",
      });
    }
  };

  return (
    <Form {...restaurantForm}>
      <form
        onSubmit={restaurantForm.handleSubmit(onRestaurantSubmit)}
        className="space-y-4"
      >
        <FormField
          control={restaurantForm.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Restaurant Email</FormLabel>
              <FormControl>
                <Input placeholder="restaurant@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={restaurantForm.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    {...field}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <Eye className="h-4 w-4" />
                    ) : (
                      <EyeOff className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full"
          disabled={restaurantForm.formState.isSubmitting}
        >
          {restaurantForm.formState.isSubmitting ? (
            <>
              <span className="">Signing in</span>
              <span className="animate-spin">
                <Loader2 className="h-4 w-4" />
              </span>
            </>
          ) : (
            "Sign In"
          )}
        </Button>
      </form>
    </Form>
  );
}
