import React, { useRef, useState } from "react";
import OfficerModel from "./OfficerModel";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { DragControls } from "@react-three/drei";

const SCALE = 8;
const STATES = {
  SITTING: "sitting",
  WALKING: "walking",
  RETURNING: "returning",
  DRAGGING: "dragging",
};

export default function Officer({ chairPosition = [0, 0, 0], uniformColor = "#cccccc", walkBounds }) {
  const groupRef = useRef();
  const [state, setState] = useState(STATES.SITTING);
  const [clicked, setClicked] = useState(false);

  // Walking timer and target
  const timerRef = useRef(Math.random() * 15 + 10); // random 10-25s
  const targetRef = useRef(null);
  const scaleRef = useRef(SCALE);
  const headRef = useRef();

  // Handle click to return
  const handleClick = () => {
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

  // Drag event handlers
  const handleDragStart = () => {
    setState(STATES.DRAGGING);
  };
  const handleDragEnd = () => {
    setState(STATES.WALKING);
    timerRef.current = Math.random() * 15 + 10;
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
          current.lerp(target, delta * 0.5);
          groupRef.current.position.set(current.x, current.y, current.z);
          // Smooth rotation toward movement direction
          if (direction.lengthSq() > 0.001) {
            const lookAt = new THREE.Vector3(current.x + direction.x, current.y, current.z + direction.z);
            groupRef.current.lookAt(lookAt);
          }
          if (current.distanceTo(target) < 0.05 * SCALE) {
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
          direction = new THREE.Vector3().subVectors(target, current).normalize();
          current.lerp(target, delta * 0.5);
          groupRef.current.position.set(current.x, current.y, current.z);
          // Smooth rotation toward chair
          if (direction.lengthSq() > 0.001) {
            const lookAt = new THREE.Vector3(current.x + direction.x, current.y, current.z + direction.z);
            groupRef.current.lookAt(lookAt);
          }
          if (current.distanceTo(target) < 0.05 * SCALE) {
            setState(STATES.SITTING);
            timerRef.current = Math.random() * 15 + 10;
            groupRef.current.position.set(chairPosition[0], chairPosition[1], chairPosition[2]);
            targetRef.current = null;
          }
        }
        break;
      case STATES.DRAGGING:
        // DragControls handles position, do not update
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
    <DragControls
      object={groupRef}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      transformGroup
    >
      <group ref={groupRef} position={chairPosition} onClick={handleClick} scale={[scaleRef.current, scaleRef.current, scaleRef.current]}>
        <OfficerModel uniformColor={uniformColor} headRef={headRef} />
      </group>
    </DragControls>
  );
}
