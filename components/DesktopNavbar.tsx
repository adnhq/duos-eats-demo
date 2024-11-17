"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logout } from "@/lib/actions";
import { JWTPayload } from "jose";
import { User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "./ui/button";

export default function DesktopNavbar({ session }: { session: JWTPayload }) {
  const gradientTextClass = `bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-red-500 hover:from-yellow-500 hover:to-amber-600 transition-all duration-300`;

  const navLinks = [
    { href: "/", label: "Restaurants" },
    { href: "/about", label: "About" },
  ];

  const router = useRouter();

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
    <div className="hidden md:flex items-center space-x-6">
      <div className="flex space-x-6">
        {navLinks.map((link) => (
          <button
            key={link.href}
            onClick={() => handleRedirect(link.href)}
            className="hover:text-primary transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary after:transform after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100 text-base font-medium"
          >
            {link.label}
          </button>
        ))}
        {!session && (
          <button
            onClick={() => handleRedirect("/registration")}
            className={`${gradientTextClass} relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-gradient-to-r after:from-yellow-500 after:to-amber-500 after:transform after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100 font-semibold`}
          >
            Partner With Us
          </button>
        )}
      </div>

      {session ? (
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
          <DropdownMenuTrigger className="flex items-center space-x-2">
            <User className="h-5 w-5" />
            <span className="tracking-wide font-semibold">
              {(session as JWTPayload).name as string}
            </span>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>
              {(session as JWTPayload).name as string}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            {session?.role === "admin" && (
              <DropdownMenuItem
                onClick={() => handleRedirect("/admin/Dashboard")}
              >
                Dashboard
              </DropdownMenuItem>
            )}

            {session?.role === "user" && (
              <DropdownMenuItem
                onClick={() => handleRedirect("/users/Dashboard/orders")}
              >
                Dashboard
              </DropdownMenuItem>
            )}

            {session?.role === "restaurant" && (
              <>
                <DropdownMenuItem onClick={() => handleRedirect("/restaurant")}>
                  Dashboard
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => handleRedirect("/restaurant/Settings")}
                >
                  Account Settings
                </DropdownMenuItem>
              </>
            )}
            <DropdownMenuSeparator />

            <Button
              className="w-full"
              variant="destructive"
              onClick={handleLogout}
            >
              Log out
            </Button>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <>
          <Button
            onClick={() => handleRedirect("/login")}
            variant={"secondary"}
          >
            Log in
          </Button>

          <Button
            className="w-full md:w-auto"
            onClick={() => handleRedirect("/signup")}
          >
            Sign up
          </Button>
        </>
      )}
    </div>
  );
}
