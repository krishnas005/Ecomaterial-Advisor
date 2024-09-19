'use client';

import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import 'tailwindcss/tailwind.css';
import { usePart } from '../context/PathContext';
import { ClipLoader } from 'react-spinners';

const CarModel = () => {
  const carModel = useGLTF('/newCarModel.glb');
  const { selectedPart, setSelectedPart } = usePart();
  const [hoveredPart, setHoveredPart] = useState(null);
  const [hoverPosition, setHoverPosition] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showVehicles, setShowVehicles] = useState(true);
  const [recommendedMaterials, setRecommendedMaterials] = useState([]);
  const carRef = useRef();

  useEffect(() => {
    if (carRef.current) {
      gsap.fromTo(
        carRef.current.position,
        { x: 2, y: 5, z: 4 },
        { x: 0, y: 0, z: 0, duration: 1.5, ease: 'power2.out' }
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
      {/* Top part with 3D model */}
      <div className="w-full h-3/4 flex items-center justify-center">
        <div className="relative w-full h-full max-w-screen-lg">
          <Canvas
            className="w-full h-full"
            camera={{ position: [-6, 3, 10], fov: 40, near: 0.01, far: 1000 }}
          >
            <OrbitControls
              autoRotate
              enableZoom={true}
              enablePan={false}
              autoRotateSpeed={1.2}
              minDistance={10}
              maxDistance={18}
            />
            <ambientLight intensity={0.9} />
            <directionalLight position={[5, 5, 5]} intensity={2.5} />
            <spotLight position={[10, 10, 10]} angle={0.3} penumbra={1} intensity={2.5} />

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
              className="absolute bg-gray-900 text-white text-sm px-2 py-1 rounded-md shadow-md"
              style={{
                left: `${hoverPosition.x}px`,
                top: `${hoverPosition.y}px`,
                transform: 'translate(-50%, -150%)',
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
          <div className="flex justify-center items-center space-x-4 hover:cursor-pointer">
            <VehicleCard image="/car.webp" name=" " />
            <VehicleCard image="/truck.webp" name=" " />
            <VehicleCard image="/bike.webp" name=" " />
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
                <div className="text-xl font-bold text-gray-800 mb-1">
                  Selected Part: {selectedPart}
                </div>
                {/* <div className="text-lg font-semibold text-gray-700 mb-0">
                  Best Recommended Materials
                </div> */}
                <div className="overflow-x-auto">
                  <div className="flex justify-between text-gray-600">
                    <div className="flex-1 font-semibold">Recommended Materials</div>
                    <div className="flex-1 font-semibold text-right">Sustainability Score</div>
                  </div>
                  {recommendedMaterials.map((material, index) => (
                    <div key={index} className="flex justify-between py-1 text-gray-500">
                      <div className="flex-1">{material[0]}</div>
                      <div className="flex-1 text-right">{material[1]}</div>
                    </div>
                  ))}
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


    </div>
  );
};

const VehicleCard = ({ image, name }) => {
  return (
    <div className={`w-32 h-32 group relative bg-white rounded-lg overflow-hidden shadow-lg transform transition duration-500 hover:scale-105 m-4 flex items-center justify-center`}>
      <img src={image} alt={name} className="w-24 h-24 object-contain" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent opacity-0 group-hover:opacity-100 flex items-end justify-center transition-opacity duration-300">
        <span className="text-white font-bold text-lg mb-4">{name}</span>
      </div>
    </div>
  );
};

const InteractiveCar = ({ carModel, setHoveredPart, setHoverPosition, onPartSelect }) => {
  const raycaster = useRef(new THREE.Raycaster());
  const mouse = useRef(new THREE.Vector2());
  const { camera, gl } = useThree();

  const handlePointerMove = useCallback((event) => {
    mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.current.setFromCamera(mouse.current, camera);
    const intersects = raycaster.current.intersectObjects(carModel.scene.children, true);

    if (intersects.length > 0) {
      const hoveredPart = intersects[0].object;
      setHoveredPart(hoveredPart.name);

      const partPosition = hoveredPart.getWorldPosition(new THREE.Vector3());
      const screenPosition = partPosition.clone().project(camera);
      const x = (screenPosition.x * 0.5 + 0.5) * window.innerWidth;
      const y = (-screenPosition.y * 0.5 + 0.5) * window.innerHeight;
      setHoverPosition({ x, y });
    } else {
      setHoveredPart(null);
      setHoverPosition(null);
    }
  }, [camera, carModel.scene.children, setHoveredPart, setHoverPosition]);

  const handlePointerClick = useCallback((event) => {
    mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.current.setFromCamera(mouse.current, camera);
    const intersects = raycaster.current.intersectObjects(carModel.scene.children, true);

    if (intersects.length > 0) {
      const selectedPart = intersects[0].object.name;
      onPartSelect(selectedPart);
    }
  }, [camera, carModel.scene.children, onPartSelect]);

  useEffect(() => {
    gl.domElement.addEventListener('pointermove', handlePointerMove);
    gl.domElement.addEventListener('pointerdown', handlePointerClick);

    return () => {
      gl.domElement.removeEventListener('pointermove', handlePointerMove);
      gl.domElement.removeEventListener('pointerdown', handlePointerClick);
    };
  }, [gl.domElement, handlePointerMove, handlePointerClick]);

  return null;
};

export default CarModel;
