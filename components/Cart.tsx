"use client";
import {
  clearCart,
  getCart,
  getTotalCartPriceAfterDiscount,
  getTotalCartQuantity,
} from "@/features/cart/cartSlice";
import { getSession } from "@/lib/actions";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { CartItemType } from "@/lib/types";
import { BaggageClaim, ShoppingBag, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
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
import { useState } from "react";

export default function Cart() {
  const cart = useAppSelector(getCart);
  const cartCurrentQuantity = useAppSelector(getTotalCartQuantity);
  const cartTotalDiscountPrice = useAppSelector(getTotalCartPriceAfterDiscount);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  async function handleCheckout() {
    const session = await getSession();
    setIsOpen(false);

    if (session === null) return router.push("/login");

    if (session.role === "user") {
      router.push("/users/checkout");
    } else {
      router.push("/login");
    }
  }

  function handleClearCart() {
    dispatch(clearCart());
    setIsOpen(false);
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <div className="fixed bottom-4 right-4 z-50">
          <Button className="rounded-full w-16 h-16 shadow-lg relative">
            {cartCurrentQuantity !== 0 && (
              <p className="absolute bg-amber-400 -top-1 -right-1  h-6 w-6 rounded-md text-xs font-medium flex items-center justify-center border border-zinc-500">
                {cartCurrentQuantity}
              </p>
            )}
            <ShoppingBag className="h-6 w-6" />
          </Button>
        </div>
      </SheetTrigger>
      <SheetContent className="md:w-full sm:w-[380px] flex flex-col">
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
        </SheetHeader>
        <div className="flex-grow overflow-auto">
          <ScrollArea className="h-full">
            <div className="grid grid-cols-1 py-4">
              {cart.items.length === 0 ? (
                <p>Your cart is empty.</p>
              ) : (
                cart.items.map((item: CartItemType, id) => (
                  <CartItem key={id} item={item} />
                ))
              )}
            </div>
          </ScrollArea>
        </div>
        <div className="border-t pt-4 mt-auto">
          <div className="flex justify-between items-center mb-4">
            <span className="font-semibold">Total:</span>
            <span className="font-semibold">
              Tk {cartTotalDiscountPrice.toFixed(2)}
            </span>
          </div>

          <div className="flex flex-col gap-4">
            <Button
              className="w-full"
              disabled={cart.items.length === 0}
              onClick={handleCheckout}
            >
              <BaggageClaim className="h-4 w-4" /> Checkout
            </Button>

            {cart.items.length > 0 && (
              <Button
                className="w-full"
                variant={"destructive"}
                onClick={handleClearCart}
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
