import { useSetAtom, useAtomValue } from 'jotai';
import { navigationAtom } from '../state/navigationAtom';

const navItems = [
  { label: 'Home', route: 'home' },
  { label: 'About', route: 'about' },
  { label: 'Projects', route: 'projects' },
  { label: 'Contact', route: 'contact' },
];

export function Navbar() {
  const setNavigation = useSetAtom(navigationAtom);
  const current = useAtomValue(navigationAtom);
  
  return (
    <nav
      style={{
        position: 'fixed',
        top: 24,
        left: '50%',
        transform: 'translateX(-50%)',
        background: '#1a1a1a',
        borderRadius: 50,
        padding: '12px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
        zIndex: 1000,
      }}
    >
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: '50%',
          background: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: 8,
          cursor: 'pointer',
        }}
      >
        <span style={{ fontSize: 20 }}>👤</span>
      </div>

      {navItems.map(({ label, route }) => (
        <button
          key={route}
          onClick={() => setNavigation(route)}
          style={{
            background: 'transparent',
            border: 'none',
            color: current === route ? '#fff' : '#a0a0a0',
            fontWeight: 500,
            fontSize: 14,
            padding: '8px 16px',
            cursor: 'pointer',
            borderRadius: 20,
            transition: 'all 0.2s ease',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          }}
          onMouseOver={e => {
            e.currentTarget.style.color = '#fff';
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
          }}
          onMouseOut={e => {
            e.currentTarget.style.color = current === route ? '#fff' : '#a0a0a0';
            e.currentTarget.style.background = 'transparent';
          }}
        >
          {label}
        </button>
      ))}

      <div
        style={{
          background: '#fff',
          color: '#1a1a1a',
          padding: '8px 20px',
          borderRadius: 20,
          fontSize: 14,
          fontWeight: 500,
          marginLeft: 8,
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        }}
      >
        your@email.com
      </div>
    </nav>
  );
}