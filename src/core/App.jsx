
import { CanvasRoot } from './CanvasRoot';
import { Navbar } from '../ui/Navbar';

import { ControlPanel } from '../ui/ControlPanel';

export function App() {
  return (
    <>
      <Navbar />
      <CanvasRoot />
      <ControlPanel position="left">
        {/* Example left panel content */}
        <button style={{
          background: 'transparent',
          border: 'none',
          color: '#fff',
          fontWeight: 500,
          fontSize: 14,
          padding: '8px 16px',
          cursor: 'pointer',
          borderRadius: 20,
          transition: 'all 0.2s ease',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        }}>Left Panel</button>
      </ControlPanel>
      <ControlPanel position="right">
        {/* Example right panel content */}
        <button style={{
          background: 'transparent',
          border: 'none',
          color: '#fff',
          fontWeight: 500,
          fontSize: 14,
          padding: '8px 16px',
          cursor: 'pointer',
          borderRadius: 20,
          transition: 'all 0.2s ease',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        }}>Right Panel</button>
      </ControlPanel>
    </>
  );
}
