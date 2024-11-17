import {
  CheckCircle,
  ChevronRight,
  Clock,
  CreditCard,
  MapPin,
  Receipt,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getOrder } from "@/lib/actions";
import { Button } from "./ui/button";
import Link from "next/link";
import { Badge } from "./ui/badge";

export default async function ThankYou({ orderId }: { orderId: string }) {
  const order = await getOrder(orderId);

  return (
    <Card className="w-full max-w-2xl bg-white/80 backdrop-blur-sm shadow-xl">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 h-20 w-20 text-green-600">
          <CheckCircle className="h-full w-full" />
        </div>
        <CardTitle className="text-3xl font-bold text-green-800">
          Thank You for Your Order!
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-center text-gray-600">
          Your order has been successfully placed. We&apos;re preparing your
          delicious meal!
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex items-center gap-2">
            <Receipt className="h-5 w-5 text-gray-500" />
            <span className="font-medium">Order ID:</span> #{orderId}
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-gray-500" />
            <span className="font-medium">Restaurant:</span>{" "}
            {order.Restaurants.name}
          </div>

          <div className="flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-gray-500" />
            <span className="font-medium">Total:</span> Tk{" "}
            {order.discountTotal.toFixed(2)}
          </div>

          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-gray-500" />
            <span className="font-medium">Order Status:</span>{" "}
            <Badge
              variant={"secondary"}
              className="bg-green-100 text-green-800"
            >
              {order.status}
            </Badge>
          </div>
        </div>

        <Separator />
        <div className="flex items-center justify-center">
          <Button asChild variant={"outline"}>
            <Link href="/">
              Go back to Home
              <ChevronRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
