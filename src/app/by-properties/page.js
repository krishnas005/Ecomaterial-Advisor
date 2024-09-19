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
    { value: "corrosion_resistance", label: "Corrosion Resistance (%)", description: "Describes a material's ability to resist deterioration due to environmental exposure, extending its lifespan." },
    { value: "recyclability", label: "Recyclability (%)", description: "Represents how much of the material can be recovered and reused, contributing to sustainability." },
    { value: "sustainability_rating", label: "Sustainability Rating (1-10)", description: "Rates the environmental friendliness of the material, considering sourcing, manufacturing, and disposal." },
    { value: "ductility", label: "Ductility (%)", description: "Measures a material's ability to deform under stress without breaking, useful for shaping and bending." },
    { value: "carbon_footprint", label: "Carbon Footprint (kg CO₂/kg material)", description: "The amount of CO₂ emissions produced during the lifecycle of the material, affecting environmental impact." },
    { value: "density", label: "Density (kg/m³)", description: "Indicates the mass per unit volume, affecting weight and overall design considerations for the car." },
    { value: "thermal_conductivity", label: "Thermal Conductivity (W/m·K)", description: "Measures how well the material conducts heat, important for temperature control and insulation." },
    { value: "hardness", label: "Hardness (HV - Vickers Hardness)", description: "Describes a material’s resistance to surface indentation, relevant for wear and tear." },
    { value: "youngs_modulus", label: "Young's Modulus (GPa)", description: "Indicates a material's stiffness, crucial for load-bearing parts that need to maintain shape under stress." },
    { value: "crashworthiness", label: "Crashworthiness (Rating 1-100)", description: "Measures how well the material absorbs impact in a collision, important for safety." },
    { value: "surface_finish", label: "Surface Finish (Rating 1-100)", description: "Evaluates the smoothness of the material’s surface, impacting aesthetics and aerodynamics." },
    { value: "formability", label: "Formability (%)", description: "Indicates how easily the material can be shaped or molded, important for manufacturing processes." },
    { value: "thermal_expansion_coefficient", label: "Thermal Expansion Coefficient (µm/m·K)", description: "Shows how much a material expands or contracts with temperature changes, affecting fit and performance." },
    { value: "fatigue_resistance", label: "Fatigue Resistance (%)", description: "Describes the material's ability to withstand repeated stress cycles without failure, important for longevity." },
    { value: "oxidation_resistance", label: "Oxidation Resistance (%)", description: "Indicates how well a material resists chemical breakdown due to oxygen exposure, extending its durability." },
    { value: "chemical_stability", label: "Chemical Stability (%)", description: "Describes a material’s ability to resist chemical reactions, ensuring durability in harsh environments." },
    { value: "uv_resistance", label: "UV Resistance (%)", description: "Indicates how well a material resists degradation due to ultraviolet radiation, important for outdoor use." },
    { value: "scratch_resistance", label: "Scratch Resistance (%)", description: "Measures the material's ability to resist surface scratches, affecting its appearance and durability." },
    { value: "noise_reduction_capability", label: "Noise Reduction Capability (Rating 1-100)", description: "Describes how well the material reduces sound transmission, contributing to comfort." },
    { value: "fire_resistance", label: "Fire Resistance (Rating 1-100)", description: "Measures the material's ability to withstand high temperatures without igniting, crucial for safety." },
    { value: "joining_capability", label: "Joining Capability (Rating 1-100)", description: "Indicates how easily the material can be bonded or welded to others, important for assembly." },
    { value: "cost_per_unit", label: "Cost per Unit (Rs./Unit)", description: "The price of the material per unit, affecting the overall budget of the project." },
    { value: "sustainable_sourcing", label: "Sustainable Sourcing (%)", description: "Shows the percentage of material sourced from environmentally responsible and ethical suppliers." },
    { value: "thermal_insulation", label: "Thermal Insulation (W/m·K)", description: "Indicates how well the material prevents heat transfer, improving energy efficiency and comfort." },
    { value: "weight", label: "Weight (kg)", description: "The total weight of the material, affecting vehicle performance, fuel efficiency, and handling." },
    { value: "machinability", label: "Machinability (Rating 1-100)", description: "Measures how easily the material can be cut or shaped by tools, impacting production efficiency." },
    { value: "durability", label: "Durability (Rating 1-100)", description: "Rates the material’s ability to withstand wear and tear over time, ensuring long-term reliability." },
    { value: "fracture_toughness", label: "Fracture Toughness (MPa·m¹/²)", description: "Describes the material’s ability to resist crack propagation, crucial for maintaining structural integrity." },
    { value: "comfort", label: "Comfort (Rating 1-100)", description: "Evaluates how the material contributes to the overall comfort of passengers, through factors like cushioning or temperature." },
    { value: "breathability", label: "Breathability (Rating 1-100)", description: "Describes how well the material allows air to pass through, important for maintaining a pleasant environment." },
    { value: "resistance_to_deformation", label: "Resistance to Deformation (%)", description: "Indicates how well the material retains its shape under stress, crucial for maintaining form and function." },
    { value: "moisture_resistance", label: "Moisture Resistance (%)", description: "Describes the material’s ability to resist water absorption, preventing damage and degradation." },
    { value: "abrasion_resistance", label: "Abrasion Resistance (%)", description: "Indicates how well the material resists surface wear due to friction, extending its lifespan." },
    { value: "rolling_resistance", label: "Rolling Resistance (Rating 1-100)", description: "Measures the resistance a material presents to rolling, affecting fuel efficiency and handling." },
    { value: "heat_resistance", label: "Heat Resistance (Rating 1-100)", description: "Indicates the material’s ability to withstand high temperatures without losing strength." },
    { value: "traction", label: "Traction (Rating 1-100)", description: "Describes the material’s grip or friction with surfaces, important for tires and safety." },
    { value: "elasticity", label: "Elasticity (%)", description: "Indicates how much a material can stretch and return to its original shape, important for flexibility and shock absorption." },
    { value: "puncture_resistance", label: "Puncture Resistance (%)", description: "Measures the material’s ability to resist piercing forces, important for safety and durability." },
    { value: "energy_absorption", label: "Energy Absorption (J)", description: "Describes how much energy the material can absorb, important for impact resistance and crash safety." }
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
    <div className="min-h-screen flex flex-col justify-between">
      <Header />

      <main className="container mx-auto p-6 space-y-12 animated-section bg-gradient-to-b from-gray-900 to-gray-700 text-white">
        <h2 className="text-5xl font-extrabold text-center tracking-tight">
          Material Recommendation Based on Properties
        </h2>

        <section ref={resultRef} className="bg-gradient-to-r from-teal-800 to-blue-500 p-10 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 w-full lg:w-2/3 mx-auto">
          <div className="text-center">
            <Image
              src="/img.jpg" 
              alt="Material Selection"
              width={200}
              height={150}
              className="mx-auto mb-6"
            />
          </div>
          <h3 className="text-3xl font-semibold mt-4 mb-8 text-center">Select Material Properties</h3>

          <Select
            options={materialProperties}
            isMulti
            onChange={handlePropertyChange}
            placeholder="Select Material Properties"
            className="mt-2 text-black"
            theme={(theme) => ({
              ...theme,
              colors: {
                ...theme.colors,
                primary25: "#4A90E2",
                primary: "#4A90E2",
              },
            })}
          />

          {propertyFilters.map((filter) => (
            <div key={filter.value} className="mt-6 relative animated-section">
              <label className="block text-lg font-medium">
                {filter.label}
                <FaQuestionCircle
                  className="ml-2 text-white cursor-pointer inline-block"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleModal(filter.description);
                  }}
                />
              </label>
              {visibleDescription === filter.description && (
                <div className="absolute top-full mt-2 left-0 w-full bg-white text-black p-4 rounded shadow-lg z-10">
                  <p>{filter.description}</p>
                </div>
              )}
              <input
                type="number"
                placeholder={`Enter value for ${filter.label}`}
                className="mt-2 p-2 w-full rounded-md text-black"
                onChange={(e) => handleValueChange(filter.value, e.target.value)}
              />
            </div>
          ))}

          <button
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300"
            onClick={handleSubmit}
          >
            Get Recommendations
          </button>
        </section>

        {recommendations.length > 0 && (
          <div className="mt-10 animated-section">
            <h3 className="text-3xl font-bold mb-4 text-center">Top Material Recommendations</h3>
            <ul className="space-y-4">
              {recommendations.map((rec, idx) => (
                <li key={idx} className="p-4 bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                  <h4 className="text-2xl font-semibold">{rec.name}</h4>
                  <p>{rec.description}</p>
                  <button
                    className="mt-4 bg-green-600 hover:bg-green-700 text-white font-semibold py-1 px-3 rounded-lg"
                    onClick={() => viewMaterialDetails(rec.name)}
                  >
                    View Details
                  </button>
                </li>
              ))}
            </ul>
            {report && <p className="mt-6 text-center text-lg">{report}</p>}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
