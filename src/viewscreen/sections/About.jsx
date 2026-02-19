import { CruiseStarfield } from '../CruiseStarfield';
export function About({ enhanced }) {
  if (enhanced) {
    return <EnhancedAbout />;
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
          background: 'rgba(0,0,0,0.22)',
          padding: '64px 96px',
          border: '4px solid #fff',
          boxShadow: '0 12px 64px #000a',
          fontFamily: 'inherit',
          minWidth: 0,
          maxWidth: '100%',
          maxHeight: '100%',
          overflow: 'auto',
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
          Sector 2813 - About
        </span>
      </div>
    </div>
  );
}

function EnhancedAbout() {
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
      }}
    >
      <CruiseStarfield />
      <div style={{ position: 'relative', width: '100%', zIndex: 2, height: '100%', overflow: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <header style={{ width: '100%', borderBottom: '2px solid #fff', padding: '32px 0', textAlign: 'center', letterSpacing: 8, background: 'rgba(0,0,0,0.7)' }}>
          <h1 style={{ fontSize: 56, fontWeight: 900, margin: 0, textTransform: 'uppercase' }}>About Me</h1>
        </header>
        <main style={{ width: '100%', maxWidth: 900, margin: '40px auto 0 auto', display: 'flex', flexDirection: 'column', gap: 32, flex: 1 }}>
          {/* Introduction Section */}
          <section style={{ border: '2px solid #fff', padding: 32, marginBottom: 0, background: 'rgba(0,0,0,0.7)' }}>
            <h2 style={{ fontSize: 28, fontWeight: 700, margin: '0 0 16px 0', textTransform: 'uppercase', letterSpacing: 2 }}>Introduction</h2>
            <p style={{ fontSize: 20, margin: 0 }}>
              {/* TODO: Add 3–5 sentence intro about yourself, degree, year, interests, fun fact */}
              Hi, I'm [Your Name], a [Year] student at [University] pursuing a degree in [Degree]. I'm passionate about [Interests]. Fun fact: [Something fun about you!]
            </p>
          </section>
          {/* Education & Experience Section */}
          <section style={{ border: '2px solid #fff', padding: 32, background: 'rgba(0,0,0,0.7)' }}>
            <h2 style={{ fontSize: 28, fontWeight: 700, margin: '0 0 16px 0', textTransform: 'uppercase', letterSpacing: 2 }}>Education & Experience</h2>
            <ul style={{ fontSize: 20, margin: 0, paddingLeft: 24 }}>
              <li>University: [Your University], [Degree], Expected Graduation: [Year]</li>
              <li>Internship: [Company/Role] (Year)</li>
              <li>Notable Coursework: [Course 1], [Course 2]</li>
            </ul>
          </section>
          {/* Skills Section */}
          <section style={{ border: '2px solid #fff', padding: 32, background: 'rgba(0,0,0,0.7)' }}>
            <h2 style={{ fontSize: 28, fontWeight: 700, margin: '0 0 16px 0', textTransform: 'uppercase', letterSpacing: 2 }}>Skills</h2>
            <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 12, listStyle: 'none', padding: 0, margin: 0, fontSize: 18 }}>
              <li>JavaScript</li>
              <li>React</li>
              <li>Python</li>
              <li>Node.js</li>
              <li>HTML/CSS</li>
              <li>Git</li>
              {/* Add more skills as needed */}
            </ul>
          </section>
          {/* Interests / Goals Section */}
          <section style={{ border: '2px solid #fff', padding: 32, background: 'rgba(0,0,0,0.7)' }}>
            <h2 style={{ fontSize: 28, fontWeight: 700, margin: '0 0 16px 0', textTransform: 'uppercase', letterSpacing: 2 }}>Interests & Goals</h2>
            <p style={{ fontSize: 20, margin: 0 }}>
              {/* TODO: Add a short paragraph about your tech interests and professional aspirations */}
              I'm interested in [Tech Interests] and aspire to [Professional Goals].
            </p>
          </section>
          {/* Optional Personal Touch Section */}
          <section style={{ border: '2px solid #fff', padding: 32, background: 'rgba(0,0,0,0.7)' }}>
            <h2 style={{ fontSize: 28, fontWeight: 700, margin: '0 0 16px 0', textTransform: 'uppercase', letterSpacing: 2 }}>Personal</h2>
            <p style={{ fontSize: 20, margin: 0 }}>
              {/* TODO: Add hobbies, passions, or a memorable fact */}
              Outside of tech, I enjoy [Hobbies/Passions].
            </p>
          </section>
          {/* CTA Section */}
          <section style={{ border: '2px solid #fff', padding: 32, textAlign: 'center', background: 'rgba(0,0,0,0.7)' }}>
            <a href="#/projects" style={{ color: '#fff', fontWeight: 700, fontSize: 22, textDecoration: 'underline', border: '2px solid #fff', padding: '12px 32px', display: 'inline-block', textTransform: 'uppercase', letterSpacing: 2 }}>View My Projects</a>
          </section>
        </main>
      </div>
    </div>
  );
}
