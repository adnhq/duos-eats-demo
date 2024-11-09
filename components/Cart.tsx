"use client";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { ShoppingBag, Trash } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  clearCart,
  getCart,
  getTotalCartPrice,
  setCartUserId,
} from "@/features/cart/cartSlice";
import { CartItemType } from "@/lib/types";
import CartItem from "./CartItem";
import { useEffect } from "react";
import { getSession } from "@/lib/actions";

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
          <div className="flex justify-between items-center mt-8">
            <SheetTitle>Your Cart</SheetTitle>
            <Button
              variant={"destructive"}
              onClick={() => dispatch(clearCart())}
            >
              <Trash />
            </Button>
          </div>
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
          <Button className="w-full" disabled={cart.items.length === 0}>
            Checkout
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
