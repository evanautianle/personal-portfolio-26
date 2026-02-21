import React from 'react';
import '../ui/ui-text.css';

const baseFont = 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Ubuntu, "Helvetica Neue", sans-serif';

const sectionLight = {
  width: '100%',
  padding: '80px 5%',
  background: '#f9f9f9',
  color: '#111',
  fontFamily: baseFont,
  boxSizing: 'border-box',
};

const sectionDark = {
  width: '100%',
  padding: '80px 5%',
  background: '#0f0f0f',
  color: '#fff',
  fontFamily: baseFont,
  boxSizing: 'border-box',
};

const header = {
  margin: 0,
  textTransform: 'uppercase',
  letterSpacing: 2,
};

const lead = {
  marginTop: 16,
  lineHeight: 1.6,
};

const projects = [
  { key: 'wdcc-uaic', title: 'WDCC — Web Dev & Consulting Club', description: 'Built features for a full-stack site supporting registration, events, and payments.', tech: 'React · Next.js · Tailwind · Payload CMS' },
  { key: 'comic-library', title: 'Comic Library', description: 'Public-domain Golden Age comic library and reader.', tech: 'React · Vite · Tailwind · Supabase', link: 'https://evanautianle.github.io/COMIC-READER/' },
  { key: 'book-of-fates', title: 'Book of Fates', description: 'A digital interactive 3D book.', tech: 'React · Three.js · @react-three/fiber' },
  { key: 'crypto-critters', title: 'Crypto Critters', description: "A conservation-driven game using crypto as in-game currency.", tech: 'Solidity · React' },
];

export default function SimpleSite() {
  return (
    <div style={{ background: '#fff', minHeight: '100vh' }}>
      {/* Hero (dark, full viewport height) */}
      <section
        style={{
          width: '100%',
          height: '100vh',
          padding: '0 5%',
          background: '#000',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          gap: 40,
          flexWrap: 'wrap',
          boxSizing: 'border-box',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ flex: '1 1 520px', maxWidth: 680, zIndex: 2 }}>
          <h1 style={{ ...header, fontSize: 72, lineHeight: 1.02, marginBottom: 8 }}>Evan Au</h1>
          <p style={{ ...lead, fontSize: 22, margin: '12px 0 0 0', color: '#d0d0d0' }}>Full Stack Developer & Designer</p>
          <p style={{ marginTop: 16, color: '#bdbdbd', lineHeight: 1.6, maxWidth: 560 }}>
            I build modern web experiences and intuitive tools that make life easier. Passionate about hackathons, UX, and minimal design.
          </p>
        </div>

        <div
          style={{
            position: 'absolute',
            right: '18%',
            top: '52%',
            transform: 'translateY(-50%)',
            width: '46vw',
            maxWidth: 900,
            minWidth: 300,
            zIndex: 1,
            pointerEvents: 'none',
          }}
        >
          <img
            src="/assets/images/transparentevan.png"
            alt="Evan Au"
            style={{
              width: '100%',
              borderRadius: 12,
              boxShadow: '0 80px 200px rgba(0,0,0,0.85)',
              objectFit: 'cover',
              display: 'block',
            }}
          />
        </div>
      </section>

      {/* About */}
      <section style={sectionLight}>
        <h2 style={{ ...header, fontSize: 28, marginBottom: 16 }}>About Me</h2>
        <p style={{ ...lead, fontSize: 18 }}>
          Third-year Computer Science student at the University of Auckland. Focused on creating practical, well-designed web apps that people enjoy using.
        </p>
      </section>

      {/* Projects */}
      <section style={sectionDark}>
        <h2 style={{ ...header, fontSize: 28, marginBottom: 24 }}>Projects</h2>
        <div style={{ display: 'grid', gap: 32, gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
          {projects.map((p) => (
            <div
              key={p.key}
              style={{
                background: '#161616',
                padding: 24,
                borderRadius: 12,
                transition: 'transform 0.3s, box-shadow 0.3s',
                cursor: 'pointer',
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-6px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <h3 style={{ margin: 0 }}>{p.title}</h3>
              <p style={{ margin: '12px 0', color: '#cfcfcf', lineHeight: 1.5 }}>{p.description}</p>
              <p style={{ margin: 0, fontSize: 12, color: '#9a9a9a' }}>{p.tech}</p>
              {p.link && (
                <a
                  href={p.link}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: 'inline-block',
                    marginTop: 12,
                    color: '#fff',
                    textDecoration: 'none',
                    fontWeight: 600,
                  }}
                >
                  View ↗
                </a>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section style={sectionLight}>
        <h2 style={{ ...header, fontSize: 28, marginBottom: 16 }}>Contact</h2>
        <p style={{ ...lead, fontSize: 18 }}>Let's work together or just say hi!</p>
        <a
          href="mailto:evan.au206@gmail.com"
          style={{ fontWeight: 600, color: '#111', textDecoration: 'none', fontSize: 16 }}
        >
          evan.au206@gmail.com
        </a>
      </section>
    </div>
  );
}