import React, { useState, useEffect } from 'react';
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

const photos = [
  '/assets/images/photo1.jpeg',
  '/assets/images/photo2.jpeg',
  '/assets/images/photo3.jpeg',
  '/assets/images/photo4.jpeg',
  '/assets/images/photo5.jpeg',
  '/assets/images/photo6.jpeg',
  '/assets/images/photo7.jpeg',
  '/assets/images/photo8.jpeg',
  '/assets/images/photo9.jpeg',
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
  const [isMobile, setIsMobile] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 680px)');
    const handler = (e) => setIsMobile(e.matches);
    try {
      setIsMobile(mq.matches);
      mq.addEventListener('change', handler);
    } catch (e) {
      // fallback for older browsers
      mq.addListener(handler);
    }
    return () => {
      try { mq.removeEventListener('change', handler); } catch (e) { mq.removeListener(handler); }
    };
  }, []);

  const heroStyle = {
    width: '100%',
    height: isMobile ? 'auto' : 'calc(100vh - var(--navbar-height))',
    padding: isMobile ? '40px 5%' : '0 5%',
    background: '#000',
    color: '#fff',
    display: 'flex',
    alignItems: isMobile ? 'stretch' : 'center',
    justifyContent: isMobile ? 'space-between' : 'flex-start',
    gap: 24,
    flexWrap: 'wrap',
    boxSizing: 'border-box',
    position: 'relative',
    overflow: 'hidden',
    flexDirection: isMobile ? 'column' : 'row',
  };

  const textContainerStyle = { flex: isMobile ? '1 1 100%' : '1 1 520px', maxWidth: isMobile ? '100%' : 680, zIndex: 2 };
  const imageStyle = {
    position: isMobile ? 'relative' : 'absolute',
    right: isMobile ? 'auto' : '18%',
    top: isMobile ? 'auto' : '52%',
    transform: isMobile ? 'none' : 'translateY(-50%)',
    width: isMobile ? '100%' : '46vw',
    maxWidth: isMobile ? '100%' : 900,
    minWidth: isMobile ? 0 : 300,
    zIndex: 1,
    pointerEvents: 'none',
    order: isMobile ? 2 : 0,
    marginTop: isMobile ? 0 : 0,
    alignSelf: isMobile ? 'stretch' : 'auto',
    maxHeight: isMobile ? '55vh' : undefined,
    height: isMobile ? '55vh' : undefined,
  };

  const fadeStyle = {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: isMobile ? '45%' : '32%',
    pointerEvents: 'none',
    zIndex: 3,
    background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%)',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  };

  const headingSize = isMobile ? 40 : 72;

  return (
    <div style={{ background: 'transparent', minHeight: '100vh', fontFamily: baseFont, paddingTop: isMobile ? 'calc(var(--navbar-height) + 12px)' : 'calc(var(--navbar-height) + 24px)' }}>
      {/* Hero (dark, full viewport height) */}
      <section
          id="home"
          style={heroStyle}
      >
        <div style={textContainerStyle}>
          <h1 style={{ ...header, fontSize: headingSize, lineHeight: 1.02, marginBottom: 8 }}>Evan Au</h1>
          <p style={{ ...lead, fontSize: 22, margin: '12px 0 0 0', color: '#d0d0d0' }}>Full Stack Developer & Designer</p>
          <p style={{ marginTop: 16, color: '#bdbdbd', lineHeight: 1.6, maxWidth: 560 }}>
            I build modern web experiences and intuitive tools that make life easier. Passionate about hackathons, UX, and minimal design.
          </p>
        </div>

        <div style={imageStyle}>
          <img
            src="/assets/images/transparentevan.png"
            alt="Evan Au"
            style={{
              width: '100%',
              height: isMobile ? '100%' : 'auto',
              borderRadius: 12,
              boxShadow: '0 80px 200px rgba(0,0,0,0.85)',
              objectFit: 'cover',
              objectPosition: 'bottom center',
              display: 'block',
            }}
          />
          <div style={fadeStyle} />
        </div>
      </section>
    <section id="about" style={{ ...sectionLight, borderTop: '1px solid #e5e5e5' }}>

  <div style={container}>

    <div style={{ ...label }}>Experience</div>

    <div style={{ marginTop: 32 }}>

      {/* item */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '200px 1fr',
        gap: 32,
        paddingBottom: 32,
        borderBottom: '1px solid #e5e5e5',
      }}>

        <div style={{ color: '#777', fontSize: 14 }}>
          March 2025–Dec 2025
        </div>

        <div>

          <div style={{ ...title, fontWeight: 600 }}>
            WDCC - Web Development & Consulting Club
          </div>

          <div style={{ color: '#777', marginTop: 6 }}>
            Full Stack Web Developer (React · Tailwind · Payload · Next.js · MongoDB) — Auckland, NZ
          </div>

          <p style={{ ...body, marginTop: 12 }}>
            Contributed in the development of a full-stack website for the University of Auckland Investment Club (UAIC), enabling users to register, sign up, and complete membership payments online.
          </p>

        </div>

      </div>

      {/* second item */}

      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '200px 1fr',
        gap: 32,
        paddingTop: 32,
      }}>

        <div style={{ color: '#777', fontSize: 14 }}>
          Jan 2023–June 2023
        </div>

        <div>

          <div style={{ ...title, fontWeight: 600 }}>
            FEEL GOOD KICKS
          </div>

          <div style={{ color: '#777', marginTop: 6 }}>
            Web Designer & Front End Developer (Figma · React · Tailwind) — Auckland, NZ
          </div>

          <p style={{ ...body, marginTop: 12 }}>
            Contributed in the front-end development and design of an e-commerce platform for a sneaker retail business, supporting product listings, customer interactions, and streamlined online purchases.
          </p>

        </div>

      </div>

      {/* WEB3 Blockchain Hackathon */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '200px 1fr',
        gap: 32,
        paddingTop: 32,
        borderTop: '1px solid #e5e5e5',
      }}>

        <div style={{ color: '#777', fontSize: 14 }}>
          April 2025 — April 2025
        </div>

        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ ...title, fontWeight: 600, margin: 0 }}>WEB3 BLOCKCHAIN HACKATHON</div>
            <div style={{ fontSize: 13, color: '#999', fontWeight: 500 }}>1st Place — Kiwiana prize</div>
          </div>
          <div style={{ color: '#777', marginTop: 6 }}>Developer & Designer (Figma, Canva, React, Tailwind, Solidity, Next.js) — Auckland, NZ</div>
          <p style={{ ...body, marginTop: 12 }}>
            Built <strong>Crypto Critters</strong>, a conservation-driven game where players use crypto converted into in-game currency to protect native wildlife.
          </p>
        </div>

      </div>

      {/* Sustainability Hackathon */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '200px 1fr',
        gap: 32,
        paddingTop: 32,
      }}>

        <div style={{ color: '#777', fontSize: 14 }}>
          March 2025 — March 2025
        </div>

        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ ...title, fontWeight: 600, margin: 0 }}>SUSTAINABILITY HACKATHON (YCC & AUCKLAND COUNCIL)</div>
            <div style={{ fontSize: 13, color: '#999', fontWeight: 500 }}>Exec's Choice Award</div>
          </div>
          <div style={{ color: '#777', marginTop: 6 }}>Developer & Designer (TensorFlow, COCO-SSD, JavaScript, HTML, CSS) — Auckland, NZ</div>
          <p style={{ ...body, marginTop: 12 }}>
            Built <strong>Robin</strong>, an AI-powered rubbish detection system promoting correct waste disposal; awarded the Exec’s Choice Award at the UoA Scientific Hackathon.
          </p>
        </div>

      </div>

      {/* SESA x WDCC Hackathon 2024 */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '200px 1fr',
        gap: 32,
        paddingTop: 32,
      }}>

        <div style={{ color: '#777', fontSize: 14 }}>
          July 2024 — July 2024
        </div>

        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ ...title, fontWeight: 600, margin: 0 }}>SESA X WDCC HACKATHON 2024</div>
            <div style={{ fontSize: 13, color: '#999', fontWeight: 500 }}>Most Entertaining Solution</div>
          </div>
          <div style={{ color: '#777', marginTop: 6 }}>Developer & Designer (HTML, CSS, JavaScript) — Auckland, NZ</div>
          <p style={{ ...body, marginTop: 12 }}>
            Built <strong>Finder</strong>, a planet-swiping web app themed around escaping Earth; won the ‘Most Entertaining Solution’ at the SESA x WDCC Hackathon.
          </p>
        </div>

      </div>

      {/* SESA x WDCC Hackathon 2025 */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '200px 1fr',
        gap: 32,
        paddingTop: 32,
        paddingBottom: 32,
        borderBottom: '1px solid #e5e5e5',
      }}>

        <div style={{ color: '#777', fontSize: 14 }}>
          July 2025 — July 2025
        </div>

        <div>
          <div style={{ ...title, fontWeight: 600 }}>SESA X WDCC HACKATHON 2025</div>
          <div style={{ color: '#777', marginTop: 6 }}>Developer (React, Tailwind) — Auckland, NZ</div>
          <p style={{ ...body, marginTop: 12 }}>
            Collaborated with a team to build <strong>PiggyQuest</strong>, a digital app that gamifies household tasks for kids to help parents encourage positive habits. Gained hands-on experience in user-centered design, rapid prototyping, and addressing real-world family challenges through technology.
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
            gridTemplateColumns: isMobile ? '1fr' : '180px 1fr',
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
<section id="album" style={{ ...sectionLight, borderTop: '1px solid #000', background: '#000', color: '#fff' }}>
  <div style={container}>
    <div style={{ ...label }}>Photo Album</div>

    <div style={{
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(180px, 1fr))',
      gap: 12,
      marginTop: 18,
    }}>
      {photos.map((src, i) => (
        <div key={src} style={{ cursor: 'pointer', overflow: 'hidden', borderRadius: 8 }} onClick={() => { setLightboxIndex(i); setLightboxOpen(true); }}>
          <img src={src} alt={`photo-${i}`} style={{ width: '100%', height: isMobile ? 220 : 160, objectFit: 'cover', display: 'block' }} />
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
      <ContactForm isMobile={isMobile} />

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

    <Lightbox
      open={lightboxOpen}
      index={lightboxIndex}
      photos={photos}
      onClose={() => setLightboxOpen(false)}
      onPrev={() => setLightboxIndex(i => (i - 1 + photos.length) % photos.length)}
      onNext={() => setLightboxIndex(i => (i + 1) % photos.length)}
    />

    </div>
  );
}

// Lightbox overlay rendered at end of file so state closures are simple to use
function Lightbox({ open, index, photos, onClose, onPrev, onNext }) {
  if (!open) return null;
  const src = photos[index];
  return (
    <div style={{ position: 'fixed', left: 0, top: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.9)', zIndex: 3000, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={onClose}>
      <button aria-label="previous" onClick={(e) => { e.stopPropagation(); onPrev(); }} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', background: 'transparent', border: 'none', color: '#fff', fontSize: 28, cursor: 'pointer' }}>‹</button>
      <img src={src} alt="lightbox" style={{ maxWidth: '92%', maxHeight: '92%', boxShadow: '0 8px 40px rgba(0,0,0,0.8)' }} onClick={(e) => e.stopPropagation()} />
      <button aria-label="next" onClick={(e) => { e.stopPropagation(); onNext(); }} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'transparent', border: 'none', color: '#fff', fontSize: 28, cursor: 'pointer' }}>›</button>
    </div>
  );
}


function ContactForm({ isMobile = false }) {
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

      <div style={{ display: 'flex', gap: 12, flexDirection: isMobile ? 'column' : 'row' }}>
        <button type="submit" style={{ ...primaryButton, width: isMobile ? '100%' : 'auto' }}>Send Message</button>
        <button type="button" onClick={handleClear} style={{ ...secondaryButton, width: isMobile ? '100%' : 'auto' }}>Clear</button>
      </div>

      {status === 'opened' && (
        <div style={{ color: '#666', fontSize: 13 }}>
          Your mail client should open with a pre-filled message. To send automatically, I can set up a serverless endpoint or Formspree.
        </div>
      )}
    </form>
  );
}