import { Menu, X } from "lucide-react";
import React from "react";

type Props = {
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
};

export default function NavMenuIcon({ isMenuOpen, setIsMenuOpen }: Props) {
  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="text-zinc-800 hover:text-primary transition-colors"
      >
        {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>
    </div>
  );
}
