import React from "react";
import OfficerModel from "../../characters/OfficerModel";
import { crewSpawnPoints } from "../../config/crewSpawnPoints";



export default function Captain() {
  const spawn = crewSpawnPoints.captain;
  // Captain is always sitting, so always apply offset
  const seatOffsetY = 0.1;
  const seatOffsetZ = -0.08;
  return (
    <group position={spawn.position} rotation={spawn.rotation} scale={[8, 8, 8]}>
      <group position={[0, seatOffsetY, seatOffsetZ]}>
        <OfficerModel uniformColor="#ccaa33" sitting={true} />
      </group>
    </group>
  );
}
