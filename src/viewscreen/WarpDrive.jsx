import React, { useEffect, useState } from 'react';
import { useAtomValue, useAtom } from 'jotai';
import { heroSpeedAtom } from '../state/heroSpeedAtom';
import { navigationAtom } from '../state/navigationAtom';

export function WarpDrive() {
  const speed = useAtomValue(heroSpeedAtom);
  const [currentTab] = useAtom(navigationAtom);
  const [pendingTab, setPendingTab] = useState(currentTab);
  const [chargePercent, setChargePercent] = useState(0);
  const [state, setState] = useState('standby'); // 'standby', 'charging', 'ready', 'draining'

  // Listen for course plotting
  useEffect(() => {
    const handler = (route) => setPendingTab(route);
    window.addEventListener('pendingTabChange', (e) => handler(e.detail));
    return () => window.removeEventListener('pendingTabChange', (e) => handler(e.detail));
  }, []);

  // Listen for engage command
  useEffect(() => {
    const handleEngage = (e) => {
      if (e.detail?.type === 'engage' && state === 'ready') {
        setState('draining');
      }
    };
    window.addEventListener('captain-speech', handleEngage);
    return () => window.removeEventListener('captain-speech', handleEngage);
  }, [state]);

  // Handle state transitions
  useEffect(() => {
    // Start charging if plotting a new course
    if (pendingTab !== currentTab && state === 'standby') {
      setChargePercent(0);
      setState('charging');
    }
    // Cancel charging if back to current tab
    if (pendingTab === currentTab && state === 'charging') {
      setChargePercent(0);
      setState('standby');
    }
  }, [pendingTab, currentTab, state]);

  // Charging effect
  useEffect(() => {
    if (state !== 'charging') return;

    const interval = setInterval(() => {
      setChargePercent(prev => {
        const next = prev + 2;
        if (next >= 100) {
          clearInterval(interval);
          setState('ready');
          return 100;
        }
        return next;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [state]);

  // Draining effect
  useEffect(() => {
    if (state !== 'draining') return;

    const interval = setInterval(() => {
      setChargePercent(prev => {
        const next = prev - 2;
        if (next <= 0) {
          clearInterval(interval);
          setState('standby');
          return 0;
        }
        return next;
      });
    }, 40);

    return () => clearInterval(interval);
  }, [state]);

  // Warp core label
  let label = '';
  if (state === 'charging') label = 'Warp Core Charging';
  else if (state === 'ready') label = 'WARP DRIVE READY';
  else if (state === 'draining') label = 'Warp Core Draining';
  else label = 'Warp Core Standby';

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
      <div style={{ width: '100%', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ fontSize: 64, marginBottom: 32, letterSpacing: 3, color: '#0ff', textShadow: '0 0 32px #0ff8, 0 0 8px #fff' }}>
          {label}
        </div>
        <div style={{ fontSize: 120, fontWeight: 900, color: chargePercent === 100 ? '#fff' : '#0ff', textShadow: chargePercent === 100 ? '0 0 48px #fff, 0 0 16px #0ff' : '0 0 32px #0ff8' }}>
          {chargePercent}%
        </div>
        <div style={{
          marginTop: 48,
          width: '90%',
          minWidth: 320,
          maxWidth: 900,
          height: 260,
          background: 'radial-gradient(ellipse at center, #0ff 0%, #0ff8 60%, #222 100%)',
          borderRadius: 130,
          boxShadow: '0 0 128px 32px #0ff8, 0 0 0 16px #222 inset',
          position: 'relative',
          overflow: 'hidden',
          border: '8px solid #0ff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div style={{
            width: `${chargePercent}%`,
            height: '100%',
            background: 'repeating-linear-gradient(90deg, #0ff 0 40px, #fff 40px 80px, #0ff8 80px 120px)',
            boxShadow: '0 0 64px 16px #0ff8',
            borderRadius: 130,
            transition: 'width 0.2s cubic-bezier(.4,2,.6,1)',
            border: '4px solid #fff8',
            position: 'absolute',
            left: 0,
            top: 0,
            zIndex: 2,
            opacity: 0.97,
          }} />
          <div style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: '100%',
            height: '100%',
            background: 'radial-gradient(ellipse at center, #0ff8 0%, #0ff2 60%, transparent 100%)',
            zIndex: 1,
            pointerEvents: 'none',
          }} />
          <div style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: '100%',
            height: '100%',
            zIndex: 3,
            pointerEvents: 'none',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}>
            {[...Array(10)].map((_, i) => (
              <div key={i} style={{ width: '100%', height: 10, background: 'rgba(255,255,255,0.13)', borderRadius: 5 }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}