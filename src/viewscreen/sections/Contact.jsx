import { CruiseStarfield } from '../CruiseStarfield';
export function Contact() {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        background: 'radial-gradient(ellipse at center, #181828 0%, #10101a 70%, #000 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <CruiseStarfield />
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          color: '#fff',
          textAlign: 'center',
          background: 'rgba(0,0,0,0.22)',
          borderRadius: 72,
          padding: '128px 192px',
          border: '10px solid #fff',
          boxShadow: '0 16px 128px #000a',
          fontFamily: 'inherit',
          minWidth: 1280,
          maxWidth: 1920,
          margin: '0 auto',
        }}
      >
        <span
          style={{
            fontSize: 104,
            fontWeight: 800,
            letterSpacing: 8,
            textTransform: 'uppercase',
            color: '#fff',
            display: 'block',
          }}
        >
          Sector 2813 - Contact
        </span>
      </div>
    </div>
  );
}
