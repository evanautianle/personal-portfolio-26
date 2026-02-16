import React, { useRef, useState } from "react";
import OfficerModel from "./OfficerModel";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const STATES = {
  SITTING: "sitting",
  WALKING: "walking",
  RETURNING: "returning",
};

export default function Officer({ chairPosition = [0, 0, 0], uniformColor = "#cccccc" }) {
  const groupRef = useRef();
  const [state, setState] = useState(STATES.SITTING);

  // Walking timer and target
  const timerRef = useRef(Math.random() * 15 + 10); // random 10-25s
  const targetRef = useRef(null);

  // Handle click to return
  const handleClick = () => {
    if (state === STATES.WALKING) {
      setState(STATES.RETURNING);
      targetRef.current = new THREE.Vector3(chairPosition[0], chairPosition[1], chairPosition[2]);
    }
  };

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    switch (state) {
      case STATES.SITTING:
        timerRef.current -= delta;
        if (timerRef.current <= 0) {
          setState(STATES.WALKING);
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
        break;
      case STATES.WALKING:
        if (targetRef.current) {
          const pos = groupRef.current.position;
          const target = targetRef.current;
          const current = new THREE.Vector3(pos.x, pos.y, pos.z);
          current.lerp(target, delta * 0.5);
          groupRef.current.position.set(current.x, current.y, current.z);
          // Only allow transition to RETURNING (on click) or SITTING (when close)
          if (current.distanceTo(target) < 0.05) {
            setState(STATES.SITTING);
            timerRef.current = Math.random() * 15 + 10;
            groupRef.current.position.set(chairPosition[0], chairPosition[1], chairPosition[2]);
            targetRef.current = null;
          }
        }
        break;
      case STATES.RETURNING:
        if (targetRef.current) {
          const pos = groupRef.current.position;
          const target = targetRef.current;
          const current = new THREE.Vector3(pos.x, pos.y, pos.z);
          current.lerp(target, delta * 0.5);
          groupRef.current.position.set(current.x, current.y, current.z);
          // Only allow transition to SITTING (when close)
          if (current.distanceTo(target) < 0.05) {
            setState(STATES.SITTING);
            timerRef.current = Math.random() * 15 + 10;
            groupRef.current.position.set(chairPosition[0], chairPosition[1], chairPosition[2]);
            targetRef.current = null;
          }
        }
        break;
      default:
        break;
    }
  });

  return (
    <group ref={groupRef} position={chairPosition} onClick={handleClick} scale={[8, 8, 8]}>
      <OfficerModel uniformColor={uniformColor} />
    </group>
  );
}
