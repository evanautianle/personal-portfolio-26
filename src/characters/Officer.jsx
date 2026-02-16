import React, { useRef, useState } from "react";
import OfficerModel from "./OfficerModel";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Officer({ chairPosition = [0, 0, 0], uniformColor = "#cccccc" }) {
  const groupRef = useRef();
  const [state, setState] = useState("sitting");

  // Walking timer and target
  const timerRef = useRef(Math.random() * 15 + 10); // random 10-25s
  const targetRef = useRef(null);

  // Handle click to return
  const handleClick = () => {
    if (state === "walking") {
      setState("returning");
      targetRef.current = new THREE.Vector3(chairPosition[0], chairPosition[1], chairPosition[2]);
    }
  };

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    if (state === "sitting") {
      timerRef.current -= delta;
      if (timerRef.current <= 0) {
        // Start walking
        setState("walking");
        // Generate random target position (simple bounds for now)
        const minX = chairPosition[0] - 0.7;
        const maxX = chairPosition[0] + 0.7;
        const minZ = chairPosition[2] - 1.2;
        const maxZ = chairPosition[2] + 1.2;
        const x = Math.random() * (maxX - minX) + minX;
        const y = chairPosition[1];
        const z = Math.random() * (maxZ - minZ) + minZ;
        targetRef.current = new THREE.Vector3(x, y, z);
      }
    } else if (state === "walking" && targetRef.current) {
      // Move toward target
      const pos = groupRef.current.position;
      const target = targetRef.current;
      const current = new THREE.Vector3(pos.x, pos.y, pos.z);
      current.lerp(target, delta * 0.5);
      groupRef.current.position.set(current.x, current.y, current.z);
      // If close enough, sit again
      if (current.distanceTo(target) < 0.05) {
        setState("sitting");
        timerRef.current = Math.random() * 15 + 10;
        groupRef.current.position.set(chairPosition[0], chairPosition[1], chairPosition[2]);
        targetRef.current = null;
      }
    } else if (state === "returning" && targetRef.current) {
      // Move toward chair
      const pos = groupRef.current.position;
      const target = targetRef.current;
      const current = new THREE.Vector3(pos.x, pos.y, pos.z);
      current.lerp(target, delta * 0.5);
      groupRef.current.position.set(current.x, current.y, current.z);
      // If close enough, sit again
      if (current.distanceTo(target) < 0.05) {
        setState("sitting");
        timerRef.current = Math.random() * 15 + 10;
        groupRef.current.position.set(chairPosition[0], chairPosition[1], chairPosition[2]);
        targetRef.current = null;
      }
    }
  });

  return (
    <group ref={groupRef} position={chairPosition} onClick={handleClick}>
      <OfficerModel uniformColor={uniformColor} />
    </group>
  );
}
