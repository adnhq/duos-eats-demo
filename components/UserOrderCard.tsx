"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { OrderType } from "@/lib/types";
import { format } from "date-fns";
import { Eye } from "lucide-react";

export default function UserOrderCard({ order }: { order: OrderType }) {
  const orderCreatingTime = format(
    new Date(order.created_at),
    "yyyy-MM-dd HH:mm a"
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>
            Order #{order.id} from {order.Restaurants.name}
          </span>
          {order.status === "pending" && <Badge>{order.status}</Badge>}
          {order.status === "processing" && (
            <Badge variant="outline">{order.status}</Badge>
          )}
          {order.status === "cancelled" && (
            <Badge variant="destructive">{order.status}</Badge>
          )}
          {order.status === "completed" && (
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              {order.status}
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">{orderCreatingTime}</p>

          <p className="font-medium">Total: BDT {order.discountTotal}</p>

          <Badge variant="secondary" className="bg-green-100 text-green-800">
            {order.discount}% discount applied
          </Badge>
        </div>
      </CardContent>
      <CardFooter>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="w-full">
              <Eye className="mr-2 h-4 w-4" />
              View Details
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Order Details</DialogTitle>
              <DialogDescription>
                Order #{order.id} • {orderCreatingTime}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              {order.OrderItems.map((item, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center py-2 border-b"
                >
                  <div>
                    <p className="font-medium">{item.Menu.name}</p>
                    {item.extraParams !== null &&
                      item.extraParams.map((extraParam, idx) => (
                        <p className="text-xs" key={idx}>{`${
                          extraParam.split(":")[0]
                        } - ${extraParam.split(":")[1]}`}</p>
                      ))}
                    <p className="text-sm text-muted-foreground">
                      BDT {item.actualCurrentPrice} × {item.quantity}
                    </p>
                  </div>
                  <p className="font-medium">
                    BDT {item.actualCurrentPrice * item.quantity}
                  </p>
                </div>
              ))}
              <div className="flex justify-between items-center pt-2">
                <p className="font-bold">Total</p>
                <p className="font-bold">BDT {order.discountTotal}</p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}
