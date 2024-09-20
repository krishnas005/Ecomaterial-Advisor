import React from 'react';
import Image from 'next/image';

const SustainabilityModal = ({ onClose }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto flex">
                <div className="flex-1 pr-4 flex flex-col justify-between">
                    <div>
                        <h2 className="text-2xl font-bold mb-4 text-black">Sustainability Score Factors</h2>
                        <p>This score is based on the following parameters:</p>
                        <ul className="list-disc list-inside mt-2">
                            <li>Environmental Impact</li>
                            <li>Resource Efficiency</li>
                            <li>Lifecycle Analysis</li>
                            <li>Renewability</li>
                            <li>Compliance with Standards</li>
                        </ul>
                    </div>
                    <div className="mt-4 text-right">
                        <button
                            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-all"
                            onClick={onClose}
                        >
                            Close
                        </button>
                    </div>
                </div>
                <div className="flex-none w-1/3">
                    <Image
                        src="/sustainabilityScore.jpg"
                        alt="Sustainability Factors"
                        width={400}
                        height={300}
                        className="rounded-lg shadow-md"
                    />
                </div>
            </div>
        </div>
    );
};

export default SustainabilityModal;
