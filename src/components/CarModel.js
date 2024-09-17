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
  const carModel = useGLTF('/untitled.glb');
  const { selectedPart, setSelectedPart } = usePart();
  const [hoveredPart, setHoveredPart] = useState(null);
  const [hoverPosition, setHoverPosition] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const carRef = useRef();

  // GSAP animation to move the car initially
  useEffect(() => {
    if (carRef.current) {
      gsap.fromTo(
        carRef.current.position,
        { x: 2, y: 5, z: 4 },
        { x: 0, y: 0, z: 0, duration: 1.5, ease: 'power2.out' }
      );
    }
  }, []);

  // Optimized Part Selection Handler
  const handlePartSelect = useCallback(
    (part) => {
      if (!part) return;
      setSelectedPart(null); // Reset before loading the new part
      setIsLoading(true);

      // Simulate loading process asynchronously
      new Promise((resolve) => {
        setTimeout(() => {
          resolve(part);
        }, 1000); // Reduced delay to 1 second
      }).then((selected) => {
        setSelectedPart(selected);
        setIsLoading(false);
      });
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
              autoRotateSpeed={1.2} // Slightly faster rotation for better UX
              minDistance={10}
              maxDistance={18}
            />
            <ambientLight intensity={0.9} />
            <directionalLight position={[5, 5, 5]} intensity={2.5} />
            <spotLight position={[10, 10, 10]} angle={0.3} penumbra={1} intensity={2.5} />

            {/* Car Model with GSAP animation */}
            <primitive ref={carRef} object={carModel.scene} scale={1.5} />

            {/* Handle interaction and hover detection */}
            <InteractiveCar
              carModel={carModel}
              setHoveredPart={setHoveredPart}
              setHoverPosition={setHoverPosition}
              onPartSelect={handlePartSelect}
            />
          </Canvas>

          {/* Tooltip for hovered car part */}
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

      {/* Bottom part for material recommendations */}
      <div className="w-full h-1/4 flex justify-center items-center bg-white shadow-lg">
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
              <div className="text-lg font-semibold text-gray-700 mb-4">Recommended Materials</div>
              <ul className="grid grid-cols-3 gap-4">
                <li className="bg-blue-500 text-white text-center px-4 py-2 rounded-lg shadow-md hover:bg-blue-600">
                  Material 1
                </li>
                <li className="bg-blue-500 text-white text-center px-4 py-2 rounded-lg shadow-md hover:bg-blue-600">
                  Material 2
                </li>
                <li className="bg-blue-500 text-white text-center px-4 py-2 rounded-lg shadow-md hover:bg-blue-600">
                  Material 3
                </li>
              </ul>
            </>
          ) : (
            <div className="text-gray-600 text-lg">
              Select a car part to see material recommendations.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Handles the hover and click interaction with the car model
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
