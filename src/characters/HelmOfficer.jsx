import Officer from "./Officer";
import { crewSpawnPoints } from "../config/crewSpawnPoints";

const helmBounds = {
  minX: -0.8,
  maxX: 0,
  minZ: -1.2,
  maxZ: 0.2,
};

export default function HelmOfficer() {
  // Offset for proper sitting alignment
  const seatOffsetY = 0.01;
  const seatOffsetZ = -0.008;
  return (
    <Officer
      uniformColor="#cc3344"
      chairPosition={crewSpawnPoints.helm.position}
      rotation={crewSpawnPoints.helm.rotation}
      seatOffsetY={seatOffsetY}
      seatOffsetZ={seatOffsetZ}
    />
  );
}
