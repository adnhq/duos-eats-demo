import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { getSession, logout } from "@/lib/actions";
import { JWTPayload } from "jose";
import { Menu, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import duosLogo from "../duos-lg.png";
import { AuthModal } from "./AuthModal";
import { Button } from "./ui/button";
import { Inter_Tight, Permanent_Marker, Roboto, Roboto_Slab } from "next/font/google";
const nav_font = Roboto_Slab({ subsets: ["latin"], weight: ["400"] });
const partner_font = Permanent_Marker({ subsets: ["latin"], weight: ["400"] });
export default async function Navbar() {
  const session = await getSession();
  

  const gradientTextClass =
    `bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-red-500 hover:from-yellow-500 hover:to-amber-600 transition-all duration-300 ${partner_font.className}`;

  const navLinks = [
    { href: "/", label: "Restaurants" },
    { href: "/about", label: "About" },
  ];

  return (
    // <nav className="bg-gradient-to-tl from-orange-100 to-orange-50">
    <nav className={`relative max-w-7xl mx-auto ${nav_font.className}`}>
      <div className="absolute z-10 w-full px-4 sm:px-6 lg:px-8 py-4 ">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <div className="relative w-32 h-14">
              <Image
                src={duosLogo}
                alt="DUOS Logo"
                fill
                style={{ objectFit: "contain" }}
                priority
              />
            </div>
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
                  className={`${gradientTextClass} relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-gradient-to-r after:from-yellow-500 after:to-amber-500 after:transform after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100`}
                >
                  Partner With Us
                </Link>
              )}
            </div>
          </div>

          {/* Desktop Auth Section */}
          <div className="hidden md:flex items-center space-x-6">
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

                  {session?.isAdmin ? (
                    <DropdownMenuItem>
                      <Link href="/admin-dashboard" className="w-full">
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                  ) : (
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
              <AuthModal />
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Sheet>
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
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`text-base tracking-wider hover:text-primary transition-colors duration-300 ${nav_font.className}`}
                    >
                      {link.label}
                    </Link>
                  ))}
                  {!session && (
                    <Link
                      href="/registration"
                      className={`${gradientTextClass} text-lg`}
                    >
                      Partner With Us
                    </Link>
                  )}
                  {session ? (
                    <div className="space-y-3 pt-4 border-t">
                      <div className="flex justify-center gap-2 items-center mb-4">
                        <User className="h-5 w-5" />
                        <p className="font-semibold">
                          {(session as JWTPayload).name as string}
                        </p>
                      </div>
                      {session?.isAdmin ? (
                        <Link
                          href="/admin-dashboard"
                          className="block hover:text-primary text-base text-muted-foreground"
                        >
                          Dashboard
                        </Link>
                      ) : (
                        <>
                          <Link
                            href="/restaurant/OrderStats"
                            className="block hover:text-primary text-sm text-muted-foreground"
                          >
                            Dashboard
                          </Link>
                          <Link
                            href="/restaurant/Settings"
                            className="block hover:text-primary text-sm text-muted-foreground"
                          >
                            Account Settings
                          </Link>
                        </>
                      )}
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
                    </div>
                  ) : (
                    <div className="pt-4 border-t">
                      <AuthModal />
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
