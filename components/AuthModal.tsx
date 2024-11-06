"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RestaurantLoginForm from "./RestaurantLoginForm";
import UserLoginForm from "./UserLoginForm";
import { useState } from "react";

export function AuthModal() {
  // // State for restaurant login
  // const [restaurantEmail, setRestaurantEmail] = useState("");
  // const [restaurantPassword, setRestaurantPassword] = useState("");
  // const [showRestaurantPassword, setShowRestaurantPassword] = useState(false);

  // // State for user login
  // const [userEmail, setUserEmail] = useState("");
  // const [userPassword, setUserPassword] = useState("");
  // const [showUserPassword, setShowUserPassword] = useState(false);
  // const [isOpen, setIsOpen] = useState(false);
  // const { toast } = useToast();

  // async function handleRestaurantLogin(e: React.FormEvent<HTMLFormElement>) {
  //   e.preventDefault();

  //   let formData = new FormData();
  //   formData.append("email", restaurantEmail);
  //   formData.append("password", restaurantPassword);

  //   try {
  //     await login(formData);
  //     const session = await getSession();
  //     setIsOpen(false);

  //     if (session !== null) {
  //       toast({
  //         title: "Logged in successfully",
  //         description: "Welcome back!",
  //       });
  //     } else {
  //       throw new Error("Invalid");
  //     }
  //   } catch (error) {
  //     toast({
  //       title: "Login failed",
  //       description: "Invalid email or password",
  //       variant: "destructive",
  //     });
  //   } finally {
  //     setRestaurantEmail("");
  //     setRestaurantPassword("");
  //   }
  // }

  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className="w-full md:w-auto">
          Sign In
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[380px]">
        <DialogHeader>
          <DialogTitle className="text-lg tracking-wider text-amber-500 border-b">
            SIGN IN
          </DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="restaurant" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="user">User</TabsTrigger>
            <TabsTrigger value="restaurant">Restaurant</TabsTrigger>
          </TabsList>
          <TabsContent value="user">
            <UserLoginForm />
          </TabsContent>

          <TabsContent value="restaurant">
            <RestaurantLoginForm setIsOpen={setIsOpen} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
