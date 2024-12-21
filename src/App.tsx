// src/App.tsx

import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import "./App.css";

const Box: React.FC<{ onClick: (position: [number, number, number]) => void }> = ({ onClick }) => {
  const handleClick = (event: any) => {
    const position = event.point;
    const spherePosition: [number, number, number] = [position.x, position.y, position.z];
    onClick(spherePosition);
  };

  return (
    <mesh onClick={handleClick} position={[0, 0, 0]}>
      <boxGeometry args={[10, 10, 10]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
};

const Sphere: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  return (
    <mesh position={position}>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial color="blue" />
    </mesh>
  );
};

const App: React.FC = () => {
  const [spheres, setSpheres] = useState<[number, number, number][]>([]);

  const handleBoxClick = (position: [number, number, number]) => {
    setSpheres(oldSpheres => [...oldSpheres, position]); // добавляем новую позицию в массив
  };

  return (
    <Canvas camera={{ position: [20, 20, 20], fov: 50 }}>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Box onClick={handleBoxClick} />
      {spheres.map((spherePosition, index) => (
        <Sphere key={index} position={spherePosition} />
      ))}
      <OrbitControls enablePan={false} mouseButtons={{
          LEFT: undefined,
          MIDDLE: undefined,
          RIGHT: THREE.MOUSE.ROTATE
        }}/>
    </Canvas>
  );
};

export default App;