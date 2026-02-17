import { CruiseStarfield } from '../CruiseStarfield';

export function Home() {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      position: 'relative',
      overflow: 'hidden',
      background: 'radial-gradient(ellipse at center, #181828 0%, #10101a 70%, #000 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <CruiseStarfield />
      <div style={{
        position: 'relative',
        zIndex: 2,
        color: '#fff',
        fontSize: 96,
        fontWeight: 900,
        textShadow: '0 0 64px #00f8, 0 4px 0 #000a',
        letterSpacing: 4,
        textAlign: 'center',
        padding: 48,
        background: 'rgba(0,0,0,0.18)',
        borderRadius: 32,
      }}>
      </div>
    </div>
  );
}
