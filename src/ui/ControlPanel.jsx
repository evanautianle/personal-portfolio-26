import React from 'react';

export function ControlPanel({ position = 'left', children }) {
  const isLeft = position === 'left';
  return (
    <div
      style={{
        position: 'fixed',
        bottom: 38,
        left: isLeft ? 38 : 'auto',
        right: isLeft ? 'auto' : 38,
        background: '#1a1a1a',
        borderRadius: 40,
        padding: '20px 20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 24,
        boxShadow: '0 12px 48px rgba(0, 0, 0, 0.35)',
        zIndex: 1000,
        width: 350,
        height: 220,
      }}
    >
      {children}
    </div>
  );
}
