
import React from 'react';
import './ui-text.css';

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
        padding: '32px 20px 20px 20px', // Add top padding to both panels
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        minHeight: 0,
        boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
        zIndex: 1000,
        width: 350,
        height: 250,
      }}
    >
      <div className="controlpanel-text-style" style={{height: '100%', width: '100%', pointerEvents: 'auto'}}>
        {children}
      </div>
    </div>
  );
}
