import React from 'react';
import { useAtomValue } from 'jotai';
import { navigationAtom } from '../state/navigationAtom';

const TABS = [
  { key: 'home', label: 'SECTOR 2814', x: 0.35, y: 0.25 },
  { key: 'about', label: 'SECTOR 2813', x: 0.70, y: 0.40 },
  { key: 'projects', label: 'SECTOR 674', x: 0.60, y: 0.75 },
  { key: 'contact', label: 'SECTOR 1517', x: 0.25, y: 0.60 },
];

export function Map() {
  const currentTab = useAtomValue(navigationAtom);
  const size = 990;
  const center = size / 2;
  const maxRadius = size * 0.45;
  const rings = 4; // fewer rings
  const radialLines = 12;
  const planetRadius = 34;

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: '#000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <svg width={size} height={size} style={{ display: 'block' }}>
        {/* Concentric Rings */}
        {Array.from({ length: rings }).map((_, i) => {
          const r = ((i + 1) / rings) * maxRadius;
          return (
            <circle
              key={`ring-${i}`}
              cx={center}
              cy={center}
              r={r}
              fill="none"
              stroke="#fff"
              strokeWidth={2}
              opacity={0.3}
            />
          );
        })}

        {/* Radial Lines */}
        {Array.from({ length: radialLines }).map((_, i) => {
          const angle = (i / radialLines) * 2 * Math.PI;
          const x = center + Math.cos(angle) * maxRadius;
          const y = center + Math.sin(angle) * maxRadius;
          return (
            <line
              key={`radial-${i}`}
              x1={center}
              y1={center}
              x2={x}
              y2={y}
              stroke="#555"
              strokeWidth={2}
              opacity={0.3}
            />
          );
        })}

        {/* Core */}
        <circle
          cx={center}
          cy={center}
          r={14}
          fill="#fff"
          opacity={0.9}
        />

        {/* Labels + Planets */}
        {TABS.map(tab => {
          const x = tab.x * size;
          const y = tab.y * size;
          const isActive = tab.key === currentTab;

          return (
            <g key={tab.key}>
              {/* Label */}
              <text
                x={x}
                y={y}
                textAnchor="middle"
                fontWeight={isActive ? 900 : 700}
                fontSize={80} // increased font size
                fill={isActive ? '#fff' : '#ccc'}
                style={{
                  letterSpacing: 2,
                  userSelect: 'none',
                  transition: 'all 0.3s ease',
                }}
              >
                {tab.label}
              </text>

              {/* Planet */}
              <circle
                cx={x}
                cy={y + 50}
                r={planetRadius}
                fill={isActive ? '#fff' : '#000'} // white if active
                stroke="#fff"
                strokeWidth={2}
                style={{
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                }}
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
}
