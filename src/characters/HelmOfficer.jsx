import Officer from "./Officer";

const helmBounds = {
  minX: -8,
  maxX: 0,
  minZ: -12,
  maxZ: 2,
};

export default function HelmOfficer() {
  return (
    <Officer
      chairPosition={[-1.2, 1.0, -3.5]}
      uniformColor="#cc3344"
      walkBounds={helmBounds}
    />
  );
}
