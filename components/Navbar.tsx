import React from 'react';
import { UtensilsCrossed } from "lucide-react";
import { AuthModal } from "./AuthModal";  // Make sure to import the AuthModal component

export default function Navbar() {
  return (
    <nav className="bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <UtensilsCrossed className="h-6 w-6 text-primary" />
          <span className="text-2xl font-extrabold text-zinc-800">DUOS</span>
        </div>
        <div className="hidden md:flex space-x-6">
          <a href="#" className="hover:text-primary transition-colors">Restaurants</a>
          <a href="#" className="hover:text-primary transition-colors">Locations</a>
          <a href="#" className="hover:text-primary transition-colors">About</a>
          <a href="#" className="hover:text-primary transition-colors">Contact</a>
        </div>
        <AuthModal />
      </div>
    </nav>
  );
}