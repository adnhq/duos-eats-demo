"use client";
import React, { useState } from "react";
import NavMenuIcon from "./NavMenuIcon";
import NavMenu from "./NavMenu";

export default function NavMenuToggle({ isLoggedIn }: { isLoggedIn: boolean }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div>
      <NavMenuIcon isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <NavMenu isLoggedIn={isLoggedIn} isMenuOpen={isMenuOpen} />
    </div>
  );
}
