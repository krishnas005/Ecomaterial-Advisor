'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { usePart } from '../context/PathContext';
import { ClipLoader } from 'react-spinners';
import SustainabilityModal from './SustainabilityModel';

const CarModel = () => {
  const carModel = useGLTF('/newCarModel.glb');
  const { selectedPart, setSelectedPart } = usePart();
  const [hoveredPart, setHoveredPart] = useState(null);
  const [hoverPosition, setHoverPosition] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showVehicles, setShowVehicles] = useState(true);
  const [recommendedMaterials, setRecommendedMaterials] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const carRef = useRef();

  useEffect(() => {
    if (carRef.current) {
      gsap.fromTo(
        carRef.current.rotation,
        { y: Math.PI },
        { y: 0, duration: 1.5, ease: 'power2.out' }
      );
    }
  }, []);

  const handlePartSelect = useCallback(
    async (part) => {
      if (!part) return;
      setSelectedPart(null);
      setShowVehicles(false);
      setIsLoading(true);

      try {
        const response = await fetch('http://localhost:5000/api/part-name', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ part_name: part }),
        });
        const data = await response.json();
        setRecommendedMaterials(data);
        setSelectedPart(part);
      } catch (error) {
        console.error('Error fetching materials:', error);
      } finally {
        setIsLoading(false);
      }
    },
    [setSelectedPart]
  );

  return (
    <div className="relative flex flex-col h-screen bg-gray-100">
      <div className="w-full h-3/4 flex items-center justify-center">
        <div className="relative w-full h-full max-w-screen-lg">
          <Canvas
            className="w-full h-full"
            camera={{ position: [-6, 3, 10], fov: 40, near: 0.01, far: 1000 }}
          >
            <OrbitControls
              enableZoom={true}
              enablePan={false}
              minDistance={8}
              maxDistance={20}
            />
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 5]} intensity={1} />
            <spotLight position={[10, 10, 10]} angle={0.3} penumbra={1} intensity={1.5} />

            <primitive ref={carRef} object={carModel.scene} scale={1.5} />

            <InteractiveCar
              carModel={carModel}
              setHoveredPart={setHoveredPart}
              setHoverPosition={setHoverPosition}
              onPartSelect={handlePartSelect}
            />
          </Canvas>

          {hoveredPart && hoverPosition && (
            <div
              className="absolute bg-gray-900 text-white text-sm px-2 py-1 rounded-md shadow-md pointer-events-none"
              style={{
                left: `${hoverPosition.x}px`,
                top: `${hoverPosition.y}px`,
                transform: 'translate(-50%, -100%)',
              }}
            >
              {hoveredPart}
            </div>
          )}
        </div>
      </div>

      {showVehicles ? (
        <div className="flex flex-col justify-center items-center mt-6 max-w-4xl mx-auto space-y-2">
          <p className="text-lg text-gray-700 font-bold">Choose any vehicle to preview:</p>
          <div className="flex justify-center items-center space-x-4">
            <VehicleCard image="/car.webp" name="Car" />
            <VehicleCard image="/truck.webp" name="Truck" />
            <VehicleCard image="/bike.webp" name="Bike" />
          </div>
        </div>
      ) : null}

      {!showVehicles && (
        <div className="w-full h-1/4 flex justify-center items-center bg-white shadow-lg mt-4">
          <div className="w-11/12 max-w-4xl p-6 rounded-lg">
            {isLoading ? (
              <div className="flex justify-center items-center h-full">
                <ClipLoader color="#3498db" size={50} />
              </div>
            ) : selectedPart ? (
              <>
                <div className="text-xl font-bold text-gray-800 mb-4">
                  Selected Part: {selectedPart}
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="">
                        <th className="text-left pb-1 font-semibold text-gray-600">Recommended Materials</th>
                        <th className="text-right pb-1 font-semibold text-gray-600">Sustainability Score <span
                          className="cursor-pointer text-blue-600 ml-2"
                          onClick={() => setModalOpen(true)}
                        >
                          ?
                        </span></th>

                      </tr>
                    </thead>
                    <tbody>
                      {recommendedMaterials.map((material, index) => (
                        <tr key={index} className="">
                          <td className="py-1 text-gray-700">{material[0]}</td>
                          <td className="py-1 text-right text-gray-700">{material[1]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            ) : (
              <div className="text-gray-600 text-lg">
                Select a car part to see material recommendations.
              </div>
            )}
          </div>
        </div>
      )}
      {modalOpen && <SustainabilityModal onClose={() => setModalOpen(false)} />}
    </div>
  );
};

const VehicleCard = ({ image, name }) => {
  return (
    <div className="w-32 h-32 group relative bg-white rounded-lg overflow-hidden shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl m-4 flex items-center justify-center cursor-pointer">
      <img src={image} alt={name} className="w-24 h-24 object-contain" />
      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <span className="text-white font-bold text-lg">{name}</span>
      </div>
    </div>
  );
};

const InteractiveCar = ({ carModel, setHoveredPart, setHoverPosition, onPartSelect }) => {
  const raycaster = useRef(new THREE.Raycaster());
  const mouse = useRef(new THREE.Vector2());
  const { camera, gl } = useThree();

  const handlePointerMove = useCallback((event) => {
    const rect = gl.domElement.getBoundingClientRect();
    mouse.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.current.setFromCamera(mouse.current, camera);
    const intersects = raycaster.current.intersectObjects(carModel.scene.children, true);

    if (intersects.length > 0) {
      const hoveredPart = intersects[0].object;
      setHoveredPart(hoveredPart.name);

      const screenPosition = intersects[0].point.clone().project(camera);
      const x = (screenPosition.x * 0.5 + 0.5) * rect.width + rect.left;
      const y = (-screenPosition.y * 0.5 + 0.5) * rect.height + rect.top;
      setHoverPosition({ x, y });
    } else {
      setHoveredPart(null);
      setHoverPosition(null);
    }
  }, [camera, carModel.scene.children, setHoveredPart, setHoverPosition, gl]);

  const handlePointerClick = useCallback((event) => {
    const rect = gl.domElement.getBoundingClientRect();
    mouse.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.current.setFromCamera(mouse.current, camera);
    const intersects = raycaster.current.intersectObjects(carModel.scene.children, true);

    if (intersects.length > 0) {
      const selectedPart = intersects[0].object;
      onPartSelect(selectedPart.name);
    }
  }, [camera, carModel.scene.children, onPartSelect, gl]);

  useEffect(() => {
    const domElement = gl.domElement;
    domElement.addEventListener('pointermove', handlePointerMove);
    domElement.addEventListener('pointerdown', handlePointerClick);

    return () => {
      domElement.removeEventListener('pointermove', handlePointerMove);
      domElement.removeEventListener('pointerdown', handlePointerClick);
    };
  }, [gl.domElement, handlePointerMove, handlePointerClick]);

  return null;
};

export default CarModel;