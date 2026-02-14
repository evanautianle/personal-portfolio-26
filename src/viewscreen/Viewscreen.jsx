import { Html } from '@react-three/drei'
import { ScreenRouter } from './ScreenRouter'

const VIEWSCREEN_WIDTH = 560
const VIEWSCREEN_HEIGHT = 260

export function Viewscreen() {
  return (
    <Html
      transform
      position={[0, 0, 0.01]}
      center
      style={{
        width: VIEWSCREEN_WIDTH,
        height: VIEWSCREEN_HEIGHT,
        pointerEvents: 'auto',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #0a0a12 0%, #15152a 100%)',
        borderRadius: 4,
        border: '2px solid #333',
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          color: '#e0e0e0',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <ScreenRouter />
      </div>
    </Html>
  )
}
