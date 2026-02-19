import React, { useRef, useState, useEffect } from "react";
import { useAtomValue } from 'jotai';
import { alertAtom } from '../../state/alertAtom';
import OfficerModel from "./OfficerModel";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { NAVIGATION_BOUNDS } from "../../scene/navigationBounds";
import { COLLISION_ZONES } from "../../scene/collisionZones";

const SCALE = 0.8;
const OfficerState = {
  SITTING: "SITTING",
  CLICKED: "CLICKED",
  RETURNING: "RETURNING",
};

function isInsideCollisionZone(pos) {
  return COLLISION_ZONES.some(zone =>
    pos.x > zone.minX &&
    pos.x < zone.maxX &&
    pos.z > zone.minZ &&
    pos.z < zone.maxZ
  );
}

export default function Officer({ chairPosition = [0, 0, 0], uniformColor = "#cccccc", rotation, seatOffsetY = 0.1, seatOffsetZ = 0 }) {
  const groupRef = useRef();
  const [state, setState] = useState(OfficerState.SITTING);
  const { gl, camera } = useThree();
  const scaleRef = useRef(SCALE);
  const headRef = useRef();
  // Store the officer's original rotation (from spawn)
  const originalY = rotation ? rotation[1] : 0;
  const [targetY, setTargetY] = useState(originalY);

  // Always lock officer to chair position
  useEffect(() => {
    if (groupRef.current) {
      groupRef.current.position.set(
        chairPosition[0],
        chairPosition[1] + seatOffsetY,
        chairPosition[2] + seatOffsetZ
      );
    }
  }, [chairPosition, seatOffsetY, seatOffsetZ]);

  // Calculate the angle to face the camera
  function getCameraAngle() {
    if (!groupRef.current || !camera) return originalY;
    const officerPos = groupRef.current.position.clone();
    const camPos = camera.position.clone();
    const targetDir = new THREE.Vector3(camPos.x - officerPos.x, 0, camPos.z - officerPos.z).normalize();
    return Math.atan2(targetDir.x, targetDir.z);
  }

  function playClickAnimation(onComplete) {
    scaleRef.current = SCALE * 1.05;
    setTimeout(() => {
      scaleRef.current = SCALE;
      if (onComplete) onComplete();
    }, 400);
  }

  const handleClick = (e) => {
    e.stopPropagation();
    // Set target rotation to camera
    setTargetY(getCameraAngle());
    setState(OfficerState.CLICKED);
    playClickAnimation(() => {
      // Wait 1 second before returning
      setTimeout(() => {
        setTargetY(originalY); // Always set targetY to original when returning
        setState(OfficerState.RETURNING);
      }, 1000);
    });
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

  useFrame(() => {
    if (!groupRef.current) return;
    // Smoothly rotate to targetY
    let currentY = groupRef.current.rotation.y;
    // Ensure shortest path
    let delta = targetY - currentY;
    if (delta > Math.PI) delta -= Math.PI * 2;
    if (delta < -Math.PI) delta += Math.PI * 2;
    groupRef.current.rotation.y += delta * 0.07;

    // When returning, check if close to originalY
    if (state === OfficerState.RETURNING) {
      // Always keep targetY = originalY while returning
      if (Math.abs(currentY - originalY) < 0.04) {
        groupRef.current.rotation.y = originalY;
        setTargetY(originalY);
        setState(OfficerState.SITTING);
      } else {
        setTargetY(originalY);
      }
    }

    // Optional: subtle idle movement (polish)
    if (state === OfficerState.SITTING && headRef.current) {
      // Occasionally nudge head toward camera for life
      if (Math.random() < 0.002) {
        headRef.current.rotation.y += (Math.random() - 0.5) * 0.2;
      } else {
        headRef.current.rotation.y *= 0.9;
      }
    }
  });

  // Only show sitting pose when in SITTING or CLICKED state
  const sitting = state === OfficerState.SITTING || state === OfficerState.CLICKED;
  const clicked = state === OfficerState.CLICKED;
  return (
    <group
      ref={groupRef}
      onClick={handleClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      scale={[scaleRef.current, scaleRef.current, scaleRef.current]}
    >
      <OfficerModel uniformColor={uniformColor} headRef={headRef} sitting={sitting} clicked={clicked} />
    </group>
  );
}
