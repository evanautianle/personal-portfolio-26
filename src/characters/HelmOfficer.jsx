import Officer from "./Officer";

const helmBounds = {
  minX: -2.5,
  maxX: -0.5,
  minZ: -5,
  maxZ: -2,
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
