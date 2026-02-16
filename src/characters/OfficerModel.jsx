import React from "react";

import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";

export default function OfficerModel({ uniformColor = "#cccccc", headRef, sitting = false }) {
  // Refs for limbs and body
  const leftLegRef = useRef();
  const rightLegRef = useRef();
  const leftArmRef = useRef();
  const rightArmRef = useRef();
  const bodyRef = useRef();

  // Animate pose
  useFrame(() => {
    if (sitting) {
      // Legs: forward and spread
      if (leftLegRef.current) {
        leftLegRef.current.rotation.x = Math.PI / 1.5;
        leftLegRef.current.position.x = -0.16;
        leftLegRef.current.position.z = 0.18;
      }
      if (rightLegRef.current) {
        rightLegRef.current.rotation.x = Math.PI / 1.5;
        rightLegRef.current.position.x = 0.16;
        rightLegRef.current.position.z = 0.18;
      }
      // Arms: slightly forward
      if (leftArmRef.current) leftArmRef.current.rotation.x = Math.PI / 16;
      if (rightArmRef.current) rightArmRef.current.rotation.x = Math.PI / 16;
      // Torso: unchanged
      if (bodyRef.current) bodyRef.current.scale.y = 1;
      if (bodyRef.current) bodyRef.current.position.y = 0.7;
    } else {
      // Legs: normal
      if (leftLegRef.current) {
        leftLegRef.current.rotation.x = 0;
        leftLegRef.current.position.x = -0.09;
        leftLegRef.current.position.z = 0;
      }
      if (rightLegRef.current) {
        rightLegRef.current.rotation.x = 0;
        rightLegRef.current.position.x = 0.09;
        rightLegRef.current.position.z = 0;
      }
      // Arms: normal
      if (leftArmRef.current) leftArmRef.current.rotation.x = 0;
      if (rightArmRef.current) rightArmRef.current.rotation.x = 0;
      // Torso: normal
      if (bodyRef.current) bodyRef.current.scale.y = 1;
      if (bodyRef.current) bodyRef.current.position.y = 0.7;
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
