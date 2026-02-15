import React, { useRef, useEffect, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { Environment, useGLTF, Html, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { Viewscreen } from "../viewscreen/Viewscreen";

/* ========================================
   Bridge Model
======================================== */
function BridgeModel({ url, onBounds }) {
  const { scene } = useGLTF(url);
  const ref = useRef();

  useEffect(() => {
    if (!scene || !ref.current) return;
    const model = ref.current;
    // Scale down the model (was 100, now 10)
    model.scale.set(10, 10, 10);

    model.traverse((child) => {
      if (child.isMesh && child.material) {
        const mats = Array.isArray(child.material) ? [child.material].flat() : [child.material];
        mats.forEach((mat) => {
          mat.transparent = false;
          mat.opacity = 1;
          mat.side = THREE.FrontSide;
          mat.needsUpdate = true;
        });
      }
    });

    const box = new THREE.Box3().setFromObject(model);
    const center = new THREE.Vector3();
    box.getCenter(center);

    // Center horizontally only
    model.position.x -= center.x;
    model.position.z -= center.z;

    // Ground model
    const groundedBox = new THREE.Box3().setFromObject(model);
    model.position.y -= groundedBox.min.y;

    const finalBox = new THREE.Box3().setFromObject(model);
    onBounds(finalBox);
  }, [scene, onBounds]);

  return <primitive object={scene} ref={ref} />;
}

/* ========================================
   Camera Setup (Static)
======================================== */
function CameraSetup({ bounds }) {
  const { camera } = useThree();

  useEffect(() => {
    if (!bounds) return;
    const center = new THREE.Vector3();
    bounds.getCenter(center);

    // Adjusted camera position for new scale
    camera.position.set(center.x, center.y + 4, center.z + 72);
    camera.lookAt(center);

    camera.near = 0.01;
    camera.far = 1000000;
    camera.updateProjectionMatrix();
  }, [bounds, camera]);

  return null;
}

/* ========================================
   Screen Overlay
======================================== */
function ScreenOverlay() {
  // Main and two secondary viewscreens
  return (
    <>
      {/* Main viewscreen */}
      <Html position={[0, 20, -76]} transform occlude zIndexRange={[0, 0]}>
        <div style={{ width: "1800px", height: "700px", background: "#000" }}>
          <Viewscreen />
        </div>
      </Html>
      {/* Left secondary viewscreen (behind and to the left) */}
      <Html
        position={[-50, 20, -76]}
        rotation={[0, Math.PI / 8, 0]}
        transform
        zIndexRange={[0, 0]}
      >
        <div style={{ width: "900px", height: "500px", background: "#181a22", border: '4px solid #e87d2f', borderRadius: 24, opacity: 0.95, overflow: 'hidden', boxShadow: '0 0 32px #e87d2faa' }}>
          <Viewscreen />
        </div>
      </Html>
      {/* Right secondary viewscreen (behind and to the right) */}
      <Html
        position={[50, 20, -76]}
        rotation={[0, -Math.PI / 8, 0]}
        transform
        zIndexRange={[0, 0]}
      >
        <div style={{ width: "900px", height: "500px", background: "#181a22", border: '4px solid #e87d2f', borderRadius: 24, opacity: 0.95, overflow: 'hidden', boxShadow: '0 0 32px #e87d2faa' }}>
          <Viewscreen />
        </div>
      </Html>
    </>
  );
}

/* ========================================
   Main Scene
======================================== */
export default function BridgeGLBScene({ glbUrl }) {
  const [bounds, setBounds] = useState(null);

  return (
    <Canvas
      camera={{ fov: 35, near: 0.01, far: 1000000 }}
      style={{ width: "100vw", height: "100vh", background: "#e0e0e0" }}
    >
      <ambientLight intensity={0.8} />
      <directionalLight position={[100, 100, 100]} intensity={1.2} />

      <BridgeModel url={glbUrl} onBounds={setBounds} />
      <CameraSetup bounds={bounds} />

      <Environment preset="city" />
      <ScreenOverlay />
      <OrbitControls enableDamping makeDefault />
    </Canvas>
  );
}
