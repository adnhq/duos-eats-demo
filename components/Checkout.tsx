"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  clearCart,
  currentDiscount,
  getCart,
  getTotalCartActualPrice,
  getTotalCartPriceAfterDiscount,
  prevResturantId,
} from "@/features/cart/cartSlice";
import { useToast } from "@/hooks/use-toast";
import { getRestaurant, getSession, getUser, placeOrder } from "@/lib/actions";
import {
  calcPlatformFee,
  DUOS_PERCENTAGE,
  priceWithDiscount,
  vatExtraPrice,
} from "@/lib/helper";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { CartItemType, Restaurant, User } from "@/lib/types";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import CartItem from "./CartItem";
import Spinner from "./Spinner";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";

const BackgroundSVG = () => (
  <svg
    className="absolute inset-0 w-full h-full"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1440 320"
    preserveAspectRatio="none"
  >
    <path
      fill="rgb(255, 237, 213)"
      fillOpacity="0.5"
      d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,85.3C672,75,768,85,864,112C960,139,1056,181,1152,181.3C1248,181,1344,139,1392,117.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
    ></path>
    <path
      fill="rgb(254, 215, 170)"
      fillOpacity="0.5"
      d="M0,192L48,197.3C96,203,192,213,288,202.7C384,192,480,160,576,165.3C672,171,768,213,864,218.7C960,224,1056,192,1152,165.3C1248,139,1344,117,1392,106.7L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
    ></path>
    <path
      fill="rgb(251, 146, 60)"
      fillOpacity="0.3"
      d="M0,256L48,261.3C96,267,192,277,288,266.7C384,256,480,224,576,213.3C672,203,768,213,864,224C960,235,1056,245,1152,234.7C1248,224,1344,192,1392,176L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
    ></path>
  </svg>
);

