import React from 'react';

export function DialogueBox({ text, speaker, imageUrl }) {
  return (
    <div style={{
      background: '#000',
      opacity: 0.65,
      color: '#fff',
      padding: '16px 20px',
      boxShadow: '0 2px 12px #0008',
      display: 'flex',
      alignItems: 'center',
      minWidth: 180,
      maxWidth: 420,
      fontSize: 18,
      fontFamily: 'inherit',
      gap: 16,
    }}>
      <div style={{ width: 48, height: 48, borderRadius: '50%', background: '#444', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', flexShrink: 0 }}>
        {imageUrl ? (
          <img src={imageUrl} alt={speaker} style={{ width: 48, height: 48, borderRadius: '50%' }} />
        ) : null}
      </div>
      <div>
        <div style={{ fontWeight: 'bold', marginBottom: 4 }}>{speaker}</div>
        <div>{text}</div>
      </div>
    </div>
  );
}
