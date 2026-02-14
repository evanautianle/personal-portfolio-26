const tan = '#b8956e'
const charcoal = '#2d2d2d'

export function CaptainChair() {
  return (
    <group position={[0, 0, 0.65]} rotation={[0, Math.PI, 0]}>
      {/* Base */}
      <mesh position={[0, 0.15, 0]} castShadow>
        <boxGeometry args={[0.5, 0.15, 0.5]} />
        <meshStandardMaterial color={charcoal} />
      </mesh>
      {/* Seat */}
      <mesh position={[0, 0.38, 0]} castShadow>
        <boxGeometry args={[0.6, 0.14, 0.6]} />
        <meshStandardMaterial color={tan} />
      </mesh>
      {/* Armrests */}
      <mesh position={[-0.4, 0.48, 0]} castShadow>
        <boxGeometry args={[0.1, 0.18, 0.5]} />
        <meshStandardMaterial color={tan} />
      </mesh>
      <mesh position={[0.4, 0.48, 0]} castShadow>
        <boxGeometry args={[0.1, 0.18, 0.5]} />
        <meshStandardMaterial color={tan} />
      </mesh>
    </group>
  )
}
