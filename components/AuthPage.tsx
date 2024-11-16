"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Utensils } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import RestaurantLoginForm from "./RestaurantLoginForm";
import UserLoginForm from "./UserLoginForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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

const AuthPage = () => {
  const router = useRouter();

  return (
    <main className="min-h-screen w-full flex flex-col justify-center items-center relative bg-gradient-to-b from-white to-orange-50">
      <BackgroundSVG />

      <div className="relative z-10 w-full max-w-md mx-auto px-4 py-8">
        <Card className="backdrop-blur-sm shadow-xl">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">
              Welcome Back
            </CardTitle>
            <CardDescription className="text-center">
              Sign in to continue your journey
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="user" className="w-full">
              <TabsList className="grid w-full grid-cols-2 h-12 p-1 bg-gray-100 rounded-lg mb-6">
                <TabsTrigger
                  value="user"
                  className="h-full data-[state=active]:bg-white data-[state=active]:text-amber-500 data-[state=active]:shadow-sm rounded-md transition-all flex items-center justify-center gap-2"
                >
                  <Users className="h-4 w-4" />
                  Customer
                </TabsTrigger>
                <TabsTrigger
                  value="restaurant"
                  className="h-full data-[state=active]:bg-white data-[state=active]:text-amber-500 data-[state=active]:shadow-sm rounded-md transition-all flex items-center justify-center gap-2"
                >
                  <Utensils className="h-4 w-4" />
                  Restaurant
                </TabsTrigger>
              </TabsList>

              <TabsContent value="user" className="mt-0">
                <UserLoginForm />
                <div className="mt-6 text-center">
                  <p className="text-sm text-muted-foreground font-medium">
                    New to our platform?{" "}
                    <button
                      onClick={() => router.push("/signup")}
                      className="font-medium text-amber-500 hover:text-amber-600"
                    >
                      Create an account
                    </button>
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="restaurant" className="mt-0">
                <RestaurantLoginForm />
                <div className="mt-6 text-center">
                  <p className="text-sm text-muted-foreground font-medium">
                    Want to partner with us?{" "}
                    <Link
                      href="/registration"
                      className="font-medium text-amber-500 hover:text-amber-600"
                    >
                      Register your restaurant
                    </Link>
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <button className="text-sm text-muted-foreground font-medium hover:text-amber-500">
              Forgot your password?
            </button>
          </CardFooter>
        </Card>
      </div>

      {/* Decorative Emojis */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-around">
        {["🍔", "🍕", "🍣", "🥗", "🍰"].map((emoji, index) => (
          <span
            key={index}
            className="text-4xl md:text-5xl lg:text-6xl opacity-30"
          >
            {emoji}
          </span>
        ))}
      </div>
    </main>
  );
};

export default AuthPage;
