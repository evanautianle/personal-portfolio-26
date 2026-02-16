import React, { useRef, useEffect, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { Environment, useGLTF, Html } from "@react-three/drei";
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
    // Scale down the model
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

    // Move camera up
    camera.position.set(center.x, center.y + 8, center.z + 130); // raise height

    // Tilt camera slightly down by aiming a bit below the model center
    const lookAtTarget = center.clone();
    lookAtTarget.y -= 26; // tilt down
    camera.lookAt(lookAtTarget);

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
  return (
    <>
      {/* Main viewscreen */}
      <Html position={[0, 27, -76]} transform occlude zIndexRange={[0, 0]}>
        <div style={{ width: "2200px", height: "1200px", background: "#000" }}>
          <Viewscreen />
        </div>
      </Html>

      {/* Left secondary viewscreen */}
      <Html
        position={[-45, 19.5, -76]}
        rotation={[0, Math.PI / 5, 0]} // tilt inwards more
        transform
        zIndexRange={[0, 0]}
      >
        <div style={{ width: "1050px", height: "900px", background: "#181a22", borderRadius: 24, opacity: 0.95, overflow: 'hidden', boxShadow: '0 0 32px #e87d2faa' }}>
          <Viewscreen />
        </div>
      </Html>

      {/* Right secondary viewscreen */}
      <Html
        position={[44.5, 20.5, -76]}
        rotation={[0, -Math.PI / 5, 0]} // tilt inwards more
        transform
        zIndexRange={[0, 0]}
      >
        <div style={{ width: "1050px", height: "900px", background: "#181a22", borderRadius: 24, opacity: 0.95, overflow: 'hidden', boxShadow: '0 0 32px #e87d2faa' }}>
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
      {/* OrbitControls removed for static camera */}
    </Canvas>
  );
}
