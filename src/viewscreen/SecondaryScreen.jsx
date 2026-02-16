import { useAtomValue } from 'jotai';
import { navigationAtom } from '../state/navigationAtom';

// Content for left and right screens per route
const leftContent = {
  hero: { type: 'image', value: '/assets/secondary/panel1.png' },
  about: { type: 'image', value: '/assets/secondary/panel2.png' },
  projects: { type: 'text', value: 'Left: Project status' },
  contact: { type: 'image', value: '/assets/secondary/contact-left.png' }
};

const rightContent = {
  hero: { type: 'image', value: '/assets/secondary/ship1.png' },
  about: { type: 'image', value: '/assets/secondary/about-right.png' },
  projects: { type: 'text', value: 'Right: Project status' },
  contact: { type: 'image', value: '/assets/secondary/contact-right.png' }
};

export function SecondaryScreen({ side }) {
  const route = useAtomValue(navigationAtom);
  const content = side === 'left' ? leftContent[route] : rightContent[route];
  if (!content) return null;

  if (content.type === 'image') {
    return (
      <div style={{ width: '100%', height: '100%', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img src={content.value} alt={route + '-' + side} style={{ maxWidth: '90%', maxHeight: '90%' }} />
      </div>
    );
  }
  return (
    <div style={{ width: '100%', height: '100%', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 82, textAlign: 'center', padding: 32 }}>
      {content.value}
    </div>
  );
}
