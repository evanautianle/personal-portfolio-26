import React, { useRef, useState, useEffect } from "react";
import OfficerModel from "./OfficerModel";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Generic officer controller for click/face/animation logic.
 * Used for both sitting and wandering officers.
 *
 * Props:
 * - position: [x, y, z] (required for sitting, optional for wandering)
 * - rotation: [x, y, z] (optional, for sitting)
 * - seatOffsetY, seatOffsetZ: sitting offsets
 * - uniformColor: string
 * - sitting: boolean (true for sitting, false for wandering)
 * - onWanderFrame: function(groupRef, delta) (optional, for wandering logic)
 * - enableFaceCamera: boolean (default true)
 * - enableClick: boolean (default true)
 */
export default function OfficerController({
  position,
  rotation,
  seatOffsetY = 0,
  seatOffsetZ = 0,
  uniformColor = "#cccccc",
  sitting = true,
  onWanderFrame,
  enableFaceCamera = true,
  enableClick = true,
  scale = 0.8,
  ...rest
}) {
  const groupRef = useRef();
  const headRef = useRef();
  const { gl, camera } = useThree();
  const [clicked, setClicked] = useState(false);
  const scaleRef = useRef(scale);
  const [targetY, setTargetY] = useState(rotation ? rotation[1] : 0);
  const originalY = rotation ? rotation[1] : 0;

  // For sitting officers, always lock to chair position
  useEffect(() => {
    if (sitting && groupRef.current && position) {
      groupRef.current.position.set(
        position[0],
        position[1] + seatOffsetY,
        position[2] + seatOffsetZ
      );
    }
  }, [position, seatOffsetY, seatOffsetZ, sitting]);

  // Calculate the angle to face the camera
  function getCameraAngle() {
    if (!groupRef.current || !camera) return originalY;
    const officerPos = groupRef.current.position.clone();
    const camPos = camera.position.clone();
    const targetDir = new THREE.Vector3(camPos.x - officerPos.x, 0, camPos.z - officerPos.z).normalize();
    return Math.atan2(targetDir.x, targetDir.z);
  }

  function playClickAnimation(onComplete) {
    scaleRef.current = scale * 1.05;
    setTimeout(() => {
      scaleRef.current = scale;
      if (onComplete) onComplete();
    }, 400);
  }

  const handleClick = (e) => {
    if (!enableClick) return;
    e.stopPropagation();
    if (enableFaceCamera) setTargetY(getCameraAngle());
    setClicked(true);
    playClickAnimation(() => {
      setTimeout(() => {
        setClicked(false);
        if (enableFaceCamera) setTargetY(originalY);
      }, 1000);
    });
  };

  const handlePointerOver = (e) => {
    e.stopPropagation();
    if (gl && gl.domElement) gl.domElement.style.cursor = "pointer";
  };
  const handlePointerOut = (e) => {
    e.stopPropagation();
    if (gl && gl.domElement) gl.domElement.style.cursor = "default";
  };

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    // Animate scale for click
    groupRef.current.scale.set(scaleRef.current, scaleRef.current, scaleRef.current);
    // Smoothly rotate to targetY (for sitting)
    if (sitting && enableFaceCamera) {
      let currentY = groupRef.current.rotation.y;
      let deltaY = targetY - currentY;
      if (deltaY > Math.PI) deltaY -= Math.PI * 2;
      if (deltaY < -Math.PI) deltaY += Math.PI * 2;
      groupRef.current.rotation.y += deltaY * 0.07;
    }
    // Wandering logic
    if (!sitting && typeof onWanderFrame === "function") {
      onWanderFrame(groupRef, delta);
    }
  });

  return (
    <group
      ref={groupRef}
      position={position}
      rotation={rotation}
      onClick={handleClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      scale={[scaleRef.current, scaleRef.current, scaleRef.current]}
      {...rest}
    >
      <OfficerModel uniformColor={uniformColor} sitting={sitting} clicked={clicked} headRef={headRef} />
    </group>
  );
}
