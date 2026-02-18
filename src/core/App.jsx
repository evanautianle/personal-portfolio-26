// Dialogue box styled like the provided reference
function DialogueBox({ text, speaker = "CAPTAIN", imageUrl, style }) {
  if (!text) return null;
  return (
    <div style={{
      background: '#222',
      color: '#fff',
      borderRadius: 0,
      boxShadow: '0 2px 16px #000a',
      minWidth: 210,
      maxWidth: '60vw',
      display: 'flex',
      alignItems: 'stretch',
      overflow: 'visible',
      ...style,
    }}>
      {/* Character image */}
      <div style={{
        width: 60,
        height: 60,
        background: '#111',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        borderRight: '1px solid #181818',
        flexShrink: 0,
      }}>
        {imageUrl ? (
          <img src={imageUrl} alt={speaker} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <span style={{ color: '#888', fontSize: 48 }}>👤</span>
        )}
        {/* Name tab above image */}
        <div style={{
          position: 'absolute',
          top: -18,
          left: 0,
          width: '100%',
          background: '#181818',
          color: '#fff',
          fontWeight: 700,
          fontSize: 10,
          letterSpacing: 0.5,
          padding: '2px 0',
          textAlign: 'center',
          borderTopLeftRadius: 3,
          borderTopRightRadius: 3,
          borderBottom: '1px solid #222',
        }}>{speaker}</div>
      </div>
      {/* Dialogue text */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        padding: '0 18px',
        minHeight: 60,
        fontSize: 19,
        fontWeight: 400,
        background: '#222',
        whiteSpace: 'pre-line',
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
      }}>
        {text}
      </div>
    </div>
  );
}

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
  // Dialogue stack: array of {id, text, speaker, imageUrl}
  const [dialogueStack, setDialogueStack] = React.useState([]);
  // Optionally, you could set a real image URL here
  const captainImage = undefined; // e.g. '/assets/crew/captain.png'
  const helmImage = undefined; // e.g. '/assets/crew/helm.png'

  // Listen for captain-speech events and stack dialogues (captain and helmsman)
  React.useEffect(() => {
    function handleSpeechEvent(e) {
      if (!e.detail || !e.detail.type) return;
      let captainText = "";
      let helmText = "";
      let captainTimeout = 2500;
      let helmTimeout = 2500;
      if (e.detail.type === "plot-course") {
        captainText = "Helm, lay in a course for sector " + (e.detail.sector || "2813") + ".";
        helmText = "Aye Captain, course plotted.";
        captainTimeout = 2500;
        helmTimeout = 2500;
      } else if (e.detail.type === "engage") {
        captainText = "Engage.";
        helmText = "Going to warp.";
        captainTimeout = 2000;
        helmTimeout = 2000;
      }
      if (captainText) {
        const id = Date.now() + Math.random();
        setDialogueStack(prev => [...prev, { id, text: captainText, speaker: "CAPTAIN", imageUrl: captainImage }]);
        setTimeout(() => {
          setDialogueStack(prev => prev.filter(d => d.id !== id));
        }, captainTimeout);
      }
      if (helmText) {
        const id = Date.now() + Math.random();
        setTimeout(() => {
          setDialogueStack(prev => [...prev, { id, text: helmText, speaker: "HELMSMAN", imageUrl: helmImage }]);
          setTimeout(() => {
            setDialogueStack(prev => prev.filter(d => d.id !== id));
          }, helmTimeout);
        }, 400); // Helmsman responds shortly after captain
      }
    }
    window.addEventListener("captain-speech", handleSpeechEvent);
    return () => window.removeEventListener("captain-speech", handleSpeechEvent);
  }, []);

  // When currentTab changes externally, update pendingTab
  React.useEffect(() => {
    setPendingTab(currentTab);
  }, [currentTab]);

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
        {[...dialogueStack].reverse().map((d) => (
          <DialogueBox key={d.id} text={d.text} speaker={d.speaker} imageUrl={d.imageUrl} />
        ))}
      </div>
      <ControlPanel position="left">
        <div
          style={{
            fontSize: 11,
            color: pendingTab !== currentTab ? '#fff' : '#666',
            marginBottom: 15,
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
                onClick={() => {
                  setPendingTab(route);
                  window.dispatchEvent(new CustomEvent("captain-speech", { detail: { type: "plot-course", sector: route } }));
                }}
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
                window.dispatchEvent(new CustomEvent("captain-speech", { detail: { type: "engage" } }));
                setTimeout(() => {
                  setSpeed('warp');
                  setNavigation(pendingTab === 'home' ? 'home' : pendingTab);
                }, 1100); // Delay to allow helmsman dialogue first
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
