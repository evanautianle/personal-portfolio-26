import { CruiseStarfield } from '../CruiseStarfield';
import React, { useState } from 'react';

export function About({ enhanced }) {
  if (enhanced) return <EnhancedAbout />;

  const heading = { fontSize: 'clamp(56px, 9vw, 88px)', fontWeight: 700, marginBottom: '1.5vw', textTransform: 'uppercase', letterSpacing: '0.1em' };
  const body = { fontSize: 'clamp(36px, 4.2vw, 64px)', lineHeight: 1.3 , textTransform: 'uppercase' };

  const slides = [
    {
      key: 'cover',
      content: (
        <span
          style={{
            fontSize: 'clamp(80px, 13vw, 144px)',
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
                  fontSize: 'clamp(36px, 4.2vw, 64px)',
                  textTransform: 'uppercase'
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
  key: 'experience',
  content: (
    <div>
      <h2 style={heading}>Experience</h2>
      <div style={{ ...body, textAlign: 'left', lineHeight: 1.6 }}>

        <b>WDCC — WEB DEVELOPMENT & CONSULTING CLUB</b><br />
        Full Stack Web Developer · Auckland, NZ · March 2025 – Present<br /><br />

        <b>FEEL GOOD KICKS</b><br />
        Web Designer & Front End Developer · Auckland, NZ · Jan 2023 – June 2023<br /><br />

        <b>WEB3 BLOCKCHAIN HACKATHON</b><br />
        Developer & Designer · Auckland, NZ · April 2025<br />
        1st Place — Kiwiana Prize<br /><br />

        <b>SUSTAINABILITY HACKATHON</b><br />
        Developer & Designer · Auckland, NZ · March 2025<br />
        Exec’s Choice Award<br /><br />

        <b>SESA x WDCC HACKATHON 2025</b><br />
        Developer · Auckland, NZ · July 2025<br /><br />

        <b>SESA x WDCC HACKATHON 2024</b><br />
        Developer & Designer · Auckland, NZ · July 2024<br />
        Most Entertaining Solution

      </div>
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
          width: 'calc(100% - 20vw)',
          maxWidth: '1600px',
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
  <h2 style={headerStyle}>Experience</h2>

  <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>

    {/* WDCC */}
    <div>
      <div
  style={{
    display: 'grid',
    gridTemplateColumns: '1fr auto',
    gap: 8,
    alignItems: 'baseline',
  }}
>

        <strong>WDCC — Web Development & Consulting Club</strong>
        <span style={{ opacity: 0.6, textAlign: 'right', whiteSpace: 'nowrap' }}>
Auckland, NZ · March 2025 – Present</span>
      </div>
      <div style={{ fontSize: 14, opacity: 0.8 }}>
        Full Stack Web Developer
      </div>
      <div style={{ fontSize: 14, marginTop: 6, lineHeight: 1.5 }}>
        Contributed to the development of a full-stack platform for the University of Auckland Investment Club, supporting registration, event sign-ups, and online membership payments.
      </div>
    </div>

    {/* Feel Good Kicks */}
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
        <strong>Feel Good Kicks</strong>
        <span style={{ opacity: 0.6 }}>Auckland, NZ · Jan 2023 – June 2023</span>
      </div>
      <div style={{ fontSize: 14, opacity: 0.8 }}>
        Web Designer & Front End Developer
      </div>
      <div style={{ fontSize: 14, marginTop: 6, lineHeight: 1.5 }}>
        Designed and developed an e-commerce website supporting product listings, customer interaction, and streamlined online purchases.
      </div>
    </div>

    {/* Web3 */}
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
        <strong>Web3 Blockchain Hackathon</strong>
        <span style={{ opacity: 0.6 }}>Auckland, NZ · April 2025</span>
      </div>
      <div style={{ fontSize: 14, opacity: 0.8 }}>Developer & Designer</div>
      <div style={{ fontSize: 14, marginTop: 4 }}>
        1st Place — Kiwiana Prize
      </div>
    </div>

    {/* Sustainability */}
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
        <strong>Sustainability Hackathon</strong>
        <span style={{ opacity: 0.6 }}>Auckland, NZ · March 2025</span>
      </div>
      <div style={{ fontSize: 14, opacity: 0.8 }}>Developer & Designer</div>
      <div style={{ fontSize: 14, marginTop: 4 }}>
        Exec’s Choice Award
      </div>
    </div>

    {/* PiggyQuest */}
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
        <strong>SESA x WDCC Hackathon 2025</strong>
        <span style={{ opacity: 0.6 }}>Auckland, NZ · July 2025</span>
      </div>
      <div style={{ fontSize: 14, opacity: 0.8 }}>Developer</div>
    </div>

    {/* Findr */}
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
        <strong>SESA x WDCC Hackathon 2024</strong>
        <span style={{ opacity: 0.6 }}>Auckland, NZ · July 2024</span>
      </div>
      <div style={{ fontSize: 14, opacity: 0.8 }}>Developer & Designer</div>
      <div style={{ fontSize: 14, marginTop: 4 }}>
        Most Entertaining Solution
      </div>
    </div>

  </div>
</section>


        </main>
      </div>
    </div>
  );
}