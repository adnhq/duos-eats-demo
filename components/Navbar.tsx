'use client'
import React, { useState, useEffect } from 'react';
import { UtensilsCrossed, Menu, X, User } from "lucide-react";
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

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check localStorage for login state when component mounts
    const loginState = localStorage.getItem('isLoggedIn');
    if (loginState === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
    setIsMenuOpen(false);
  };

  const handleNavigation = (route) => {
    window.location.href = route;
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2 group">
            <UtensilsCrossed className="h-6 w-6 text-primary group-hover:text-primary/80 transition-colors duration-300" />
            <span className="text-2xl font-bold text-zinc-800 group-hover:text-zinc-600 transition-colors duration-300">DUOS</span>
          </Link>
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex space-x-6">
              <a href="#" className="hover:text-primary transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary after:transform after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100">Restaurants</a>
              <a href="#" className="hover:text-primary transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary after:transform after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100">About</a>
              <a href="#" className="hover:text-primary transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary after:transform after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100">Contact</a>
              <Link href="/registration" className="bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent font-semibold hover:from-yellow-500 hover:to-amber-600 transition-all duration-300 relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-gradient-to-r after:from-yellow-400 after:to-amber-500 after:transform after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100">Become a Partner</Link>
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
                  <DropdownMenuItem onClick={() => handleNavigation('/account-settings')}>Account Settings</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleNavigation('/admin-dashboard')}>Admin Dashboard</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleNavigation('/dashboard')}>Restaurant Dashboard</DropdownMenuItem>
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
          <div className="md:hidden mt-4 space-y-4">
            <a href="#" className="block hover:text-primary transition-colors">Restaurants</a>
            <a href="#" className="block hover:text-primary transition-colors">About</a>
            <a href="#" className="block hover:text-primary transition-colors">Contact</a>
            <Link href="/registration" className="block bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent font-semibold hover:from-yellow-500 hover:to-amber-600 transition-all duration-300">Become a Partner</Link>
            {isLoggedIn ? (
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>Wasif</span>
                </div>
                <Button variant="outline" className="w-full justify-start" onClick={() => handleNavigation('/account-settings')}>
                  Account Settings
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => handleNavigation('/admin-dashboard')}>
                  Admin Dashboard
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => handleNavigation('/dashboard')}>
                  Restaurant Dashboard
                </Button>
                <Button variant="destructive" className="w-full" onClick={handleLogout}>
                  Log out
                </Button>
              </div>
            ) : (
              <AuthModal onLogin={handleLogin} />
            )}
          </div>
        )}
      </div>
    </nav>
  );
}