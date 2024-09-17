'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import InsightsSection from '../components/InsightsSection';
import Footer from '../components/Footer';
import SustainabilitySection from '../components/SustainabilitySections';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  useEffect(() => {
    const scrollElements = document.querySelectorAll('section');
    
    scrollElements.forEach((section) => {
      gsap.fromTo(section, 
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            end: 'bottom 25%',
            scrub: 1,  
            toggleActions: 'play none none none', 
          }
        }
      );
    });
  }, []);

  return (
    <>
      <Header />
      <section id="hero">
        <HeroSection />
      </section>
      <section id="insights">
        <InsightsSection />
      </section>
      <section id="sustainability">
        <SustainabilitySection />
      </section>
      <Footer />
    </>
  );
}
