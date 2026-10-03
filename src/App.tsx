import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Education from './components/Education';
import About from './components/About';
import TechStack from './components/TechStack';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';
import GetStartedModal from './components/GetStartedModal';

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Squarespace Luxury High-Contrast Dark Theme Base
    window.document.documentElement.classList.add('dark');
    window.document.documentElement.style.backgroundColor = '#000000';
    window.document.body.style.backgroundColor = '#000000';
    window.document.body.style.color = '#FFFFFF';
  }, []);

  return (
    <div className="bg-black text-white min-h-screen selection:bg-neutral-800 selection:text-white transition-colors duration-300">
      <ScrollProgress />
      <Navbar onOpenGetStarted={() => setIsModalOpen(true)} />
      
      <main>
        {/* 1. Hero: Squarespace Light-to-Dark Canvas with Dual Black Cards */}
        <Hero onOpenGetStarted={() => setIsModalOpen(true)} />

        {/* 2. Flagship Projects Carousel: Pure Deep Black Section */}
        <section className="bg-black text-white relative z-10">
          <Projects />
        </section>

        {/* 3, 4, 5, 6. High-Contrast Editorial Light Canvas */}
        {/* Exactly matching Navbar sequence: Experience -> Education -> Bio -> Skills */}
        <div className="light-editorial-section relative z-10">
          {/* 3. Industry Experience (Technovate & Mohs10) */}
          <Experience />

          {/* 4. Academic Foundation, Degrees & Convocation 2024 Gallery */}
          <Education />

          {/* 5. Executive Profile, Formal Bio & Verified Resume Download */}
          <About />

          {/* 6. Technical Stack, Architecture Spec Sheet & Tooling */}
          <TechStack />
        </div>

        {/* 7. Communication & Contact: Deep Black continues till last */}
        <section className="bg-black text-white relative z-10 border-t border-white/10">
          <Contact />
        </section>
      </main>

      {/* 8. Footer: Deep Black continues till last */}
      <Footer />

      {/* Lead Capture Consultation Modal */}
      <GetStartedModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
