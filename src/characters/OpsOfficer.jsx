import Officer from "./Officer";

const opsBounds = {
  minX: 0,
  maxX: 8,
  minZ: -12,
  maxZ: 2,
};

export default function OpsOfficer() {
  return (
    <Officer
      chairPosition={[1.2, 1.0, -3.5]}
      uniformColor="#ccaa33"
      walkBounds={opsBounds}
    />
  );
}
