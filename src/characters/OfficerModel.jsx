import React from "react";

export default function OfficerModel({ uniformColor = "#cccccc" }) {
  // Blocky proportions
  return (
    <group>
      {/* Body */}
      <mesh position={[0, 0.7, 0]}>
        <boxGeometry args={[0.4, 0.7, 0.2]} />
        <meshStandardMaterial color={uniformColor} />
      </mesh>
      {/* Head */}
      <mesh position={[0, 1.25, 0]}>
        <boxGeometry args={[0.28, 0.28, 0.28]} />
        <meshStandardMaterial color="#ffe0b2" />
      </mesh>
      {/* Eyes */}
      <mesh position={[-0.07, 1.32, 0.14]}>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshStandardMaterial color="#222" />
      </mesh>
      <mesh position={[0.07, 1.32, 0.14]}>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshStandardMaterial color="#222" />
      </mesh>
      {/* Arms */}
      <mesh position={[-0.23, 0.85, 0]}>
        <boxGeometry args={[0.13, 0.45, 0.13]} />
        <meshStandardMaterial color={uniformColor} />
      </mesh>
      <mesh position={[0.23, 0.85, 0]}>
        <boxGeometry args={[0.13, 0.45, 0.13]} />
        <meshStandardMaterial color={uniformColor} />
      </mesh>
      {/* Legs */}
      <mesh position={[-0.09, 0.35, 0]}>
        <boxGeometry args={[0.12, 0.38, 0.12]} />
        <meshStandardMaterial color="#444" />
      </mesh>
      <mesh position={[0.09, 0.35, 0]}>
        <boxGeometry args={[0.12, 0.38, 0.12]} />
        <meshStandardMaterial color="#444" />
      </mesh>
    </group>
  );
}
