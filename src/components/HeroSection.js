"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const HeroSection = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      heroRef.current,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }
    );
  }, []);

  return (
    <div ref={heroRef} className="px-4 py-5 md:px-40 flex justify-center">
      <div className="flex flex-col max-w-[980px]">
        <div
          className="relative overflow-hidden rounded-xl bg-cover bg-center bg-no-repeat flex flex-col justify-end px-6 md:px-14 pb-10 h-[400px]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url('https://cdn.usegalileo.ai/sdxl10/b4e10070-2c81-433f-bec2-47e2abd38efa.png')",
          }}
        >
          <div className="text-left mb-4 ">
            <h1 className="text-white text-3xl md:text-5xl  font-bold leading-tight tracking-[-0.033em]">
              Welcome to EcoMaterial Advisor, Tata&apos;s Sustainability Platform
            </h1>
            <h2 className="text-white text-sm md:text-base mt-2">
              Explore our industry-specific recommendations, insights, and join us for a sustainable future.
            </h2>
          </div>
          <button className="self-start px-4 py-2 bg-[#2094f3] text-white rounded-md mt-4">
            Explore Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
