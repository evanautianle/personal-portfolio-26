
import React from 'react';
import { CanvasRoot } from './CanvasRoot';
import { Navbar } from '../ui/Navbar';
import { ControlPanel } from '../ui/ControlPanel';
import { FunControlPanel } from '../ui/FunControlPanel';
import { Viewscreen } from '../viewscreen/Viewscreen';
import { useAtom, useSetAtom, useAtomValue } from 'jotai';
import { heroSpeedAtom } from '../state/heroSpeedAtom';
import { navigationAtom } from '../state/navigationAtom';
import { alertAtom } from '../state/alertAtom';


import { useState } from 'react';

export function App() {
    const [enhancedScreen, setEnhancedScreen] = useState(false);
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
      <FunControlPanel>
        {/* Fun button and panel title removed */}
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
              minHeight: 40,
            }}
            onClick={() => setAlert({ ...alert, isRedAlert: !alert.isRedAlert })}
          >
            {redAlert ? 'Disable Red Alert' : 'Red Alert'}
          </button>
      </FunControlPanel>
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
              background: '#fff',
              border: '2px solid #fff',
              color: '#222',
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
              boxShadow: '0 0 4px #fff',
              width: '100%',
              minHeight: 60,
            }}
            onClick={() => setEnhancedScreen(true)}
          >
            Enhance Screen
          </button>
                {enhancedScreen && (
                  <div
                    style={{
                      position: 'fixed',
                      top: 0,
                      left: 0,
                      width: '100vw',
                      height: '100vh',
                      background: 'rgba(0,0,0,0.92)',
                      zIndex: 2000,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <div
                      style={{
                        width: '92vw',
                        height: '92vh',
                        maxWidth: 1920,
                        maxHeight: 1080,
                        background: '#181828',
                        borderRadius: 24,
                        boxShadow: '0 0 64px #000a',
                        overflow: 'hidden',
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <button
                        style={{
                          position: 'absolute',
                          top: 18,
                          right: 18,
                          zIndex: 2100,
                          background: '#fff',
                          color: '#222',
                          border: '2px solid #fff',
                          borderRadius: 12,
                          fontWeight: 700,
                          fontSize: 18,
                          padding: '6px 18px',
                          cursor: 'pointer',
                          boxShadow: '0 0 4px #fff',
                        }}
                        onClick={() => setEnhancedScreen(false)}
                      >
                        Close
                      </button>
                      {/* Main viewscreen popup */}
                      <div style={{ width: '100%', height: '100%' }}>
                        <Viewscreen />
                      </div>
                    </div>
                  </div>
                )}
          {/* Red Alert button moved to FunControlPanel */}
        </div>
      </ControlPanel>
    </>
  );
}
