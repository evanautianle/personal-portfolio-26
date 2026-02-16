import Officer from "../Officer";
import { crewSpawnPoints } from "../../config/crewSpawnPoints";

const helmBounds = {
  minX: -8,
  maxX: 0,
  minZ: -12,
  maxZ: 2,
};

export default function HelmOfficer() {
  return (
    <Officer
      chairPosition={crewSpawnPoints.helm.position}
      uniformColor="#cc3344"
      walkBounds={helmBounds}
      rotation={crewSpawnPoints.helm.rotation}
    />
  );
}
