import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import DrinksExperience from '../components/DrinksExperience';
import CTASection from '../components/CTASection';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <DrinksExperience />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
