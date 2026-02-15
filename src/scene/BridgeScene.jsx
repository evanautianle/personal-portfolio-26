
import BridgeGLBScene from './BridgeGLBScene';

export function BridgeScene() {
  // Updated to use the GLB file in public/assets/scene
  return <BridgeGLBScene glbUrl="/assets/scene/bridge.glb" />;
}
