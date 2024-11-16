"use client";
import { logout } from "@/lib/actions";
import { JWTPayload } from "jose";
import { Menu, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

function MobileNavbar({ session }: { session: JWTPayload }) {
  const gradientTextClass = `bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-red-500 hover:from-yellow-500 hover:to-amber-600 transition-all duration-300`;
  const router = useRouter();

  const navLinks = [
    { href: "/", label: "Restaurants" },
    { href: "/about", label: "About" },
  ];

  const [isOpen, setIsOpen] = useState(false);

  async function handleLogout() {
    await logout();
    setIsOpen(false);
    router.push("/");
  }

  function handleRedirect(link: string) {
    setIsOpen(false);
    router.push(link);
  }

  return (
    <div className="md:hidden">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            // className="hover:bg-orange-200"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>
          <div className="flex flex-col space-y-3 mt-6">
            {navLinks.map((link) => (
              <Button
                key={link.href}
                variant={"ghost"}
                onClick={() => handleRedirect(link.href)}
              >
                {link.label}
              </Button>
            ))}
            {!session && (
              <Button
                variant={"ghost"}
                onClick={() => handleRedirect("/registration")}
                className={`${gradientTextClass} font-semibold`}
              >
                Partner With Us
              </Button>
            )}
            {session ? (
              <div className="space-y-3 pt-4 border-t">
                <div className="flex justify-center gap-2 items-center mb-4">
                  <User className="h-5 w-5" />
                  <p className="font-semibold">{session?.name as string}</p>
                </div>

                <div className="flex flex-col gap-2">
                  {session?.role === "admin" && (
                    <Button
                      variant={"ghost"}
                      onClick={() => handleRedirect("/admin/Dashboard")}
                      // className="block hover:text-primary text-base text-muted-foreground"
                    >
                      Dashboard
                    </Button>
                  )}

                  {session?.role === "user" && (
                    <Button
                      variant={"ghost"}
                      onClick={() => handleRedirect("/users/Dashboard/orders")}
                      // className="block hover:text-primary text-base text-muted-foreground"
                    >
                      Dashboard
                    </Button>
                  )}
                  {session?.role === "restaurant" && (
                    <>
                      <Button
                        variant={"ghost"}
                        onClick={() => handleRedirect("/restaurant/OrderStats")}
                      >
                        Dashboard
                      </Button>

                      <Button
                        variant={"ghost"}
                        onClick={() => handleRedirect("/restaurant/Settings")}
                      >
                        Account Settings
                      </Button>
                    </>
                  )}
                </div>

                <Button
                  onClick={handleLogout}
                  className="w-full"
                  variant="destructive"
                >
                  Log out
                </Button>
              </div>
            ) : (
              <>
                <Button
                  variant={"secondary"}
                  onClick={() => handleRedirect("/login")}
                  //   className="w-full md:w-auto bg-transparent hover:bg-transparent border-amber-500 hover:shadow-inner"
                >
                  Log in
                </Button>

                <Button onClick={() => handleRedirect("/signup")}>
                  Sign up
                </Button>
              </>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default MobileNavbar;
