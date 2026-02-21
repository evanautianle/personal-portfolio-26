import React, { useState } from 'react';
import '../ui/ui-text.css';

const baseFont = '"Segoe UI", system-ui, -apple-system, BlinkMacSystemFont, Roboto, Ubuntu, "Helvetica Neue", sans-serif';

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
  { key: 'wdcc-uaic', title: 'WDCC — Web Development & Consulting Club', description: 'Built features for a full-stack site supporting registration, events, and online payments.', tech: 'React · Next.js · Tailwind CSS · Payload CMS · MongoDB', image: '/assets/images/project.png' },
  { key: 'comic-library', title: 'Comic Library', description: 'Public-domain Golden Age comic library and reader. Features favorites, ratings, comments, and user profiles.', tech: 'React · Vite · Tailwind CSS · Supabase', link: 'https://evanautianle.github.io/COMIC-READER/', image: '/assets/images/project0.png' },
  { key: 'book-of-fates', title: 'Book of Fates', description: 'A digital interactive 3D book. Explore a fully animated 3D environment with camera effects and controls.', tech: 'React · Three.js · @react-three/fiber · @react-three/drei · Tailwind · Vite · Jotai', link: 'https://evanautianle.github.io/3D-TEST-PROJECT-BOOK-OF-FATES/', image: '/assets/images/project3.png' },
  { key: 'crypto-critters', title: 'Crypto Critters', description: "A conservation-driven game where players use crypto as in-game currency to protect native wildlife.", tech: 'Figma · React · Next.js · Tailwind · Solidity', image: '/assets/images/project1.png' },
  { key: 'robin', title: 'Robin', description: 'An AI-powered rubbish detection system promoting correct waste disposal using real-time object recognition.', tech: 'TensorFlow · COCO-SSD · JavaScript · HTML · CSS', image: '/assets/images/project2.png' },
  { key: 'piggyquest', title: 'PiggyQuest', description: 'A gamified household task app for kids, helping parents encourage positive habits through rewards and challenges.', tech: 'React · Tailwind', image: '/assets/images/project4.png' },
  { key: 'findr', title: 'Findr', description: 'A planet-swiping web app themed around escaping Earth — Tinder, but for finding your next home planet.', tech: 'HTML · CSS · JavaScript', image: '/assets/images/project5.png' },
];
const divider = {
  borderTop: '1px solid #e5e5e5',
};

const container = {
  maxWidth: 1200,
  margin: '0 auto',
};

const card = {
  background: '#fff',
  border: '1px solid #e5e5e5',
  padding: 28,
  fontFamily: baseFont,
};

const cardDark = {
  background: '#000',
  border: '1px solid #222',
  padding: 28,
  fontFamily: baseFont,
};

const label = {
  fontSize: 20,
  letterSpacing: 1.5,
  textTransform: 'uppercase',
  color: '#333',
  marginBottom: 12,
};

const title = {
  fontSize: 28,
  margin: 0,
};

const body = {
  color: '#222',
  lineHeight: 1.75,
};

const bodyDark = {
  color: '#e5e5e5',
  lineHeight: 1.75,
};

const input = {
  width: '100%',
  padding: '10px 12px',
  borderRadius: 0,
  border: '1px solid #ddd',
  fontSize: 15,
  boxSizing: 'border-box',
};

const textarea = {
  ...input,
  minHeight: 120,
  resize: 'vertical',
};

const primaryButton = {
  background: '#000',
  color: '#fff',
  border: 'none',
  padding: '10px 16px',
  borderRadius: 0,
  cursor: 'pointer',
  fontSize: 15,
};

