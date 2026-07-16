'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// Inner 3D Candle mesh with animations
function CandleMesh({ waxColor = '#F5EDD8' }: { waxColor?: string }) {
  const jarRef = useRef<THREE.Mesh>(null);
  const flameRef = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.PointLight>(null);

  // Animate the candle rotation and flame flicker
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Slow auto rotation
    if (jarRef.current) {
      jarRef.current.rotation.y = time * 0.15;
    }
    
    // Flame flicker animation (scale and position oscillation)
    if (flameRef.current) {
      const flicker = Math.sin(time * 25) * 0.05 + 1;
      flameRef.current.scale.set(0.12 * flicker, 0.28 * (Math.cos(time * 15) * 0.08 + 1.1), 0.12 * flicker);
      flameRef.current.position.y = 1.05 + Math.sin(time * 20) * 0.01;
    }

    // Light intensity flicker
    if (lightRef.current) {
      lightRef.current.intensity = 1.5 + Math.sin(time * 30) * 0.2;
    }
  });

  return (
    <group ref={jarRef}>
      {/* 1. Glass Jar (Outer Cylinder) */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.7, 0.7, 1.8, 32]} />
        <meshPhysicalMaterial 
          color="#d4af37" // Amber/Gold jar color tint
          roughness={0.1}
          metalness={0.1}
          transmission={0.6} // Semi-transparent glass
          ior={1.5}
          thickness={0.2}
          transparent
          opacity={0.7}
        />
      </mesh>

      {/* 2. Wax (Inner Cylinder) */}
      <mesh position={[0, -0.05, 0]}>
        <cylinderGeometry args={[0.65, 0.65, 1.5, 32]} />
        <meshStandardMaterial 
          color={waxColor} 
          roughness={0.8}
        />
      </mesh>

      {/* 3. Wooden Wick */}
      <mesh position={[0, 0.75, 0]}>
        <boxGeometry args={[0.04, 0.15, 0.1]} />
        <meshStandardMaterial color="#5C4A3D" roughness={0.9} />
      </mesh>

      {/* 4. Glowing Candle Flame */}
      <mesh ref={flameRef} position={[0, 1.05, 0]}>
        <coneGeometry args={[1, 2, 8]} />
        <meshBasicMaterial color="#FFAC1C" />
      </mesh>

      {/* 5. Flame Light Source */}
      <pointLight 
        ref={lightRef} 
        position={[0, 1.2, 0]} 
        color="#FFA31A" 
        intensity={2.0} 
        distance={8} 
        decay={2}
      />
    </group>
  );
}

export default function Candle3D({ waxColor = '#FAF5EB' }: { waxColor?: string }) {
  return (
    <div className="w-full h-[400px] cursor-grab active:cursor-grabbing relative rounded-2xl overflow-hidden bg-sand-100/60 border border-sand-200 shadow-sm flex items-center justify-center">
      {/* Ambient background shadow glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gold-200/10 blur-[80px] rounded-full pointer-events-none" />

      <Canvas
        camera={{ position: [0, 1.5, 3.2], fov: 45 }}
        style={{ width: '100%', height: '100%' }}
      >
        <ambientLight intensity={0.6} color="#FFEBB3" />
        <directionalLight position={[2, 4, 3]} intensity={1.0} color="#FFFFFF" castShadow />
        <directionalLight position={[-2, 2, -2]} intensity={0.4} color="#E0D5C8" />
        
        <CandleMesh waxColor={waxColor} />

        <OrbitControls 
          enableZoom={false} 
          minPolarAngle={Math.PI / 3} 
          maxPolarAngle={Math.PI / 1.8} 
        />
      </Canvas>

      {/* Touch helper label */}
      <span className="absolute bottom-4 right-4 text-[9px] font-ui uppercase tracking-widest text-ink-300 font-bold bg-white/80 backdrop-blur-xs py-1.5 px-3 rounded-lg border border-sand-200 select-none">
        Rotate 3D View
      </span>
    </div>
  );
}
