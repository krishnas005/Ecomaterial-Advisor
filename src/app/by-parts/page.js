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
    { value: "tensile-strength", label: "Tensile Strength (MPa)" },
    { value: "impact-resistance", label: "Impact Resistance (J/m²)" },
    { value: "corrosion-resistance", label: "Corrosion Resistance (%)" },
    { value: "recyclability", label: "Recyclability (%)" },
    { value: "sustainability-rating", label: "Sustainability Rating (1-10)" },
    { value: "ductility", label: "Ductility (%)" },
    { value: "carbon-footprint", label: "Carbon Footprint (kg CO₂/kg material)" },
    { value: "density", label: "Density (kg/m³)" },
    { value: "thermal-conductivity", label: "Thermal Conductivity (W/m·K)" },
    { value: "hardness", label: "Hardness (HV - Vickers Hardness)" },
    { value: "youngs-modulus", label: "Young's Modulus (GPa)" },
    { value: "crashworthiness", label: "Crashworthiness (Rating 1-100)" },
    { value: "surface-finish", label: "Surface Finish (Rating 1-100)" },
    { value: "formability", label: "Formability (%)" },
    { value: "thermal-expansion", label: "Thermal Expansion Coefficient (µm/m·K)" },
    { value: "fatigue-resistance", label: "Fatigue Resistance (%)" },
    { value: "oxidation-resistance", label: "Oxidation Resistance (%)" },
    { value: "chemical-stability", label: "Chemical Stability (%)" },
    { value: "uv-resistance", label: "UV Resistance (%)" },
    { value: "scratch-resistance", label: "Scratch Resistance (%)" },
    { value: "noise-reduction", label: "Noise Reduction Capability (Rating 1-100)" },
    { value: "fire-resistance", label: "Fire Resistance (Rating 1-100)" },
    { value: "joining-capability", label: "Joining Capability (Rating 1-100)" },
    { value: "cost-per-unit", label: "Cost per Unit (Currency/Unit)" },
    { value: "sustainable-sourcing", label: "Sustainable Sourcing (%)" },
    { value: "thermal-insulation", label: "Thermal Insulation (W/m·K)" },
    { value: "weight", label: "Weight (kg)" },
    { value: "machinability", label: "Machinability (Rating 1-100)" },
    { value: "durability", label: "Durability (Rating 1-100)" },
    { value: "fracture-toughness", label: "Fracture Toughness (MPa·m¹/²)" },
    { value: "comfort", label: "Comfort (Rating 1-100)" },
    { value: "breathability", label: "Breathability (Rating 1-100)" },
    { value: "resistance-to-deformation", label: "Resistance to Deformation (%)" },
    { value: "moisture-resistance", label: "Moisture Resistance (%)" },
    { value: "abrasion-resistance", label: "Abrasion Resistance (%)" },
    { value: "rolling-resistance", label: "Rolling Resistance (Rating 1-100)" },
    { value: "heat-resistance", label: "Heat Resistance (Rating 1-100)" },
    { value: "traction", label: "Traction (Rating 1-100)" },
    { value: "elasticity", label: "Elasticity (%)" },
    { value: "puncture-resistance", label: "Puncture Resistance (%)" },
    { value: "energy-absorption", label: "Energy Absorption (J)" },
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
            className="animated-section bg-gradient-to-r from-teal-800 to-blue-800 text-white p-8 rounded-xl shadow-md hover:shadow-2xl transition-shadow duration-300 w-full lg:w-1/2 h-[107vh] overflow-y-scroll"
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
                  <button className="mt-8 w-full bg-teal-500 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-teal-600 transition-all duration-300">
                    Submit
                  </button>
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
