"use client";

import Select from "react-select";
import gsap from "gsap";
import { useRef, useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FaQuestionCircle } from "react-icons/fa";  
import Image from 'next/image'; 

export default function DirectMaterialRecommendation() {
  const [propertyFilters, setPropertyFilters] = useState([]);
  const [propertyValues, setPropertyValues] = useState({});
  const [recommendations, setRecommendations] = useState([]);
  const [visibleDescription, setVisibleDescription] = useState(null);
  const [report, setReport] = useState(null);
  const resultRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      ".animated-section",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power3.out" }
    );
  }, []);

  const materialProperties = [
    { value: "tensile_strength", label: "Tensile Strength (MPa)", description: "Measures how much stretching force a material can withstand before breaking, impacting durability." },
    { value: "impact_resistance", label: "Impact Resistance (J/m²)", description: "Indicates how well a material can absorb energy from impacts, essential for safety and durability." },
    // add more properties here...
  ];

  const handlePropertyChange = (selectedOptions) => {
    setPropertyFilters(selectedOptions);
  };

  const handleValueChange = (property, value) => {
    setPropertyValues((prevValues) => ({
      ...prevValues,
      [property]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ properties: propertyValues }),
      });

      if (response.ok) {
        const data = await response.json();
        setRecommendations(data.slice(0, 3)); 
        
        gsap.fromTo(
          ".success-message",
          { opacity: 0, scale: 0.5 },
          { opacity: 1, scale: 1, duration: 0.6, ease: "elastic.out(1, 0.75)" }
        );
      } else {
        console.error('Error fetching recommendations:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const viewMaterialDetails = (materialName) => {
    setReport(`Detailed report for ${materialName}:
      - Tensile Strength: 500 MPa
      - Impact Resistance: 300 J/m²
      - Sustainability Rating: 8/10
      - ...`);
  };

  const toggleModal = (description) => {
    if (visibleDescription === description) {
      setVisibleDescription(null);
    } else {
      setVisibleDescription(description);
    }
  };

  const closeModalOnClickOutside = () => {
    setVisibleDescription(null);
  };

  useEffect(() => {
    window.addEventListener("click", closeModalOnClickOutside);
    return () => window.removeEventListener("click", closeModalOnClickOutside);
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-100">
      <Header />

      <main className="container mx-auto p-6 space-y-12 animated-section">
        <h2 className="text-5xl font-extrabold text-center tracking-tight text-gray-800 mb-8">
          Material Recommendation Based on Properties
        </h2>

        {/* Grid layout for image on the left and inputs on the right */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Left side: Image */}
          <div className="flex justify-center items-center">
            <Image
              src="/sustainabilityScore.jpg" 
              alt="Material Selection"
              width={400}
              height={300}
              className="rounded-lg shadow-md"
            />
          </div>

          {/* Right side: Input options */}
          <div className="bg-white p-8 rounded-lg shadow-lg space-y-8">
            <h3 className="text-3xl font-semibold text-gray-700 text-center">
              Select Material Properties
            </h3>

            <Select
              options={materialProperties}
              isMulti
              onChange={handlePropertyChange}
              placeholder="Select Material Properties"
              className="mt-2"
              theme={(theme) => ({
                ...theme,
                colors: {
                  ...theme.colors,
                  primary25: "#4A90E2",
                  primary: "#4A90E2",
                },
              })}
            />

            {/* Dynamic input for selected properties */}
            {propertyFilters.map((filter) => (
              <div key={filter.value} className="mt-6 relative animated-section">
                <label className="block text-lg font-medium text-gray-800">
                  {filter.label}
                  <FaQuestionCircle
                    className="ml-2 text-gray-500 cursor-pointer inline-block"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleModal(filter.description);
                    }}
                  />
                </label>
                <input
                  type="number"
                  className="mt-1 p-3 border rounded-lg w-full text-gray-700"
                  onChange={(e) => handleValueChange(filter.value, e.target.value)}
                />
              </div>
            ))}

            {/* Submit button */}
            <button 
              className="bg-blue-500 text-white font-semibold py-3 px-6 rounded-lg shadow-lg w-full hover:bg-blue-600 transition"
              onClick={handleSubmit}
            >
              Get Recommendations
            </button>
          </div>

        </section>

        {/* Recommendations and Report */}
        <section ref={resultRef} className="text-center mt-12">
          <h3 className="text-4xl font-bold text-gray-800">Material Recommendations</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {recommendations.map((recommendation, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <h4 className="text-2xl font-semibold mb-4">{recommendation.name}</h4>
                <button 
                  className="bg-teal-500 text-white py-2 px-4 rounded-lg"
                  onClick={() => viewMaterialDetails(recommendation.name)}
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Report */}
        {report && (
          <section className="mt-12 bg-white p-6 rounded-lg shadow-lg">
            <h4 className="text-3xl font-semibold text-gray-800">Material Report</h4>
            <p className="mt-4 text-gray-600">{report}</p>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
