'use client';
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Instagram } from 'lucide-react';

const locations = [
  "Uttara", "Mirpur", "Pallabi", "Kazipara", "Kafrul", "Agargaon", "Banani", 
  "Gulshan", "Niketan", "Shahjadpur", "Mohakhali", "Bashundhara", "Banasree", 
  "Aftab Nagar", "Baridhara", "Khilkhet", "Tejgaon", "Farmgate", "Mohammadpur", 
  "Rampura", "Badda", "Khilgaon"
];

export function AuthModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Sign In</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Authentication</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="signin" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Create Account</TabsTrigger>
          </TabsList>
          <TabsContent value="signin">
            <Card>
                <CardContent className="space-y-2 pt-4">
                    <div className="space-y-1">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" />
                    </div>
                    <div className="space-y-1">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button className="w-full">Sign In</Button>
                </CardFooter>
                </Card>
          </TabsContent>
          <TabsContent value="signup">
            <Card>
              <CardContent className="space-y-4 pt-4">
                <Button
                  className="w-full bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 hover:from-yellow-500 hover:via-pink-600 hover:to-purple-600 text-white font-semibold"
                  onClick={() => window.open('https://www.instagram.com/your_instagram_page', '_blank')}
                >
                  <Instagram className="mr-2 h-4 w-4" /> Follow us on Instagram
                </Button>
                <div className="space-y-1">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" />
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
                      placeholder="1234567890"
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="location">Location</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your location" />
                    </SelectTrigger>
                    <SelectContent>
                      {locations.map((location) => (
                        <SelectItem key={location} value={location}>
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="new-password">Password</Label>
                  <Input id="new-password" type="password" />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Create Account</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}