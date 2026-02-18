import React from 'react';
import { useAtomValue } from 'jotai';
import { navigationAtom } from '../state/navigationAtom';

const TABS = [
  { key: 'home', label: 'Home', x: 0.35, y: 0.30 },
  { key: 'about', label: 'About', x: 0.70, y: 0.35 },
  { key: 'projects', label: 'Projects', x: 0.60, y: 0.70 },
  { key: 'contact', label: 'Contact', x: 0.25, y: 0.65 },
];

export function Map() {
  const currentTab = useAtomValue(navigationAtom);
  const size = 820;
  const center = size / 2;
  const maxRadius = size * 0.45;

  const rings = 8;
  const radialLines = 12;

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
        <defs>
          {/* Slightly stronger but tight glow */}
          <filter id="tightGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Concentric Rings */}
        {Array.from({ length: rings }).map((_, i) => {
          const r = (i + 1) * (maxRadius / rings);
          return (
            <circle
              key={`ring-${i}`}
              cx={center}
              cy={center}
              r={r}
              fill="none"
              stroke="#333"
              strokeWidth={1.5}
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
              stroke="#2a2a2a"
              strokeWidth={1.5}
            />
          );
        })}

        {/* Spiral Arms */}
        {Array.from({ length: 3 }).map((_, armIndex) => {
          const points = [];
          const turns = 2.5;
          const step = 0.1;

          for (let t = 0; t < turns * Math.PI; t += step) {
            const radius = (t / (turns * Math.PI)) * maxRadius;
            const angle = t + armIndex * ((2 * Math.PI) / 3);
            const x = center + Math.cos(angle) * radius;
            const y = center + Math.sin(angle) * radius;
            points.push(`${x},${y}`);
          }

          return (
            <polyline
              key={`spiral-${armIndex}`}
              points={points.join(' ')}
              fill="none"
              stroke="#444"
              strokeWidth={1.8}
              opacity={0.7}
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

        {/* Tabs */}
        {TABS.map(tab => (
          <text
            key={tab.key}
            x={tab.x * size}
            y={tab.y * size}
            textAnchor="middle"
            fontWeight={tab.key === currentTab ? 900 : 700}
            fontSize={54}  // 🔥 bigger text
            fill={tab.key === currentTab ? '#fff' : '#ccc'}
            filter={tab.key === currentTab ? 'url(#tightGlow)' : undefined}
            style={{
              letterSpacing: 4,
              userSelect: 'none',
              transition: 'all 0.3s ease',
            }}
          >
            {tab.label}
          </text>
        ))}
      </svg>
    </div>
  );
}
