import { CruiseStarfield } from '../CruiseStarfield';

export function About({ enhanced }) {
  if (enhanced) return <EnhancedAbout />;

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
        boxSizing: 'border-box',
      }}
    >
      <CruiseStarfield />
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 2,
          color: '#fff',
          textAlign: 'center',
          background: 'rgba(0,0,0,0.25)',
          padding: '48px 72px',
          border: '3px solid #fff',
          boxShadow: '0 10px 40px #0008',
          fontFamily: 'inherit',
          minWidth: 0,
          maxWidth: '100%',
          maxHeight: '100%',
          overflow: 'auto',
        }}
      >
        <span
          style={{
            fontSize: 96,
            fontWeight: 900,
            letterSpacing: 8,
            textTransform: 'uppercase',
            color: '#fff',
            display: 'block',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            lineHeight: 1.1,
          }}
        >
          Sector 2813 - About
        </span>
      </div>
    </div>
  );
}

function EnhancedAbout() {
  const sectionStyle = {
    border: '2px solid #fff',
    padding: 24,
    marginTop: 24,
    background: 'rgba(0,0,0,0.7)',
  };

  const headerStyle = {
    fontSize: 24,
    fontWeight: 700,
    margin: '0 0 12px 0',
    textTransform: 'uppercase',
    letterSpacing: 2,
  };

  const paragraphStyle = { fontSize: 16, margin: 0, lineHeight: 1.5 };

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: '#000',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontFamily: 'inherit',
        position: 'relative',
        overflow: 'hidden',
        boxSizing: 'border-box',
        paddingBottom: 64, // extra bottom padding
      }}
    >
      <CruiseStarfield />
      <div
        style={{
          position: 'relative',
          width: '100%',
          zIndex: 2,
          height: '100%',
          overflow: 'auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <header
          style={{
            width: '100%',
            // borderBottom removed
            padding: '24px 0',
            textAlign: 'center',
            letterSpacing: 6,
            background: 'rgba(0,0,0,0.7)',
          }}
        >
          <h1 style={{ fontSize: 48, fontWeight: 900, margin: 0, textTransform: 'uppercase' }}>
            About Me
          </h1>
        </header>

        <main
          style={{
            width: '100%',
            maxWidth: 800,
            margin: '32px auto 0 auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 24,
            flex: 1,
            paddingBottom: 64, // extra padding at bottom
          }}
        >
          {/* Introduction Section */}
          <section style={sectionStyle}>
            <h2 style={headerStyle}>About Me</h2>
            <p style={paragraphStyle}>
              Hello! I’m in my last year studying Computer Science at the University of Auckland. I’m passionate about crafting web applications that are intuitive and meaningful tools that make life easier.
            </p>
          </section>

          {/* Education Section */}
          <section style={sectionStyle}>
            <h2 style={headerStyle}>Education</h2>
            <ul style={{ fontSize: 16, margin: 0, paddingLeft: 20 }}>
              <li>
                <b>University of Auckland</b>
                <br />
                Bachelor of Science in Computer Science (2024–Present)
              </li>
            </ul>
          </section>

          {/* Skills Section */}
          <section style={sectionStyle}>
            <h2 style={headerStyle}>Skills</h2>
            <ul
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                gap: 10,
                listStyle: 'none',
                padding: 0,
                margin: 0,
                fontSize: 14,
              }}
            >
              <li>React</li>
              <li>Next.js</li>
              <li>Typescript</li>
              <li>Javascript</li>
              <li>Python</li>
              <li>Flask</li>
              <li>Tailwind CSS</li>
              <li>SupaBase</li>
              <li>Payload CMS</li>
              <li>Node.js</li>
              <li>Figma</li>
              <li>Solidity</li>
              <li>Tensorflow</li>
            </ul>
          </section>

          {/* Interests Section */}
          <section style={sectionStyle}>
            <h2 style={headerStyle}>Interests</h2>
            <p style={paragraphStyle}>
              I’m a big fan of coffee with my favourite technique being the V60. I collect Beatles records, Green Lantern comics, and Star Trek DVDs.
            </p>
          </section>
        </main>
      </div>
    </div>
  );
}
