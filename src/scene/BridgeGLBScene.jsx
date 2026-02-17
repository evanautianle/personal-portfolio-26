import React, { useRef, useEffect, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { Environment, useGLTF, Html } from "@react-three/drei";
import * as THREE from "three";
import { Viewscreen } from "../viewscreen/Viewscreen";
import { SecondaryScreen } from "../viewscreen/SecondaryScreen";
import CrewManager from "../components/crew/CrewManager";

/* ========================================
   Bridge Model
======================================== */
function BridgeModel({ url, onBounds }) {
  const { scene } = useGLTF(url);
  const ref = useRef();

  useEffect(() => {
    if (!scene || !ref.current) return;
    const model = ref.current;

    model.scale.set(10, 10, 10);

    model.traverse((child) => {
      if (child.isMesh) {
        if (!(child.material instanceof THREE.MeshStandardMaterial)) {
          const oldMat = child.material;
          child.material = new THREE.MeshStandardMaterial({
            color: oldMat.color ? oldMat.color : 0xffffff,
            map: oldMat.map || null,
            metalness: 0.2,
            roughness: 0.7,
          });
        }
        child.material.transparent = false;
        child.material.opacity = 1;
        child.material.side = THREE.FrontSide;
        child.material.needsUpdate = true;

        // Enable shadows
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    const box = new THREE.Box3().setFromObject(model);
    const center = new THREE.Vector3();
    box.getCenter(center);
    model.position.x -= center.x;
    model.position.z -= center.z;

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

    camera.position.set(center.x, center.y + 11, center.z + 130);

    const lookAtTarget = center.clone();
    lookAtTarget.y -= 20;
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
      {/* Main viewscreen - made much larger for visibility */}
      <Html position={[1.5, 31, -80]} transform zIndexRange={[0, 0]}>
        <div style={{ width: "2550px", height: "1440px", background: "#000" }}>
          <Viewscreen />
        </div>
      </Html>

      {/* Left secondary viewscreen */}
      <Html position={[-50.5, 23.5, -76]} rotation={[0, Math.PI / 5, 0]} transform zIndexRange={[0, 0]}>
        <div
          style={{
            width: "1100px",
            height: "950px",
            background: "linear-gradient(135deg, #4b2067 0%, #7c3aed 60%, #1a0826 100%)",
            borderRadius: 24,
            opacity: 0.95,
            overflow: "hidden",
          }}
        >
          <SecondaryScreen side="left" />
        </div>
      </Html>

      {/* Right secondary viewscreen */}
      <Html position={[53.5, 22.5, -76]} rotation={[0, -Math.PI / 5, 0]} transform zIndexRange={[0, 0]}>
        <div
          style={{
            width: "1100px",
            height: "950px",
            background: "linear-gradient(135deg, #4b2067 0%, #7c3aed 60%, #1a0826 100%)",
            borderRadius: 24,
            opacity: 0.95,
            overflow: "hidden",
          }}
        >
          <SecondaryScreen side="right" />
        </div>
      </Html>
    </>
  );
}

/* ========================================
   Main Scene
======================================== */
export default function BridgeGLBScene({ glbUrl, redAlert }) {
  const [bounds, setBounds] = useState(null);

  // Red alert color
  const normalColor = "#cfe6ff";
  const alertColor = "#ff2222";
  const lightColor = redAlert ? alertColor : normalColor;

  return (
    <Canvas
      shadows
      camera={{ fov: 38, near: 0.01, far: 1000000 }}
      style={{ width: "100vw", height: "100vh", background: "#101010" }}
    >
      {/* Soft ambient light */}
      <ambientLight intensity={0.03} color={redAlert ? alertColor : undefined} />

      {/* Ring-style lights around the bridge */}
      <pointLight position={[0, 27, -76]} intensity={700.5} distance={70} decay={2} color={lightColor} />
      <pointLight position={[-45, 20, -76]} intensity={200.8} distance={25} decay={2} color={lightColor} />
      <pointLight position={[45, 20, -76]} intensity={200.8} distance={25} decay={2} color={lightColor} />
      {/* Ring of small point lights around the bridge */}
      {Array.from({ length: 16 }).map((_, i) => {
        const angle = (i / 16) * Math.PI * 2;
        const radius = 60;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        return (
          <pointLight
            key={i}
            position={[x, 18, z]}
            intensity={200}
            distance={120}
            decay={2}
            color={lightColor}
            castShadow={false}
          />
        );
      })}

      {/* Load the bridge model */}
      <BridgeModel url={glbUrl} onBounds={setBounds} />

      {/* CrewManager spawns all crew */}
      <CrewManager />

      {/* Static camera setup (safe to render even if bounds is null) */}
      {bounds && <CameraSetup bounds={bounds} />}

      {/* Overlay screens always rendered */}
      <ScreenOverlay />
    </Canvas>
  );
}
