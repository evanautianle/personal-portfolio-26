
import React from 'react';
import { CanvasRoot } from './CanvasRoot';
import { Navbar } from '../ui/Navbar';
import { ControlPanel } from '../ui/ControlPanel';
import { useAtom, useSetAtom, useAtomValue } from 'jotai';
import { heroSpeedAtom } from '../state/heroSpeedAtom';
import { navigationAtom } from '../state/navigationAtom';
import { alertAtom } from '../state/alertAtom';


import { useState } from 'react';

export function App() {
  const [speed, setSpeed] = useAtom(heroSpeedAtom);
  const [currentTab, setNavigation] = useAtom(navigationAtom);
  const [alert, setAlert] = useAtom(alertAtom);
  const redAlert = alert.isRedAlert;
  const [pendingTab, setPendingTab] = useState(currentTab);

  // When currentTab changes externally, update pendingTab
  React.useEffect(() => {
    setPendingTab(currentTab);
  }, [currentTab]);

  return (
    <>
      <Navbar />
      <CanvasRoot redAlert={redAlert} />
      <ControlPanel position="left">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, alignItems: 'stretch', height: '100%', width: '100%' }}>
          <div style={{
            fontWeight: 700,
            fontSize: 13,
            marginBottom: 4,
            letterSpacing: 0.5,
            color: '#fff',
            textTransform: 'uppercase',
            gridColumn: 'span 2',
            textAlign: 'center',
          }}>
            Plot a Course
          </div>
            {['home', 'about', 'projects', 'contact'].map((route) => (
            <button
              key={route}
              style={{
                background: pendingTab === route ? '#222' : '#fff',
                border: '2px solid #fff',
                color: pendingTab === route ? '#fff' : '#111',
                fontWeight: 600,
                fontSize: 18,
                padding: '0',
                cursor: 'pointer',
                borderRadius: 12,
                transition: 'all 0.2s',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                outline: 'none',
                margin: 0,
                boxShadow: pendingTab === route ? '0 0 4px #fff' : 'none',
                width: '100%',
                height: '100%',
                minHeight: 60,
              }}
              onClick={() => setPendingTab(route)}
            >
                {route === 'home' ? 'Home' : route.charAt(0).toUpperCase() + route.slice(1)}
            </button>
          ))}
        </div>
      </ControlPanel>
      <ControlPanel position="right">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 12, alignItems: 'stretch', height: '100%', width: '100%' }}>
          <div style={{
            fontWeight: 700,
            fontSize: 13,
            marginBottom: 4,
            letterSpacing: 0.5,
            color: '#fff',
            textTransform: 'uppercase',
            textAlign: 'center',
          }}>
            Warp Controls
          </div>
          <button
            style={{
              background: pendingTab !== currentTab ? '#222' : '#eee',
              border: '2px solid #fff',
              color: pendingTab !== currentTab ? '#111' : '#aaa',
              fontWeight: 600,
              fontSize: 18,
              padding: '0',
              cursor: pendingTab !== currentTab ? 'pointer' : 'not-allowed',
              borderRadius: 12,
              transition: 'all 0.2s',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              outline: 'none',
              margin: 0,
              boxShadow: pendingTab !== currentTab ? '0 0 4px #fff' : 'none',
              width: '100%',
              minHeight: 60,
            }}
            disabled={pendingTab === currentTab}
            onClick={() => {
              if (pendingTab !== currentTab) {
                setSpeed('warp');
                setNavigation(pendingTab === 'home' ? 'home' : pendingTab);
              }
            }}
          >
            Engage Warp!
          </button>
          <button
            style={{
              background: redAlert ? '#c00' : '#fff',
              border: '2px solid #c00',
              color: redAlert ? '#fff' : '#c00',
              fontWeight: 700,
              fontSize: 18,
              padding: '0',
              cursor: 'pointer',
              borderRadius: 12,
              transition: 'all 0.2s',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              outline: 'none',
              margin: 0,
              marginTop: 0,
              boxShadow: redAlert ? '0 0 4px #c00' : 'none',
              width: '100%',
              minHeight: 60,
            }}
            onClick={() => setAlert({ ...alert, isRedAlert: !alert.isRedAlert })}
          >
            {redAlert ? 'Disable Red Alert' : 'Red Alert'}
          </button>
        </div>
      </ControlPanel>
    </>
  );
}
