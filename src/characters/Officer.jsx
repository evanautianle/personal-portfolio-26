import React, { useRef, useState } from "react";
import OfficerModel from "./OfficerModel";

export default function Officer({ chairPosition = [0, 0, 0], uniformColor = "#cccccc" }) {
  const groupRef = useRef();
  const [state, setState] = useState("sitting");

  return (
    <group ref={groupRef} position={chairPosition}>
      <OfficerModel uniformColor={uniformColor} />
    </group>
  );
}
