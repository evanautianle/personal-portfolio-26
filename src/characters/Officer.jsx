import React, { useRef, useState } from "react";
import OfficerModel from "./OfficerModel";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { NAVIGATION_BOUNDS } from "../scene/navigationBounds";
import { COLLISION_ZONES } from "../scene/collisionZones";

const SCALE = 8;
const STATES = {
  SITTING: "sitting",
  WALKING: "walking",
  RETURNING: "returning",
};

function isInsideCollisionZone(pos) {
  return COLLISION_ZONES.some(zone =>
    pos.x > zone.minX &&
    pos.x < zone.maxX &&
    pos.z > zone.minZ &&
    pos.z < zone.maxZ
  );
}

export default function Officer({ chairPosition = [0, 0, 0], uniformColor = "#cccccc", walkBounds, rotation }) {
  const groupRef = useRef();
  const [state, setState] = useState(STATES.SITTING);
  const [clicked, setClicked] = useState(false);
  const { gl } = useThree();

  // Walking timer and target
  const timerRef = useRef(Math.random() * 5 + 3); // random 3-8s
  const targetRef = useRef(null);
  const scaleRef = useRef(SCALE);
  const headRef = useRef();

  // Handle click to return
  const handleClick = (e) => {
    e.stopPropagation();
    if (state === STATES.WALKING) {
      setState(STATES.RETURNING);
      targetRef.current = new THREE.Vector3(chairPosition[0], chairPosition[1], chairPosition[2]);
    }
    setClicked(true);
    scaleRef.current = SCALE * 1.05;
    setTimeout(() => {
      setClicked(false);
      scaleRef.current = SCALE;
    }, 300);
  };

  // Pointer cursor handlers
  const handlePointerOver = (e) => {
    e.stopPropagation();
    gl.domElement.style.cursor = "pointer";
  };
  const handlePointerOut = (e) => {
    e.stopPropagation();
    gl.domElement.style.cursor = "default";
  };

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    let direction = null;
    switch (state) {
      case STATES.SITTING:
        timerRef.current -= delta;
        if (timerRef.current <= 0) {
          setState(STATES.WALKING);
          // Generate random target position within walkBounds
          let minX, maxX, minZ, maxZ;
          if (walkBounds) {
            minX = walkBounds.minX;
            maxX = walkBounds.maxX;
            minZ = walkBounds.minZ;
            maxZ = walkBounds.maxZ;
          } else {
            minX = chairPosition[0] - 0.7;
            maxX = chairPosition[0] + 0.7;
            minZ = chairPosition[2] - 1.2;
            maxZ = chairPosition[2] + 1.2;
          }
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
          direction = new THREE.Vector3().subVectors(target, current).normalize();
          current.lerp(target, delta * 1.8); // Faster movement
          // Clamp to navigation bounds
          current.x = Math.max(NAVIGATION_BOUNDS.minX, Math.min(NAVIGATION_BOUNDS.maxX, current.x));
          current.z = Math.max(NAVIGATION_BOUNDS.minZ, Math.min(NAVIGATION_BOUNDS.maxZ, current.z));
          current.y = chairPosition[1]; // Always stay on same y axis
          // Prevent collision
          if (!isInsideCollisionZone(current)) {
            groupRef.current.position.set(current.x, current.y, current.z);
          }
          // Smooth rotation toward movement direction
          if (direction.lengthSq() > 0.001) {
            const lookAt = new THREE.Vector3(current.x + direction.x, current.y, current.z + direction.z);
            groupRef.current.lookAt(lookAt);
          }
          if (current.distanceTo(target) < 0.05 * SCALE) {
            setState(STATES.SITTING);
            timerRef.current = Math.random() * 5 + 3; // reset timer for next walk
            // Do NOT reset position to chairPosition
            targetRef.current = null;
          }
        }
        break;
      case STATES.RETURNING:
        if (targetRef.current) {
          const pos = groupRef.current.position;
          const target = targetRef.current;
          const current = new THREE.Vector3(pos.x, pos.y, pos.z);
          direction = new THREE.Vector3().subVectors(target, current).normalize();
          current.lerp(target, delta * 1.8); // Faster movement
          // Clamp to navigation bounds
          current.x = Math.max(NAVIGATION_BOUNDS.minX, Math.min(NAVIGATION_BOUNDS.maxX, current.x));
          current.z = Math.max(NAVIGATION_BOUNDS.minZ, Math.min(NAVIGATION_BOUNDS.maxZ, current.z));
          current.y = chairPosition[1]; // Always stay on same y axis
          // Prevent collision
          if (!isInsideCollisionZone(current)) {
            groupRef.current.position.set(current.x, current.y, current.z);
          }
          // Smooth rotation toward chair
          if (direction.lengthSq() > 0.001) {
            const lookAt = new THREE.Vector3(current.x + direction.x, current.y, current.z + direction.z);
            groupRef.current.lookAt(lookAt);
          }
          if (current.distanceTo(target) < 0.05 * SCALE) {
            setState(STATES.SITTING);
            timerRef.current = Math.random() * 5 + 3; // reset timer for next walk
            // Do NOT reset position to chairPosition
            targetRef.current = null;
          }
        }
        break;
      default:
        break;
    }
    // Optional: slight head tilt when clicked
    if (headRef.current) {
      headRef.current.rotation.z = clicked ? 0.25 : 0;
    }
  });

  return (
    <group
      ref={groupRef}
      position={chairPosition}
      rotation={rotation}
      onClick={handleClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      scale={[scaleRef.current, scaleRef.current, scaleRef.current]}
    >
      <OfficerModel uniformColor={uniformColor} headRef={headRef} />
    </group>
  );
}
