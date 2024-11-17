import { getSession } from "@/lib/actions";
import { JWTPayload } from "jose";
import Image from "next/image";
import Link from "next/link";
import duosLogo from "../duos-lg.png";
import MobileNavbar from "./MobileNavbar";
import DesktopNavbar from "./DesktopNavbar";

export default async function Navbar() {
  const session = await getSession();

  return (
    // <nav className="bg-gradient-to-tl from-orange-100 to-orange-50">
    <nav className={`relative max-w-7xl mx-auto`}>
      <div className="absolute z-10 w-full px-4 sm:px-6 lg:px-8 py-4 ">
        <div className="flex justify-between items-center">
          <Link href="/" className="cursor-pointer">
            <Image src={duosLogo} alt="DUOS Logo" width={128} height={56} />
          </Link>

          {/* Desktop Navigation */}
          <DesktopNavbar session={session as JWTPayload} />

          {/* Mobile Menu Button */}
          <MobileNavbar session={session as JWTPayload} />
        </div>
      </div>
    </nav>
  );
}
