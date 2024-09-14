"use client";

import Select from "react-select";
import gsap from "gsap";
import { useRef, useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CarModel from "@/components/CarModel";  
import { usePart } from "../../context/PathContext";

export default function ChooseByParts() {
  const [propertyFilters, setPropertyFilters] = useState([]); // Material properties selected by user
  const [propertyValues, setPropertyValues] = useState({}); // User input for property values
  const resultRef = useRef(null); // Ref for animation effect
  const { selectedPart, setSelectedPart } = usePart(); // Get selected part from context

  // Fade-in effect for material properties section
  useEffect(() => {
    gsap.fromTo(
      ".animated-section",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power3.out" }
    );
  }, [selectedPart]);

  const materialProperties = [
    { value: "tensile-strength", label: "Tensile Strength (MPa)" },
    { value: "ductility", label: "Ductility (%)" },
    { value: "impact-resistance", label: "Impact Resistance (J)" },
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto p-6 space-y-8">
        <h2 className="text-4xl font-bold mb-8 text-center text-blue-700 tracking-tight">
          Material Recommendation by Car Part
        </h2>

        {/* Make the layout responsive: Stack on small screens, row on large screens */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:space-x-6 space-y-6 lg:space-y-0">
          {/* Left Column: 3D Car Model */}
          <div className="w-full lg:w-1/2 bg-white rounded-lg shadow-lg p-4 border border-gray-200">
            <CarModel setSelectedPart={setSelectedPart} />
          </div>

          {/* Right Column: Material Selection & Properties */}
          <section
            ref={resultRef}
            className="animated-section bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 w-full lg:w-1/2 h-[80vh] overflow-y-scroll"
          >
            {selectedPart ? (
              <>
                <h3 className="text-3xl font-semibold mb-6 border-b-2 border-white pb-2">
                  Selected Part: <span className="font-light">{selectedPart}</span>
                </h3>

                <h3 className="text-xl font-medium mt-4 mb-2">
                  Select Material Properties to refine the Recommendation
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
                      primary25: "lightblue",
                      primary: "blue",
                    },
                  })}
                />

                {/* Display input fields for the selected properties */}
                {propertyFilters.map((filter) => (
                  <div key={filter.value} className="mt-4">
                    <label className="block text-lg font-medium">
                      {filter.label}
                    </label>
                    <input
                      type="number"
                      onChange={(e) =>
                        handleValueChange(filter.value, e.target.value)
                      }
                      className="mt-2 p-3 border text-gray-700 border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder={`Enter value for ${filter.label}`}
                    />
                  </div>
                ))}

                {propertyFilters.length > 0 && (
                  <button className="mt-6 w-full bg-green-500 text-white px-6 py-3 rounded-lg font-medium shadow-md hover:bg-green-600 transition-all duration-300">
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
