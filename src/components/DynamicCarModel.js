'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';

const CarModelRenderer = ({ carModel, onPartSelect, setHoveredPart, setHoverPosition }) => {
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

  return (
    <primitive ref={carRef} object={carModel.scene} scale={1.5}>
      <InteractiveCar
        carModel={carModel}
        setHoveredPart={setHoveredPart}
        setHoverPosition={setHoverPosition}
        onPartSelect={onPartSelect}
      />
    </primitive>
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

const DynamicCarModel = ({ onPartSelect, setHoveredPart, setHoverPosition }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const carModel = useGLTF('/newCarModel.glb');

  return mounted ? (
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

      <CarModelRenderer
        carModel={carModel}
        onPartSelect={onPartSelect}
        setHoveredPart={setHoveredPart}
        setHoverPosition={setHoverPosition}
      />
    </Canvas>
  ) : null;
};

export default DynamicCarModel;