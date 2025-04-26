import Logo from "@/features/navbar/components/logo";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

export default function Navbar() {
  return (
    <nav className="pl-20 pr-20 sticky top-0 z-50 bg-white/90 h-20 flex justify-between items-center">
      <Logo />
      <div className="flex gap-12 items-center">
        <SignedOut>
          <SignInButton />
          <SignUpButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <a href="/stats">Classes</a>
        <a href="/purchase">Dashboard</a>
        <a className="font-normal" href="/manage">
          Manage
        </a>
      </div>
    </nav>
  );
}
