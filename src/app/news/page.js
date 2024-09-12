"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Header from "../../components/Header";

const News = () => {

    const reff = useRef([]);

    useEffect(() => {
        gsap.fromTo(
          reff.current,
          { opacity: 0, y: -50 },
          { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }
        );
      }, []);

  const articles = [
    {
      title: "Lightweight Alloys Transforming Automotive Design",
      image: "https://cdn.usegalileo.ai/sdxl10/b4e10070-2c81-433f-bec2-47e2abd38efa.png",
      description:
        "Discover how lightweight alloys are revolutionizing the automotive industry, enabling more fuel-efficient and eco-friendly vehicles.",
      link: "https://www.example.com/articles/lightweight-alloys",
    },
    {
      title: "Graphene: The Future Material in Electronics",
      image: "https://cdn.usegalileo.ai/sdxl10/b4e10070-2c81-433f-bec2-47e2abd38efa.png",
      description:
        "Explore how graphene is changing the landscape of electronic manufacturing with its remarkable electrical conductivity and strength.",
      link: "https://www.example.com/articles/graphene-electronics",
    },
    {
      title: "Biodegradable Polymers: The Next Step in Sustainability",
      image: "https://cdn.usegalileo.ai/sdxl10/b4e10070-2c81-433f-bec2-47e2abd38efa.png",
      description:
        "Learn how biodegradable polymers are being used to create sustainable products, reducing plastic waste and promoting eco-friendly practices.",
      link: "https://www.example.com/articles/biodegradable-polymers",
    },
    {
      title: "Revolution in Aerospace with Carbon Fiber Composites",
      image: "https://cdn.usegalileo.ai/sdxl10/b4e10070-2c81-433f-bec2-47e2abd38efa.png",
      description:
        "Carbon fiber composites are leading to lighter, stronger, and more fuel-efficient aircraft. Find out how aerospace is changing.",
      link: "https://www.example.com/articles/carbon-fiber-composites",
    },
  ];

  return (
    <div className="relative flex min-h-screen flex-col bg-slate-50 overflow-x-hidden">
      <Header />
      <main ref={reff} className="px-4 md:px-40 py-8">
        <div className="hero flex flex-col gap-6 bg-cover bg-center bg-no-repeat rounded-xl md:pl-14 px-6 justify-center p-4 mb-10 h-[400px]"
             style={{ backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.6) 100%), url("https://cdn.usegalileo.ai/sdxl10/b4e10070-2c81-433f-bec2-47e2abd38efa.png")' }}>
          <h1 className="text-white text-3xl md:text-5xl font-black leading-tight">Industry News</h1>
          <p className="text-white text-lg md:text-xl font-light">Stay updated with the latest trends and revolutions in manufacturing due to new materials.</p>
        </div>

        <section className="flex flex-col gap-10">
          <h2 className="text-[#0d151c] text-2xl md:text-3xl font-bold leading-tight mb-6">Recent Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {articles.map((article, index) => (
              <div
                key={index}
                className="article-item flex flex-col bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 ease-in-out"
              >
                <div
                  className="w-full h-48 bg-cover bg-center"
                  style={{ backgroundImage: `url(${article.image})` }}
                />
                <div className="p-6 flex flex-col gap-4">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {article.title}
                  </h3>
                  <p className="text-gray-600">{article.description}</p>
                  <a
                    href={article.link}
                    className="text-[#2094f3] font-bold hover:underline self-start"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Read more
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default News;
