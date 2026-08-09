"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import type { Mesh } from "three";

/**
 * Procedural crimson orb — a distorted icosahedron with a faint wireframe
 * shell, drifting on its own and nudged by pointer position. Pure client
 * component, dynamically imported with ssr:false from Hero.
 */
function Orb() {
  const coreRef = useRef<Mesh>(null);
  const wireRef = useRef<Mesh>(null);
  const eased = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    eased.current.x += (state.pointer.x - eased.current.x) * 0.04;
    eased.current.y += (state.pointer.y - eased.current.y) * 0.04;

    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.16 + eased.current.x * 0.01;
      coreRef.current.rotation.x += delta * 0.06 + eased.current.y * 0.01;
    }
    if (wireRef.current) {
      wireRef.current.rotation.y -= delta * 0.09;
      wireRef.current.rotation.x -= delta * 0.03;
    }
  });

  return (
    <group rotation={[0.35, 0, 0]} scale={0.52}>
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[1, 5]} />
        <MeshDistortMaterial
          color="#8a0420"
          emissive="#d90429"
          emissiveIntensity={0.22}
          roughness={0.5}
          metalness={0.4}
          distort={0.32}
          speed={1.2}
        />
      </mesh>
      <mesh ref={wireRef} scale={1.24}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.1} />
      </mesh>
    </group>
  );
}

export default function HeroOrb() {
  return (
    <Canvas
      dpr={[1, 1.6]}
      camera={{ position: [0, 0, 4.4], fov: 38 }}
      gl={{ antialias: true, alpha: true }}
      className="!absolute inset-0"
    >
      <ambientLight intensity={0.3} />
      <pointLight position={[3, 2, 4]} intensity={8} color="#ff1f47" />
      <pointLight position={[-3, -2, -3]} intensity={3} color="#ffffff" />
      <Float speed={1.1} rotationIntensity={0.12} floatIntensity={0.55}>
        <Orb />
      </Float>
    </Canvas>
  );
}
