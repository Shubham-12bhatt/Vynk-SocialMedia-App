import { Button } from "@/components/ui/button";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import ModeToggle from "./Modetoggle";
import Link from "next/link";
import { BellIcon, HomeIcon, UserIcon } from "lucide-react";

async function DesktopNavbar() {
  const user = await currentUser();

  return (
    <div className="hidden md:flex items-center space-x-2 lg:space-x-3">
      <Button
        variant="ghost"
        size="sm"
        className="flex items-center gap-2 font-medium hover:bg-muted/70 transition-colors"
        asChild
      >
        <Link href="/">
          <HomeIcon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
          <span className="hidden lg:inline">Home</span>
        </Link>
      </Button>

      {user ? (
        <>
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-2 font-medium hover:bg-muted/70 transition-colors"
            asChild
          >
            <Link href="/notifications">
              <BellIcon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              <span className="hidden lg:inline">Notifications</span>
            </Link>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-2 font-medium hover:bg-muted/70 transition-colors"
            asChild
          >
            <Link
              href={`/profile/${
                user.username ?? user.emailAddresses?.[0]?.emailAddress?.split("@")[0] ?? "me"
              }`}
            >
              <UserIcon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              <span className="hidden lg:inline">Profile</span>
            </Link>
          </Button>

          <div className="pl-1">
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-8 h-8 rounded-full border border-border shadow-xs hover:scale-105 transition-transform",
                },
              }}
            />
          </div>
        </>
      ) : (
        <SignInButton mode="modal">
          <Button
            variant="default"
            size="sm"
            className="font-semibold shadow-xs bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-primary-foreground transition-all"
          >
            Sign In
          </Button>
        </SignInButton>
      )}

      <div className="pl-2 border-l border-border/60">
        <ModeToggle />
      </div>
    </div>
  );
}

export default DesktopNavbar;