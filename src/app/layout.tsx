import type { Metadata } from "next";
import "./globals.css";
import { RootProvider } from "fumadocs-ui/provider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "CYBER SPACE CLUB | Manipal University Jaipur",
  description: "The flagship student cybersecurity society at MUJ",
};

import GlobalShaderBackground from "@/components/layout/GlobalShaderBackground";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-black text-white font-sans antialiased relative">
        <GlobalShaderBackground />
        <RootProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </RootProvider>
      </body>
    </html>
  );
}
