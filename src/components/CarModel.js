'use client';

import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import 'tailwindcss/tailwind.css';
import { usePart } from "../context/PathContext";
import { ClipLoader } from 'react-spinners'; 
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader } from "@react-three/fiber";

const CarModel = () => {
  // const carModel = useGLTF('/untitled.glb');
  const carModel = useLoader(GLTFLoader, "/untitled.glb");
  const { selectedPart, setSelectedPart } = usePart();
  const [hoveredPart, setHoveredPart] = useState(null); // For hover tooltip
  const [hoverPosition, setHoverPosition] = useState(null); // Store screen position of hovered part
  const [isLoading, setIsLoading] = useState(false); // Add loading state
  const carRef = useRef();

  // GSAP animation to move the car initially
  useEffect(() => {
    if (carRef.current) {
      gsap.fromTo(
        carRef.current.position,
        { x: 10, y: 5, z: 10 },
        { x: 0, y: 0, z: 0, duration: 2, ease: 'power2.out' }
      );
    }
  }, []);

  // Handle part selection from child
  const handlePartSelect = (part) => {
    setSelectedPart(null);  // Reset the selected part to ensure fresh loading state
    setIsLoading(true);     // Start loading

    // Simulate a delay for data fetch (e.g., API call)
    setTimeout(() => {
      setSelectedPart(part);  // Set the selected part once loading is complete
      setIsLoading(false);    // Stop loading
    }, 1500); // Delay time to simulate data fetching
  };

  return (
    <div className="relative h-screen flex flex-col">
      {/* Top part with 3D model */}
      <div className="w-full h-3/4 flex">
        <div className="w-3/4 h-full">
          <Canvas
            frameloop="demand"
            camera={{ position: [-4, 3, 10], fov: 60, near: 0.01, far: 1000 }}
          >
            <OrbitControls
              autoRotate
              enableZoom={true}
              enablePan={true}
              autoRotateSpeed={0}
              minDistance={8}
              maxDistance={18}
            />
            <ambientLight intensity={3} />
            <directionalLight position={[5, 5, 5]} intensity={2.5} />
            <spotLight position={[10, 10, 10]} angle={0.3} penumbra={1} intensity={2} />

            {/* Car Model with GSAP animation */}
            <primitive ref={carRef} object={carModel.scene} scale={1.8} />

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
              className="absolute bg-gray-800 text-white text-sm px-4 py-2 font-bold rounded-md shadow-lg"
              style={{
                left: `${hoverPosition.x}px`,
                top: `${hoverPosition.y}px`,
                transform: 'translate(-50%, -120%)',
              }}
            >
              {hoveredPart}
            </div>
          )}
        </div>
      </div>

      {/* Bottom part for material recommendations */}
      <div className="w-full h-1/4 flex justify-center items-center">
        <div className="w-11/12 max-w-3xl bg-white p-6 rounded-lg shadow-2xl">
          {isLoading ? (
            <div className="flex justify-center items-center h-full">
              <ClipLoader color="#3498db" size={50} /> {/* Loader while loading */}
            </div>
          ) : selectedPart ? (
            <>
              <div className="text-xl font-bold text-gray-800 mb-4">
                Selected Part: {selectedPart}
              </div>
              <div className="text-lg font-semibold text-gray-700 mb-2">Recommended Materials</div>
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

const InteractiveCar = ({ carModel, setHoveredPart, setHoverPosition, onPartSelect }) => {
  const raycaster = useRef(new THREE.Raycaster());
  const mouse = useRef(new THREE.Vector2());
  const { camera, gl } = useThree(); // Access camera, renderer, and scene

  useEffect(() => {
    const handlePointerMove = (event) => {
      mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.current.setFromCamera(mouse.current, camera);
      const intersects = raycaster.current.intersectObjects(carModel.scene.children, true);

      if (intersects.length > 0) {
        const hoveredPart = intersects[0].object;
        setHoveredPart(hoveredPart.name); // Set the name of the hovered part

        const partPosition = hoveredPart.getWorldPosition(new THREE.Vector3());
        const screenPosition = partPosition.clone().project(camera);
        const x = (screenPosition.x * 0.5 + 0.5) * window.innerWidth;
        const y = (-screenPosition.y * 0.5 + 0.5) * window.innerHeight;
        setHoverPosition({ x, y });
      } else {
        setHoveredPart(null);
        setHoverPosition(null);
      }
    };

    const handlePointerClick = (event) => {
      mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.current.setFromCamera(mouse.current, camera);
      const intersects = raycaster.current.intersectObjects(carModel.scene.children, true);

      if (intersects.length > 0) {
        const selectedPart = intersects[0].object.name;
        onPartSelect(selectedPart); // Use the callback to set selected part in the parent
      }
    };

    gl.domElement.addEventListener('pointermove', handlePointerMove);
    gl.domElement.addEventListener('pointerdown', handlePointerClick); // Listen for clicks to select parts

    return () => {
      gl.domElement.removeEventListener('pointermove', handlePointerMove);
      gl.domElement.removeEventListener('pointerdown', handlePointerClick); // Clean up event listener
    };
  }, [camera, gl, carModel, setHoveredPart, setHoverPosition, onPartSelect]);

  return null; // This component only handles interaction logic
};

export default CarModel;
