import React from 'react';
import Image from 'next/image';
import { IoClose } from 'react-icons/io5'; 

const SustainabilityModal = ({ onClose }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="relative bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto flex">
                
                <button
                    className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
                    onClick={onClose}
                >
                    <IoClose size={24} /> 
                </button>

                <div className="flex-1 pr-4 flex flex-col justify-between">
                    <div>
                        <h2 className="text-2xl font-bold mb-4 text-black">Sustainability Score Factors</h2>
                        <p className="text-gray-600">This score is based on the following parameters:</p>
                        <ul className="list-disc list-inside mt-2 text-gray-500">
                            <li>Cost</li>
                            <li>Carbon Footprint</li>
                            <li>Lifecycle Assessment</li>
                            <li>Recyclability</li>
                            <li>Durability</li>
                            <li>Energy Efficiency</li>
                            <li>Environmental Impact</li>
                            <li>Material Availability</li>
                        </ul>
                    </div>
                </div>
                <div className="flex-none">
                    <Image
                        src="/sustainabilityScore.jpg"
                        alt="Sustainability Factors"
                        width={550}
                        height={500}
                        className="rounded-lg shadow-md"
                    />
                </div>
            </div>
        </div>
    );
};

export default SustainabilityModal;
