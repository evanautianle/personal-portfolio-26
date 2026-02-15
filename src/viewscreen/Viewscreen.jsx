
// 3D Viewscreen mesh (plane) with a simple gradient-like material
export function Viewscreen() {
  // Size in 3D units (meters)
  const width = 3.5;
  const height = 1.4;
  // Use a solid color for now (can swap for a texture later)
  const color = '#15152a';
  return (
    <mesh position={[0, 0, 0.025]}>
      <planeGeometry args={[width, height]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
    </mesh>

  );
}
