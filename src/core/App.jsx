
import { CanvasRoot } from './CanvasRoot';
import { Navbar } from '../ui/Navbar';

import { ControlPanel } from '../ui/ControlPanel';
import { useAtom, useSetAtom, useAtomValue } from 'jotai';
import { heroSpeedAtom } from '../state/heroSpeedAtom';

export function App() {
  const [speed, setSpeed] = useAtom(heroSpeedAtom);
  return (
    <>
      <Navbar />
      <CanvasRoot />
      <ControlPanel position="left">
        {/* Left panel content can go here */}
      </ControlPanel>
      <ControlPanel position="right">
        <button
          style={{
            background: speed === 'warp' ? '#e87d2f' : 'transparent',
            border: '2px solid #e87d2f',
            color: '#fff',
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
          onClick={() => setSpeed(speed === 'warp' ? 'cruise' : 'warp')}
        >
          {speed === 'warp' ? 'Cruise Mode' : 'Engage Warp!'}
        </button>
      </ControlPanel>
    </>
  );
}
