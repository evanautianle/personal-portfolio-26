import Officer from "./Officer";
import { crewSpawnPoints } from "../config/crewSpawnPoints";

const helmBounds = {
  minX: -8,
  maxX: 0,
  minZ: -12,
  maxZ: 2,
};

export default function HelmOfficer() {
  // Offset for proper sitting alignment
  return (
    <group position={crewSpawnPoints.helm.position} rotation={crewSpawnPoints.helm.rotation}>
      <group position={[0, 0.1, 0]}>
        <Officer
          uniformColor="#cc3344"
          walkBounds={helmBounds}
        />
      </group>
    </group>
  );
}
