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
  return (
    <group position={crewSpawnPoints.ops.position} rotation={crewSpawnPoints.ops.rotation}>
      <group position={[0, 0.1, 0]}>
        <Officer
          uniformColor="#ccaa33"
          walkBounds={opsBounds}
        />
      </group>
    </group>
  );
}
