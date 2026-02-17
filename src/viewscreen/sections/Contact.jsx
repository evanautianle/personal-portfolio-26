import { CruiseStarfield } from '../CruiseStarfield';
export function Contact() {
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
        width: '100%',
        height: '100%',
        padding: 24,
        overflow: 'auto',
      }}>
        <h2 style={{ fontSize: 22, marginBottom: 12, color: '#fff' }}>
          Contact
        </h2>
        <p style={{ fontSize: 14, lineHeight: 1.5, opacity: 0.9 }}>
          Add your email, social links, and contact form here.
        </p>
      </div>
    </div>
  );
}
