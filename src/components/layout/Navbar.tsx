import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-white/95 backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="font-bold text-xl tracking-tight text-neutral-900">
          Novus
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium">
          <Link href="/events" className="text-neutral-600 transition-colors hover:text-neutral-900">
            Events
          </Link>
          <Link href="/gallery" className="text-neutral-600 transition-colors hover:text-neutral-900">
            Gallery
          </Link>
          <Link href="/membership" className="text-neutral-600 transition-colors hover:text-neutral-900">
            Membership
          </Link>
          <Link href="/teams" className="text-neutral-600 transition-colors hover:text-neutral-900">
            Teams
          </Link>
          <Link href="/auth" className="rounded-md bg-neutral-900 text-white px-3.5 py-1.5 text-sm font-medium transition-opacity hover:opacity-90">
            Sign In
          </Link>
        </nav>
      </div>
    </header>
  );
}
