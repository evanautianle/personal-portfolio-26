import React, { useEffect, useState } from 'react';
import { useAtomValue, useAtom } from 'jotai';
import { heroSpeedAtom } from '../state/heroSpeedAtom';
import { navigationAtom } from '../state/navigationAtom';

export function WarpDrive() {
  const speed = useAtomValue(heroSpeedAtom);
  const [currentTab] = useAtom(navigationAtom);
  const [pendingTab, setPendingTab] = useState(currentTab);

  const [warpPercent, setWarpPercent] = useState(0);
  const [warpState, setWarpState] = useState('standby'); // 'standby', 'charging', 'ready', 'draining'
  const [pulseOffset, setPulseOffset] = useState(0);
  const [impulseOpacity, setImpulseOpacity] = useState(1); // For fade transition

  // Listen for course plotting
  useEffect(() => {
    const handler = (route) => setPendingTab(route);
    window.addEventListener('pendingTabChange', (e) => handler(e.detail));
    return () => window.removeEventListener('pendingTabChange', (e) => handler(e.detail));
  }, []);

  // Listen for engage command
  useEffect(() => {
    const handleEngage = (e) => {
      if (e.detail?.type === 'engage' && warpState === 'ready') {
        setWarpState('draining');
      }
    };
    window.addEventListener('captain-speech', handleEngage);
    return () => window.removeEventListener('captain-speech', handleEngage);
  }, [warpState]);

  // Handle state transitions
  useEffect(() => {
    if (pendingTab !== currentTab && warpState === 'standby') {
      setWarpPercent(0);
      setWarpState('charging');
    }
    if (pendingTab === currentTab && warpState === 'charging') {
      setWarpPercent(0);
      setWarpState('standby');
    }
  }, [pendingTab, currentTab, warpState]);

  // Warp charging
  useEffect(() => {
    if (warpState !== 'charging') return;
    const interval = setInterval(() => {
      setWarpPercent(prev => {
        const next = prev + 2;
        if (next >= 100) {
          clearInterval(interval);
          setWarpState('ready');
          return 100;
        }
        return next;
      });
    }, 30);
    return () => clearInterval(interval);
  }, [warpState]);

  // Warp draining
  useEffect(() => {
    if (warpState !== 'draining') return;
    const interval = setInterval(() => {
      setWarpPercent(prev => {
        const next = prev - 2;
        if (next <= 0) {
          clearInterval(interval);
          setWarpState('standby');
          return 0;
        }
        return next;
      });
    }, 40);
    return () => clearInterval(interval);
  }, [warpState]);

  // Impulse engine pulse animation
  useEffect(() => {
    const interval = setInterval(() => {
      const engaged = warpState !== 'draining';
      setPulseOffset(prev => (prev >= 100 ? 0 : prev + (engaged ? 2 : 0)));
      setImpulseOpacity(prev => engaged ? Math.min(prev + 0.05, 1) : Math.max(prev - 0.05, 0));
    }, 50);
    return () => clearInterval(interval);
  }, [warpState]);

  const labelStyle = {
    fontSize: 72,
    marginBottom: 16,
    letterSpacing: 4,
    color: '#0ff',
    fontWeight: 900,
  };

  const warpLabel = (() => {
    if (warpState === 'charging') return 'WARP CORE CHARGING';
    if (warpState === 'ready') return 'WARP CORE READY';
    if (warpState === 'draining') return 'WARP CORE ENGAGED';
    return 'WARP CORE STANDBY';
  })();

  const impulseEngaged = warpState !== 'draining';
  const impulseLabel = `IMPULSE ENGINE ${impulseEngaged ? 'ENGAGED' : 'STANDBY'}`;

  // Warp Core grid for smooth charging
  const rows = 10;
  const cols = 20;
  const warpBlocks = [];
  const totalBlocks = rows * cols;
  const filledBlocks = Math.round((warpPercent / 100) * totalBlocks);

  for (let i = 0; i < totalBlocks; i++) {
    warpBlocks.push(
      <div key={i} style={{
        width: `${100 / cols}%`,
        height: `${100 / rows}%`,
        background: i < filledBlocks ? '#0ff' : 'rgba(15,255,255,0.1)',
        transition: 'background 0.2s linear'
      }} />
    );
  }

  return (
    <div style={{
      width: '100%',
      height: '100%',
      background: '#050505',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#fff',
      fontSize: 48,
      textAlign: 'center',
      padding: 32,
      filter: 'grayscale(1)',
    }}>
      <div style={{ width: '100%', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

        {/* --- Impulse Engine --- */}
        <div style={labelStyle}>{impulseLabel}</div>
        <div style={{
          marginBottom: 48,
          width: '80%',
          minWidth: 320,
          maxWidth: 900,
          height: 120,
          background: '#111',
          borderRadius: 60,
          position: 'relative',
          overflow: 'hidden',
          border: '4px solid #0ff',
        }}>
          {impulseEngaged && (
            <div style={{
              position: 'absolute',
              top: 0,
              left: `${-100 + pulseOffset}%`,
              width: '200%',
              height: '100%',
              opacity: impulseOpacity,
              background: 'linear-gradient(90deg, transparent, #0ff4, #0ff, #0ff4, transparent)',
              transition: 'opacity 0.2s linear',
            }} />
          )}
        </div>

        {/* --- Warp Core --- */}
        <div style={labelStyle}>{warpLabel}</div>
        <div style={{
          marginTop: 48,
          width: '90%',
          minWidth: 320,
          maxWidth: 900,
          height: 260,
          background: '#111',
          borderRadius: 20,
          display: 'grid',
          gridTemplateRows: `repeat(${rows}, 1fr)`,
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gap: '2px',
          overflow: 'hidden',
          border: '4px solid #0ff',
        }}>
          {warpBlocks}
        </div>
      </div>
    </div>
  );
}
