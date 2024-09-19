"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const SustainabilitySection = () => {
  const imageRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      imageRef.current,
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 1.2, ease: "power3.out" }
    );
    gsap.fromTo(
      contentRef.current,
      { opacity: 0, x: 50 },
      { opacity: 1, x: 0, duration: 1.2, ease: "power3.out", delay: 0.2 }
    );
  }, []);

  return (
    <section className="px-6 py-16 bg-white flex flex-col lg:flex-row items-center gap-8 lg:gap-12"> 
      <div
        ref={imageRef}
        className="w-full lg:w-1/2 overflow-hidden rounded-lg shadow-lg"
      >
        <img
          src="/img.jpg"
          alt="Sustainability Impact"
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105 hover:cursor-pointer"
        />
      </div>
 
      <div
        ref={contentRef}
        className="flex flex-col w-full lg:w-1/2 text-left space-y-6"
      >
        <h2 className="text-[#0d151c] text-3xl md:text-5xl font-bold">
          Driving Sustainability with Key Metrics
        </h2>
        <p className="text-gray-600 text-lg leading-relaxed">
          We evaluate sustainability through four key factors: Cost Effectiveness, Recyclability, Durability, and our Sustainability Matrix, chosen for their impact on eco-friendly practices and long-term performance.
        </p>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>
            <strong>Cost Effectiveness:</strong> Ensures sustainable materials are economically viable.
          </li>
          <li>
            <strong>Recyclability:</strong> Focuses on materials that can be reused or recycled.
          </li>
          <li>
            <strong>Durability:</strong> Evaluates materials that reduce frequent replacements.
          </li>
          <li>
            <strong>Sustainability Matrix:</strong> Assesses environmental and energy impacts holistically.
          </li>
        </ul>
      </div>
    </section>
  );
};

export default SustainabilitySection;
