import { CruiseStarfield } from '../CruiseStarfield';
import React, { useState } from 'react';

export function About({ enhanced }) {
  if (enhanced) return <EnhancedAbout />;

  const heading = { fontSize: '8vw', fontWeight: 700, marginBottom: '2vw', textTransform: 'uppercase', letterSpacing: '0.1em' };
  const body = { fontSize: '4.5vw', lineHeight: 1.3 , textTransform: 'uppercase' };

  const slides = [
    {
      key: 'cover',
      content: (
        <span
          style={{
            fontSize: '9vw',
            fontWeight: 900,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#fff',
            display: 'block',
            lineHeight: 1.2,
          }}
        >
          Sector 2813 — About
        </span>
      ),
    },
    {
      key: 'intro',
      content: (
        <div>
          <h2 style={heading}>About Me</h2>
          <p style={body}>
            Hello! I'm in my last year studying Computer Science at the University of Auckland. I'm passionate about crafting web applications that are intuitive and meaningful tools that make life easier.
          </p>
        </div>
      ),
    },
    {
      key: 'education',
      content: (
        <div>
          <h2 style={heading}>Education</h2>
          <p style={{ ...body, textAlign: 'left' }}>
            <b>University of Auckland</b><br />
            Bachelor of Science in Computer Science<br />
            2024 – Present
          </p>
        </div>
      ),
    },
    {
      key: 'skills',
      content: (
        <div>
          <h2 style={heading}>Skills</h2>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '2vw',
              justifyContent: 'center',
            }}
          >
            {['React', 'Next.js', 'TypeScript', 'JavaScript', 'Python', 'Flask', 'Tailwind CSS', 'Supabase', 'Payload CMS', 'Node.js', 'Figma', 'Solidity', 'TensorFlow'].map((skill) => (
              <span
                key={skill}
                style={{
                  padding: '0.4vw 1vw',
                  fontSize: '4.5vw',textTransform: 'uppercase'
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      ),
    },
    {
      key: 'interests',
      content: (
        <div>
          <h2 style={heading}>Interests</h2>
          <p style={body}>
            I'm a big fan of coffee — my favourite technique is the V60. I collect Beatles records, Green Lantern comics, and Star Trek DVDs.
          </p>
        </div>
      ),
    },
  ];

  const [slide, setSlide] = useState(0);
  const goPrev = () => setSlide((s) => Math.max(0, s - 1));
  const goNext = () => setSlide((s) => Math.min(slides.length - 1, s + 1));

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

      {/* Left Arrow */}
      <button
        onClick={goPrev}
        disabled={slide === 0}
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          height: '100%',
          width: '10vw',
          zIndex: 10,
          background: 'none',
          border: 'none',
          color: slide === 0 ? '#444' : '#fff',
          fontSize: '10vw',
          cursor: slide === 0 ? 'not-allowed' : 'pointer',
          opacity: slide === 0 ? 0.2 : 0.7,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'opacity 0.2s',
        }}
        aria-label="Previous"
      >
        ‹
      </button>

      {/* Right Arrow */}
      <button
        onClick={goNext}
        disabled={slide === slides.length - 1}
        style={{
          position: 'absolute',
          right: 0,
          top: 0,
          height: '100%',
          width: '10vw',
          zIndex: 10,
          background: 'none',
          border: 'none',
          color: slide === slides.length - 1 ? '#444' : '#fff',
          fontSize: '10vw',
          cursor: slide === slides.length - 1 ? 'not-allowed' : 'pointer',
          opacity: slide === slides.length - 1 ? 0.2 : 0.7,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'opacity 0.2s',
        }}
        aria-label="Next"
      >
        ›
      </button>

      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 2,
          color: '#fff',
          textAlign: 'center',
          background: 'none',
          width: '90vw',
          maxHeight: '85%',
          overflow: 'auto',
          padding: '4vw 0',
        }}
      >
        {slides[slide].content}



        <div style={{ marginTop: '1.5vw', display: 'flex', justifyContent: 'center', gap: 8 }}>
          {slides.map((s, i) => (
            <div
              key={s.key}
              style={{
                width: 18,
                height: 8,
                borderRadius: 4,
                background: i === slide ? '#fff' : '#555',
                opacity: i === slide ? 1 : 0.5,
                transition: 'all 0.2s',
              }}
            />
          ))}
        </div>
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
        paddingBottom: 64,
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
            paddingBottom: 64,
          }}
        >
          <section style={sectionStyle}>
            <h2 style={headerStyle}>About Me</h2>
            <p style={paragraphStyle}>
              Hello! I'm in my last year studying Computer Science at the University of Auckland. I'm passionate about crafting web applications that are intuitive and meaningful tools that make life easier.
            </p>
          </section>

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
              <li>React</li><li>Next.js</li><li>Typescript</li><li>Javascript</li>
              <li>Python</li><li>Flask</li><li>Tailwind CSS</li><li>SupaBase</li>
              <li>Payload CMS</li><li>Node.js</li><li>Figma</li><li>Solidity</li>
              <li>Tensorflow</li>
            </ul>
          </section>

          <section style={sectionStyle}>
            <h2 style={headerStyle}>Interests</h2>
            <p style={paragraphStyle}>
              I'm a big fan of coffee with my favourite technique being the V60. I collect Beatles records, Green Lantern comics, and Star Trek DVDs.
            </p>
          </section>
        </main>
      </div>
    </div>
  );
}