import { currentUser } from "@clerk/nextjs/server";
import { Card, CardContent } from "@/components/ui/card";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { getUserbyClerkId, syncUser } from "@/actions/user.action";
import Link from "next/link";
import {
  MapPinIcon,
  LinkIcon,
  CalendarIcon,
  UserIcon,
  Waypoints,
  Sparkles,
  ArrowRight,
  TrendingUp,
} from "lucide-react";

async function Sidebar() {
  const authUser = await currentUser();

  if (!authUser) return <UnAuthenticatedSidebar />;

  let user = await getUserbyClerkId(authUser.id);

  // If user isn't in database yet, attempt to sync them now
  if (!user) {
    const syncedUser = await syncUser();
    if (syncedUser) {
      user = await getUserbyClerkId(authUser.id);
    }
  }

  const username =
    user?.username ||
    authUser.username ||
    authUser.emailAddresses?.[0]?.emailAddress?.split("@")[0] ||
    "user";
  const name =
    user?.name ||
    `${authUser.firstName || ""} ${authUser.lastName || ""}`.trim() ||
    username;
  const image = user?.image || authUser.imageUrl;
  const bio = user?.bio;
  const location = user?.location;
  const website = user?.website;
  const postsCount = user?._count?.posts ?? 0;
  const followingCount = user?._count?.following ?? 0;
  const followersCount = user?._count?.followers ?? 0;

  const initials = name
    ? name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : username.slice(0, 2).toUpperCase();

  const rawCreatedAt = user?.createdAt || authUser.createdAt;
  const formattedJoinedDate = rawCreatedAt
    ? new Date(rawCreatedAt).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      })
    : null;

  return (
    <div className="sticky top-20 space-y-4">
      {/* Main Profile Card */}
      <Card className="overflow-hidden border-border/60 shadow-md hover:shadow-lg transition-all duration-300 bg-card/95 backdrop-blur-xs">
        {/* Profile Header Banner */}
        <div className="h-26 bg-gradient-to-r from-primary via-purple-600 to-indigo-600 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:12px_12px]" />
        </div>

        <CardContent className="pt-0 px-6 pb-6">
          <div className="flex flex-col items-center text-center">
            {/* Avatar overlapping banner */}
            <Link
              href={`/profile/${username}`}
              className="relative -mt-12 group focus:outline-none"
            >
              <Avatar
                src={image}
                fallback={initials}
                alt={name}
                size="xl"
                className="w-24 h-24 border-4 border-card shadow-lg group-hover:scale-105 transition-transform duration-200"
              />
            </Link>

            {/* User Name & Handle */}
            <div className="mt-3 space-y-0.5 w-full">
              <Link
                href={`/profile/${username}`}
                className="font-bold text-lg text-foreground hover:text-primary transition-colors line-clamp-1 inline-block"
              >
                {name}
              </Link>
              <p className="text-xs text-muted-foreground font-medium">
                @{username}
              </p>
            </div>

            {/* Bio */}
            {bio ? (
              <p className="mt-3 text-xs text-muted-foreground/90 line-clamp-3 leading-relaxed px-1">
                {bio}
              </p>
            ) : (
              <p className="mt-2 text-xs text-muted-foreground/50 italic">
                No bio added yet
              </p>
            )}



            {/* Stats Section */}
            <div className="w-full my-4">
              <Separator className="bg-border/50" />
              <div className="grid grid-cols-3 gap-1 py-3 text-center">
                <Link
                  href={`/profile/${username}`}
                  className="p-1 rounded-lg hover:bg-muted/60 transition-colors group"
                >
                  <p className="font-bold text-sm text-foreground group-hover:text-primary transition-colors">
                    {postsCount}
                  </p>
                  <p className="text-[11px] text-muted-foreground font-medium">
                    Posts
                  </p>
                </Link>
                <Link
                  href={`/profile/${username}`}
                  className="p-1 rounded-lg hover:bg-muted/60 transition-colors group border-x border-border/40"
                >
                  <p className="font-bold text-sm text-foreground group-hover:text-primary transition-colors">
                    {followingCount}
                  </p>
                  <p className="text-[11px] text-muted-foreground font-medium">
                    Following
                  </p>
                </Link>
                <Link
                  href={`/profile/${username}`}
                  className="p-1 rounded-lg hover:bg-muted/60 transition-colors group"
                >
                  <p className="font-bold text-sm text-foreground group-hover:text-primary transition-colors">
                    {followersCount}
                  </p>
                  <p className="text-[11px] text-muted-foreground font-medium">
                    Followers
                  </p>
                </Link>
              </div>
              <Separator className="bg-border/50" />
            </div>

            {/* Metadata (Location, Website, Joined Date) */}
            <div className="w-full space-y-2 text-xs text-muted-foreground/90">
              {location && (
                <div className="flex items-center gap-2 text-left">
                  <MapPinIcon className="w-3.5 h-3.5 text-primary shrink-0" />
                  <span className="truncate">{location}</span>
                </div>
              )}
              {website && (
                <div className="flex items-center gap-2 text-left">
                  <LinkIcon className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                  <a
                    href={
                      website.startsWith("http")
                        ? website
                        : `https://${website}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline hover:text-primary truncate"
                  >
                    {website.replace(/^https?:\/\//, "")}
                  </a>
                </div>
              )}
              {formattedJoinedDate && (
                <div className="flex items-center gap-2 text-left">
                  <CalendarIcon className="w-3.5 h-3.5 text-purple-500 shrink-0" />
                  <span>Joined {formattedJoinedDate}</span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Sidebar;

const UnAuthenticatedSidebar = () => (
  <div className="sticky top-20 space-y-4">
    <Card className="overflow-hidden border-border/60 shadow-md bg-card/95 backdrop-blur-xs">
      {/* Decorative gradient banner */}
      <div className="h-20 bg-gradient-to-r from-primary via-purple-600 to-indigo-600 relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:12px_12px]" />
        <div className="size-10 rounded-xl bg-background/90 backdrop-blur-xs flex items-center justify-center text-primary shadow-md z-10">
          <Waypoints className="size-5 animate-pulse" />
        </div>
      </div>

      <CardContent className="pt-5 px-5 pb-6">
        <div className="text-center space-y-2">
          <h3 className="font-extrabold text-lg text-foreground tracking-tight flex items-center justify-center gap-1.5">
            <span>Welcome to Vynk</span>
            <Sparkles className="w-4 h-4 text-purple-500" />
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed px-1">
            Join our growing community to share posts, connect with friends, and discover trending content.
          </p>
        </div>

        {/* Feature Highlights */}
        <div className="my-4 pt-3 border-t border-border/40 space-y-2">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <TrendingUp className="w-3.5 h-3.5 text-primary shrink-0" />
            <span>Discover trending discussions</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <UserIcon className="w-3.5 h-3.5 text-purple-500 shrink-0" />
            <span>Build your social profile</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 pt-2">
          <SignInButton mode="modal">
            <Button
              className="w-full font-semibold shadow-sm bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-primary-foreground gap-2 group transition-all duration-200"
              size="sm"
            >
              <span>Sign In</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Button>
          </SignInButton>

          <SignUpButton mode="modal">
            <Button
              variant="outline"
              className="w-full font-medium border-border/80 hover:bg-muted/70"
              size="sm"
            >
              Create Account
            </Button>
          </SignUpButton>
        </div>
      </CardContent>
    </Card>
  </div>
);