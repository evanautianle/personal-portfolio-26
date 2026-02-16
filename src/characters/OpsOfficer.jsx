import Officer from "./Officer";
import { crewSpawnPoints } from "../config/crewSpawnPoints";

const opsBounds = {
  minX: 0,
  maxX: 8,
  minZ: -12,
  maxZ: 2,
};

export default function OpsOfficer() {
  // Offset for proper sitting alignment
  // These values can be tweaked for best visual fit
  const seatOffsetY = 0.1;
  const seatOffsetZ = -0.08;
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
