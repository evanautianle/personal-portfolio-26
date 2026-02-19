import { CruiseStarfield } from '../CruiseStarfield';
import React from 'react';

export function Home({ enhanced, onNavigate }) {
  if (enhanced) return <EnhancedHome onNavigate={onNavigate} />;

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        background: 'radial-gradient(ellipse at center, #222 0%, #000 80%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxSizing: 'border-box',
      }}
    >
      <CruiseStarfield />
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          color: '#fff',
          textAlign: 'center',
        }}
      >
        <span
          style={{
            fontSize: '9vw',
            fontWeight: 900,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#fff',
            display: 'block',
            lineHeight: 1.1,
          }}
        >
          Evan Au
        </span>
        <p
          style={{
            fontSize: '3.9vw',
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            marginTop: '2vw',
            opacity: 0.6,
          }}
        >
          Full Stack Developer
        </p>
      </div>
    </div>
  );
}

function EnhancedHome() {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: '#000',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontFamily: 'inherit',
        position: 'relative',
        overflow: 'hidden',
        boxSizing: 'border-box',
      }}
    >
      <CruiseStarfield />
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          textAlign: 'center',
          padding: '0 24px',
        }}
      >
        <h1
          style={{
            fontSize: 64,
            fontWeight: 900,
            textTransform: 'uppercase',
            letterSpacing: 8,
            margin: '0 0 12px 0',
          }}
        >
          Evan Au
        </h1>
        <p
          style={{
            fontSize: 16,
            textTransform: 'uppercase',
            letterSpacing: 4,
            opacity: 0.5,
            margin: '0 0 48px 0',
          }}
        >
          Full Stack Developer · Auckland, NZ
        </p>
        <p
          style={{
            fontSize: 16,
            lineHeight: 1.7,
            maxWidth: 520,
            opacity: 0.85,
            margin: 0,
          }}
        >
          Third-year Computer Science student at the University of Auckland. Award-winning hackathon builder. Passionate about crafting intuitive web experiences.
        </p>
      </div>
    </div>
  );
}