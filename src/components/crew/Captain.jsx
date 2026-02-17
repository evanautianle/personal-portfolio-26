import React from "react";
import OfficerModel from "../../characters/OfficerModel";
import { crewSpawnPoints } from "../../config/crewSpawnPoints";



export default function Captain() {
  const spawn = crewSpawnPoints.captain;
  // Captain is always sitting, so always apply offset
  const seatOffsetY = 0.01;
  const seatOffsetZ = -0.008;
  return (
    <group position={spawn.position} rotation={spawn.rotation} scale={[0.8, 0.8, 0.8]}>
      <group position={[0, seatOffsetY, seatOffsetZ]}>
        <OfficerModel uniformColor="#ccaa33" sitting={true} />
      </group>
    </group>
  );
}
