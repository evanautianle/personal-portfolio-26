import Officer from "./Officer";
import { crewSpawnPoints } from "../config/crewSpawnPoints";

const opsBounds = {
  minX: 0,
  maxX: 0.8,
  minZ: -1.2,
  maxZ: 0.2,
};

export default function OpsOfficer() {
  // Offset for proper sitting alignment
  const seatOffsetY = 0.01;
  const seatOffsetZ = -0.008;
  return (
    <Officer
      uniformColor="#ccaa33"
      chairPosition={crewSpawnPoints.ops.position}
      rotation={crewSpawnPoints.ops.rotation}
      seatOffsetY={seatOffsetY}
      seatOffsetZ={seatOffsetZ}
    />
  );
}
