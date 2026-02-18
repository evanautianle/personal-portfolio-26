

import { ScreenRouter } from './ScreenRouter';

// Viewscreen overlays routed content (About, Projects, etc) on the bridge screen
export function Viewscreen() {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: 'linear-gradient(135deg, #222 60%, #888 100%)',
        color: '#fff',
        position: 'relative',
        borderRadius: 16,
        boxShadow: '0 0 32px #000a',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
        <ScreenRouter />
      </div>
    </div>
  );
}
