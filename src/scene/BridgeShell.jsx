export function BridgeShell() {
  const beige = '#c4a77d'
  const tan = '#b8956e'
  const charcoal = '#2d2d2d'

  return (
    <group>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[12, 10]} />
        <meshStandardMaterial color={charcoal} />
      </mesh>

      {/* Curved back wall - segmented boxes */}
      {[-2, -1, 0, 1, 2].map((i) => (
        <mesh
          key={i}
          position={[i * 1.2, 1.8, -4.5]}
          castShadow
          receiveShadow
        >
          <boxGeometry args={[1.1, 2.2, 0.3]} />
          <meshStandardMaterial color={beige} />
        </mesh>
      ))}

      {/* Viewscreen frame - thick rectangular frame (front wall) */}
      <group position={[0, 1.5, -4.8]}>
        {/* Frame border - outer */}
        <mesh position={[0, 0, 0]} castShadow>
          <boxGeometry args={[6.4, 3.4, 0.25]} />
          <meshStandardMaterial color={charcoal} />
        </mesh>
        {/* Frame inner bevel */}
        <mesh position={[0, 0, 0.02]}>
          <boxGeometry args={[6, 3, 0.08]} />
          <meshStandardMaterial color={tan} />
        </mesh>
        {/* Hole for viewscreen content - empty, Viewscreen component fills it */}
      </group>
    </group>
  )
}
