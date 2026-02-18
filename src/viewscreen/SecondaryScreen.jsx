import React, { useEffect, useRef, useState } from 'react';
import { useAtomValue } from 'jotai';
import { heroSpeedAtom } from '../state/heroSpeedAtom';
import { navigationAtom } from '../state/navigationAtom';
import { useAtom } from 'jotai';

export function SecondaryScreen({ side }) {
  const speed = useAtomValue(heroSpeedAtom);
  const [currentTab] = useAtom(navigationAtom);
  const [pendingTab, setPendingTab] = useState(currentTab);
  const [charging, setCharging] = useState(false);
  const [chargePercent, setChargePercent] = useState(0);
  const chargingRef = useRef(false);

  // Listen for course plotting (pendingTab !== currentTab triggers charging)
  useEffect(() => {
    // Listen for course plotting from App (pendingTab changes)
    const handler = (route) => {
      setPendingTab(route);
    };
    // Listen for tab change events (simulate App's pendingTab logic)
    window.addEventListener('pendingTabChange', (e) => handler(e.detail));
    return () => {
      window.removeEventListener('pendingTabChange', (e) => handler(e.detail));
    };
  }, []);

  // Start charging when pendingTab !== currentTab
  useEffect(() => {
    if (pendingTab !== currentTab && !chargingRef.current) {
      setCharging(true);
      chargingRef.current = true;
      setChargePercent(0);
    }
    // Reset when tab is switched (pendingTab === currentTab)
    if (pendingTab === currentTab && chargingRef.current) {
      setCharging(false);
      setChargePercent(0);
      chargingRef.current = false;
    }
  }, [pendingTab, currentTab]);

  // Animate charging from 0 to 100%
  useEffect(() => {
    if (!charging) return;
    if (chargePercent >= 100) return;
    const interval = setInterval(() => {
      setChargePercent((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 30);
    return () => clearInterval(interval);
  }, [charging, chargePercent]);

  // UI
  let display;
  if (charging) {
    display = (
      <div style={{ width: '100%', textAlign: 'center' }}>
        <div style={{ fontSize: 38, marginBottom: 16 }}>Warp Coils Charging</div>
        <div style={{ fontSize: 64, fontWeight: 700 }}>{chargePercent}%</div>
        <div style={{ marginTop: 24, width: '80%', marginLeft: '10%', height: 18, background: '#222', borderRadius: 12, overflow: 'hidden', boxShadow: '0 0 8px #0ff8' }}>
          <div style={{ width: `${chargePercent}%`, height: '100%', background: 'linear-gradient(90deg, #0ff, #0ff8, #fff 80%)', transition: 'width 0.1s' }} />
        </div>
      </div>
    );
  } else {
    display = (
      <div style={{ fontSize: 38, textAlign: 'center' }}>Standby</div>
    );
  }

  return (
    <div style={{ width: '100%', height: '100%', background: '#050505', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 48, textAlign: 'center', padding: 32 }}>
      {display}
    </div>
  );
}
