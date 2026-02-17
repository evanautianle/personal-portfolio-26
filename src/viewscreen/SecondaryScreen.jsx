import { useAtomValue } from 'jotai';
import { navigationAtom } from '../state/navigationAtom';

// Content for left and right screens per route
const leftContent = {
  home: { type: 'image', value: '/assets/secondary/panel1.png' },
  about: { type: 'image', value: '/assets/secondary/panel2.png' },
  projects: { type: 'text', value: 'Left: Project status' },
  contact: { type: 'image', value: '/assets/secondary/contact-left.png' }
};

const rightContent = {
  home: { type: 'image', value: '/assets/secondary/ship1.png' },
  about: { type: 'image', value: '/assets/secondary/about-right.png' },
  projects: { type: 'text', value: 'Right: Project status' },
  contact: { type: 'image', value: '/assets/secondary/contact-right.png' }
};

export function SecondaryScreen({ side }) {
  const route = useAtomValue(navigationAtom);
  const content = side === 'left' ? leftContent[route] : rightContent[route];
  if (!content) return null;

  // Deep black with multiple diagonal glossy streaks for a realistic glass effect
  const gradientBg = `
    linear-gradient(135deg, #050505 0%, #181818 60%, #000 100%),
    repeating-linear-gradient(120deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.08) 8%, rgba(0,0,0,0) 16%, rgba(0,0,0,0) 32%),
    repeating-linear-gradient(120deg, rgba(255,255,255,0.10) 24%, rgba(255,255,255,0.04) 32%, rgba(0,0,0,0) 40%, rgba(0,0,0,0) 56%)
  `;
  if (content.type === 'image') {
    return (
      <div style={{ width: '100%', height: '100%', background: gradientBg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img src={content.value} alt={route + '-' + side} style={{ maxWidth: '90%', maxHeight: '90%' }} />
      </div>
    );
  }
  return (
    <div style={{ width: '100%', height: '100%', background: gradientBg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 82, textAlign: 'center', padding: 32 }}>
      {content.value}
    </div>
  );
}
