"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import type { Points as ThreePoints } from "three";

const COUNT = 900;

function Swarm() {
  const pointsRef = useRef<ThreePoints>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      const r = 1.6 + Math.random() * 0.6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += delta * 0.09;
    pointsRef.current.rotation.x += (state.pointer.y * 0.4 - pointsRef.current.rotation.x) * 0.05;
    pointsRef.current.rotation.z += (state.pointer.x * 0.2 - pointsRef.current.rotation.z) * 0.05;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#d90429" size={0.028} sizeAttenuation transparent opacity={0.85} depthWrite={false} />
    </points>
  );
}

/** Reactive particle sphere — a Playground variant of the hero orb's material. */
export default function ParticleSwarm() {
  return (
    <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 4], fov: 45 }} gl={{ antialias: true, alpha: true }}>
      <Swarm />
    </Canvas>
  );
}
