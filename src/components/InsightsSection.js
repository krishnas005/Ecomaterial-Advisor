"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const InsightsSection = () => {
  const cardsRef = useRef([]);

  useEffect(() => {
    gsap.fromTo(
      cardsRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: 'power2.out' }
    );
  }, []);

  return (
    <div id="explore" className="px-4 py-10 flex flex-col gap-10">
      <h1 className="text-[#0d151c] text-[32px] font-bold leading-tight md:text-4xl max-w-[720px]">
        Industry-Specific Insights
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Insights content cards */}
        {[
          {
            title: "Automobile Industry",
            description: "Explore our tailored recommendations for the automobile industry.",
            image: "https://cdn.usegalileo.ai/sdxl10/28192786-b326-4ef8-9303-1157b75fd4a7.png",
          },
          {
            title: "Aerospace Industry",
            description: "Get insights and recommendations for sustainable aviation.",
            image: "https://cdn.usegalileo.ai/sdxl10/2e2e8b03-fd74-4f6b-b93b-06d0b9d1d1de.png",
          },
          {
            title: "Construction Sector",
            description: "Find sustainable solutions for construction projects.",
            image: "https://cdn.usegalileo.ai/sdxl10/c23246a3-4884-4d5f-ae44-b35b57f9b7d2.png",
          },
        ].map((card, index) => (
          <div key={index} ref={el => cardsRef.current[index] = el} className="p-4 border rounded-lg shadow-md bg-white">
            <img src={card.image} alt={card.title} className="h-40 w-full object-cover rounded-md" />
            <h2 className="text-lg font-semibold mt-2">{card.title}</h2>
            <p className="text-sm text-gray-500 mt-1">{card.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InsightsSection;
