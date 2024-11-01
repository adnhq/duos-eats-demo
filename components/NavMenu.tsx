import { User } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { AuthModal } from "./AuthModal";

const gradientTextClass =
  "bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 font-semibold hover:from-yellow-500 hover:to-amber-600 transition-all duration-300";

type Props = {
  isLoggedIn: boolean;
  isMenuOpen: boolean;
};

export default function NavMenu({ isLoggedIn, isMenuOpen }: Props) {
  return (
    <>
      {isMenuOpen && (
        <div className="md:hidden mt-4 space-y-6">
          <Link
            href="/restaurants"
            className="block hover:text-primary transition-colors"
          >
            Restaurants
          </Link>
          <Link
            href="/about"
            className="block hover:text-primary transition-colors"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="block hover:text-primary transition-colors"
          >
            Contact
          </Link>
          <Link href="/registration" className={`${gradientTextClass} block`}>
            Become a Partner
          </Link>
          {isLoggedIn ? (
            <div className="space-y-2 bg-gray-100 p-4 rounded-lg mt-6">
              <div className="flex items-center space-x-2 mb-4">
                <User className="h-5 w-5" />
                <span className="tracking-wide font-semibold">Wasif</span>
              </div>
              <Link href="/account-settings" passHref>
                <Button
                  variant="ghost"
                  className="w-full justify-start hover:bg-gray-200"
                >
                  Account Settings
                </Button>
              </Link>
              <Link href="/admin-dashboard" passHref>
                <Button
                  variant="ghost"
                  className="w-full justify-start hover:bg-gray-200"
                >
                  Admin Dashboard
                </Button>
              </Link>
              <Link href="/restaurant-dashboard" passHref>
                <Button
                  variant="ghost"
                  className="w-full justify-start hover:bg-gray-200"
                >
                  Restaurant Dashboard
                </Button>
              </Link>
              <Button
                variant="destructive"
                className="w-full mt-4"
                // onClick={handleLogout}
              >
                Log out
              </Button>
            </div>
          ) : (
            <div className="mt-6">
              <AuthModal />
            </div>
          )}
        </div>
      )}
    </>
  );
}
