import { CruiseStarfield } from '../CruiseStarfield';
import React, { useState } from 'react';

const projectData = [
    {
    key: 'wdcc-uaic',
    image: '/assets/images/project.png',
    title: 'WDCC — Web Development & Consulting Club',
    event: 'University of Auckland Investment Club (UAIC)',
    award: null,
    link: null,
    description:
  'Built features for a full-stack site supporting registration, events, and online payments.',

     tech: 'React · Next.js · Tailwind CSS · Payload CMS · MongoDB',
  },
  {
    key: 'comic-library',
    image: '/assets/images/project0.png',
    title: 'Comic Library',
    event: 'Personal Project',
    award: null,
    link: 'https://evanautianle.github.io/COMIC-READER/',
    description: 'Public-domain Golden Age comic library and reader. Features favorites, ratings, comments, and user profiles.',
    tech: 'React · Vite · Tailwind CSS · Supabase',
  },
  {
    key: 'book-of-fates',
    image: '/assets/images/project3.png',
    title: 'Book of Fates',
    event: 'Personal Project',
    award: null,
    link: 'https://evanautianle.github.io/3D-TEST-PROJECT-BOOK-OF-FATES/',
    description: 'A digital interactive 3D book. Explore a fully animated 3D environment with camera effects and controls.',
    tech: 'React · Three.js · @react-three/fiber · @react-three/drei · Tailwind · Vite · Jotai',
  },
  {
    key: 'crypto-critters',
    image: '/assets/images/project1.png',
    title: 'Crypto Critters',
    event: 'Web3 Blockchain Hackathon — April 2025',
    award: '🥇 1st Place — Kiwiana Prize',
    link: null,
    description: "NZ's first Web3 hackathon. A conservation-driven game where players use crypto as in-game currency to protect native wildlife.",
    tech: 'Figma · React · Next.js · Tailwind · Solidity',
  },
  {
    key: 'robin',
    image: '/assets/images/project2.png',
    title: 'Robin',
    event: 'Sustainability Hackathon — March 2025',
    award: "🏆 Exec's Choice Award",
    link: null,
    description: 'An AI-powered rubbish detection system promoting correct waste disposal using real-time object recognition.',
    tech: 'TensorFlow · COCO-SSD · JavaScript · HTML · CSS',
  },
  {
    key: 'piggyquest',
    image: '/assets/images/project4.png',
    title: 'PiggyQuest',
    event: 'SESA x WDCC Hackathon — July 2025',
    award: null,
    link: null,
    description: 'A gamified household task app for kids, helping parents encourage positive habits through rewards and challenges.',
    tech: 'React · Tailwind',
  },
  {
    key: 'findr',
    image: '/assets/images/project5.png',
    title: 'Findr',
    event: 'SESA x WDCC Hackathon — July 2024',
    award: '🎉 Most Entertaining Solution',
    link: null,
    description: 'A planet-swiping web app themed around escaping Earth — Tinder, but for finding your next home planet.',
    tech: 'HTML · CSS · JavaScript',
  },
];

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
        Sector 674 — Projects
      </span>
    ),
  },
  ...projectData.map((p) => ({
    key: p.key,
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2vw' }}>
        <h2 style={{ fontSize: '6vw', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>
          {p.title}
        </h2>
        <div style={{ position: 'relative', width: '100%' }}>
          <img
            src={p.image}
            alt={p.title}
            style={{
              width: '100%',
              maxHeight: '45vh',
              objectFit: 'contain',
              display: 'block',
            }}
          />
          {p.link && (
            <a
              href={p.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                position: 'absolute',
                bottom: '1vw',
                right: '1vw',
                fontSize: '4vw',
                color: '#fff',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                border: '2px solid #fff',
                padding: '1vw 3vw',
                textDecoration: 'none',
                background: 'rgba(0,0,0,0.6)',
              }}
            >
              View ↗
            </a>
          )}
        </div>
        <p style={{ fontSize: '4.5vw', lineHeight: 1.4, textTransform: 'uppercase', margin: 0, opacity: 0.85 }}>
          {p.description}
        </p>
      </div>
    ),
  })),
];

export function Projects({ enhanced }) {
  if (enhanced) return <EnhancedProjects />;

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
          width: '110vw',
          maxHeight: '90%',
          overflow: 'auto',
          padding: '4vw 0',
        }}
      >
        {slides[slide].content}

        <div style={{ marginTop: '3vw', display: 'flex', justifyContent: 'center', gap: 8 }}>
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

function EnhancedProjects() {
  const sectionStyle = {
    border: '2px solid #fff',
    padding: 24,
    marginTop: 24,
    background: 'rgba(0,0,0,0.7)',
  };

  const headerStyle = {
    fontSize: 24,
    fontWeight: 700,
    margin: '0 0 4px 0',
    textTransform: 'uppercase',
    letterSpacing: 2,
  };

  const tagStyle = {
    fontSize: 13,
    opacity: 0.5,
    textTransform: 'uppercase',
    letterSpacing: 1,
    margin: '0 0 12px 0',
  };

  const paragraphStyle = { fontSize: 15, margin: '0 0 12px 0', lineHeight: 1.6 };

  const techStyle = {
    fontSize: 13,
    opacity: 0.5,
    textTransform: 'uppercase',
    letterSpacing: 1,
    margin: 0,
  };

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
            Projects
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
          {projectData.map((p) => (
            <section key={p.key} style={sectionStyle}>
              <p style={tagStyle}>{p.event}</p>
              <h2 style={headerStyle}>{p.title}</h2>
              {p.award && <p style={{ ...tagStyle, opacity: 0.8, marginBottom: 12 }}>{p.award}</p>}
              <img
                src={p.image}
                alt={p.title}
                style={{ width: '100%', maxHeight: 220, objectFit: 'cover', marginBottom: 12, display: 'block' }}
              />
              <p style={paragraphStyle}>{p.description}</p>
              <p style={techStyle}>{p.tech}</p>
              {p.link && (
                <a
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: 13, color: '#fff', textTransform: 'uppercase', letterSpacing: 1, marginTop: 12, display: 'inline-block', opacity: 0.7 }}
                >
                  View Project ↗
                </a>
              )}
            </section>
          ))}
        </main>
      </div>
    </div>
  );
}