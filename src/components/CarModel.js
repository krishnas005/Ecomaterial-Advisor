import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import React, { useState, useRef, useEffect } from 'react';

const CarModel = () => {
  const carModel = useGLTF('model/scene.gltf'); 
  const [selectedPart, setSelectedPart] = useState(null); 
  const [hoveredPart, setHoveredPart] = useState(null);  

  return (
    <>
      <Canvas
        frameloop="demand"
        camera={{ position: [-4, 3, 10], fov: 60, near: 0.01, far: 1000 }}
        style={{ height: '100vh', width: '100vw' }}
      >
        {/* OrbitControls for rotation */}
        <OrbitControls autoRotate enableZoom={true} enablePan={true} autoRotateSpeed={0} />
        
        {/* Lighting */}
        <ambientLight intensity={1} />
        <directionalLight position={[5, 5, 5]} intensity={2.5} />
        <spotLight position={[10, 10, 10]} angle={0.3} penumbra={1} intensity={2} />

        {/* Render the 3D car model */}
        <primitive object={carModel.scene} scale={1.8} />

        {/* Add interaction logic inside the Canvas */}
        <InteractiveCar 
          carModel={carModel} 
          setSelectedPart={setSelectedPart} 
          setHoveredPart={setHoveredPart}
        />
      </Canvas>

      {/* Display the selected part's name */}
      {selectedPart && (
        <div style={{ position: 'absolute', top: 20, left: 20, color: 'white', fontSize: '18px', fontWeight: 'bold' }}>
          Selected Part: {selectedPart}
        </div>
      )}

      {/* Display the hovered part's name */}
      {hoveredPart && (
        <div style={{ position: 'absolute', top: 50, left: 20, color: 'lightgrey', fontSize: '14px' }}>
          Hovering over: {hoveredPart}
        </div>
      )}
    </>
  );
};

const InteractiveCar = ({ carModel, setSelectedPart, setHoveredPart }) => {
  const raycaster = useRef(new THREE.Raycaster());
  const mouse = useRef(new THREE.Vector2());
  const { camera, gl, scene } = useThree(); // Access the camera, renderer, and scene

  useEffect(() => {
    const handlePointerMove = (event) => {
      // Get mouse coordinates normalized between -1 and 1
      mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;

      // Perform raycasting to find intersecting objects
      raycaster.current.setFromCamera(mouse.current, camera);
      const intersects = raycaster.current.intersectObjects(carModel.scene.children, true);

      if (intersects.length > 0) {
        const hoveredPart = intersects[0].object;
        setHoveredPart(hoveredPart.name); // Set the hovered part's name
      } else {
        setHoveredPart(null); // Reset when not hovering over any part
      }
    };

    const handlePointerDown = () => {
      // Perform raycasting when the user clicks
      raycaster.current.setFromCamera(mouse.current, camera);
      const intersects = raycaster.current.intersectObjects(carModel.scene.children, true);

      if (intersects.length > 0) {
        const clickedPart = intersects[0].object;
        setSelectedPart(clickedPart.name); // Set the clicked part's name
        console.log('Selected Part:', clickedPart.name); // Log the name of the part
      }
    };

    // Add event listeners for mouse move and click
    gl.domElement.addEventListener('pointermove', handlePointerMove);
    gl.domElement.addEventListener('pointerdown', handlePointerDown);

    // Clean up event listeners on component unmount
    return () => {
      gl.domElement.removeEventListener('pointermove', handlePointerMove);
      gl.domElement.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [camera, gl, carModel, setHoveredPart, setSelectedPart]);

  return null; // This component only handles interaction logic
};

export default CarModel;
