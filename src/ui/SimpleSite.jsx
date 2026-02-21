import React from 'react'
import '../ui/ui-text.css'

const container = { maxWidth: 980, margin: '32px auto', padding: '28px', background: '#fff', borderRadius: 8, boxShadow: '0 6px 24px rgba(10,10,10,0.06)' }
const header = { margin: 0, textTransform: 'uppercase', letterSpacing: 2 }
const lead = { marginTop: 8, color: '#333', lineHeight: 1.6 }

const projects = [
  { key: 'wdcc-uaic', title: 'WDCC — Web Development & Consulting Club', event: 'University of Auckland Investment Club (UAIC)', description: 'Built features for a full-stack site supporting registration, events, and online payments.', tech: 'React · Next.js · Tailwind · Payload CMS' },
  { key: 'comic-library', title: 'Comic Library', event: 'Personal Project', description: 'Public-domain Golden Age comic library and reader.', tech: 'React · Vite · Tailwind · Supabase', link: 'https://evanautianle.github.io/COMIC-READER/' },
  { key: 'book-of-fates', title: 'Book of Fates', event: 'Personal Project', description: 'A digital interactive 3D book.', tech: 'React · Three.js · @react-three/fiber' },
  { key: 'crypto-critters', title: 'Crypto Critters', event: 'Web3 Hackathon — April 2025', award: '1st Place — Kiwiana Prize', description: "A conservation-driven game where players use crypto as in-game currency.", tech: 'Solidity · React' },
]

export default function SimpleSite() {
  return (
    <div style={{ background: '#f4f6f8', minHeight: '100vh', paddingTop: 96 }}>
      <main>
        <section id="home" style={container}>
          <h1 style={{ ...header, fontSize: 36 }}>Evan Au</h1>
          <p style={{ ...lead, fontWeight: 700 }}>Full Stack Developer</p>
          <p style={lead}>Third-year Computer Science student. I build intuitive web experiences, participate in hackathons, and focus on practical, well-designed tools.</p>
        </section>

        <section id="about" style={{ ...container, marginTop: 12 }}>
          <h2 style={{ ...header, fontSize: 22 }}>About Me</h2>
          <p style={lead}>Hello! I'm in my last year studying Computer Science at the University of Auckland. I'm passionate about crafting web applications that are intuitive and meaningful tools that make life easier.</p>

          <h3 style={{ ...header, fontSize: 16, marginTop: 18 }}>Education</h3>
          <p style={lead}><strong>University of Auckland</strong><br/>Bachelor of Science in Computer Science (2024 – Present)</p>

          <h3 style={{ ...header, fontSize: 16, marginTop: 12 }}>Skills</h3>
          <p style={lead}>React · Next.js · TypeScript · JavaScript · Python · Flask · Tailwind CSS · Supabase · Payload CMS · Node.js · Figma · Solidity · TensorFlow</p>

          <h3 style={{ ...header, fontSize: 16, marginTop: 12 }}>Experience</h3>
          <ul style={{ marginTop: 8, lineHeight: 1.5 }}>
            <li><strong>WDCC</strong> — Full Stack Web Developer (Auckland, March 2025 – Present)</li>
            <li><strong>Feel Good Kicks</strong> — Web Designer & Front End Developer (Jan 2023 – Jun 2023)</li>
          </ul>
        </section>

        <section id="projects" style={{ ...container, marginTop: 12 }}>
          <h2 style={{ ...header, fontSize: 22 }}>Projects</h2>
          <div style={{ display: 'grid', gap: 12, marginTop: 12 }}>
            {projects.map((p) => (
              <article key={p.key} style={{ padding: 14, borderRadius: 6, background: '#fff', border: '1px solid #eee' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <h3 style={{ margin: 0 }}>{p.title}</h3>
                  {p.award && <small style={{ color: '#666' }}>{p.award}</small>}
                </div>
                <p style={{ margin: '8px 0', color: '#444' }}>{p.description}</p>
                <p style={{ margin: 0, color: '#777', fontSize: 13 }}>{p.tech}</p>
                {p.link && <a href={p.link} target="_blank" rel="noreferrer" style={{ display: 'inline-block', marginTop: 8 }}>View ↗</a>}
              </article>
            ))}
          </div>
        </section>

        <section id="contact" style={{ ...container, marginTop: 12, marginBottom: 48 }}>
          <h2 style={{ ...header, fontSize: 22 }}>Contact</h2>
          <p style={lead}>Want to work together or say hello? Use the links in the navbar or send an email:</p>
          <a href="mailto:evan.au206@gmail.com" style={{ display: 'inline-block', marginTop: 8 }}>evan.au206@gmail.com</a>
        </section>
      </main>
    </div>
  )
}
