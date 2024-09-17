"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const SustainabilitySection = () => {
  const imageRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    // Fade-in animation for image and content
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
      {/* Image Section */}
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

      {/* Content Section */}
      <div
        ref={contentRef}
        className="flex flex-col w-full lg:w-1/2 text-left space-y-6"
      >
        <h2 className="text-[#0d151c] text-3xl md:text-5xl font-bold">
          Driving Sustainability with Key Metrics
        </h2>
        <p className="text-gray-600 text-lg leading-relaxed">
          Our platform evaluates sustainability based on four key factors: Cost
          effectiveness, Recyclability, Durability, and a comprehensive
          Sustainability Matrix. These metrics help industries adopt materials
          that are eco-friendly, durable, and cost-efficient.
        </p>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>
            <strong>Cost Factor:</strong> Our materials ensure an optimal
            balance between sustainability and cost-effectiveness, providing
            value without compromising on eco-friendly standards.
          </li>
          <li>
            <strong>Recyclability:</strong> With a focus on the circular economy,
            90% of our recommended materials are fully recyclable, reducing
            waste and promoting long-term sustainability.
          </li>
          <li>
            <strong>Durability:</strong> High-performance materials designed to
            last longer and withstand challenging environments, minimizing
            the need for frequent replacements.
          </li>
          <li>
            <strong>Sustainability Matrix:</strong> A comprehensive assessment
            system that evaluates each material's environmental impact,
            recyclability, energy usage, and overall contribution to
            sustainability goals.
          </li>
        </ul>

        {/* <a
          href="#learn-more"
          className="mt-6 inline-block px-6 py-3 bg-[#2094f3] text-white text-lg font-medium rounded-lg shadow-md hover:bg-[#1574c0] transition-colors duration-300"
        >
          Learn More
        </a> */}
      </div>
    </section>
  );
};

export default SustainabilitySection;
