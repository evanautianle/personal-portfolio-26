
import { CanvasRoot } from './CanvasRoot';
import { Navbar } from '../ui/Navbar';

import { ControlPanel } from '../ui/ControlPanel';
import { useAtom, useSetAtom, useAtomValue } from 'jotai';
import { heroSpeedAtom } from '../state/heroSpeedAtom';
import { navigationAtom } from '../state/navigationAtom';
import { alertAtom } from '../state/alertAtom';

export function App() {
  const [speed, setSpeed] = useAtom(heroSpeedAtom);
  const [currentTab, setNavigation] = useAtom(navigationAtom);
  const [alert, setAlert] = useAtom(alertAtom);
  const redAlert = alert.isRedAlert;
  return (
    <>
      <Navbar />
      <CanvasRoot redAlert={redAlert} />
      <ControlPanel position="left">
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {['hero', 'about', 'projects', 'contact'].map((route) => (
            <button
              key={route}
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
                margin: 0,
                boxShadow: currentTab === route ? '0 0 12px #e87d2f' : 'none',
              }}
              onClick={() => setNavigation(route)}
            >
              {route.charAt(0).toUpperCase() + route.slice(1)}
            </button>
          ))}
        </div>
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
          onClick={() => setAlert({ ...alert, isRedAlert: !alert.isRedAlert })}
        >
          {redAlert ? 'Disable Red Alert' : 'Red Alert'}
        </button>
      </ControlPanel>
    </>
  );
}
