"use client";

import Select from "react-select";
import gsap from "gsap";
import { useRef, useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CarModel from "@/components/CarModel";
import { usePart } from "../../context/PathContext";

export default function ChooseByParts() {
  const [propertyFilters, setPropertyFilters] = useState([]);
  const [propertyValues, setPropertyValues] = useState({});
  const [recommendations, setRecommendations] = useState([]);
  const resultRef = useRef(null);
  const { selectedPart, setSelectedPart } = usePart();

  useEffect(() => {
    gsap.fromTo(
      ".animated-section",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power3.out" }
    );
  }, [selectedPart]);

  const materialProperties = [
    { value: "tensile_strength", label: "Tensile Strength (MPa)" },
    { value: "impact_resistance", label: "Impact Resistance (J/m²)" },
    { value: "corrosion_resistance", label: "Corrosion Resistance (%)" },
    { value: "recyclability", label: "Recyclability (%)" },
    { value: "sustainability_rating", label: "Sustainability Rating (1-10)" },
    { value: "ductility", label: "Ductility (%)" },
    { value: "carbon_footprint", label: "Carbon Footprint (kg CO₂/kg material)" },
    { value: "density", label: "Density (kg/m³)" },
    { value: "thermal_conductivity", label: "Thermal Conductivity (W/m·K)" },
    { value: "hardness", label: "Hardness (HV - Vickers Hardness)" },
    { value: "youngs_modulus", label: "Young's Modulus (GPa)" },
    { value: "crashworthiness", label: "Crashworthiness (Rating 1-100)" },
    { value: "surface_finish", label: "Surface Finish (Rating 1-100)" },
    { value: "formability", label: "Formability (%)" },
    { value: "thermal_expansion_coefficient", label: "Thermal Expansion Coefficient (µm/m·K)" },
    { value: "fatigue_resistance", label: "Fatigue Resistance (%)" },
    { value: "oxidation_resistance", label: "Oxidation Resistance (%)" },
    { value: "chemical_stability", label: "Chemical Stability (%)" },
    { value: "uv_resistance", label: "UV Resistance (%)" },
    { value: "scratch_resistance", label: "Scratch Resistance (%)" },
    { value: "noise_reduction_capability", label: "Noise Reduction Capability (Rating 1-100)" },
    { value: "fire_resistance", label: "Fire Resistance (Rating 1-100)" },
    { value: "joining_capability", label: "Joining Capability (Rating 1-100)" },
    { value: "cost_per_unit", label: "Cost per Unit (Currency/Unit)" },
    { value: "sustainable_sourcing", label: "Sustainable Sourcing (%)" },
    { value: "thermal_insulation", label: "Thermal Insulation (W/m·K)" },
    { value: "weight", label: "Weight (kg)" },
    { value: "machinability", label: "Machinability (Rating 1-100)" },
    { value: "durability", label: "Durability (Rating 1-100)" },
    { value: "fracture_toughness", label: "Fracture Toughness (MPa·m¹/²)" },
    { value: "comfort", label: "Comfort (Rating 1-100)" },
    { value: "breathability", label: "Breathability (Rating 1-100)" },
    { value: "resistance_to_deformation", label: "Resistance to Deformation (%)" },
    { value: "moisture_resistance", label: "Moisture Resistance (%)" },
    { value: "abrasion_resistance", label: "Abrasion Resistance (%)" },
    { value: "rolling_resistance", label: "Rolling Resistance (Rating 1-100)" },
    { value: "heat_resistance", label: "Heat Resistance (Rating 1-100)" },
    { value: "traction", label: "Traction (Rating 1-100)" },
    { value: "elasticity", label: "Elasticity (%)" },
    { value: "puncture_resistance", label: "Puncture Resistance (%)" },
    { value: "energy_absorption", label: "Energy Absorption (J)" },
  ];


  const handlePropertyChange = (selectedOptions) => {
    setPropertyFilters(selectedOptions);
  };

  const handleValueChange = (property, value) => {
    setPropertyValues((prevValues) => ({
      ...prevValues,
      [property]: value,
    }));
    console.log(propertyValues)
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


  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto p-6 space-y-8 bg-gradient-to-b from-gray-900 to-gray-700">
        <h2 className="text-5xl font-extrabold mb-12 text-center text-white tracking-tight">
          Material Recommendation by Car Part
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
              <>
                <h3 className="text-3xl font-bold mb-6 border-b-2 border-white pb-2">
                  Selected Part:{" "}
                  <span className="font-light">{selectedPart}</span>
                </h3>

                <h3 className="text-2xl font-semibold mt-4 mb-4">
                  Select Material Properties
                </h3>
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
                  <div key={filter.value} className="mt-6">
                    <label className="block text-lg font-medium">
                      {filter.label}
                    </label>
                    <input
                      type="number"
                      onChange={(e) =>
                        handleValueChange(filter.value, e.target.value)
                      }
                      className="mt-2 p-4 border text-gray-700 border-gray-300 rounded-lg w-full focus:outline-none focus:ring-4 focus:ring-teal-500"
                      placeholder={`Enter value for ${filter.label}`}
                    />
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
                          <strong>Material:</strong> {rec.Material} <br />
                          {/* <strong>Similarity:</strong> {rec.Similarity} <br /> */}
                          {/* <strong>Recommended Parts:</strong> {rec.Recommended_Parts.join(', ')} */}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <div className="text-xl text-center font-light">
                Please select a car part to view material properties and recommendations.
              </div>
            )}
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}