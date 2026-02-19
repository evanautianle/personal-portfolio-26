import React, { useRef, useState, useEffect } from "react";
import { useAtomValue } from 'jotai';
import { alertAtom } from '../state/alertAtom';
import OfficerModel from "./OfficerModel";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { NAVIGATION_BOUNDS } from "../scene/navigationBounds";
import { COLLISION_ZONES } from "../scene/collisionZones";


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
