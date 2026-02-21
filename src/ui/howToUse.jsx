import React, { useState } from "react";
import { createPortal } from "react-dom";

function HowToUseContent() {
  const cards = [
    {
      id: 1,
      title: 'Plot a Course',
      img: ['/assets/images/howto0.png', '/assets/images/howto1.png'],
      steps: [
        'Select your destination from the route list.',
        'Press the Select Course button.'
      ]
    },
    {
      id: 2,
      title: 'Engage Warp',
      img: ['/assets/images/howto2.png', '/assets/images/howto3.png'],
      steps: [
        'Ensure course is plotted.',
        'Press Engage to initiate warp.'
      ]
    },
    {
      id: 3,
      title: 'Enhance Screen',
      img: ['/assets/images/howto4.png', '/assets/images/howto5.png'],
      steps: [
        'Click "Enhance" to expand to full view.',
        'Press anywhere to exit.'
      ]
    }
  ];

  const [hoverIndex, setHoverIndex] = useState(() =>
    cards.reduce((acc, c) => { acc[c.id] = 0; return acc; }, {})
  );

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', fontFamily: 'system-ui, sans-serif', color: '#fff' }}>
      <div style={{ padding: '16px 24px 12px', borderBottom: '1px solid #fff3', flexShrink: 0 }}>
        <h2 style={{ margin: 0, fontSize: 'clamp(20px, 3vw, 36px)', fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>
          How to Use
        </h2>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '24px', color: '#ddd' }}>
        <p style={{ marginTop: 0, marginBottom: 16, fontSize: 'clamp(15px, 1.3vw, 18px)', lineHeight: 1.6 }}>
          Quick visual guide - Hover any card for a preview.
        </p>

        <div style={{ marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ fontSize: 'clamp(12px, 1vw, 16px)', fontWeight: 700, letterSpacing: 2 }}>NAVIGATION CONTROLS</div>
          <div style={{ flex: 1, height: 1, background: '#fff3' }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
          {cards.map(card => (
            <div
              key={card.id}
              style={{
                background: '#111',
                border: '1px solid #fff3',
                borderRadius: 10,
                overflow: 'hidden',
                boxShadow: '0 6px 24px rgba(0,0,0,0.6)',
                transition: 'transform 0.18s, border-color 0.18s',
                cursor: 'default'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.borderColor = '#fff';
                setHoverIndex(h => ({ ...h, [card.id]: Array.isArray(card.img) && card.img.length > 1 ? 1 : 0 }));
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = '#fff3';
                setHoverIndex(h => ({ ...h, [card.id]: 0 }));
              }}
              onFocus={() => setHoverIndex(h => ({ ...h, [card.id]: Array.isArray(card.img) && card.img.length > 1 ? 1 : 0 }))}
              onBlur={() => setHoverIndex(h => ({ ...h, [card.id]: 0 }))}
              tabIndex={0}
            >
              <div style={{ position: 'relative', width: '100%', paddingTop: '56.25%', overflow: 'hidden' }}>
                <img
                  src={Array.isArray(card.img) ? card.img[(hoverIndex[card.id] ?? 0) % card.img.length] : card.img}
                  alt={card.title}
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%)' }}
                />
              </div>
              <div style={{ padding: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
                  <h3 style={{ margin: 0, fontSize: 'clamp(16px, 1.8vw, 22px)' }}>{card.title}</h3>
                  <div style={{ background: '#222', color: '#fff', padding: '6px 10px', borderRadius: 6, fontWeight: 700, fontSize: 'clamp(12px, 1vw, 14px)' }}>Step {card.id}</div>
                </div>
                <ol style={{ margin: '12px 0 0 20px', fontSize: 'clamp(14px, 1.2vw, 16px)', lineHeight: 1.55 }}>
                  {card.steps.map((s, i) => <li key={i} style={{ marginBottom: 8 }}>{s}</li>)}
                </ol>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 24, padding: 16, background: '#111', borderRadius: 8, border: '1px solid #fff3', fontSize: 'clamp(14px, 1.1vw, 16px)' }}>
          - For the best experience, use a modern browser on desktop or tablet. Mobile support is limited.
        </div>

        <div style={{ marginTop: 20, padding: 16, background: '#111', borderRadius: 8, border: '1px solid #fff3' }}>
          <h4 style={{ margin: '0 0 10px 0', fontSize: 'clamp(16px, 1.4vw, 18px)' }}>Side Screens</h4>
          <ul style={{ margin: 0, paddingLeft: 20, fontSize: 'clamp(14px, 1.1vw, 16px)', lineHeight: 1.55 }}>
            <li style={{ marginBottom: 8 }}><strong>GitHub:</strong> Tap the left GitHub terminal to trigger my GitHub site, the link will open in a new tab.</li>
            <li style={{ marginBottom: 8 }}><strong>Photo Album:</strong> Tap the left PHOTO ALBUM screen to open the Photo Album popup.</li>
            <li style={{ marginBottom: 8 }}><strong>LinkedIn:</strong> Tap the right LinkedIn terminal to trigger my LinkedIn Profile, the link will open in a new tab.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export function HowToUsePopup({ open, animateOut, onClose, onAnimationEnd }) {
  if (!open && !animateOut) return null;

  return createPortal(
    <>
      <style>{`
        @keyframes slideUpHowToPopup {
          from { transform: translateY(100vh); opacity: 0.5; }
          to   { transform: translateY(0);     opacity: 1;   }
        }
        @keyframes slideDownHowToPopup {
          from { transform: translateY(0);     opacity: 1;   }
          to   { transform: translateY(100vh); opacity: 0.5; }
        }
        @keyframes fadeOutOverlayHowTo {
          from { opacity: 0.6; }
          to   { opacity: 0; }
        }
      `}</style>

      <div
        style={{
          position: 'fixed', top: 0, left: 0,
          width: '100vw', height: '100vh',
          background: 'rgba(0,0,0,0.8)',
          zIndex: 3000,
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          pointerEvents: 'auto',
          animation: animateOut ? 'fadeOutOverlayHowTo 0.5s linear forwards' : undefined,
        }}
        onClick={onClose}
      >
        <div
          key={animateOut ? 'closing' : 'opening'}
          style={{
            width: '55%',
            height: '84%',
            marginTop: 120,
            maxWidth: 1920,
            maxHeight: 1080,
            background: '#000',
            boxShadow: '0 0 64px #000a',
            overflow: 'hidden',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            padding: '3vw',
            boxSizing: 'border-box',
            color: '#fff',
            animation: animateOut
              ? 'slideDownHowToPopup 0.5s cubic-bezier(0.33,1,0.68,1) forwards'
              : 'slideUpHowToPopup 0.5s cubic-bezier(0.33,1,0.68,1) forwards',
          }}
          onClick={e => e.stopPropagation()}
          onAnimationEnd={onAnimationEnd}
        >
          <HowToUseContent />
        </div>
      </div>
    </>,
    document.body
  );
}

export default HowToUsePopup;