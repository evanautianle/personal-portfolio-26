import React, { useState } from "react";
import { createPortal } from "react-dom";

function ZoomedLightbox({ photo, onClose }) {
  return createPortal(
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100vw', height: '100vh',
        background: 'rgba(0,0,0,0.92)',
        zIndex: 99999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <img
        src={photo.src}
        alt={photo.caption}
        style={{
          maxWidth: '85vw',
          maxHeight: '80vh',
          objectFit: 'contain',
          boxShadow: '0 0 80px rgba(0,0,0,0.8)',
          border: '1px solid #ffffff22',
        }}
        onClick={e => e.stopPropagation()}
      />
      <div style={{ color: '#fff', marginTop: 16, fontSize: 'clamp(12px, 1.5vw, 20px)', opacity: 0.8, letterSpacing: 1 }}>
        {photo.caption}
      </div>
      <div style={{ color: '#ffffff55', marginTop: 8, fontSize: 'clamp(10px, 1vw, 14px)' }}>
        click anywhere to close
      </div>
    </div>,
    document.body
  );
}

const PHOTOS = [
  { id: 1, src: '/assets/images/photo1.jpeg', caption: 'Findr app, 2024 WDCC & SESA Hackathon' },
  { id: 2, src: '/assets/images/photo2.jpeg', caption: 'Findr app, 2024 WDCC & SESA Hackathon' },
  { id: 3, src: '/assets/images/photo3.jpeg', caption: 'WDCC UAIC Project Milestone' },
  { id: 4, src: '/assets/images/photo4.jpeg', caption: '2025 WDCC & SESA Hackathon' },
  { id: 5, src: '/assets/images/photo5.jpeg', caption: 'UOA Scientific Sustainability Hackathon' },
  { id: 6, src: '/assets/images/photo6.jpeg', caption: 'Web3 Crypto Hackathon' },
  { id: 7, src: '/assets/images/photo7.jpeg', caption: 'Web3 Crypto Hackathon' },
  { id: 8, src: '/assets/images/photo8.jpeg', caption: 'Web3 Crypto Hackathon (Binance Merchandise)' },
  { id: 9, src: '/assets/images/photo9.jpeg', caption: '2025 WDCC & SESA Hackathon' },
];

function PhotoAlbumContent() {
  const [zoomed, setZoomed] = useState(null);
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ padding: '16px 24px 12px', borderBottom: '1px solid #ffffff18', flexShrink: 0 }}>
        <h2 style={{ margin: 0, fontSize: 'clamp(16px, 2vw, 32px)', fontWeight: 700, color: '#fff', letterSpacing: 2, textTransform: 'uppercase' }}>
          Photo Album
        </h2>
      </div>
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '20px',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '12px',
          alignContent: 'start',
        }}
      >
        {PHOTOS.map(photo => (
          <div
            key={photo.id}
            onClick={() => setZoomed(photo)}
            style={{
              aspectRatio: '4/3',
              overflow: 'hidden',
              cursor: 'pointer',
              background: '#0a0a18',
              position: 'relative',
              border: '1px solid #ffffff18',
              transition: 'border-color 0.2s, transform 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = '#ffffff66';
              e.currentTarget.style.transform = 'scale(1.02)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = '#ffffff18';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <img
              src={photo.src}
              alt={photo.caption}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
              padding: '20px 10px 8px',
              color: '#fff',
              fontSize: 'clamp(10px, 1vw, 14px)',
              fontWeight: 500,
              opacity: 0,
              transition: 'opacity 0.2s',
            }}
              onMouseEnter={e => e.currentTarget.style.opacity = '1'}
              onMouseLeave={e => e.currentTarget.style.opacity = '0'}
            >
              {photo.caption}
            </div>
          </div>
        ))}
      </div>
      {zoomed && <ZoomedLightbox photo={zoomed} onClose={() => setZoomed(null)} />}
    </div>
  );
}

export function PhotoAlbumPopup({ open, animateOut, onClose, onAnimationEnd }) {
  if (!open && !animateOut) return null;

  // Prevent flash: fade overlay out with animation
  return createPortal(
    <>
      <style>{`
        @keyframes slideUpAlbumPopup {
          from { transform: translateY(100vh); opacity: 0.5; }
          to   { transform: translateY(0);     opacity: 1;   }
        }
        @keyframes slideDownAlbumPopup {
          from { transform: translateY(0);     opacity: 1;   }
          to   { transform: translateY(100vh); opacity: 0.5; }
        }
        @keyframes fadeOutOverlay {
          from { opacity: 0.6; }
          to   { opacity: 0; }
        }
      `}</style>
      <div
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: '100vw', height: '100vh',
          background: 'rgba(0,0,0,0.6)',
          zIndex: 3000,
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          pointerEvents: 'auto',
          animation: animateOut ? 'fadeOutOverlay 0.5s linear forwards' : undefined,
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
              ? 'slideDownAlbumPopup 0.5s cubic-bezier(0.33,1,0.68,1) forwards'
              : 'slideUpAlbumPopup 0.5s cubic-bezier(0.33,1,0.68,1) forwards',
          }}
          onClick={e => e.stopPropagation()}
          onAnimationEnd={onAnimationEnd}
        >
          <PhotoAlbumContent />
        </div>
      </div>
    </>,
    document.body
  );
}