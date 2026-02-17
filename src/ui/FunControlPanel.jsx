import React from 'react';

export function FunControlPanel({ children }) {
  return (
    <div
      style={{
        position: 'fixed',
        top: 38,
        right: 38,
        background: '#1a1a1a',
        borderRadius: 24,
        padding: '10px 12px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 12,
        boxShadow: '0 6px 24px rgba(0, 0, 0, 0.35)',
        zIndex: 1000,
        width: 180,
        height: 90,
      }}
    >
      {children}
    </div>
  );
}
