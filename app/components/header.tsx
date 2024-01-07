import { Link } from "@remix-run/react";
import { Logo, LogoText } from "~/components/icons";

export function Header() {
  return (
    <header className="py-4">
      <Link
        to="/"
        className="w-min mx-auto flex flex-col justify-center items-center gap-2"
      >
        <Logo />
        <LogoText />
      </Link>
    </header>
  );
}
