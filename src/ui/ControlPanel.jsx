import React from 'react';

export function ControlPanel({ position = 'left', children }) {
  const isLeft = position === 'left';
  return (
    <div
      style={{
        position: 'fixed',
        bottom: 28,
        left: isLeft ? 28 : 'auto',
        right: isLeft ? 'auto' : 28,
        background: '#111',
        padding: 20,
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        minHeight: 0,
        boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
        zIndex: 1000,
        width: 260,
        height: 280,
      }}
    >
      {children}
    </div>
  );
}
