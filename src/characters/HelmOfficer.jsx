
import OfficerController from "./OfficerController";
import { crewSpawnPoints } from "../config/crewSpawnPoints";

export default function HelmOfficer() {
  const seatOffsetY = 0.01;
  const seatOffsetZ = -0.008;
  return (
    <OfficerController
      uniformColor="#cc3344"
      position={crewSpawnPoints.helm.position}
      rotation={crewSpawnPoints.helm.rotation}
      seatOffsetY={seatOffsetY}
      seatOffsetZ={seatOffsetZ}
      sitting={true}
    />
  );
}
