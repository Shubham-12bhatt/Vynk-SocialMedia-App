import Link from "next/link";
import React from "react";
import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";
import { Waypoints } from "lucide-react";

function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-2.5 group transition-all duration-200"
          >
            <div className="size-9 rounded-xl bg-gradient-to-tr from-primary via-purple-500 to-indigo-400 flex items-center justify-center text-primary-foreground shadow-md group-hover:scale-105 group-hover:shadow-lg transition-all duration-200">
              <Waypoints className="size-4 animate-pulse" />
            </div>
            <span className="font-extrabold text-xl sm:text-2xl tracking-tight bg-gradient-to-r from-primary via-purple-600 to-indigo-600 bg-clip-text text-transparent group-hover:opacity-90 transition-opacity">
              Vynk
            </span>
          </Link>
        </div>

        <DesktopNavbar />
        <MobileNavbar />
      </div>
    </header>
  );
}

export default Navbar;
