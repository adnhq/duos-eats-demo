"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { approveRestaurant, rejectRestaurant } from "@/lib/actions";
import { toast } from "@/hooks/use-toast";

type Application = {
  id: number;
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  cuisine: string;
  address: string;
  location: string;
  created_at: string;
};

export default function RestaurantApproval({
  unApprovedRestaurants,
}: {
  unApprovedRestaurants: Application[];
}) {
  async function approve(id: number) {
    try {
      await approveRestaurant(id);

      toast({
        title: "Approval Successful.",
        description: "The restaurant has been approved successfully.",
      });
    } catch (error) {
      toast({
        title: "Approval Failed.",
        description: "Could not approve the restaurant",
        variant: "destructive",
      });
    }
  }

  async function reject(id: number) {
    try {
      await rejectRestaurant(id);

      toast({
        title: "Restaurant approval Denied.",
        description: "The restaurant approval was denied successfully.",
      });
    } catch (error) {
      toast({
        title: "Approval Failed.",
        description: "Could not approve the restaurant",
        variant: "destructive",
      });
    }
  }

  return (
    <>
      <div className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Restaurant Name</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Cuisine</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Applied On</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {unApprovedRestaurants.map((restaurant) => {
              const date = new Date(restaurant.created_at).toLocaleString(
                "en-US",
                {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                }
              );
              return (
                <TableRow key={restaurant.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{restaurant.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {restaurant.address}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p>{restaurant.email}</p>
                      <p>{`0${restaurant.phoneNumber}`}</p>
                    </div>
                  </TableCell>
                  <TableCell className="capitalize">
                    {restaurant.cuisine}
                  </TableCell>
                  <TableCell className="capitalize">
                    {restaurant.location}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">{date}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700 text-white"
                        onClick={() => approve(restaurant.id)}
                      >
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="bg-red-100 text-red-600 hover:bg-red-200"
                        onClick={() => reject(restaurant.id)}
                      >
                        Reject
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      <div className="md:hidden space-y-4">
        {unApprovedRestaurants.map((restaurant) => {
          const date = new Date(restaurant.created_at).toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          });

          return (
            <Card key={restaurant.id}>
              <CardHeader>
                <CardTitle>{restaurant.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">
                  {restaurant.address}
                </p>
                <div className="grid grid-cols-1 gap-2 text-sm">
                  <div>
                    <p className="font-semibold">Contact:</p>
                    <p>{restaurant.email}</p>
                    <p>{`0${restaurant.phoneNumber}`}</p>
                  </div>
                  <div>
                    <p className="font-semibold capitalize">Cuisine:</p>
                    <p className="capitalize">{restaurant.cuisine}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Location:</p>
                    <p className="capitalize">{restaurant.location}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Applied On:</p>
                    <p className="whitespace-nowrap">{date}</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button
                  size="sm"
                  className="bg-green-600 hover:bg-green-700 text-white"
                  onClick={() => approve(restaurant.id)}
                >
                  Approve
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="bg-red-100 text-red-600 hover:bg-red-200"
                  onClick={() => reject(restaurant.id)}
                >
                  Reject
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </>
  );
}
