"use client";

import { useState, useEffect } from "react";
import { Check, Minus, Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { MenuItem } from "@/lib/types";
import { addItem, prevResturantId } from "@/features/cart/cartSlice";
import { priceWithDiscount } from "@/lib/helper";

type Props = {
  item: MenuItem;
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
};

export default function ItemExtraParamForm({
  item,
  quantity,
  setQuantity,
}: Props) {
  const [open, setOpen] = useState(false);
  const [currentPrice, setCurrentPrice] = useState(
    priceWithDiscount(Number(item.price), Number(item.discount))
  );
  const dispatch = useAppDispatch();
  const prevRestaurantId = useAppSelector(prevResturantId);
  const { toast } = useToast();

  // Dynamically create the Zod schema based on MenuParameters
  const createFormSchema = (item: MenuItem) => {
    const schemaFields: Record<string, z.ZodType<any, any>> = {};
    item.MenuParameters?.forEach((param) => {
      schemaFields[param.name] = z.string({
        required_error: `Please select a ${param.name.toLowerCase()}.`,
      });
    });
    return z.object(schemaFields);
  };

  const FormSchema = createFormSchema(item);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  useEffect(() => {
    const subscription = form.watch((value) => {
      let newPrice = priceWithDiscount(
        Number(item.price),
        Number(item.discount)
      );
      Object.entries(value).forEach(([paramName, optionName]) => {
        const param = item.MenuParameters?.find((p) => p.name === paramName);
        const option = param?.options.find((o) => o.name === optionName);
        if (option && option.price > 0) {
          newPrice = priceWithDiscount(option.price, Number(item.discount));
        }
      });
      setCurrentPrice(newPrice);
    });
    return () => subscription.unsubscribe();
  }, [form, item]);

  const handleQuantityChange = (change: number) => {
    setQuantity((prev) => Math.max(prev + change, 0));
  };

  function onSubmit(data: z.infer<typeof FormSchema>) {
    if (prevRestaurantId !== null && prevRestaurantId !== item.restaurantId) {
      toast({
        title: "Sorry, could not add the item to cart.",
        description:
          "You have items from a different restaurant in the cart. Please clear the cart to add items from this restaurant.",
        variant: "destructive",
      });
      return;
    }

    const selectedOptions = Object.entries(data).map(
      ([key, value]) => `${key}:${value}`
    );

    const itemToBeAdded = {
      id: item.id + ":" + selectedOptions.join(","),
      name: item.name,
      image: item.image,
      price: currentPrice,
      quantity,
      restaurantId: item.restaurantId,
      extraParams: selectedOptions,
    };

    dispatch(addItem(itemToBeAdded));
    form.reset();
    setQuantity(0);

    toast({
      title: "Item added to cart",
      description: "You can view and edit your cart from the cart page.",
    });
    setOpen(false);
  }

  const isFormValid = form.formState.isValid && quantity > 0;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          variant="default"
          className="w-10 sm:w-auto"
          disabled={!quantity}
        >
          <Check className="w-4 h-4 sm:hidden" />
          <span className="hidden sm:inline">Add to Cart</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{item.name}</DialogTitle>
          <p className="text-sm font-semibold">
            Tk - {(currentPrice * quantity).toFixed(2)}
          </p>
          <p className="text-muted-foreground text-sm">
            Choose from the available options to customize your item
          </p>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {item.MenuParameters?.map((menuParameter, idx) => (
              <FormField
                key={menuParameter.name}
                control={form.control}
                name={menuParameter.name}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{menuParameter.name}</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        {menuParameter.options.map((option) => (
                          <FormItem
                            key={option.name}
                            className="flex items-center space-x-3 space-y-0"
                          >
                            <FormControl>
                              <RadioGroupItem value={option.name} />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {option.price > 0
                                ? `${option.name} - Tk ${priceWithDiscount(
                                    option.price,
                                    Number(item.discount)
                                  ).toFixed(2)}`
                                : `${option.name}`}
                            </FormLabel>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </form>
        </Form>

        <DialogFooter className="border-t pt-3 sm:flex sm:flex-row sm:justify-between w-full">
          <div className="flex items-center bg-gray-100 rounded-md">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleQuantityChange(-1)}
              disabled={!quantity}
              className="h-8 w-8 p-0"
            >
              <Minus className="w-4 h-4" />
            </Button>
            <span className="w-8 text-center text-sm">{quantity}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleQuantityChange(1)}
              className="h-8 w-8 p-0"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          <Button
            type="submit"
            onClick={form.handleSubmit(onSubmit)}
            disabled={!isFormValid || form.formState.isSubmitting}
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
