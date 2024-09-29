'use client'

import React, { useState, useEffect } from 'react';
import { Menu, X, User } from "lucide-react";
import { AuthModal } from "./AuthModal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import duosLogo from '../duos-lg.png';
import Image from 'next/image';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const loginState = localStorage.getItem('isLoggedIn');
    if (loginState === 'true') {
      setIsLoggedIn(true);
    }

    setIsMenuOpen(false);
  }, [pathname]);

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
    setIsMenuOpen(false);
  };

  const gradientTextClass = "bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 font-semibold hover:from-yellow-500 hover:to-amber-600 transition-all duration-300";

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
                style={{ objectFit: 'contain' }}
                priority
              />
            </div>
          </Link>
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex space-x-6">
              <Link href="/restaurants" className="hover:text-primary transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary after:transform after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100">Restaurants</Link>
              <Link href="/about" className="hover:text-primary transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary after:transform after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100">About</Link>
              <Link href="/contact" className="hover:text-primary transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary after:transform after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100">Contact</Link>
              <Link href="/registration" className={`${gradientTextClass} relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-gradient-to-r after:from-yellow-400 after:to-amber-500 after:transform after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100`}>Become a Partner</Link>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>Wasif</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link href="/account-settings" className="w-full">Account Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/admin-dashboard" className="w-full">Admin Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/dashboard" className="w-full">Restaurant Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600" onClick={handleLogout}>
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <AuthModal onLogin={handleLogin} />
            )}
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-zinc-800 hover:text-primary transition-colors">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-6">
            <Link href="/restaurants" className="block hover:text-primary transition-colors">Restaurants</Link>
            <Link href="/about" className="block hover:text-primary transition-colors">About</Link>
            <Link href="/contact" className="block hover:text-primary transition-colors">Contact</Link>
            <Link href="/registration" className={`${gradientTextClass} block`}>Become a Partner</Link>
            {isLoggedIn ? (
              <div className="space-y-2 bg-gray-100 p-4 rounded-lg mt-6">
                <div className="flex items-center space-x-2 mb-4">
                  <User className="h-5 w-5" />
                  <span className="font-semibold">Wasif</span>
                </div>
                <Link href="/account-settings" passHref>
                  <Button variant="ghost" className="w-full justify-start hover:bg-gray-200">
                    Account Settings
                  </Button>
                </Link>
                <Link href="/admin-dashboard" passHref>
                  <Button variant="ghost" className="w-full justify-start hover:bg-gray-200">
                    Admin Dashboard
                  </Button>
                </Link>
                <Link href="/dashboard" passHref>
                  <Button variant="ghost" className="w-full justify-start hover:bg-gray-200">
                    Restaurant Dashboard
                  </Button>
                </Link>
                <Button variant="destructive" className="w-full mt-4" onClick={handleLogout}>
                  Log out
                </Button>
              </div>
            ) : (
              <div className="mt-6">
                <AuthModal onLogin={handleLogin} />
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}