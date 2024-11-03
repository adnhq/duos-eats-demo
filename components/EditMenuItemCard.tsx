import { Spline_Sans } from "next/font/google";
import React from "react";
import { Card } from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import { Pencil, Trash } from "lucide-react";

const splineSans = Spline_Sans({ subsets: ["latin"], weight: ["500"] });

type Props = {
  item: {
    id: number;
    name: string;
    price: number;
    description: string;
    image: string;
    popular: boolean;
  };
};

export default function EditMenuItemCard({ item }: Props) {
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

            <form>
              <Button variant={"destructive"}>
                <Trash className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </Card>
  );
}
