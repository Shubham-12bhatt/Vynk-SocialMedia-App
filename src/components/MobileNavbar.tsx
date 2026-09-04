"use client";

import {
  BellIcon,
  HomeIcon,
  LogOutIcon,
  MenuIcon,
  MoonIcon,
  SunIcon,
  UserIcon,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import { useAuth, SignInButton, SignOutButton, UserButton } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import Link from "next/link";

function MobileNavbar() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { isSignedIn } = useAuth();
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex md:hidden items-center space-x-2">
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="rounded-full"
      >
        <SunIcon className="h-[1.1rem] w-[1.1rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <MoonIcon className="absolute h-[1.1rem] w-[1.1rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </Button>

      <Sheet open={showMobileMenu} onOpenChange={setShowMobileMenu}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon-sm" className="rounded-lg">
            <MenuIcon className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[300px] sm:w-[350px] p-6 flex flex-col justify-between">
          <div className="flex flex-col gap-6">
            <SheetHeader className="p-0 pb-4 border-b border-border/50">
              <SheetTitle className="flex items-center gap-2.5">
                {/* <div className="size-8 rounded-lg bg-gradient-to-tr from-primary to-purple-600 flex items-center justify-center text-primary-foreground shadow-xs">
                  <Sparkles className="size-4" />
                </div> */}
                <span className="font-extrabold bg-gradient-to-r from-primary via-purple-500 to-indigo-500 bg-clip-text text-transparent text-lg">
                  Vynk
                </span>
              </SheetTitle>
            </SheetHeader>

            <nav className="flex flex-col space-y-2">
              <Button
                variant="ghost"
                className="flex items-center gap-3 justify-start w-full text-base font-medium h-11 px-3"
                asChild
                onClick={() => setShowMobileMenu(false)}
              >
                <Link href="/">
                  <HomeIcon className="w-5 h-5 text-muted-foreground" />
                  Home
                </Link>
              </Button>

              {isSignedIn ? (
                <>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-3 justify-start w-full text-base font-medium h-11 px-3"
                    asChild
                    onClick={() => setShowMobileMenu(false)}
                  >
                    <Link href="/notifications">
                      <BellIcon className="w-5 h-5 text-muted-foreground" />
                      Notifications
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-3 justify-start w-full text-base font-medium h-11 px-3"
                    asChild
                    onClick={() => setShowMobileMenu(false)}
                  >
                    <Link href="/profile">
                      <UserIcon className="w-5 h-5 text-muted-foreground" />
                      Profile
                    </Link>
                  </Button>
                </>
              ) : null}
            </nav>
          </div>

          <div className="pt-6 border-t border-border/50">
            {isSignedIn ? (
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <UserButton showName />
                </div>
                <SignOutButton>
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <LogOutIcon className="w-4 h-4" />
                    Logout
                  </Button>
                </SignOutButton>
              </div>
            ) : (
              <SignInButton mode="modal">
                <Button
                  variant="default"
                  className="w-full font-semibold bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-primary-foreground"
                >
                  Sign In
                </Button>
              </SignInButton>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default MobileNavbar;