'use client';

import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Center } from '@react-three/drei';
import * as THREE from 'three';
import { OBJLoader, MTLLoader } from 'three-stdlib';

// Loader component for the canvas fallback
function Loader() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-sand-100/60 z-10">
      <div className="w-12 h-12 border-4 border-terra-200 border-t-terra-500 rounded-full animate-spin mb-4" />
      <span className="text-xs font-ui uppercase tracking-widest text-ink-400 font-bold animate-pulse">
        Loading 3D Studio...
      </span>
    </div>
  );
}

// 3D Candle Model Component loading OBJ
function CandleModel({ waxColor = '#F5EDD8' }: { waxColor?: string }) {
  const modelRef = useRef<THREE.Group>(null);

  // Load materials (Three.js resolves texture references relative to the .mtl location by default)
  const materials = useLoader(
    MTLLoader,
    '/Meshy_AI_Lunora_Sandalwood_Can_0716201500_texture_obj/Meshy_AI_Lunora_Sandalwood_Can_0716201500_texture.mtl'
  );

  // Load OBJ with materials applied
  const obj = useLoader(
    OBJLoader,
    '/Meshy_AI_Lunora_Sandalwood_Can_0716201500_texture_obj/Meshy_AI_Lunora_Sandalwood_Can_0716201500_texture.obj',
    (loader) => {
      materials.preload();
      loader.setMaterials(materials);
    }
  );

  // Debug log structure and apply configurations
  React.useEffect(() => {
    if (obj) {
      obj.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          // Enable shadows and adjust materials if needed
          child.castShadow = true;
          child.receiveShadow = true;
          
          // Tweak material settings for high-end preview look
          if (child.material) {
            if (Array.isArray(child.material)) {
              child.material.forEach((mat) => {
                mat.roughness = 0.45;
                mat.metalness = 0.15;
              });
            } else {
              child.material.roughness = 0.45;
              child.material.metalness = 0.15;
            }
          }
        }
      });
    }
  }, [obj]);

  // Rotation animation
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (modelRef.current) {
      modelRef.current.rotation.y = time * 0.15;
    }
  });

  // Note: Meshy AI OBJ models are often scaled in meters or arbitrary units.
  // We'll wrap in <Center> so R3F centers the model. We'll set a reasonable base scale.
  // We start with 0.015 and will adjust based on the visual layout.
  return (
    <group ref={modelRef}>
      <Center>
        <primitive object={obj} scale={0.8} />
      </Center>
    </group>
  );
}

export default function Candle3D({ waxColor = '#FAF5EB' }: { waxColor?: string }) {
  return (
    <div className="w-full h-[400px] cursor-grab active:cursor-grabbing relative rounded-2xl overflow-hidden bg-sand-100/60 border border-sand-200 shadow-sm flex items-center justify-center">
      {/* Ambient background shadow glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gold-200/10 blur-[80px] rounded-full pointer-events-none" />

      <Suspense fallback={<Loader />}>
        <Canvas
          camera={{ position: [0, 0.5, 2.5], fov: 45 }}
          style={{ width: '100%', height: '100%' }}
        >
          <ambientLight intensity={0.9} color="#FFEBB3" />
          <directionalLight position={[4, 6, 4]} intensity={1.5} color="#FFFFFF" castShadow />
          <directionalLight position={[-4, 3, -4]} intensity={0.6} color="#E0D5C8" />
          <pointLight position={[0, 1.8, 0]} intensity={1.0} color="#FFA31A" />
          
          <CandleModel waxColor={waxColor} />

          <OrbitControls 
            enableZoom={false} 
            minPolarAngle={Math.PI / 3} 
            maxPolarAngle={Math.PI / 1.8} 
          />
        </Canvas>
      </Suspense>

      {/* Touch helper label */}
      <span className="absolute bottom-4 right-4 text-[9px] font-ui uppercase tracking-widest text-ink-300 font-bold bg-white/80 backdrop-blur-xs py-1.5 px-3 rounded-lg border border-sand-200 select-none">
        Rotate 3D View
      </span>
    </div>
  );
}
