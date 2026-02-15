import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PointerLockControls, Environment, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

function BridgeModel({ url, onCenter }) {
  const { scene } = useGLTF(url);
  const ref = useRef();

  useEffect(() => {
    if (scene && ref.current) {
      // Fix all materials to be opaque and single-sided
      scene.traverse((child) => {
        if (child.isMesh && child.material) {
          if (Array.isArray(child.material)) {
            child.material.forEach((mat) => {
              mat.transparent = false;
              mat.opacity = 1;
              mat.side = THREE.FrontSide;
              mat.needsUpdate = true;
            });
          } else {
            child.material.transparent = false;
            child.material.opacity = 1;
            child.material.side = THREE.FrontSide;
            child.material.needsUpdate = true;
          }
        }
      });
      const box = new THREE.Box3().setFromObject(ref.current);
      const center = new THREE.Vector3();
      box.getCenter(center);
      if (onCenter) onCenter(center, box);
      // Uncomment to debug:
      // console.log('Model center:', center, 'Box:', box);
    }
  }, [scene, onCenter]);

  // Scale up the model by 100x for 1:100 export
  return <primitive object={scene} ref={ref} scale={[100, 100, 100]} />;
}

export default function BridgeGLBScene({ glbUrl }) {
  const [center, setCenter] = useState([0, 0, 0]);
  const [minY, setMinY] = useState(0);
  const [box, setBox] = useState(null);

  const handleCenter = useCallback((centerVec, box) => {
    setCenter([centerVec.x, centerVec.y, centerVec.z]);
    setMinY(box.min.y);
    setBox(box);
  }, []);

  // Walking camera component
  function WalkingCamera() {
    const { camera, gl } = useThree();
    const velocity = useRef([0, 0]); // [forward, strafe]
    const move = useRef({ w: false, a: false, s: false, d: false });
    const speed = 0.07;

    // Set initial camera position on mount
    useEffect(() => {
      camera.position.set(center[0], minY + 1.6, center[2]);
    }, [camera, center, minY]);

    // Keyboard events
    useEffect(() => {
      const handleKeyDown = (e) => {
        if (e.code === 'KeyW') move.current.w = true;
        if (e.code === 'KeyA') move.current.a = true;
        if (e.code === 'KeyS') move.current.s = true;
        if (e.code === 'KeyD') move.current.d = true;
      };
      const handleKeyUp = (e) => {
        if (e.code === 'KeyW') move.current.w = false;
        if (e.code === 'KeyA') move.current.a = false;
        if (e.code === 'KeyS') move.current.s = false;
        if (e.code === 'KeyD') move.current.d = false;
      };
      window.addEventListener('keydown', handleKeyDown);
      window.addEventListener('keyup', handleKeyUp);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        window.removeEventListener('keyup', handleKeyUp);
      };
    }, []);

    useFrame(() => {
      // Calculate direction
      let forward = 0, strafe = 0;
      if (move.current.w) forward += 1;
      if (move.current.s) forward -= 1;
      if (move.current.a) strafe -= 1;
      if (move.current.d) strafe += 1;
      // Move camera in direction it's facing (first-person)
      if (forward !== 0 || strafe !== 0) {
        // Get camera's forward and right vectors
        const direction = new THREE.Vector3();
        camera.getWorldDirection(direction);
        direction.y = 0; // lock to ground plane
        direction.normalize();
        const right = new THREE.Vector3();
        right.crossVectors(direction, camera.up).normalize();
        // Calculate movement vector
        const moveVec = new THREE.Vector3();
        moveVec.addScaledVector(direction, forward * speed);
        moveVec.addScaledVector(right, strafe * speed);
        camera.position.add(moveVec);
      }
    });
    return null;
  }

  return (
    <Canvas camera={{ position: [center[0], minY + 1.6, center[2]], fov: 50, near: 0.01 }} style={{ width: '100vw', height: '100vh' }}>
      <ambientLight intensity={0.7} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <BridgeModel url={glbUrl} onCenter={handleCenter} />
      <PointerLockControls />
      <WalkingCamera />
      <Environment preset="city" />
    </Canvas>
  );
}
