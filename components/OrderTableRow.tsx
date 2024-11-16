"use client";

import { useToast } from "@/hooks/use-toast";
import { cancelOrder, confirmOrder } from "@/lib/actions";
import { OrderType } from "@/lib/types";
import { format } from "date-fns";
import { CheckCircle, Eye, Loader2, XCircle } from "lucide-react";
import { useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { TableCell, TableRow } from "./ui/table";

function OrderTableRow({ order }: { order: OrderType }) {
  const orderCreatingTime = format(
    new Date(order.created_at),
    "yyyy-MM-dd HH:mm a"
  );
  const [isLoading1, setIsLoading1] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);

  const allLoading = isLoading1 || isLoading2;
  const { toast } = useToast();

  async function acceptOrder() {
    try {
      setIsLoading1(true);
      const res = await confirmOrder(order.id);

      if (res.success) {
        toast({
          title: `Order has been confirmed.`,
          description: "Order status updated",
        });
      } else {
        throw new Error("Some unknown error occured");
      }
    } catch (error) {
      toast({
        title: "Couldn't update the order status!",
        description: (error as Error).message,
        variant: "destructive",
      });
    } finally {
      setIsLoading1(false);
    }
  }

  async function rejectOrder() {
    try {
      setIsLoading2(true);
      const res = await cancelOrder(order.id);

      if (res.success) {
        toast({
          title: `Order is cancelled`,
          description: "Order status updated",
        });
      } else {
        throw new Error("Some unknown error occured");
      }
    } catch (error) {
      toast({
        title: "Couldn't update the order status!",
        description: (error as Error).message,
        variant: "destructive",
      });
    } finally {
      setIsLoading2(false);
    }
  }

  return (
    <TableRow key={order.id}>
      <TableCell>#{order.id}</TableCell>
      <TableCell>{order.discountTotal.toFixed(2)}</TableCell>
      <TableCell>{order.restaurantEarning.toFixed(2)}</TableCell>

      <TableCell>
        <Badge variant="secondary" className="bg-green-100 text-green-800">
          {order.discount}%
        </Badge>
      </TableCell>

      <TableCell>{order.platformFee.toFixed(2)}</TableCell>

      <TableCell>
        <div className="flex space-x-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Eye className="mr-2 h-4 w-4" />
                View
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Order Details</DialogTitle>
                <DialogDescription>
                  Order #{order.id} • {orderCreatingTime}
                </DialogDescription>
              </DialogHeader>

              <div>
                <h2 className="font-semibold">Customer Details</h2>
                <p className="text-sm text-muted-foreground">
                  Name:{" "}
                  <span className="text-primary-foreground">
                    {order.Users.name}
                  </span>
                </p>
                <p className="text-sm text-muted-foreground">
                  Contact no.:
                  <span className="text-primary-foreground">
                    0{order.Users.phoneNumber}
                  </span>
                </p>
              </div>

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
          {order.status === "pending" && (
            <>
              <Button
                variant="default"
                size="sm"
                disabled={allLoading}
                onClick={acceptOrder}
              >
                {isLoading1 ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Confirming
                  </>
                ) : (
                  <>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Confirm
                  </>
                )}
              </Button>
              <Button
                variant="destructive"
                size="sm"
                disabled={allLoading}
                onClick={rejectOrder}
              >
                {isLoading2 ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Cancelling
                  </>
                ) : (
                  <>
                    <XCircle className="mr-2 h-4 w-4" />
                    Cancel
                  </>
                )}
              </Button>
            </>
          )}
        </div>
      </TableCell>
      <TableCell>
        {order.status === "pending" && <Badge>{order.status}</Badge>}

        {order.status === "cancelled" && (
          <Badge variant={"destructive"}>{order.status}</Badge>
        )}
        {order.status === "confirmed" && (
          <Badge variant={"secondary"} className="bg-green-100 text-green-800">
            {order.status}
          </Badge>
        )}
      </TableCell>
    </TableRow>
  );
}

export default OrderTableRow;
