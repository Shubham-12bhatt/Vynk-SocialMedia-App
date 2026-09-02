import ModeToggle from "@/components/Modetoggle";
import { Button } from "@base-ui/react";
import {
  Show,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";


export default function Home() {
  return (
    <div>
      <Show when="signed-out">
        <SignInButton mode="modal">
          <Button>Sign In</Button>
        </SignInButton>
      </Show>
      <Show when="signed-in">
        <UserButton />
      </Show>
      <ModeToggle />
    </div>
  );
}
