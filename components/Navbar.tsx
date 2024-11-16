import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getSession, logout } from "@/lib/actions";
import { JWTPayload } from "jose";
import { User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import duosLogo from "../duos-lg.png";
import MobileNavbar from "./MobileNavbar";
import { Button } from "./ui/button";

export default async function Navbar() {
  const session = await getSession();

  const gradientTextClass = `bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-red-500 hover:from-yellow-500 hover:to-amber-600 transition-all duration-300`;

  const navLinks = [
    { href: "/", label: "Restaurants" },
    { href: "/about", label: "About" },
  ];

  return (
    // <nav className="bg-gradient-to-tl from-orange-100 to-orange-50">
    <nav className={`relative max-w-7xl mx-auto`}>
      <div className="absolute z-10 w-full px-4 sm:px-6 lg:px-8 py-4 ">
        <div className="flex justify-between items-center">
          <Link href="/" className="cursor-pointer">
            <Image src={duosLogo} alt="DUOS Logo" width={128} height={56} />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="hover:text-primary transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary after:transform after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100 text-base font-medium"
                >
                  {link.label}
                </Link>
              ))}
              {!session && (
                <Link
                  href="/registration"
                  className={`${gradientTextClass} relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-gradient-to-r after:from-yellow-500 after:to-amber-500 after:transform after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100 font-semibold`}
                >
                  Partner With Us
                </Link>
              )}
            </div>

            {session ? (
              <DropdownMenu>
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
                    <DropdownMenuItem>
                      <Link href="/admin/Dashboard" className="w-full">
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                  )}

                  {session?.role === "user" && (
                    <DropdownMenuItem>
                      <Link href="/users/Dashboard/orders" className="w-full">
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                  )}

                  {session?.role === "restaurant" && (
                    <>
                      <DropdownMenuItem>
                        <Link href="/restaurant" className="w-full">
                          Dashboard
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link href="/restaurant/Settings" className="w-full">
                          Account Settings
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuSeparator />
                  <form
                    action={async () => {
                      "use server";
                      await logout();
                      redirect("/");
                    }}
                  >
                    <Button className="w-full" variant="destructive">
                      Log out
                    </Button>
                  </form>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button
                  asChild
                  variant={"secondary"}
                  // className="w-full md:w-auto bg-transparent hover:bg-transparent border-amber-500 hover:shadow-inner"
                >
                  <Link href="/login">Log in</Link>
                </Button>

                <Button asChild className="w-full md:w-auto">
                  <Link href="/signup">Sign up</Link>
                </Button>
              </>
            )}
          </div>

          {/* Desktop Auth Section */}
          {/* <div className="hidden md:flex items-center space-x-6"></div> */}

          {/* Mobile Menu Button */}
          <MobileNavbar session={session as JWTPayload} />
        </div>
      </div>
    </nav>
  );
}
