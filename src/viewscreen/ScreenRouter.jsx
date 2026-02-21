import { useAtomValue } from 'jotai';
import { useEffect, useRef, useState } from 'react';
import { navigationAtom } from '../state/navigationAtom';
import { Home } from './sections/Home';
import { About } from './sections/About';
import { Projects } from './sections/Projects';
import { Contact } from './sections/Contact';
import { WarpTransition } from './WarpTransition';


export function ScreenRouter({ enhanced }) {
  const route = useAtomValue(navigationAtom);
  const [showWarp, setShowWarp] = useState(false);
  const [pendingRoute, setPendingRoute] = useState(route);
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  // Force rerender on window resize
  useEffect(() => {
    function handleResize() {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Track route changes
  useEffect(() => {
    if (route !== pendingRoute) {
      setShowWarp(true);
      setTimeout(() => {
        setShowWarp(false);
        setPendingRoute(route);
      }, 1200); // match WarpTransition duration
    }
  }, [route, pendingRoute]);

  let SectionComponent;
  switch (pendingRoute) {
    case 'about':
      SectionComponent = About;
      break;
    case 'projects':
      SectionComponent = Projects;
      break;
    case 'contact':
      SectionComponent = Contact;
      break;
    case 'home':
    default:
      SectionComponent = Home;
      break;
  }

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'auto',
      }}
    >
      {showWarp && <WarpTransition />}
      {!showWarp && <SectionComponent enhanced={enhanced} />}
    </div>
  );
}
