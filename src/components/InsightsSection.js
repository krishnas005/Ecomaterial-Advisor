"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Link from 'next/link';

const InsightsSection = () => {
  const cardsRef = useRef([]);

  useEffect(() => {
    // Staggered animation for the cards
    gsap.fromTo(
      cardsRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.3, ease: 'power3.out' }
    );

    // Hover effect animation for scaling cards
    cardsRef.current.forEach((card) => {
      gsap.set(card, { transformOrigin: 'center' });

      card.addEventListener('mouseenter', () => {
        gsap.to(card, { scale: 1.05, duration: 0.4, ease: 'power2.out' });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, { scale: 1, duration: 0.4, ease: 'power2.out' });
      });
    });
  }, []);

  return (
    <section id="explore" className="px-6 py-16 bg-gray-50">
      <div className="text-center mb-12">
        <h1 className="text-[#0d151c] text-3xl md:text-5xl font-bold leading-tight animate__animated animate__fadeInUp">
          Industry-Specific Insights
        </h1>
        <p className="mt-4 text-gray-600 text-lg max-w-2xl mx-auto">
          Explore our curated insights and sustainable recommendations for various industries.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          {
            title: "Automobile Industry",
            description: "Explore our tailored recommendations for the automobile industry.",
            image: "/img.jpg",
            link: '/by-parts'
          },
          {
            title: "Aerospace Industry",
            description: "Get insights and recommendations for sustainable aviation.",
            image: "/aerospace.jpg",
            link: '/by-parts'
          },
          {
            title: "Construction Sector",
            description: "Find sustainable solutions for construction projects.",
            image: "/kuchToh.jpg",
            link: '/by-parts'
          },
        ].map((card, index) => (
          <Link
            href={card.link}
            key={index}
            ref={el => cardsRef.current[index] = el}
            className="group p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transform transition-all duration-300 ease-in-out"
          >
            <div className="overflow-hidden rounded-lg mb-4">
              <img
                src={card.image}
                alt={card.title}
                className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <h2 className="text-xl font-semibold text-gray-800 group-hover:text-[#2094f3] transition-colors duration-300">
              {card.title}
            </h2>
            <p className="mt-2 text-gray-600">
              {card.description}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default InsightsSection;
