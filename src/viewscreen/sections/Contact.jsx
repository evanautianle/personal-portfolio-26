import { CruiseStarfield } from '../CruiseStarfield';
export function Contact({ enhanced }) {
  if (enhanced) {
    return <EnhancedContact />;
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
          Sector 1517 - Contact
        </span>
      </div>
    </div>
  );
}

function EnhancedContact() {
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
        }}
      >
        <div
          style={{
            width: '100%',
            minHeight: '100vh',
            background: '#111',
            color: '#fff',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            padding: '64px 0 0 0',
          }}
        >
          <h1
            style={{
              fontSize: 72,
              fontWeight: 900,
              letterSpacing: 4,
              color: '#fff',
              marginBottom: 32,
              borderBottom: '3px solid #fff',
              paddingBottom: 16,
              width: '90%',
              maxWidth: 1200,
              textAlign: 'left',
            }}
          >
            Sector 1517 - Contact
          </h1>
          <div
            style={{
              fontSize: 22,
              fontWeight: 400,
              maxWidth: 900,
              lineHeight: 1.7,
              color: '#fff',
              background: '#000',
              borderRadius: 16,
              padding: '32px 40px',
              border: '1.5px solid #fff',
              boxShadow: '0 2px 16px #0008',
            }}
          >
            <h2 style={{ fontSize: 32, margin: '0 0 24px 0', color: '#fff' }}>Get in Touch</h2>
            <p>
              Interested in working together, have a question, or just want to say hi? I'd love to hear from you!
            </p>
            <p>
              <strong>Email:</strong> <a href="mailto:evan@email.com" style={{ color: '#fff', textDecoration: 'underline' }}>evan@email.com</a><br />
              <strong>GitHub:</strong> <a href="https://github.com/evanautianle" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'underline' }}>evanautianle</a><br />
              <strong>LinkedIn:</strong> <a href="https://linkedin.com/in/evanautianle" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'underline' }}>evanautianle</a>
            </p>
            <p>
              I typically respond within 24 hours. Looking forward to connecting!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
