
import OfficerController from "./OfficerController";
import { crewSpawnPoints } from "../config/crewSpawnPoints";

export default function OpsOfficer() {
  const seatOffsetY = 0.01;
  const seatOffsetZ = -0.008;
  return (
    <OfficerController
      uniformColor="#cc3344"
      position={crewSpawnPoints.ops.position}
      rotation={crewSpawnPoints.ops.rotation}
      seatOffsetY={seatOffsetY}
      seatOffsetZ={seatOffsetZ}
      sitting={true}
    />
  );
}
