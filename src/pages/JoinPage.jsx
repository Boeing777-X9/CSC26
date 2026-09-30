import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Reservations from '../components/Reservations';
import { useEffect } from 'react';

export default function JoinPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <main className="pt-24">
        <Reservations />
      </main>
      <Footer />
    </>
  );
}
