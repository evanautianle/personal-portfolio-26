import React, { useRef, useState, useEffect } from "react";
import OfficerController from "../base/OfficerController";
import * as THREE from "three";
import { NAVIGATION_BOUNDS } from "../../../scene/navigationBounds";

function getRandomPos(rects) {
  const rect = Array.isArray(rects) ? rects[Math.floor(Math.random() * rects.length)] : rects;
  return [
    THREE.MathUtils.lerp(rect.minX, rect.maxX, Math.random()),
    0,
    THREE.MathUtils.lerp(rect.minZ, rect.maxZ, Math.random()),
  ];
}

// Shared static refs for collision avoidance
const staticAllRefs = [];

export default function WanderingOfficer({ bounds = NAVIGATION_BOUNDS, color = "#cc3344" }) {
  const [target, setTarget] = useState(() => getRandomPos(bounds));
  const groupRef = useRef();

  // Register this officer's ref for collision avoidance
  useEffect(() => {
    staticAllRefs.push(groupRef);
    return () => {
      const idx = staticAllRefs.indexOf(groupRef);
      if (idx !== -1) staticAllRefs.splice(idx, 1);
    };
  }, []);

  // Start at a random position
  useEffect(() => {
    if (groupRef.current) {
      const [x, y, z] = getRandomPos(bounds);
      groupRef.current.position.set(x, y, z);
    }
    // eslint-disable-next-line
  }, []);

  // Wandering movement logic for OfficerController
  function onWanderFrame(ref, delta) {
    if (!ref.current) return;
    const pos = ref.current.position;
    const targetVec = new THREE.Vector3(...target);
    let dir = targetVec.clone().sub(pos);
    // Avoid bumping into other officers
    for (const otherRef of staticAllRefs) {
      if (otherRef === groupRef || !otherRef.current) continue;
      const otherPos = otherRef.current.position;
      const sep = pos.distanceTo(otherPos);
      if (sep < 1) {
        dir.add(pos.clone().sub(otherPos).normalize().multiplyScalar(1));
      }
    }
    const dist = dir.length();
    if (dist < 0.1) {
      setTarget(getRandomPos(bounds));
    } else {
      dir.normalize();
      let nextX = pos.x + dir.x * delta * 0.5;
      let nextZ = pos.z + dir.z * delta * 0.5;
      // Constrain to any of the allowed rectangles
      let inside = false;
      for (const rect of bounds) {
        if (
          nextX >= rect.minX && nextX <= rect.maxX &&
          nextZ >= rect.minZ && nextZ <= rect.maxZ
        ) {
          inside = true;
          break;
        }
      }
      if (inside) {
        pos.x = nextX;
        pos.z = nextZ;
      } else {
        setTarget(getRandomPos(bounds));
      }
      ref.current.rotation.y = Math.atan2(dir.x, dir.z);
    }
  }

  return (
    <OfficerController
      ref={groupRef}
      uniformColor={color}
      sitting={false}
      enableFaceCamera={true}
      enableClick={true}
      onWanderFrame={onWanderFrame}
    />
  );
}