const secondaryButton = {
  background: 'transparent',
  color: '#111',
  border: '1px solid #ddd',
  padding: '10px 16px',
  borderRadius: 0,
  cursor: 'pointer',
  fontSize: 15,
};
export default function SimpleSite() {
  return (
    <div style={{ background: 'transparent', minHeight: '100vh', fontFamily: baseFont }}>
      {/* Hero (dark, full viewport height) */}
      <section
          id="home"
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
    <section id="about" style={{ ...sectionLight, borderTop: '1px solid #e5e5e5' }}>

  <div style={container}>

    <div style={{ ...label }}>Experience</div>

    <div style={{ marginTop: 32 }}>

      {/* item */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '200px 1fr',
        gap: 32,
        paddingBottom: 32,
        borderBottom: '1px solid #e5e5e5',
      }}>

        <div style={{ color: '#777', fontSize: 14 }}>
          2025 — Present
        </div>

        <div>

          <div style={{ ...title, fontWeight: 600 }}>
            WDCC — Full Stack Developer
          </div>

          <div style={{ color: '#777', marginTop: 6 }}>
            React · Next.js · Payload · MongoDB
          </div>

          <p style={{ ...body, marginTop: 12 }}>
            Built full-stack features supporting user registration,
            payments, and membership systems.
          </p>

        </div>

      </div>


      {/* second item */}

      <div style={{
        display: 'grid',
        gridTemplateColumns: '200px 1fr',
        gap: 32,
        paddingTop: 32,
      }}>

        <div style={{ color: '#777', fontSize: 14 }}>
          2023
        </div>

        <div>

          <div style={{ ...title, fontWeight: 600 }}>
            Feel Good Kicks — Frontend Developer
          </div>

          <p style={{ ...body, marginTop: 12 }}>
            Designed and built ecommerce UI and product interfaces.
          </p>

        </div>

      </div>

    </div>

  </div>

</section>
<section id="projects" style={{ ...sectionDark, borderTop: '1px solid #222' }}>

  <div style={container}>

    <div style={{ ...label, color: '#777' }}>
      Projects
    </div>

    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr',
      marginTop: 32,
    }}>

      {projects.map(p => (

        <div key={p.key}
          style={{
            ...cardDark,
            borderBottom: '1px solid #222',
            borderTop: 'none',
          }}
        >

          <div style={{
            display: 'grid',
            gridTemplateColumns: '180px 1fr',
            gap: 32,
          }}>

            {/* project image */}
            <div style={{ width: '100%', height: 100, overflow: 'hidden' }}>
              <img
                src={p.image || '/assets/images/project.png'}
                alt={p.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>

            {/* content */}
            <div>

              <h3 style={{ ...title, margin: 0 }}>
                {p.title}
              </h3>

              <div style={{
                color: '#777',
                fontSize: 14,
                marginTop: 6,
              }}>
                {p.tech}
              </div>

              <p style={{
                ...bodyDark,
                marginTop: 12,
              }}>
                {p.description}
              </p>

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
                    borderBottom: '1px solid #fff',
                    paddingBottom: 2,
                  }}
                >
                  View Project
                </a>
              )}

            </div>

          </div>

        </div>

      ))}

    </div>

  </div>

</section>
<section id="contact" style={{ ...sectionLight, borderTop: '1px solid #e5e5e5' }}>

    <div style={container}>

    <div style={label}>Contact</div>

    <h2 style={{ ...title, marginTop: 12 }}>
      Get in touch
    </h2>

    <div style={{ marginTop: 24 }}>

      <div style={{ display: 'grid', gap: 12, maxWidth: 720 }}>
        <ContactForm />

        <div style={{ marginTop: 8, color: '#777' }}>
          Or email directly: evan.au206@gmail.com
        </div>

        <div style={{ marginTop: 4, color: '#777' }}>
          Phone: (+64) 225388233 — Auckland, New Zealand
        </div>
      </div>

    </div>

  </div>

</section>

    </div>
  );
}

function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    // Compose mailto fallback (client will open default mail client)
    const to = 'evan.au206@gmail.com';
    const fullSubject = subject || `Message from ${name || 'website visitor'}`;
    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
    const mailto = `mailto:${to}?subject=${encodeURIComponent(fullSubject)}&body=${encodeURIComponent(body)}`;

    // Try to open mail client
    window.location.href = mailto;
    setStatus('opened');
  }

  function handleClear() {
    setName(''); setEmail(''); setSubject(''); setMessage(''); setStatus('');
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 12 }}>
      <input style={input} value={name} onChange={e => setName(e.target.value)} placeholder="Your name" required />
      <input style={input} value={email} onChange={e => setEmail(e.target.value)} placeholder="Your email" type="email" required />
      <input style={input} value={subject} onChange={e => setSubject(e.target.value)} placeholder="Subject" />
      <textarea style={textarea} value={message} onChange={e => setMessage(e.target.value)} placeholder="Message" required />

      <div style={{ display: 'flex', gap: 12 }}>
        <button type="submit" style={primaryButton}>Send Message</button>
        <button type="button" onClick={handleClear} style={secondaryButton}>Clear</button>
      </div>

      {status === 'opened' && (
        <div style={{ color: '#666', fontSize: 13 }}>
          Your mail client should open with a pre-filled message. To send automatically, I can set up a serverless endpoint or Formspree.
        </div>
      )}
    </form>
  );
}