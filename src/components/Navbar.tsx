import Link from "next/link";

import { NotificationBadge } from "@/components/NotificationBadge";
import { WalletConnector } from "@/components/WalletConnector";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/explore", label: "Explore Creators" },
  { href: "/tips", label: "Send Tips" },
] as const;

export function Navbar() {
  return (
    <header className="sticky top-0 z-20 border-b border-ink/10 bg-[color:var(--surface)]/80 backdrop-blur-md">
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-lg font-bold tracking-tight text-ink sm:text-xl">
          Stellar Tip Jar
        </Link>
        <div className="hidden items-center gap-6 text-sm font-medium text-ink/80 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-wave"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <NotificationBadge />
          <WalletConnector />
        </div>
      </nav>
    </header>
  );
}
