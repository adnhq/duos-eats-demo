import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getSession, logout } from "@/lib/actions";
import { User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import duosLogo from "../duos-lg.png";
import { AuthModal } from "./AuthModal";
import NavMenuToggle from "./NavMenuToggle";
import { Button } from "./ui/button";

export default async function Navbar() {
  const session = await getSession();
  console.log(session);

  const gradientTextClass =
    "bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 font-semibold hover:from-yellow-500 hover:to-amber-600 transition-all duration-300";

  return (
    <nav className="bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
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
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex space-x-6">
              <Link
                href="/"
                className="hover:text-primary transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary after:transform after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100"
              >
                Restaurants
              </Link>
              <Link
                href="/about"
                className="hover:text-primary transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary after:transform after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="hover:text-primary transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary after:transform after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100"
              >
                Contact
              </Link>
              <Link
                href="/registration"
                className={`${gradientTextClass} relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-gradient-to-r after:from-yellow-500 after:to-amber-500 after:transform after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100`}
              >
                Become a Partner
              </Link>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            {session ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span className="tracking-wide font-semibold">
                    {session.name}
                  </span>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>{session.name}</DropdownMenuLabel>
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
                    <Button className="w-full" variant={"destructive"}>
                      Log out
                    </Button>
                  </form>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <AuthModal />
            )}
          </div>
        </div>

        <NavMenuToggle isLoggedIn={session ? true : false} />
      </div>
    </nav>
  );
}
