"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Link from 'next/link';

const HeroSection = () => {
  const heroRef = useRef(null);
  const textRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    // Hero section fade-in animation
    gsap.fromTo(
      heroRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.5, ease: 'power2.out' }
    );

    // Text and button animations
    gsap.fromTo(
      textRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1.2, ease: 'power2.out', delay: 0.5 }
    );

    gsap.fromTo(
      buttonRef.current,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 1.2, ease: 'elastic.out(1, 0.75)', delay: 1.2 }
    );
  }, []);

  return (
    <div ref={heroRef} className="relative flex justify-center items-center min-h-screen bg-black">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.6)), url('/ecoImage.jpg')",
        }}
      />
      <div className="relative z-10 flex flex-col items-start max-w-6xl px-6 md:px-14 text-white">
        <div ref={textRef}>
          <h1 className="text-3xl md:text-6xl font-extrabold leading-tight tracking-tight drop-shadow-xl">
            Welcome to EcoMaterial Advisor, Tata&apos;s Sustainability Platform
          </h1>
          <h2 className="text-base md:text-xl mt-4 text-gray-200 drop-shadow-md">
            Explore our industry-specific recommendations, insights, and join us for a sustainable future.
          </h2>
        </div>
        <Link href="#explore">
          <div
            ref={buttonRef}
            className="inline-block mt-6 px-6 py-3 bg-[#2094f3] text-white font-semibold rounded-lg hover:bg-[#1e83db] transition-colors duration-300 ease-in-out"
          >
            Explore Now
          </div>
        </Link>
      </div>
    </div>
  );
};

export default HeroSection;
