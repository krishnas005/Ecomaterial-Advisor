"use client";

import { useState, useRef } from 'react';
import Select from 'react-select';
import { useFadeInEffect } from '../../components/animations';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ByProperties() {
  const [propertyFilters, setPropertyFilters] = useState([]);
  const [propertyValues, setPropertyValues] = useState({});
  const resultRef = useRef(null);
  useFadeInEffect(resultRef);

  const materialProperties = [
    { value: 'tensile-strength', label: 'Tensile Strength' },
    { value: 'ductility', label: 'Ductility' },
    { value: 'impact-resistance', label: 'Impact Resistance' },
  ];

  const handlePropertyChange = (selectedOptions) => {
    setPropertyFilters(selectedOptions);
  };

  const handleValueChange = (property, value) => {
    setPropertyValues({ ...propertyValues, [property]: value });
  };

  return (
    <div>
      <Header />
      <main className="container mx-auto p-6">
        <h2 className="text-4xl font-semibold mb-8 text-center text-blue-700">Material Recommendation by Properties</h2>

        <section className="bg-white p-8 rounded-lg shadow-md mb-12 text-gray-600">
          <h3 className="text-2xl  font-semibold mb-6">Select Material Properties</h3>
          <Select
            options={materialProperties}
            isMulti
            onChange={handlePropertyChange}
            placeholder="Select Material Properties"
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
          <button
            onClick={() => alert("Recommendation results here!")}
            className="mt-6 bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-500 transition"
          >
            Get Recommendations
          </button>
        </section>
      </main>
      <Footer />
    </div>
  );
}
