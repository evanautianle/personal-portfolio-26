import React from "react";
import { useGLTF } from "@react-three/drei";
import { crewSpawnPoints } from "../../config/crewSpawnPoints";

export default function Captain() {
  const { scene } = useGLTF("/assets/scene/captain.glb");
  const spawn = crewSpawnPoints.captain;
  // Adjust scale as needed to match officers
  return (
    <group position={spawn.position} rotation={spawn.rotation} scale={[8, 8, 8]}>
      <primitive object={scene} />
    </group>
  );
}
