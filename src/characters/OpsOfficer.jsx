import Officer from "../Officer";
import { crewSpawnPoints } from "../../config/crewSpawnPoints";

const opsBounds = {
  minX: 0,
  maxX: 8,
  minZ: -12,
  maxZ: 2,
};

export default function OpsOfficer() {
  return (
    <Officer
      chairPosition={crewSpawnPoints.ops.position}
      uniformColor="#ccaa33"
      walkBounds={opsBounds}
      rotation={crewSpawnPoints.ops.rotation}
    />
  );
}
