import { Canvas } from '@react-three/fiber'
import { BridgeScene } from '../scene/BridgeScene'

const CAMERA_POSITION = [0, 0.95, 4.5]
const CAMERA_FOV = 60

export function CanvasRoot() {
  return (
    <Canvas
      camera={{
        position: CAMERA_POSITION,
        fov: CAMERA_FOV,
      }}
      gl={{ antialias: true }}
      dpr={[1, 2]}
    >
      <BridgeScene />
    </Canvas>
  )
}