export default function Checkout() {
  const cart = useAppSelector(getCart);
  const restaurantId = useAppSelector(prevResturantId);
  const discount = useAppSelector(currentDiscount);
  const cartTotalPrice = useAppSelector(getTotalCartActualPrice);
  const cartTotalDiscountPrice = useAppSelector(getTotalCartPriceAfterDiscount);

  // const cartTotalQuantity = useAppSelector(getTotalCartQuantity);

  const [restaurantInfo, setRestaurantInfo] = useState<Restaurant | null>(null);
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [isPending, startTransition] = useTransition();
  const [isFetching, startFetchTransition] = useTransition();
  const { toast } = useToast();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const discountPriceWithVat =
    cartTotalDiscountPrice +
    vatExtraPrice(cartTotalDiscountPrice, (restaurantInfo as Restaurant)?.vat);

  useEffect(() => {
    async function getInfo() {
      startFetchTransition(async () => {
        if (cart.items.length === 0) return;

        const restaurant = await getRestaurant(restaurantId);
        setRestaurantInfo(restaurant[0]);

        const session = await getSession();
        if (session === null) return router.push("/login");

        const user = await getUser(session.id);
        setUserInfo(user);
      });
    }

    getInfo();
  }, [restaurantId, router, cart.items.length]);

  async function handleCheckout() {
    if (!userInfo || !restaurantInfo) {
      toast({
        title: "Error",
        description: "User information is missing. Please try again.",
        variant: "destructive",
      });
      return;
    }

    if (restaurantInfo === null) return;

    const orderData = {
      userId: userInfo.id,
      restaurantId: restaurantId as number,
      actualTotal: cartTotalPrice,
      discountTotal:
        restaurantInfo.vat > 0 ? discountPriceWithVat : cartTotalDiscountPrice,
      restaurantEarning:
        restaurantInfo.vat > 0
          ? priceWithDiscount(cartTotalPrice, discount + DUOS_PERCENTAGE) +
            vatExtraPrice(cartTotalDiscountPrice, restaurantInfo.vat)
          : priceWithDiscount(cartTotalPrice, discount + DUOS_PERCENTAGE),
      platformFee: calcPlatformFee(cartTotalPrice),
      discount: discount,
      items: cart.items.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.priceAfterDiscount,
        extraParams: item.extraParams as string[],
        quantity: item.quantity,
      })),
    };

    startTransition(async () => {
      try {
        const res = await placeOrder(orderData);

        if (res.success) {
          toast({
            title: "Success",
            description: "Your order has been placed successfully!",
          });

          router.push(`/users/checkout-success?orderId=${res.orderId}`);
          dispatch(clearCart());
        } else {
          throw new Error("Failed to place order");
        }
      } catch (error) {
        toast({
          title: "Error",
          description: (error as Error).message,
          variant: "destructive",
        });
      }
    });
  }

  if (!restaurantInfo) return null;

  return (
    <div className="bg-orange-50 relative overflow-hidden min-h-screen">
      <BackgroundSVG />
      <div className="max-w-7xl mx-auto px-8 py-8 relative z-10 mt-32">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        {isFetching ? (
          <Spinner />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[0.65fr_0.35fr] gap-8">
            {/* Left Column - Order Items */}
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Your order</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 py-4">
                  {cart.items.length === 0 ? (
                    <p>Your cart is empty.</p>
                  ) : (
                    cart.items.map((item: CartItemType, id) => (
                      <CartItem key={id} item={item} />
                    ))
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Right Column - Order Summary */}
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardContent className="space-y-6 pt-6">
                <div>
                  <h3 className="font-semibold mb-2">Your Personal Details</h3>
                  <p className="text-sm">
                    <span className="font-medium">Name:</span> {userInfo?.name}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Email:</span>{" "}
                    {userInfo?.email}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Phone:</span> 0
                    {userInfo?.phoneNumber}
                  </p>
                </div>

                <Separator />
                <div>
                  <h2 className="text-xl font-semibold mb-2">
                    Ordering from {restaurantInfo?.name}
                  </h2>

                  {cart.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between text-sm mt-1"
                    >
                      <span>
                        {item.quantity}x {item.name}
                      </span>
                      <span>
                        Tk -{" "}
                        {(
                          item.priceAfterDiscount * item.quantity
                        ).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>Tk {cartTotalPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Discount</span>
                    <Badge
                      variant="secondary"
                      className="bg-green-100 text-green-800"
                    >
                      {discount}%
                    </Badge>
                  </div>

                  {restaurantInfo.vat > 0 && (
                    <div className="flex justify-between text-sm">
                      <span>VAT</span>

                      <Badge variant="destructive" className="bg-red-400">
                        {restaurantInfo.vat}%
                      </Badge>
                    </div>
                  )}

                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span className="text-green-600">
                      Tk{" "}
                      {restaurantInfo?.vat > 0
                        ? discountPriceWithVat.toLocaleString()
                        : cartTotalDiscountPrice.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground text-right">
                    (incl. discount and tax)
                  </p>
                </div>

                <div className="mt-4">
                  <p className="text-sm font-medium mb-1">Savings</p>
                  {restaurantInfo.vat > 0 ? (
                    <Progress
                      value={
                        ((cartTotalPrice - discountPriceWithVat) /
                          cartTotalPrice) *
                        100
                      }
                      className="h-2"
                    />
                  ) : (
                    <Progress
                      value={
                        ((cartTotalPrice - cartTotalDiscountPrice) /
                          cartTotalPrice) *
                        100
                      }
                      className="h-2"
                    />
                  )}
                  <p className="text-xs text-muted-foreground mt-1">
                    You saved Tk{" "}
                    {restaurantInfo.vat
                      ? (cartTotalPrice - discountPriceWithVat).toLocaleString()
                      : (
                          cartTotalPrice - cartTotalDiscountPrice
                        ).toLocaleString()}
                  </p>
                </div>
              </CardContent>

              <CardFooter>
                <Button
                  className="w-full"
                  disabled={isPending || cart.items.length === 0}
                  onClick={handleCheckout}
                >
                  {isPending ? (
                    <>
                      <span className="">Placing order</span>
                      <span className="animate-spin">
                        <Loader2 className="h-4 w-4" />
                      </span>
                    </>
                  ) : (
                    <>Place order</>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
