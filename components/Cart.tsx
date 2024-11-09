"use client";
import {
  clearCart,
  getCart,
  getTotalCartPrice,
  setCartUserId,
} from "@/features/cart/cartSlice";
import { getSession } from "@/lib/actions";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { CartItemType } from "@/lib/types";
import { BaggageClaim, ShoppingBag, Trash } from "lucide-react";
import { useEffect } from "react";
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
  console.log(cart);

  useEffect(() => {
    async function getCurrentUser() {
      const session = await getSession();
      if (!session) return;

      dispatch(setCartUserId(session.id));
    }

    getCurrentUser();
  }, []);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="fixed bottom-4 right-4 rounded-full w-16 h-16 shadow-lg">
          <ShoppingBag className="h-6 w-6" />
        </Button>
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
