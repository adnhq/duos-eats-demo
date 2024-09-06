import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { ShoppingBag } from "lucide-react";

export default function Cart() {
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
            <div className="py-4">
              <p>Your cart is empty.</p>
            </div>
          </ScrollArea>
        </div>
        <div className="border-t pt-4 mt-auto">
          <div className="flex justify-between items-center mb-4">
            <span className="font-semibold">Total:</span>
            <span className="font-semibold">Tk 0.00</span>
          </div>
          <Button className="w-full" disabled>
            Checkout
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
