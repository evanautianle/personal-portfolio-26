import { OrbitControls } from '@react-three/drei'
import { ConnStation } from './ConnStation'
import { OpsStation } from './OpsStation'
import { CaptainChair } from './CaptainChair'
import { Lighting } from './Lighting'

export function BridgeScene() {
  return (
    <>
      <Lighting />
      <OrbitControls
        target={[0, 1.2, 4]}
        enablePan
        enableZoom
        minDistance={2}
        maxDistance={20}
      />
      <group position={[0, 0, 4]}>
        <ConnStation />
        <OpsStation />
        <CaptainChair />
      </group>
    </>
  )
}
