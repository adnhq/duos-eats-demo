"use client";
import { Spline_Sans } from "next/font/google";
import React, { startTransition } from "react";
import { Card } from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import { Pencil, Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteMenuItem } from "@/lib/actions";
import { useToast } from "@/hooks/use-toast";

const splineSans = Spline_Sans({ subsets: ["latin"], weight: ["500"] });

type Props = {
  item: {
    id: string;
    name: string;
    price: number;
    description: string;
    image: string;
    popular: boolean;
  };
};

export default function EditMenuItemCard({ item }: Props) {
  const { toast } = useToast();

  async function handleDelete() {
    try {
      const result = await deleteMenuItem(item.id);

      if (result.success) {
        toast({
          title: "Menu updated",
          description: "The item has been deleted successfully.",
        });
      }
    } catch (error) {
      toast({
        title: "Deleting failed",
        description: (error as any)?.message,
        variant: "destructive",
      });
    }
  }

  return (
    <Card className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 p-4 rounded-lg shadow-sm">
      <div className="relative w-full sm:w-24 h-48 sm:h-24 flex-shrink-0">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="rounded-md object-cover"
        />
      </div>
      <div className="flex-grow w-full">
        <h3 className={`${splineSans.className} tracking-wide`}>{item.name}</h3>
        <p className="text-sm text-muted-foreground">{item.description}</p>
        <div className="mt-2 flex justify-between sm:items-center space-y-2 sm:space-y-0 items-center">
          <p className="font-semibold">Tk {item.price}</p>
          <div className="flex gap-2">
            <Button asChild variant={"outline"}>
              <Link href={`/restaurant/EditMenu/${item.id}`}>
                <Pencil className="w-4 h-4" />
              </Link>
            </Button>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant={"destructive"}>
                  <Trash className="w-4 h-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    this item from your menu on our site.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    className="bg-red-500 text-slate-100 hover:bg-red-400"
                    onClick={handleDelete}
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>
    </Card>
  );
}
