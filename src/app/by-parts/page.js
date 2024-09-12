"use client";

import Select from "react-select";
import gsap from "gsap";
import { useFadeInEffect } from "@/components/animations";
import { useRef, useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ChooseByParts() {
    const [selectedPart, setSelectedPart] = useState(null);
    const [propertyFilters, setPropertyFilters] = useState([]);
    const [propertyValues, setPropertyValues] = useState({});
    const resultRef = useRef(null);

    useFadeInEffect(resultRef); 

    const carParts = [
        { value: "hood", label: "Hood" },
        { value: "door", label: "Door" },
        { value: "wheel", label: "Wheel" },
    ];

    const materialProperties = [
        { value: "tensile-strength", label: "Tensile Strength" },
        { value: "ductility", label: "Ductility" },
        { value: "impact-resistance", label: "Impact Resistance" },
    ];
 
    const handlePartChange = (selectedOption) => {
        setSelectedPart(selectedOption);
        gsap.fromTo(
            resultRef.current,
            { opacity: 0, y: -20 },
            { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
        );
    }; 

    const handlePropertyChange = (selectedOptions) => {
        setPropertyFilters(selectedOptions);
    };
 
    const handleValueChange = (property, value) => {
        setPropertyValues({ ...propertyValues, [property]: value });
    };
 
    useEffect(() => {
        gsap.fromTo(
            ".animated-section",
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power3.out" }
        );
    }, []);

    return (
        <div>
            <Header />
            <main className="container mx-auto p-6 space-y-8">
                <h2 className="text-4xl font-semibold mb-8 text-center text-blue-700">
                    Material Recommendation by Car Part
                </h2>
 
                <section className="animated-section bg-gradient-to-r from-blue-400 to-indigo-500 text-white p-8 rounded-lg shadow-md mb-12 hover:shadow-xl transition-shadow duration-300">
                    <h3 className="text-2xl font-semibold mb-6">Select a Car Part</h3>
                    <Select
                        options={carParts}
                        onChange={handlePartChange}
                        placeholder="Select a Car Part"
                        className="text-black"
                    />

                    {selectedPart && (
                        <div ref={resultRef} className="mt-8">
                            <h3 className="text-xl font-semibold mt-4">
                                Select Material Properties
                            </h3>
                            <Select
                                options={materialProperties}
                                isMulti
                                onChange={handlePropertyChange}
                                placeholder="Select Material Properties"
                                className="mt-2 text-black"
                            />
 
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
                                        className="mt-2 p-3 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder={`Enter value for ${filter.label}`}
                                    />
                                </div>
                            ))}
                        </div>
                    )}
 
                    <button
                        onClick={() => alert("Recommendation results here!")}
                        className="mt-6 bg-white text-blue-700 font-semibold px-6 py-3 rounded-full shadow-md hover:bg-blue-100 transition transform hover:-translate-y-1 hover:scale-105"
                    >
                        Get Recommendations
                    </button>
                </section>
 
                <a
                    href="/by-properties"
                    className="animated-section text-blue-700 text-center block hover:underline"
                >
                    Prefer to find materials by properties only? Click here.
                </a>
            </main>
            <Footer />
        </div>
    );
}
