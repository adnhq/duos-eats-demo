"use client";
import {
  clearCart,
  getCart,
  getTotalCartPrice,
} from "@/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { CartItemType } from "@/lib/types";
import { BaggageClaim, ShoppingBag, Trash } from "lucide-react";
import CartItem from "./CartItem";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

export default function Cart() {
  const cart = useAppSelector(getCart);
  const cartTotalPrice = useAppSelector(getTotalCartPrice);
  const dispatch = useAppDispatch();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="fixed bottom-4 right-4">
          <Button className="rounded-full w-16 h-16 shadow-lg relative">
            {cart.items.length !== 0 && (
              <p className="absolute bg-amber-400 -top-1 -right-1  h-6 w-6 rounded-md text-xs font-medium flex items-center justify-center border border-zinc-500">
                {cart.items.length}
              </p>
            )}
            <ShoppingBag className="h-6 w-6" />
          </Button>
        </div>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md flex flex-col">
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
        </SheetHeader>
        <div className="flex-grow overflow-auto">
          <ScrollArea className="h-full">
            <div className="grid grid-cols-1 py-4">
              {cart.items.length === 0 ? (
                <p>Your cart is empty.</p>
              ) : (
                cart.items.map((item: CartItemType) => (
                  <CartItem key={item.id} item={item} />
                ))
              )}
            </div>
          </ScrollArea>
        </div>
        <div className="border-t pt-4 mt-auto">
          <div className="flex justify-between items-center mb-4">
            <span className="font-semibold">Total:</span>
            <span className="font-semibold">
              Tk {cartTotalPrice.toFixed(2)}
            </span>
          </div>

          <div className="flex flex-col gap-4">
            <Button className="w-full" disabled={cart.items.length === 0}>
              <BaggageClaim className="h-4 w-4" /> Checkout
            </Button>

            {cart.items.length > 0 && (
              <Button
                className="w-full"
                variant={"destructive"}
                onClick={() => dispatch(clearCart())}
              >
                <Trash className="h-4 w-4" /> Clear Cart
              </Button>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
