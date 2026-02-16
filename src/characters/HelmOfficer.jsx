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
  // These values can be tweaked for best visual fit
  const seatOffsetY = 0.1;
  const seatOffsetZ = -0.08;
  return (
    <group position={crewSpawnPoints.helm.position} rotation={crewSpawnPoints.helm.rotation}>
      <Officer
        uniformColor="#cc3344"
        walkBounds={helmBounds}
        seatOffsetY={seatOffsetY}
        seatOffsetZ={seatOffsetZ}
      />
    </group>
  );
}
