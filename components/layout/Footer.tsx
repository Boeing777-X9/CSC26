import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 dark:border-neutral-800 bg-background py-8 text-sm text-neutral-500">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 sm:flex-row">
        <p>© {new Date().getFullYear()} Novus. All rights reserved.</p>
        <div className="flex gap-4">
          <Link href="/newsletter" className="hover:underline">
            Newsletter
          </Link>
          <Link href="/certificates" className="hover:underline">
            Certificates
          </Link>
          <Link href="/admin" className="hover:underline">
            Admin Portal
          </Link>
        </div>
      </div>
    </footer>
  );
}
