import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Gallery from '../components/Gallery';

export default function GalleryPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <Gallery />
      </main>
      <Footer />
    </>
  );
}
