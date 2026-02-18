

import React from "react";
import OfficerController from "../../characters/OfficerController";
import { crewSpawnPoints } from "../../config/crewSpawnPoints";

export default function Captain() {
  const spawn = crewSpawnPoints.captain;
  const seatOffsetY = 0.01;
  const seatOffsetZ = -0.008;
  return (
    <OfficerController
      uniformColor="#cc3344"
      position={spawn.position}
      rotation={spawn.rotation}
      seatOffsetY={seatOffsetY}
      seatOffsetZ={seatOffsetZ}
      sitting={true}
    />
  );
}
