
import { CruiseStarfield } from '../CruiseStarfield';

export function Home({ enhanced }) {
  if (enhanced) {
    return <EnhancedHome />;
  }
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        background: 'radial-gradient(ellipse at center, #222 0%, #000 80%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <CruiseStarfield />
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: 140,
          transform: 'translateX(-50%)',
          zIndex: 2,
          color: '#fff',
          textAlign: 'center',
          background: 'rgba(0,0,0,0.22)',
          padding: '64px 96px',
          border: '4px solid #fff',
          boxShadow: '0 12px 64px #000a',
          fontFamily: 'inherit',
          minWidth: 'unset',
          maxWidth: 'none',
        }}
      >
        <span
          style={{
            fontSize: 120,
            fontWeight: 900,
            letterSpacing: 10,
            textTransform: 'uppercase',
            color: '#fff',
            display: 'block',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            lineHeight: 1.1,
          }}
        >
          Sector 2814 - Home
        </span>
      </div>
    </div>
  );
}

function EnhancedHome() {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        background: 'radial-gradient(ellipse at center, #222 0%, #000 80%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <CruiseStarfield />
      <div
        style={{
          position: 'absolute',
          left: 64,
          top: 64,
          zIndex: 2,
          color: '#fff',
          textAlign: 'left',
          background: 'rgba(0,0,0,0.22)',
          /* borderRadius removed for sharp corners */
          padding: '48px 72px',
          border: '4px solid #fff',
          boxShadow: '0 12px 64px #000a',
          fontFamily: 'inherit',
          minWidth: 'unset',
          maxWidth: 'none',
          width: 'calc(100% - 128px)',
        }}
      >
        <span
          style={{
            fontSize: 80,
            fontWeight: 800,
            letterSpacing: 6,
            textTransform: 'uppercase',
            color: '#fff',
            display: 'block',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            lineHeight: 1.1,
          }}
        >
          Sector 2814 - Home
        </span>
      </div>
    </div>
  );
}
