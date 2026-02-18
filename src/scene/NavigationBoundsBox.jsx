import React from "react";
import { Box, Line } from "@react-three/drei";
import { NAVIGATION_BOUNDS } from "../scene/navigationBounds";

export default function NavigationBoundsBox({ color = "#00ff88", opacity = 0.2 }) {
  const y = 0.15;
  return (
    <>
      {NAVIGATION_BOUNDS.map((rect, i) => {
        const { minX, maxX, minZ, maxZ } = rect;
        const width = maxX - minX;
        const height = 0.1;
        const depth = maxZ - minZ;
        const centerX = (minX + maxX) / 2;
        const centerZ = (minZ + maxZ) / 2;
        const corners = [
          [minX, y, minZ],
          [maxX, y, minZ],
          [maxX, y, maxZ],
          [minX, y, maxZ],
          [minX, y, minZ],
        ];
        return (
          <React.Fragment key={i}>
            <Box
              position={[centerX, y, centerZ]}
              args={[width, height, depth]}
            >
              <meshStandardMaterial color={color} transparent opacity={opacity} />
            </Box>
            <Line points={corners} color={color} lineWidth={2} dashed={false} />
          </React.Fragment>
        );
      })}
    </>
  );
}
