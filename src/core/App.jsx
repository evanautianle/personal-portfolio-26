import React from 'react';
import { useDialogueStack } from './useDialogueStack';
import { DialogueBox } from '../components/crew/DialogueBox';
import { CanvasRoot } from './CanvasRoot';
import { Navbar } from '../ui/Navbar';
import { ControlPanel } from '../ui/ControlPanel';
import LeftControlPanel from '../ui/LeftControlPanel';
import RightControlPanel from '../ui/RightControlPanel';
import { Viewscreen } from '../viewscreen/Viewscreen';
import { useAtom, useSetAtom, useAtomValue } from 'jotai';
import { simpleViewAtom } from '../state/simpleViewAtom';
import SimpleSite from '../ui/SimpleSite';
import { heroSpeedAtom } from '../state/heroSpeedAtom';
import { navigationAtom } from '../state/navigationAtom';
import { alertAtom } from '../state/alertAtom';


import { useState, useRef } from 'react';



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
  const simpleView = useAtomValue(simpleViewAtom);
  const overlayRef = useRef(null);
  const [overlayShown, setOverlayShown] = useState(false);
  const hideOverlayTimer = useRef(null);

  React.useEffect(() => {
    // Always scroll to top when entering simple view
    if (simpleView && overlayRef.current) {
      try {
        overlayRef.current.scrollTop = 0;
      } catch (e) {
        // ignore
      }
    }

    // Manage overlay visibility: show immediately when entering simpleView;
    // when leaving, keep the black overlay visible briefly so the main app
    // can fade in without a white flash.
    if (simpleView) {
      if (hideOverlayTimer.current) {
        clearTimeout(hideOverlayTimer.current);
        hideOverlayTimer.current = null;
      }
      setOverlayShown(true);
    } else {
      // keep overlay for 300ms (matches main app fade) then hide
      if (hideOverlayTimer.current) clearTimeout(hideOverlayTimer.current);
      hideOverlayTimer.current = setTimeout(() => {
        setOverlayShown(false);
        hideOverlayTimer.current = null;
      }, 320);
    }

    return () => {
      if (hideOverlayTimer.current) {
        clearTimeout(hideOverlayTimer.current);
        hideOverlayTimer.current = null;
      }
    };
  }, [simpleView]);

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

      <div style={{ position: 'relative' }}>
        {/* SimpleSite overlay - fixed, fades in when simpleView is true. */}
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 900,
            background: '#000',
            transition: 'opacity 300ms ease, visibility 0s linear 300ms',
            opacity: simpleView ? 1 : 0,
            visibility: overlayShown ? 'visible' : 'hidden',
            pointerEvents: simpleView ? 'auto' : 'none',
            willChange: 'opacity',
            overflowY: 'auto',
            WebkitOverflowScrolling: 'touch',
          }}
          id="simplesite-overlay"
          ref={overlayRef}
        >
          {overlayShown ? <SimpleSite /> : null}
        </div>

        {/* Full interactive app - stays mounted but faded out when simpleView is true */}
        <div
          style={{
            position: 'relative',
            zIndex: 0,
            transition: 'opacity 300ms ease',
            opacity: simpleView ? 0 : 1,
            pointerEvents: simpleView ? 'none' : 'auto',
          }}
        >
          <CanvasRoot redAlert={redAlert} />
          {/* Stack dialogue boxes, newest at the bottom */}
          {!enhancedScreen && (
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
          )}
          <ControlPanel position="left">
            <LeftControlPanel
              routes={routes}
              cardIndex={cardIndex}
              setCardIndex={setCardIndex}
              pendingTab={pendingTab}
              currentTab={currentTab}
              plotCourse={plotCourse}
            />
          </ControlPanel>
          <ControlPanel position="right">
            <RightControlPanel
              pendingTab={pendingTab}
              currentTab={currentTab}
              setSpeed={setSpeed}
              setNavigation={setNavigation}
              setEnhancedScreen={setEnhancedScreen}
              enhancedScreen={enhancedScreen}
            />
          </ControlPanel>
        </div>
      </div>
    </>
  );
}
