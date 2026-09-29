import type { Metadata } from "next";
import "./globals.css";
import { RootProvider } from "fumadocs-ui/provider";

export const metadata: Metadata = {
  title: "Novus",
  description: "Novus web application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
