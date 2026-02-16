import React, { useRef, useState, useEffect } from "react";
import { useAtomValue } from 'jotai';
import { alertAtom } from '../state/alertAtom';
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

export default function Officer({ chairPosition = [0, 0, 0], uniformColor = "#cccccc", walkBounds, rotation, seatOffsetY = 0.1, seatOffsetZ = 0 }) {
  const groupRef = useRef();
  // Officers always spawn sitting
  const [state, setState] = useState(STATES.SITTING);
  const [clicked, setClicked] = useState(false);
  const { gl } = useThree();
  const alert = useAtomValue(alertAtom);
  // Red Alert override: force return and lock in chair
  useEffect(() => {
    if (alert.isRedAlert) {
      // Instantly snap to sitting state and chair position
      setState(STATES.SITTING);
      if (groupRef.current) {
        groupRef.current.position.set(chairPosition[0], chairPosition[1], chairPosition[2]);
      }
      timerRef.current = Math.random() * 5 + 3;
      targetRef.current = null;
    } else {
      // Resume normal activity: start walking
      setState(STATES.WALKING);
        timerRef.current = Math.random() * 0.5 + 0.2;
      targetRef.current = null;
    }
  }, [alert.isRedAlert, chairPosition]);

  // Walking timer and target
  const timerRef = useRef(Math.random() * 1 + 0.5); // random 0.5-1.5s
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
    // Red Alert: lock in SITTING, disable walking
    if (alert.isRedAlert) {
      if (state !== STATES.SITTING) {
        // If returning, let RETURNING logic run; if not, force RETURNING
        if (state !== STATES.RETURNING) {
          setState(STATES.RETURNING);
          targetRef.current = new THREE.Vector3(chairPosition[0], chairPosition[1], chairPosition[2]);
        }
      }
      // If at chair, lock in SITTING
      if (state === STATES.RETURNING && groupRef.current && targetRef.current) {
        const pos = groupRef.current.position;
        const target = targetRef.current;
        const current = new THREE.Vector3(pos.x, pos.y, pos.z);
        if (current.distanceTo(target) < 0.05 * SCALE) {
          setState(STATES.SITTING);
          timerRef.current = Math.random() * 5 + 3;
          targetRef.current = null;
        }
      }
      // Do not allow walking or timer
      return;
    }
    // ...existing code for state machine...
    switch (state) {
      // SITTING is not part of the normal movement cycle
      case STATES.WALKING:
        // Always have a target to walk to
        if (!targetRef.current) {
          // Walk in the direction the officer is currently facing
          const pos = groupRef.current.position;
          // Get the forward vector from the current rotation
          const forward = new THREE.Vector3(0, 0, 1);
          forward.applyQuaternion(groupRef.current.quaternion);
          forward.normalize();
          // Walk a random distance between 6 and 12 units (further)
          const distance = Math.random() * 6 + 6;
          const target = new THREE.Vector3(
            pos.x + forward.x * distance,
            chairPosition[1],
            pos.z + forward.z * distance
          );
          // Clamp to walk bounds if provided
          if (walkBounds) {
            target.x = Math.max(walkBounds.minX, Math.min(walkBounds.maxX, target.x));
            target.z = Math.max(walkBounds.minZ, Math.min(walkBounds.maxZ, target.z));
          }
          targetRef.current = target;
        }
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
          // No lookAt: keep facing same direction while walking
          if (current.distanceTo(target) < 0.05 * SCALE) {
            if (alert.isRedAlert) {
              setState(STATES.SITTING);
            } else {
              setState(STATES.WALKING);
            }
            // Increase timer so they pause longer before changing direction
            timerRef.current = Math.random() * 2.5 + 2.5; // 2.5 to 5 seconds pause before next walk
            // Do NOT reset position to chairPosition
            targetRef.current = null;
            // Optionally, rotate to a new random direction after each walk
            if (!alert.isRedAlert && groupRef.current) {
              const randomY = Math.random() * Math.PI * 2;
              groupRef.current.rotation.y = randomY;
            }
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
            if (alert.isRedAlert) {
              setState(STATES.SITTING);
            } else {
              setState(STATES.WALKING);
            }
            timerRef.current = Math.random() * 0.5 + 0.2; // reset timer for next walk
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

  // Only apply seat offset when sitting
  const sitting = state === "sitting";
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
      {/* Remove offset for sitting: sit directly on chair */}
      <group position={[0, 0, 0]}>
        <OfficerModel uniformColor={uniformColor} headRef={headRef} sitting={sitting} />
      </group>
    </group>
  );
}
