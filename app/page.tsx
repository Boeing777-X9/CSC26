import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <section className="container mx-auto flex flex-col items-center justify-center px-4 py-24 text-center">
      <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl">
        Welcome to Novus
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-neutral-600 dark:text-neutral-400">
        Discover events, manage memberships, track certificates, and connect with our community.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link href="/events">
          <Button size="lg">Explore Events</Button>
        </Link>
        <Link href="/membership">
          <Button variant="outline" size="lg">
            Join Membership
          </Button>
        </Link>
      </div>
    </section>
  );
}
