
import { CanvasRoot } from './CanvasRoot';
import { Navbar } from '../ui/Navbar';

import { ControlPanel } from '../ui/ControlPanel';
import { useAtom, useSetAtom, useAtomValue } from 'jotai';
import { heroSpeedAtom } from '../state/heroSpeedAtom';
import { navigationAtom } from '../state/navigationAtom';
import { redAlertAtom } from '../state/redAlertAtom';

export function App() {
  const [speed, setSpeed] = useAtom(heroSpeedAtom);
  const [currentTab, setNavigation] = useAtom(navigationAtom);
  const [redAlert, setRedAlert] = useAtom(redAlertAtom);
  return (
    <>
      <Navbar />
      <CanvasRoot redAlert={redAlert} />
      <ControlPanel position="left">
        {/* Left panel content can go here */}
      </ControlPanel>
      <ControlPanel position="right">
        <button
          style={{
            background: '#fff',
            border: '2px solid #fff',
            color: '#111',
            fontWeight: 600,
            fontSize: 16,
            padding: '12px 28px',
            cursor: 'pointer',
            borderRadius: 24,
            transition: 'all 0.2s',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            outline: 'none',
            margin: 8,
          }}
          onClick={() => {
            setSpeed(speed === 'warp' ? 'cruise' : 'warp');
            if (currentTab !== 'hero') setNavigation('hero');
          }}
        >
          {speed === 'warp' ? 'Cruise Mode' : 'Engage Warp!'}
        </button>
        <button
          style={{
            background: redAlert ? '#c00' : '#fff',
            border: '2px solid #c00',
            color: redAlert ? '#fff' : '#c00',
            fontWeight: 700,
            fontSize: 16,
            padding: '12px 28px',
            cursor: 'pointer',
            borderRadius: 24,
            transition: 'all 0.2s',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            outline: 'none',
            margin: 8,
            marginTop: 0,
          }}
          onClick={() => setRedAlert(!redAlert)}
        >
          {redAlert ? 'Disable Red Alert' : 'Red Alert'}
        </button>
      </ControlPanel>
    </>
  );
}
