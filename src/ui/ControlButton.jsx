import { useSetAtom } from 'jotai'
import { Html } from '@react-three/drei'
import { navigationAtom } from '../state/navigationAtom'

const orange = '#e87d2f'

export function ControlButton({ label, route, position }) {
  const setNavigation = useSetAtom(navigationAtom)

  return (
    <group position={position}>
      {/* 3D button mesh */}
      <mesh castShadow>
        <boxGeometry args={[0.12, 0.04, 0.08]} />
        <meshStandardMaterial color={orange} />
      </mesh>
      <Html
        transform
        position={[0, 0, 0.05]}
        center
        style={{
          pointerEvents: 'auto',
          userSelect: 'none',
          width: 48,
          height: 20,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 10,
          fontWeight: 600,
          color: '#1a1a1a',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
        }}
        onClick={() => setNavigation(route)}
      >
        <span style={{ textTransform: 'uppercase' }}>{label}</span>
      </Html>
    </group>
  )
}
