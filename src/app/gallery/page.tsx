import Gallery from "@/components/Gallery";

export const metadata = {
  title: "Gallery | CyberSpace Club MUJ",
  description: "Explore scenes, events, hackathons, and moments captured at CyberSpace Club Manipal University Jaipur.",
};

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-black pt-4">
      <Gallery />
    </main>
  );
}
