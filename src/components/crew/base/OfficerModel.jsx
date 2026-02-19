import React from "react";
import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";

export default function OfficerModel({ uniformColor = "#cccccc", headRef, sitting = false, clicked = false }) {
  // Refs for limbs and body
  const leftLegRef = useRef();
  const rightLegRef = useRef();
  const leftArmRef = useRef();
  const rightArmRef = useRef();
  const bodyRef = useRef();

  // Animate pose for smooth transitions
  useFrame(() => {
    if (sitting) {
      // Sitting pose: legs upright and slightly spread, arms relaxed
      if (leftLegRef.current) {
        leftLegRef.current.rotation.x += (0 - leftLegRef.current.rotation.x) * 0.2;
        leftLegRef.current.rotation.y += (-0.2 - leftLegRef.current.rotation.y) * 0.2;
        leftLegRef.current.position.x += (-0.12 - leftLegRef.current.position.x) * 0.2;
        leftLegRef.current.position.z += (0 - leftLegRef.current.position.z) * 0.2;
      }
      if (rightLegRef.current) {
        rightLegRef.current.rotation.x += (0 - rightLegRef.current.rotation.x) * 0.2;
        rightLegRef.current.rotation.y += (0.2 - rightLegRef.current.rotation.y) * 0.2;
        rightLegRef.current.position.x += (0.12 - rightLegRef.current.position.x) * 0.2;
        rightLegRef.current.position.z += (0 - rightLegRef.current.position.z) * 0.2;
      }
      // Arms: slightly relaxed on sides, but if clicked, do a 'cute' animation
      if (leftArmRef.current) {
        leftArmRef.current.rotation.x += ((clicked ? -Math.PI / 3 : -Math.PI / 8) - leftArmRef.current.rotation.x) * 0.3;
        leftArmRef.current.rotation.z += ((clicked ? 0.5 : 0) - leftArmRef.current.rotation.z) * 0.3;
      }
      if (rightArmRef.current) {
        rightArmRef.current.rotation.x += ((clicked ? -Math.PI / 3 : -Math.PI / 8) - rightArmRef.current.rotation.x) * 0.3;
        rightArmRef.current.rotation.z += ((clicked ? -0.5 : 0) - rightArmRef.current.rotation.z) * 0.3;
      }
      // Head: tilt for click
      if (headRef && headRef.current) {
        headRef.current.rotation.z += ((clicked ? 0.25 : 0) - headRef.current.rotation.z) * 0.3;
      }
    } else {
      // Smoothly interpolate to standing pose
      if (leftLegRef.current) {
        leftLegRef.current.rotation.x += (0 - leftLegRef.current.rotation.x) * 0.2;
        leftLegRef.current.position.x += (-0.09 - leftLegRef.current.position.x) * 0.2;
        leftLegRef.current.position.z += (0 - leftLegRef.current.position.z) * 0.2;
      }
      if (rightLegRef.current) {
        rightLegRef.current.rotation.x += (0 - rightLegRef.current.rotation.x) * 0.2;
        rightLegRef.current.position.x += (0.09 - rightLegRef.current.position.x) * 0.2;
        rightLegRef.current.position.z += (0 - rightLegRef.current.position.z) * 0.2;
      }
      if (leftArmRef.current) {
        leftArmRef.current.rotation.x += (0 - leftArmRef.current.rotation.x) * 0.2;
        leftArmRef.current.rotation.z += (0 - leftArmRef.current.rotation.z) * 0.2;
      }
      if (rightArmRef.current) {
        rightArmRef.current.rotation.x += (0 - rightArmRef.current.rotation.x) * 0.2;
        rightArmRef.current.rotation.z += (0 - rightArmRef.current.rotation.z) * 0.2;
      }
      if (headRef && headRef.current) {
        headRef.current.rotation.z += (0 - headRef.current.rotation.z) * 0.2;
      }
    }
    // Torso always stays the same
    if (bodyRef.current) {
      bodyRef.current.scale.y = 1;
      bodyRef.current.position.y = 0.7;
    }
  });

  return (
    <group>
      {/* Body */}
      <mesh ref={bodyRef} position={[0, 0.7, 0]}>
        <boxGeometry args={[0.4, 0.7, 0.2]} />
        <meshStandardMaterial color={uniformColor} />
      </mesh>
      {/* Head */}
      <mesh ref={headRef} position={[0, 1.25, 0]}>
        <boxGeometry args={[0.28, 0.28, 0.28]} />
        <meshStandardMaterial color="#ffe0b2" />
      </mesh>
      {/* Eyes */}
      <mesh position={[-0.07, 1.32, 0.14]}>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshStandardMaterial color="#222" />
      </mesh>
      <mesh position={[0.07, 1.32, 0.14]}>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshStandardMaterial color="#222" />
      </mesh>
      {/* Arms */}
      <mesh ref={leftArmRef} position={[-0.23, 0.85, 0]}>
        <boxGeometry args={[0.13, 0.45, 0.13]} />
        <meshStandardMaterial color={uniformColor} />
      </mesh>
      <mesh ref={rightArmRef} position={[0.23, 0.85, 0]}>
        <boxGeometry args={[0.13, 0.45, 0.13]} />
        <meshStandardMaterial color={uniformColor} />
      </mesh>
      {/* Legs */}
      <mesh ref={leftLegRef} position={[-0.09, 0.35, 0]}>
        <boxGeometry args={[0.12, 0.38, 0.12]} />
        <meshStandardMaterial color="#444" />
      </mesh>
      <mesh ref={rightLegRef} position={[0.09, 0.35, 0]}>
        <boxGeometry args={[0.12, 0.38, 0.12]} />
        <meshStandardMaterial color="#444" />
      </mesh>
    </group>
  );
}
