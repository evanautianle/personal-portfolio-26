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
    </>
  );
}
