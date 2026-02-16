
import BridgeGLBScene from './BridgeGLBScene';

export function BridgeScene({ redAlert }) {
  // Updated to use the GLB file in public/assets/scene
  return <BridgeGLBScene glbUrl="/assets/scene/bridge.glb" redAlert={redAlert} />;
}
