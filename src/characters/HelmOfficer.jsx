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
  // These values can be tweaked for best visual fit
  const seatOffsetY = 0.01;
  const seatOffsetZ = -0.008;
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
