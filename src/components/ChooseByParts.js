"use client";

import Select from 'react-select';
import gsap from 'gsap';
import { useFadeInEffect } from '../components/animations';
import { useRef, useState } from 'react';

export default function Home() {
  const [selectedPart, setSelectedPart] = useState(null);
  const [propertyFilters, setPropertyFilters] = useState([]);
  const [propertyValues, setPropertyValues] = useState({});
  const resultRef = useRef(null);
  useFadeInEffect(resultRef);

  const carParts = [
    { value: 'hood', label: 'Hood' },
    { value: 'door', label: 'Door' },
    { value: 'wheel', label: 'Wheel' },
  ];

  const materialProperties = [
    { value: 'tensile-strength', label: 'Tensile Strength' },
    { value: 'ductility', label: 'Ductility' },
    { value: 'impact-resistance', label: 'Impact Resistance' },
  ];

  const handlePartChange = (selectedOption) => {
    setSelectedPart(selectedOption);
    gsap.to(resultRef.current, { opacity: 1, duration: 1 });
  };

  const handlePropertyChange = (selectedOptions) => {
    setPropertyFilters(selectedOptions);
  };

  const handleValueChange = (property, value) => {
    setPropertyValues({ ...propertyValues, [property]: value });
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-4xl font-semibold mb-8 text-center text-blue-700">Material Recommendation by Car Part</h2>

      <section className="bg-white p-8 rounded-lg shadow-md mb-12">
        <h3 className="text-2xl font-semibold mb-6">Select a Car Part</h3>
        <Select
          options={carParts}
          onChange={handlePartChange}
          placeholder="Select a Car Part"
        />

        {selectedPart && (
          <div ref={resultRef} className="mt-8">
            <h3 className="text-xl font-semibold mt-4">Select Material Properties</h3>
            <Select
              options={materialProperties}
              isMulti
              onChange={handlePropertyChange}
              placeholder="Select Material Properties"
              className="mt-2"
            />

            {propertyFilters.map((filter) => (
              <div key={filter.value} className="mt-4">
                <label className="block text-lg font-medium">{filter.label}</label>
                <input
                  type="number"
                  onChange={(e) => handleValueChange(filter.value, e.target.value)}
                  className="mt-2 p-2 border border-gray-300 rounded w-full"
                  placeholder={`Enter value for ${filter.label}`}
                />
              </div>
            ))}
          </div>
        )}

        <button
          onClick={() => alert("Recommendation results here!")}
          className="mt-6 bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-500 transition"
        >
          Get Recommendations
        </button>
      </section>

      <a href="/by-properties" className="text-blue-700 hover:underline">
        Prefer to find materials by properties only? Click here.
      </a>
    </div>
  );
}