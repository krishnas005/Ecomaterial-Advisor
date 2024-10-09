"use client";
import Select from "react-select";
import gsap from "gsap";
import { useRef, useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CarModel from "@/components/CarModel";
import { usePart } from "../../context/PathContext";
import { FaQuestionCircle } from "react-icons/fa";
import { useRouter } from 'next/navigation';
import EarthCanvas from "@/components/Earth";

export default function ChoosePage() {
  const [propertyFilters, setPropertyFilters] = useState([]);
  const [propertyValues, setPropertyValues] = useState({});
  const [recommendations, setRecommendations] = useState([]);
  const [visibleDescription, setVisibleDescription] = useState(null);
  const resultRef = useRef(null);
  const { selectedPart, setSelectedPart } = usePart();
  const router = useRouter();

  useEffect(() => {
    gsap.fromTo(
      ".animated-section",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power3.out" }
    );
  }, [selectedPart]);

  useEffect(() => {
    setPropertyFilters([]);
    setPropertyValues({});
    setRecommendations([]);
  }, [selectedPart]);

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
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ properties: propertyValues }),
      });

      if (response.ok) {
        const data = await response.json();
        setRecommendations(data.slice(0, 3));
      } else {
        console.error('Error fetching recommendations:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const viewMaterialDetails = (material) => {
    const queryString = encodeURIComponent(JSON.stringify(material));
    router.push(`/report?material=${queryString}`);
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
    <div className="min-h-screen" onClick={(e) => e.stopPropagation()}>
      <Header />
      <main className="container mx-auto p-6 space-y-8 bg-gradient-to-b from-gray-900 to-gray-700">
        <h2 className="text-5xl font-extrabold mb-12 text-center text-white tracking-tight">
          Material Recommendation
        </h2>

        <div className="flex flex-col lg:flex-row justify-between items-start lg:space-x-8 space-y-6 lg:space-y-0">
          <div className="w-full lg:w-1/2 bg-white rounded-xl shadow-lg p-6 border border-gray-300">
            <CarModel setSelectedPart={setSelectedPart} />
          </div>

          <section
            ref={resultRef}
            className="animated-section bg-gradient-to-r from-teal-800 to-blue-500 text-white p-8 rounded-xl shadow-md hover:shadow-2xl transition-shadow duration-300 w-full lg:w-1/2 h-[107vh] overflow-y-scroll"
          >
            {selectedPart ? (
              <h3 className="text-3xl font-bold mb-6 border-b-2 border-white pb-2">
                Selected Part: <span className="font-light">{selectedPart}</span>
              </h3>
            ) : (
              <div>
                <h3 className="text-3xl font-bold mb-6 border-b-2 border-white pb-2">
                  Select Properties
                </h3>

              </div>
            )}

            <h3 className="text-2xl font-semibold mt-4 mb-4">Select Material Properties</h3>
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
            {selectedPart || propertyFilters.length > 0 ? null : <EarthCanvas />}
            {propertyFilters.map((filter) => (
              <div key={filter.value} className="mt-6 relative">
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
                <input
                  type="number"
                  onChange={(e) => handleValueChange(filter.value, e.target.value)}
                  className="mt-2 p-4 border text-gray-700 border-gray-300 rounded-lg w-full focus:outline-none focus:ring-4 focus:ring-teal-500"
                  placeholder={`Enter value for ${filter.label}`}
                />

                {visibleDescription === filter.description && (
                  <div
                    className="absolute right-[280px] top-5 bg-black text-[10px] text-white p-2 rounded-lg shadow-lg z-10"
                    style={{ width: '160px' }}
                  >
                    <p>{filter.description}</p>
                  </div>
                )}
              </div>
            ))}

            {propertyFilters.length > 0 && (
              <button
                className="mt-8 w-full bg-teal-500 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-teal-600 transition-all duration-300"
                onClick={handleSubmit}
              >
                Submit
              </button>
            )}

            {recommendations.length > 0 && (
              <div className="mt-8">
                <h3 className="text-2xl font-semibold mb-4">Top 3 Recommendations</h3>
                <ul className="list-disc pl-5">
                  {recommendations.map((rec, index) => (
                    <li key={index} className="mb-2">
                      <a
                        className="text-blue-200 underline cursor-pointer"
                        onClick={() => viewMaterialDetails(rec.Material)}
                      >
                        {rec.Material}
                      </a>{" "}
                      - <strong>Sustainability Score:</strong> {rec.SustainabilityScore}/10
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
