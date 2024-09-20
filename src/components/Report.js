"use client";

import React, { useRef, useState } from 'react';
import { Radar, Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Header from './Header';
import Footer from './Footer';
import SustainabilityModal from './SustainabilityModel';

const ClientReportComponent = ({material}) => {
    const inputRef = useRef(null);
    const [modalOpen, setModalOpen] = useState(false);

    // Radar chart data for comparing different metrics
    const radarData = {
        labels: ['Sustainability', 'Cost', 'Availability', 'Performance', 'Durability'],
        datasets: [
            {
                label: 'Current Material',
                data: [3, 4, 5, 2, 3],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                pointBackgroundColor: 'rgba(255, 99, 132, 1)',
            },
            {
                label: 'Recommended Material',
                data: [5, 3, 4, 5, 4],
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                pointBackgroundColor: 'rgba(54, 162, 235, 1)',
            },
        ],
    };

    // Pie chart data for cost comparison
    const pieData = {
        labels: ['Current Material', 'Recommended Material'],
        datasets: [
            {
                data: [70, 40],
                backgroundColor: ['#ff6384', '#36a2eb'],
                hoverBackgroundColor: ['#ff6384', '#36a2eb'],
            },
        ],
    };

    // Function to download the report as a PDF
    const downloadPDF = () => {
        const input = inputRef.current;
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            pdf.addImage(imgData, 'PNG', 0, 0);
            pdf.save('material-comparison-report.pdf');
        });
    };

    return (
        <div>
            <Header />
            <div className="max-w-4xl mx-auto bg-gray-100 min-h-screen p-10" ref={inputRef} id="report">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-black">Material Comparison Report</h1>
                    <p className="text-lg text-gray-600">Generated on {new Date().toLocaleDateString()}</p>
                </div>

                <div className="mb-8 text-center">
                    <h2 className="text-3xl font-semibold text-black">Recommended Material: Carbon Fiber Reinforced Polymer {material}</h2>
                </div>

                {/* Sustainability Score and Cost Comparison */}
                <div className="flex flex-wrap justify-center items-center mb-8">
                    <div className="w-full sm:w-1/2 p-4">
                        <h3 className="text-xl font-semibold text-black text-center">
                            Sustainability Score
                            <span 
                                className="cursor-pointer text-blue-600 ml-2" 
                                onClick={() => setModalOpen(true)}
                            >
                                ?
                            </span>
                        </h3>
                        <p className="text-6xl font-bold text-green-600 text-center">8.8</p>
                    </div>
                    <div className="w-full sm:w-1/2 p-4">
                        <h3 className="text-xl font-semibold text-black text-center">Cost Comparison</h3>
                        <div style={{ width: '250px', height: '250px', margin: '0 auto' }}>
                            <Pie data={pieData} />
                        </div>
                        <p className="mt-4 text-black text-center">Recommended material is 30% cheaper</p>
                    </div>
                </div>

                {/* Comparative Radar Chart */}
                <div className="mb-8 text-center">
                    <h3 className="text-2xl font-semibold text-black">Performance and Metrics Comparison</h3>
                    <div style={{ width: '300px', height: '300px', margin: '0 auto' }}>
                        <Radar data={radarData} />
                    </div>
                    <p className="mt-4 text-black">
                        This radar chart shows the differences between current and recommended materials across various metrics.
                    </p>
                </div>

                {/* Why Our Recommended Material is Better */}
                <div className="mb-8 text-center">
                    <h3 className="text-2xl font-semibold text-black">Why Our Recommended Material is Better</h3>
                    <ul className="list-disc list-inside text-lg mt-2 text-black mx-auto max-w-lg">
                        <li>Better performance in sustainability and durability</li>
                        <li>Lower cost by 30%</li>
                        <li>Widely available with minimal supply chain issues</li>
                        <li>Requires less maintenance</li>
                    </ul>
                </div>

                {/* Download Button */}
                <div className="mb-8 text-center">
                    <button
                        onClick={downloadPDF}
                        className="bg-blue-600 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-blue-700 transition-all"
                    >
                        Download Report as PDF
                    </button>
                </div>
            </div>

            {/* Modal for Sustainability Score Details */}
            {modalOpen && <SustainabilityModal onClose={() => setModalOpen(false)} />}

            <Footer />
        </div>
    );
};

export default ClientReportComponent;
