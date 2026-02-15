import React, { useRef, useEffect, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, Environment, useGLTF } from "@react-three/drei";
import * as THREE from "three";

/*
================================
Model
================================
*/

function BridgeModel({ url, onBounds }) {
  const { scene } = useGLTF(url);
  const ref = useRef();

  useEffect(() => {
    if (!scene || !ref.current) return;

    const model = ref.current;

    // Scale model
    model.scale.set(100, 100, 100);

    // Fix materials
    model.traverse((child) => {
      if (child.isMesh && child.material) {
        const mats = Array.isArray(child.material)
          ? child.material
          : [child.material];

        mats.forEach((mat) => {
          mat.transparent = false;
          mat.opacity = 1;
          mat.side = THREE.FrontSide;
          mat.needsUpdate = true;
        });
      }
    });

    // Bounding box
    const box = new THREE.Box3().setFromObject(model);

    const center = new THREE.Vector3();
    box.getCenter(center);

    // Center horizontally ONLY
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

/*
================================
Camera Controller
================================
*/

function CameraSetup({ bounds }) {
  const { camera, controls } = useThree();

  useEffect(() => {
    if (!bounds || !controls) return;

    const size = new THREE.Vector3();
    bounds.getSize(size);

    const maxDim = Math.max(size.x, size.y, size.z);

    const distance = maxDim * 1.5;

    // Position camera ABOVE ground looking down slightly
    camera.position.set(distance, distance * 0.5, distance);

    // IMPORTANT: target ground level center
    controls.target.set(0, size.y * 0.25, 0);

    camera.near = 0.01;
    camera.far = 1000000;

    camera.updateProjectionMatrix();
    controls.update();

  }, [bounds, camera, controls]);

  return null;
}

/*
================================
Main Scene
================================
*/

export default function BridgeGLBScene({ glbUrl }) {
  const [bounds, setBounds] = useState(null);

  return (
    <Canvas
      camera={{
        fov: 50,
        near: 0.01,
        far: 1000000
      }}
      style={{
        width: "100vw",
        height: "100vh",
        background: "#e0e0e0"
      }}
    >
      <ambientLight intensity={0.8} />
      <directionalLight position={[100, 100, 100]} intensity={1.2} />

      <BridgeModel url={glbUrl} onBounds={setBounds} />

      <OrbitControls
        makeDefault
        enableDamping
        dampingFactor={0.05}
        minDistance={0.1}
        maxDistance={100000}
      />

      <CameraSetup bounds={bounds} />

      <Environment preset="city" />
    </Canvas>
  );
}
