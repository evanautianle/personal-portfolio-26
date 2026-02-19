import React from 'react';
import { useDialogueStack } from './useDialogueStack';
import { DialogueBox } from '../components/DialogueBox';
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
  const plotCourse = () => {
  const selectedRoute = routes[cardIndex];

  if (selectedRoute !== currentTab) {
    setPendingTab(selectedRoute);

    window.dispatchEvent(
      new CustomEvent("captain-speech", {
        detail: { type: "plot-course", sector: selectedRoute },
      })
    );
  }
};

  const [enhancedScreen, setEnhancedScreen] = useState(false);
  const [speed, setSpeed] = useAtom(heroSpeedAtom);
  const [currentTab, setNavigation] = useAtom(navigationAtom);
  const [alert, setAlert] = useAtom(alertAtom);
  const redAlert = alert.isRedAlert;
  const [pendingTab, setPendingTab] = useState(currentTab);
  // Card slider state for left panel
  const routes = ['home', 'about', 'projects', 'contact'];
  const [cardIndex, setCardIndex] = useState(() => routes.indexOf(currentTab));
  // Optionally, you could set a real image URL here
  const captainImage = undefined; // e.g. '/assets/crew/captain.png'
  const helmImage = undefined; // e.g. '/assets/crew/helm.png'
  const [dialogueStack, setDialogueStack] = useDialogueStack(captainImage, helmImage);

  // When currentTab changes externally, update pendingTab and cardIndex
  React.useEffect(() => {
    setPendingTab(currentTab);
    setCardIndex(routes.indexOf(currentTab));
  }, [currentTab]);

  // When pendingTab changes, update cardIndex if needed
  React.useEffect(() => {
    const idx = routes.indexOf(pendingTab);
    if (idx !== cardIndex) setCardIndex(idx);
  }, [pendingTab]);

  // Dispatch event when pendingTab changes (for SecondaryScreen)
  React.useEffect(() => {
    window.dispatchEvent(new CustomEvent('pendingTabChange', { detail: pendingTab }));
  }, [pendingTab]);

const arrowStyle = {
  background: 'transparent',
  border: '1px solid #fff',
  color: '#fff',
};

  return (
    <>
      <Navbar />
      <CanvasRoot redAlert={redAlert} />
      {/* Stack dialogue boxes, newest at the bottom */}
      <div style={{
        position: 'fixed',
        left: '40%',
        bottom: 48,
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column-reverse',
        gap: 12,
        zIndex: 2000,
        pointerEvents: 'none',
        width: 480,
        maxWidth: '80vw',
        alignItems: 'flex-start',
      }}>
        {[...dialogueStack].reverse().slice(0, 2).map((d) => (
          <DialogueBox key={d.id} text={d.text} speaker={d.speaker} imageUrl={d.imageUrl} />
        ))}
      </div>
      <ControlPanel position="left">
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            boxSizing: 'border-box',
          }}
        >
          {/* STATUS */}
          <div
            style={{
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: 2,
              marginBottom: 10,
              textAlign: 'center',
              textTransform: 'uppercase',
              color: pendingTab !== currentTab ? '#fff' : '#555',
              transition: 'all 0.25s ease',
              width: '100%',
            }}
          >
            {pendingTab !== currentTab
              ? `COURSE PLOTTED: ${pendingTab.toUpperCase()}`
              : 'PLOT A COURSE'}
          </div>
          {/* SLIDER RAIL */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: 260,
              height: 140,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
            }}
          >
            {routes.map((route, i) => {
              const offset = i - cardIndex;
              const isCentered = i === cardIndex;
              const isSelected = route === pendingTab && pendingTab !== currentTab;
              return (
                <div
                  key={route}
                  onClick={() => setCardIndex(i)}
                  style={{
                    position: 'absolute',
                    width: isCentered ? 140 : 100,
                    height: isCentered ? 100 : 80,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: isCentered ? 18 : 14,
                    fontWeight: 600,
                    letterSpacing: 2,
                    cursor: 'pointer',
                    transition: 'all 0.35s ease',
                    transform: `translateX(${offset * 80}px) scale(${isCentered ? 1 : 0.85})`,
                    background: isSelected ? '#fff' : '#000',
                    color: isSelected ? '#000' : '#fff',
                    border: isCentered ? '1px solid #fff' : '1px solid #444',
                    opacity: Math.abs(offset) > 1 ? 0 : 1,
                    zIndex: isCentered ? 2 : 1,
                    textTransform: 'uppercase',
                  }}
                >
                  {route.toUpperCase()}
                </div>
              );
            })}
          </div>
          {/* INDICATORS */}
          <div
            style={{
              marginTop: 16,
              display: 'flex',
              gap: 6,
            }}
          >
            {routes.map((_, i) => (
              <div
                key={i}
                style={{
                  width: i === cardIndex ? 22 : 10,
                  height: 2,
                  background: i === cardIndex ? '#fff' : '#333',
                  transition: 'all 0.25s ease',
                }}
              />
            ))}
          </div>
          {/* SELECT BUTTON */}
          <button
            onClick={plotCourse}
            disabled={routes[cardIndex] === currentTab}
            style={{
              marginTop: 24,
              width: '100%',
              height: 42,
              border: '1px solid #fff',
              background:
                routes[cardIndex] === currentTab ? '#111' : '#fff',
              color:
                routes[cardIndex] === currentTab ? '#555' : '#000',
              fontWeight: 600,
              letterSpacing: 2,
              fontSize: 12,
              cursor:
                routes[cardIndex] === currentTab
                  ? 'not-allowed'
                  : 'pointer',
              textTransform: 'uppercase',
              transition: 'all 0.2s ease',
            }}
          >
            {routes[cardIndex] === currentTab
              ? 'CURRENT DESTINATION'
              : 'SELECT COURSE'}
          </button>
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
              padding: 0
            }}
          >
            {pendingTab !== currentTab ? 'READY TO ENGAGE' : 'PLOT A COURSE FIRST'}
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
              textTransform: 'uppercase',
            }}
            disabled={pendingTab === currentTab}
            onClick={() => {
              if (pendingTab !== currentTab) {
                window.dispatchEvent(new CustomEvent("captain-speech", { detail: { type: "engage" } }));
                setTimeout(() => {
                  setSpeed('warp');
                  setNavigation(pendingTab === 'home' ? 'home' : pendingTab);
                }, 1100); // Delay to allow helmsman dialogue first
              }
            }}
          >
            ENGAGE
          </button>
          <div style={{ display: 'flex', gap: 8, flex: 1, minHeight: 60 }}>

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
                textTransform: 'uppercase',
              }}
              onClick={() => setEnhancedScreen(true)}
            >
              ENHANCE
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
                CLOSE
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
