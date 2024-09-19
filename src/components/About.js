"use client";

import React, { useEffect, useRef } from 'react';
import Header from './Header';
import { gsap } from 'gsap';
import Footer from './Footer';

const AboutUs = () => {
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const processRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      heroRef.current,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }
    );

    gsap.fromTo(
      featuresRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power2.out', stagger: 0.2 }
    );

    gsap.fromTo(
      processRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power2.out', stagger: 0.2 }
    );
  }, []);

  return (
    <div className="relative flex min-h-screen flex-col bg-slate-50 group/design-root overflow-x-hidden">
    <Header />
    <main ref={heroRef} className="px-4 flex flex-col md:px-40 py-5">
        <div className="hero flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat rounded-xl items-center justify-center p-4"
            style={{ backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.6) 100%), url("https://cdn.usegalileo.ai/stability/729b48cb-f062-4227-9b38-56f8e24ae31c.png")' }}>
            <div className="hero-content flex flex-col gap-2 px-8 md:px-16 md:pr-[150px]">
                <h1 className="text-white text-3xl md:text-5xl font-black leading-tight tracking-[-0.033em]">Our Mission</h1>
                <p className="text-white text-lg md:text-xl font-light">At EcoMaterial Advisor, our mission is to drive innovation and sustainability in the automotive industry. We provide an AI-driven platform that enhances material selection processes by balancing sustainability, performance, and cost-effectiveness.</p>
            </div>
        </div>

        <section ref={featuresRef} className="flex flex-col gap-10 px-4 py-10">
          <h1 className="text-2xl md:text-4xl font-bold text-gray-800 text-center mb-4">
            Why Choose EcoMaterial Advisor?
          </h1>
          <p className="text-lg text-gray-700 text-center mb-2">
            EcoMaterial Advisor is revolutionizing the way automotive companies select materials by integrating cutting-edge Generative AI technology. Our platform offers:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="feature-item flex flex-col items-center text-center bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
              <div
                className="w-full h-48 bg-cover bg-center rounded-lg mb-4"
                style={{ backgroundImage: 'url("https://cdn.usegalileo.ai/sdxl10/2a880df2-1845-4197-bd29-e30b2b1462be.png")' }}
              />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Sustainable Material Choices</h3>
              <p className="text-gray-600">Utilize AI to recommend materials that balance sustainability with performance and cost-effectiveness.</p>
            </div>
            <div className="feature-item flex flex-col items-center text-center bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
              <div
                className="w-full h-48 bg-cover bg-center rounded-lg mb-4"
                style={{ backgroundImage: 'url("https://cdn.usegalileo.ai/sdxl10/363c705c-a605-46b3-890c-b45dfa2eafd4.png")' }}
              />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">AI-Driven Insights</h3>
              <p className="text-gray-600">Gain data-driven insights on material properties, compliance, and market trends to make informed decisions.</p>
            </div>
            <div className="feature-item flex flex-col items-center text-center bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
              <div
                className="w-full h-48 bg-cover bg-center rounded-lg mb-4"
                style={{ backgroundImage: 'url("https://cdn.usegalileo.ai/sdxl10/77a31f07-c2f4-407f-b3ea-9389d615b3b6.png")' }}
              />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Seamless Integration</h3>
              <p className="text-gray-600">Integrate easily with existing tools and platforms for a smooth workflow transition.</p>
            </div>
          </div>
        </section>

        <section ref={processRef} className="flex flex-col gap-10 px-4 py-10 bg-gray-50">
          <h1 className="text-2xl md:text-4xl font-bold text-gray-800 text-center mb-2">
            How EcoMaterial Advisor Recommends Materials
          </h1>
          <p className="text-lg text-gray-700 text-center mb-2">
            Our platform uses Generative AI that takes multiple user-defined inputs, such as desired material properties, environmental impact goals, cost constraints, and more, to deliver tailored material recommendations:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="process-step flex flex-col items-center text-center bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Step 1: Define Your Requirements</h3>
              <p className="text-gray-600">Users input specific criteria such as strength, durability, weight, environmental impact, and budget.</p>
            </div>
            <div className="process-step flex flex-col items-center text-center bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Step 2: AI Analysis</h3>
              <p className="text-gray-600">Our AI model processes the input data, cross-referencing with an extensive database of materials, to find the best matches.</p>
            </div>
            <div className="process-step flex flex-col items-center text-center bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Step 3: Tailored Recommendations</h3>
              <p className="text-gray-600">Receive a list of recommended materials that meet your unique requirements, complete with detailed analysis and comparisons.</p>
            </div>
            <div className="process-step flex flex-col items-center text-center bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Step 4: Optimize Your Choice</h3>
              <p className="text-gray-600">Utilize our platform&apos;s tools to further refine choices, ensuring optimal material selection for your specific use case.</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AboutUs;
