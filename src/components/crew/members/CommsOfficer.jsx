import OfficerController from "../base/OfficerController";
import { crewSpawnPoints } from "../../../config/crewSpawnPoints";

export default function CommsOfficer() {
  const seatOffsetY = 0.01;
  const seatOffsetZ = -0.008;
  return (
    <OfficerController
      uniformColor="#cc3344"
      position={crewSpawnPoints.comms.position}
      rotation={crewSpawnPoints.comms.rotation}
      seatOffsetY={seatOffsetY}
      seatOffsetZ={seatOffsetZ}
      sitting={true}
    />
  );
}
