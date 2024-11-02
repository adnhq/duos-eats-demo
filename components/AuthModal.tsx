"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { getSession, login } from "@/lib/actions";
import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";

export function AuthModal() {
  // State for restaurant login
  const [restaurantEmail, setRestaurantEmail] = useState("");
  const [restaurantPassword, setRestaurantPassword] = useState("");
  const [showRestaurantPassword, setShowRestaurantPassword] = useState(false);

  // State for user login
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [showUserPassword, setShowUserPassword] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  async function handleRestaurantLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    let formData = new FormData();
    formData.append("email", restaurantEmail);
    formData.append("password", restaurantPassword);

    try {
      await login(formData);
      const session = await getSession();
      console.log(session);
      setIsOpen(false);

      if (session !== null) {
        toast({
          title: "Logged in successfully",
          description: "Welcome back!",
        });
      } else {
        throw new Error("Invalid");
      }
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Invalid email or password",
        variant: "destructive",
      });
    } finally {
      setRestaurantEmail("");
      setRestaurantPassword("");
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className="w-full md:w-auto">
          Sign In
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Authentication</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="user" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="user">Sign in as User</TabsTrigger>
            <TabsTrigger value="restaurant">Sign in as Restaurant</TabsTrigger>
          </TabsList>

          {/* User Login Tab */}
          <TabsContent value="user">
            <Card>
              <form>
                <CardContent className="space-y-2 pt-4">
                  <div className="space-y-1">
                    <Label htmlFor="userEmail">Email</Label>
                    <Input
                      id="userEmail"
                      type="email"
                      placeholder="your@email.com"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="userPassword">Password</Label>
                    <div className="relative">
                      <Input
                        id="userPassword"
                        type={showUserPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={userPassword}
                        onChange={(e) => setUserPassword(e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={() => setShowUserPassword(!showUserPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        {showUserPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full">
                    Sign In
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>

          {/* Restaurant Login Tab */}
          <TabsContent value="restaurant">
            <Card>
              <form onSubmit={handleRestaurantLogin}>
                <CardContent className="space-y-2 pt-4">
                  <div className="space-y-1">
                    <Label htmlFor="restaurantEmail">Restaurant Email</Label>
                    <Input
                      id="restaurantEmail"
                      type="email"
                      placeholder="restaurant@example.com"
                      value={restaurantEmail}
                      onChange={(e) => setRestaurantEmail(e.target.value)}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="restaurantPassword">Password</Label>
                    <div className="relative">
                      <Input
                        id="restaurantPassword"
                        type={showRestaurantPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={restaurantPassword}
                        onChange={(e) => setRestaurantPassword(e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowRestaurantPassword(!showRestaurantPassword)
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        {showRestaurantPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full">
                    Sign In
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
