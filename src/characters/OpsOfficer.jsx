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
  // These values can be tweaked for best visual fit
  const seatOffsetY = 0.01;
  const seatOffsetZ = -0.008;
  return (
    <group position={crewSpawnPoints.ops.position} rotation={crewSpawnPoints.ops.rotation}>
      <Officer
        uniformColor="#ccaa33"
        walkBounds={opsBounds}
        seatOffsetY={seatOffsetY}
        seatOffsetZ={seatOffsetZ}
      />
    </group>
  );
}
