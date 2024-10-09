'use client';

import React, { useState } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const AlloyGenerator = () => {
  const [targetProperties, setTargetProperties] = useState({
    tensile_strength: '',
    hardness: '',
    thermal_resistance: '',
    density: '',
    sustainability_score: ''
  });
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTargetProperties(prev => ({ ...prev, [name]: parseFloat(value) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('http://127.0.0.1:5000/api/generate-alloy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ target_properties: targetProperties }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate alloy');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <Header />
      <div className="max-w-2xl mx-auto p-4 text-black">
        <h1 className="text-2xl font-bold mb-4">Custom Alloy Generator</h1>

        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
          {Object.keys(targetProperties).map((prop) => (
            <div key={prop} className="flex flex-col">
              <label htmlFor={prop} className="mb-1 font-medium">
                {prop.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </label>
              <input
                type="number"
                id={prop}
                name={prop}
                value={targetProperties[prop]}
                onChange={handleInputChange}
                required
                className="border rounded p-2"
                step="0.01"
              />
            </div>
          ))}
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
            disabled={loading}
          >
            {loading ? 'Generating...' : 'Generate Alloy'}
          </button>
        </form>

        {error && (
          <div>Alert! {error}</div>
          // <Alert variant="destructive">
          //   <AlertTitle>Error</AlertTitle>
          //   <AlertDescription>{error}</AlertDescription>
          // </Alert>
        )}

        {result && (
          <div className="mt-6 space-y-4">
            <h2 className="text-xl font-semibold">Generated Alloy Results</h2>

            <div>
              <h3 className="font-medium">Composition:</h3>
              <ul className="list-disc list-inside">
                {Object.entries(result.composition).map(([element, percentage]) => (
                  <li key={element}>{`${element}: ${percentage}`}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-medium">Achieved Properties:</h3>
              <ul className="list-disc list-inside">
                {Object.entries(result.achieved_properties).map(([prop, value]) => (
                  <li key={prop}>{`${prop}: ${value}`}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-medium">Property Matches:</h3>
              <ul className="list-disc list-inside">
                {Object.entries(result.property_matches).map(([prop, percentage]) => (
                  <li key={prop}>{`${prop}: ${percentage}`}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </section>
  );
};

export default AlloyGenerator;