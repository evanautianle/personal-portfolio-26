import { CruiseStarfield } from '../CruiseStarfield';
import React, { useState } from 'react';

export function Contact({ enhanced }) {
  if (enhanced) return <EnhancedContact />;

  const [slide, setSlide] = useState(0);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const goPrev = () => setSlide((s) => Math.max(0, s - 1));
  const goNext = () => setSlide((s) => Math.min(1, s + 1));

  const handleSubmit = () => {
    const subject = encodeURIComponent(`Portfolio Contact from ${form.name}`);
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`);
    const mailto = `mailto:evan.au206@gmail.com?subject=${subject}&body=${body}`;
    const newWin = window.open(mailto, '_blank');
    if (newWin) newWin.opener = null;
    setSent(true);
  };

  const heading = {
    fontSize: 'clamp(56px, 9vw, 88px)',
    fontWeight: 700,
    marginBottom: '1.5vw',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
  };

  const inputStyle = {
    width: '100%',
    background: 'none',
    border: 'none',
    borderBottom: '2px solid #fff',
    color: '#fff',
    fontSize: 'clamp(20px, 3.6vw, 40px)',
    textTransform: 'uppercase',
    padding: '1.5vw 0',
    outline: 'none',
    fontFamily: 'inherit',
    letterSpacing: '0.06em',
    lineHeight: 1.05,
    boxSizing: 'border-box',
  };

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
          Sector 1517 — Contact
        </span>
      ),
    },
    {
      key: 'form',
      content: (
        <div style={{ textAlign: 'left' }}>
          <h2 style={heading}>Get In Touch</h2>
          {sent ? (
            <p style={{ fontSize: 'clamp(20px, 3.6vw, 40px)', textTransform: 'uppercase', lineHeight: 1.5 }}>
              Opening your mail client — thanks for reaching out!
            </p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8vw' }}>
              <input style={inputStyle} placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              <input style={inputStyle} placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              <textarea
                style={{ ...inputStyle, borderBottom: '2px solid #fff', resize: 'none', minHeight: '240px' }}
                placeholder="Message"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              />
              <button
                onClick={handleSubmit}
                disabled={!form.name || !form.email || !form.message}
                style={{
                  alignSelf: 'flex-start',
                  fontSize: 'clamp(20px, 4vw, 44px)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  border: '2px solid #fff',
                  padding: '1vw 3vw',
                  background: 'none',
                  color: '#fff',
                  cursor: form.name && form.email && form.message ? 'pointer' : 'not-allowed',
                  opacity: form.name && form.email && form.message ? 1 : 0.4,
                  fontFamily: 'inherit',
                  transition: 'opacity 0.2s, transform 0.15s',
                }}
              >
                Send ↗
              </button>
            </div>
          )}
        </div>
      ),
    },
  ];

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden', background: 'radial-gradient(ellipse at center, #222 0%, #000 80%)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxSizing: 'border-box' }}>
      <CruiseStarfield />
      <button onClick={goPrev} disabled={slide === 0} style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: '10vw', zIndex: 10, background: 'none', border: 'none', color: slide === 0 ? '#444' : '#fff', fontSize: '10vw', cursor: slide === 0 ? 'not-allowed' : 'pointer', opacity: slide === 0 ? 0.2 : 0.7, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'opacity 0.2s' }} aria-label="Previous">‹</button>
      <button onClick={goNext} disabled={slide === 1} style={{ position: 'absolute', right: 0, top: 0, height: '100%', width: '10vw', zIndex: 10, background: 'none', border: 'none', color: slide === 1 ? '#444' : '#fff', fontSize: '10vw', cursor: slide === 1 ? 'not-allowed' : 'pointer', opacity: slide === 1 ? 0.2 : 0.7, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'opacity 0.2s' }} aria-label="Next">›</button>
      <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', zIndex: 2, color: '#fff', textAlign: 'center', width: 'calc(100% - 20vw)', maxWidth: '1600px', maxHeight: '85%', overflow: 'auto', padding: '4vw 0' }}>
        {slides[slide].content}
        <div style={{ marginTop: '1.5vw', display: 'flex', justifyContent: 'center', gap: 8 }}>
          {slides.map((s, i) => (
            <div key={s.key} style={{ width: 18, height: 8, borderRadius: 4, background: i === slide ? '#fff' : '#555', opacity: i === slide ? 1 : 0.5, transition: 'all 0.2s' }} />
          ))}
        </div>
      </div>
    </div>
  );
}
function EnhancedContact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = () => {
    const subject = encodeURIComponent(`Portfolio Contact from ${form.name}`);
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`);
    const mailto = `mailto:evan.au206@gmail.com?subject=${subject}&body=${body}`;
    const newWin = window.open(mailto, '_blank');
    if (newWin) newWin.opener = null;
    setSent(true);
  };

  const canSend = form.name && form.email && form.message;

  // Matches About's sectionStyle exactly
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

  const inputStyle = {
    width: '100%',
    background: 'none',
    border: 'none',
    borderBottom: '1px solid rgba(255,255,255,0.3)',
    color: '#fff',
    fontSize: 15,
    padding: '10px 0',
    outline: 'none',
    fontFamily: 'inherit',
    letterSpacing: '0.04em',
    boxSizing: 'border-box',
  };

  const contactLinks = [
    { label: 'Email',    value: 'evan.au206@gmail.com',   href: 'mailto:evan.au206@gmail.com' },
    { label: 'Phone',    value: '(+64) 225388233',       href: 'tel:+64225388233' },
    { label: 'LinkedIn', value: 'https://www.linkedin.com/in/evan-au-01667630a/',  href: 'https://www.linkedin.com/in/evan-au-01667630a/' },
    { label: 'GitHub',   value: 'github.com/evanautianle',       href: 'https://github.com/evanautianle' },
  ];

  const openExternal = (href) => {
    const newWin = window.open(href, '_blank');
    if (newWin) newWin.opener = null;
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
        {/* Header — identical to EnhancedAbout */}
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
            Contact
          </h1>
        </header>

        <main
          style={{
            width: '100%',
            maxWidth: 800,
            margin: '32px auto 0 auto',
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            padding: '0 24px 64px',
            boxSizing: 'border-box',
          }}
        >
          {/* Contact links section */}
          <section style={sectionStyle}>
            <h2 style={headerStyle}>Get In Touch</h2>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {contactLinks.map((link, i) => (
                <div
                  key={i}
                  onClick={() => openExternal(link.href)}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    padding: '10px 0',
                    borderBottom: i < contactLinks.length - 1 ? '1px solid rgba(255,255,255,0.12)' : 'none',
                    color: '#fff',
                    fontSize: 15,
                    gap: 16,
                    cursor: 'pointer',
                  }}
                >
                  <span style={{ opacity: 0.5, fontSize: 13, textTransform: 'uppercase', letterSpacing: 1, flexShrink: 0 }}>
                    {link.label}
                  </span>
                  <span style={{ opacity: 0.85 }}>{link.value}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Message form section */}
          <section style={sectionStyle}>
            <h2 style={headerStyle}>Send a Message</h2>

            {sent ? (
              <p style={{ fontSize: 15, margin: 0, lineHeight: 1.6, opacity: 0.8 }}>
                Opening your mail client — thanks for reaching out!
              </p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <input
                  style={inputStyle}
                  placeholder="Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  onFocus={(e) => (e.target.style.borderBottomColor = 'rgba(255,255,255,0.8)')}
                  onBlur={(e) => (e.target.style.borderBottomColor = 'rgba(255,255,255,0.3)')}
                />
                <input
                  style={inputStyle}
                  placeholder="Email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  onFocus={(e) => (e.target.style.borderBottomColor = 'rgba(255,255,255,0.8)')}
                  onBlur={(e) => (e.target.style.borderBottomColor = 'rgba(255,255,255,0.3)')}
                />
                <textarea
                  style={{ ...inputStyle, resize: 'none', minHeight: 100 }}
                  placeholder="Message"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  onFocus={(e) => (e.target.style.borderBottomColor = 'rgba(255,255,255,0.8)')}
                  onBlur={(e) => (e.target.style.borderBottomColor = 'rgba(255,255,255,0.3)')}
                />
                <button
                  onClick={handleSubmit}
                  disabled={!canSend}
                  style={{
                    alignSelf: 'flex-start',
                    marginTop: 16,
                    fontSize: 14,
                    textTransform: 'uppercase',
                    letterSpacing: '0.15em',
                    border: '2px solid #fff',
                    padding: '10px 28px',
                    background: 'none',
                    color: '#fff',
                    cursor: canSend ? 'pointer' : 'not-allowed',
                    opacity: canSend ? 1 : 0.35,
                    fontFamily: 'inherit',
                    fontWeight: 700,
                    borderRadius: 0,
                    transition: 'background 0.15s, color 0.15s',
                  }}
                  onMouseEnter={(e) => { if (canSend) { e.target.style.background = '#fff'; e.target.style.color = '#000'; } }}
                  onMouseLeave={(e) => { if (canSend) { e.target.style.background = 'none'; e.target.style.color = '#fff'; } }}
                >
                  Send ↗
                </button>
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}