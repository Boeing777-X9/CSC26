import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-200 dark:border-neutral-800 bg-background/95 backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="font-bold text-xl tracking-tight">
          Novus
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium">
          <Link href="/events" className="transition-colors hover:text-neutral-600 dark:hover:text-neutral-300">
            Events
          </Link>
          <Link href="/gallery" className="transition-colors hover:text-neutral-600 dark:hover:text-neutral-300">
            Gallery
          </Link>
          <Link href="/membership" className="transition-colors hover:text-neutral-600 dark:hover:text-neutral-300">
            Membership
          </Link>
          <Link href="/teams" className="transition-colors hover:text-neutral-600 dark:hover:text-neutral-300">
            Teams
          </Link>
          <Link href="/auth" className="rounded-md bg-neutral-900 dark:bg-neutral-100 text-white dark:text-black px-3.5 py-1.5 text-sm font-medium transition-opacity hover:opacity-90">
            Sign In
          </Link>
        </nav>
      </div>
    </header>
  );
}
