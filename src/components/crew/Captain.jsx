import React from "react";
import OfficerModel from "../../characters/OfficerModel";
import { crewSpawnPoints } from "../../config/crewSpawnPoints";

function PirateHat() {
  // Simple blocky pirate hat: black box with a white "skull" dot
  return (
    <group position={[0, 1.42, 0]}>
      {/* Hat base */}
      <mesh position={[0, 0.06, 0]}>
        <boxGeometry args={[0.32, 0.12, 0.32]} />
        <meshStandardMaterial color="#222" />
      </mesh>
      {/* Hat brim */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.42, 0.04, 0.42]} />
        <meshStandardMaterial color="#222" />
      </mesh>
      {/* Skull dot */}
      <mesh position={[0, 0.09, 0.13]}>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshStandardMaterial color="#fff" />
      </mesh>
    </group>
  );
}

export default function Captain() {
  const spawn = crewSpawnPoints.captain;
  return (
    <group position={spawn.position} rotation={spawn.rotation} scale={[8, 8, 8]}>
      <OfficerModel uniformColor="#ccaa33" />
      <PirateHat />
    </group>
  );
}
