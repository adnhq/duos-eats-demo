"use client";
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
import { useToast } from "@/hooks/use-toast";
import { deleteMenuItem } from "@/lib/actions";
import { MenuItem } from "@/lib/types";
import { Pencil, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import duosLogo from "../duos-lg.png";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

type Props = {
  item: MenuItem;
  role: string | unknown;
};

export default function EditMenuItemCard({ item, role }: Props) {
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
        description: (error as Error)?.message,
        variant: "destructive",
      });
    }
  }

  return (
    <Card className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-4 p-4 rounded-lg shadow-sm">
      <div className="relative w-full sm:w-24 h-48 sm:h-24 flex-shrink-0">
        <Image
          src={item.image === "undefined" ? duosLogo : item.image}
          alt={item.name}
          fill
          className="rounded-md object-cover"
        />
      </div>
      <div className="flex-grow w-full">
        <h3 className={"tracking-wide text-lg font-semibold"}>{item.name}</h3>
        <p className="text-sm text-muted-foreground">{item.description}</p>
        {item?.MenuParameters.length > 0 && (
          <>
            <h4 className="text-sm mt-2 font-semibold">Extra Options:</h4>

            {item.MenuParameters.map((parameter, idx) => (
              <div key={idx} className="text-xs flex gap-2">
                <p className="font-semibold">{parameter.name}</p>
                <p> - </p>
                <div className="flex gap-1">
                  {parameter.options.map((option, id) => (
                    <p key={id}>{`${option.name}${
                      parameter.options.length - 1 !== id ? "," : ""
                    }`}</p>
                  ))}
                </div>
              </div>
            ))}
          </>
        )}

        <div className="mt-2 flex justify-between sm:items-center space-y-2 sm:space-y-0 items-center">
          <p className="font-semibold">Tk {item.price}</p>
          <div className="flex gap-2">
            <Button asChild variant={"outline"}>
              <Link
                href={
                  role === "admin"
                    ? `/admin/EditMenu/${item.id}`
                    : `/restaurant/EditMenu/${item.id}`
                }
              >
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
