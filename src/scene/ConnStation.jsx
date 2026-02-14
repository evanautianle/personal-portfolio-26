const beige = '#c4a77d'
const tan = '#b8956e'
const charcoal = '#2d2d2d'
const panelDark = '#252a33'

export function ConnStation() {
  return (
    <group position={[1.8, 0, -1.5]}>
      {/* Floor platform */}
      <mesh position={[0, 0.04, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.0, 0.06, 0.85]} />
        <meshStandardMaterial color={charcoal} />
      </mesh>

      {/* L-shaped console - front leg (in front of chair) */}
      <mesh position={[0, 0.32, -0.38]} castShadow>
        <boxGeometry args={[0.75, 0.4, 0.4]} />
        <meshStandardMaterial color={beige} />
      </mesh>
      {/* L-shaped console - side leg (to the right of chair) */}
      <mesh position={[0.42, 0.32, 0.08]} castShadow>
        <boxGeometry args={[0.4, 0.4, 0.65]} />
        <meshStandardMaterial color={beige} />
      </mesh>

      {/* Angled panel on front leg */}
      <mesh
        position={[0, 0.64, -0.36]}
        rotation={[0.35, 0, 0]}
        castShadow
      >
        <boxGeometry args={[0.7, 0.06, 0.45]} />
        <meshStandardMaterial color={panelDark} />
      </mesh>
      <mesh position={[0, 0.28, -0.56]}>
        <boxGeometry args={[0.2, 0.12, 0.02]} />
        <meshStandardMaterial color={panelDark} />
      </mesh>
      <mesh position={[0, 0.28, -0.42]}>
        <boxGeometry args={[0.2, 0.12, 0.02]} />
        <meshStandardMaterial color={panelDark} />
      </mesh>

      {/* Chair in corner of L - facing viewscreen (-Z) */}
      <mesh position={[0, 0.2, 0.08]} castShadow>
        <boxGeometry args={[0.3, 0.08, 0.3]} />
        <meshStandardMaterial color={charcoal} />
      </mesh>
      <mesh position={[0, 0.34, 0.08]} castShadow>
        <boxGeometry args={[0.42, 0.1, 0.42]} />
        <meshStandardMaterial color={tan} />
      </mesh>
      <mesh position={[0, 0.58, 0.22]} castShadow>
        <boxGeometry args={[0.42, 0.36, 0.1]} />
        <meshStandardMaterial color={tan} />
      </mesh>
    </group>
  )
}
