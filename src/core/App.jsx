
import React from 'react';
import { CanvasRoot } from './CanvasRoot';
import { Navbar } from '../ui/Navbar';
import { ControlPanel } from '../ui/ControlPanel';
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
      <ControlPanel position="left">
        <div
          style={{
            fontSize: 11,
            color: pendingTab !== currentTab ? '#fff' : '#666',
            marginBottom: 6,
            minHeight: 16,
            transition: 'color 0.2s',
            fontFamily: 'system-ui, sans-serif',
          }}
        >
          {pendingTab !== currentTab ? 'Course plotted' : 'Plot a course'}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flex: 1, minHeight: 0 }}>
          {['home', 'about', 'projects', 'contact'].map((route) => {
            const active = pendingTab === route;
            return (
              <button
                key={route}
                style={{
                  flex: 1,
                  minHeight: 44,
                  background: active ? '#fff' : 'transparent',
                  border: '1px solid #333',
                  color: active ? '#111' : '#fff',
                  fontWeight: 500,
                  fontSize: 13,
                  padding: '0 14px',
                  cursor: 'pointer',
                  fontFamily: 'system-ui, sans-serif',
                  outline: 'none',
                  margin: 0,
                  textAlign: 'left',
                  transition: 'background 0.15s, color 0.15s',
                }}
                onClick={() => setPendingTab(route)}
              >
                {route === 'home' ? 'Home' : route.charAt(0).toUpperCase() + route.slice(1)}
              </button>
            );
          })}
        </div>
      </ControlPanel>
      <ControlPanel position="right">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flex: 1, minHeight: 0 }}>
          <div
            style={{
              fontSize: 11,
              color: pendingTab !== currentTab ? '#fff' : '#666',
              minHeight: 16,
              transition: 'color 0.2s',
              fontFamily: 'system-ui, sans-serif',
            }}
          >
            {pendingTab !== currentTab ? 'Ready to engage' : 'Plot a course first'}
          </div>
          <button
            style={{
              flex: 1,
              minHeight: 80,
              background: pendingTab === currentTab ? '#333' : '#fff',
              border: '1px solid #333',
              color: pendingTab === currentTab ? '#666' : '#111',
              fontWeight: 500,
              fontSize: 14,
              padding: 0,
              cursor: pendingTab === currentTab ? 'not-allowed' : 'pointer',
              fontFamily: 'system-ui, sans-serif',
              outline: 'none',
              margin: 0,
              transition: 'background 0.15s, color 0.15s',
            }}
            disabled={pendingTab === currentTab}
            onClick={() => {
              if (pendingTab !== currentTab) {
                setSpeed('warp');
                setNavigation(pendingTab === 'home' ? 'home' : pendingTab);
              }
            }}
          >
            Engage
          </button>
          <div style={{ display: 'flex', gap: 8, flex: 1, minHeight: 60 }}>
            <button
              style={{
                flex: 1,
                border: '1px solid #333',
                background: redAlert ? '#fff' : 'transparent',
                color: redAlert ? '#111' : '#fff',
                fontWeight: 500,
                fontSize: 12,
                cursor: 'pointer',
                fontFamily: 'system-ui, sans-serif',
                outline: 'none',
                margin: 0,
                padding: 0,
                transition: 'background 0.15s, color 0.15s',
              }}
              onClick={() => setAlert({ ...alert, isRedAlert: !alert.isRedAlert })}
              title={redAlert ? 'Disable Red Alert' : 'Red Alert'}
            >
              Alert
            </button>
            <button
              style={{
                flex: 1,
                border: '1px solid #333',
                background: 'transparent',
                color: '#fff',
                fontWeight: 500,
                fontSize: 12,
                cursor: 'pointer',
                fontFamily: 'system-ui, sans-serif',
                outline: 'none',
                margin: 0,
                padding: 0,
                transition: 'background 0.15s, color 0.15s',
              }}
              onClick={() => setEnhancedScreen(true)}
            >
              Enhance
            </button>
          </div>
        </div>
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
                          color: '#111',
                          border: '1px solid #333',
                          fontWeight: 500,
                          fontSize: 13,
                          padding: '8px 18px',
                          cursor: 'pointer',
                          fontFamily: 'system-ui, sans-serif',
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
      </ControlPanel>
    </>
  );
}
