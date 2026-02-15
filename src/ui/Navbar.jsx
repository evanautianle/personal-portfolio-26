import { useSetAtom, useAtomValue } from 'jotai';
import { navigationAtom } from '../state/navigationAtom';

const navItems = [
  { label: 'Hero', route: 'hero' },
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
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: 56,
        background: '#f4f4f6',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
        boxShadow: '0 2px 8px #0002',
        borderBottom: '1px solid #d1d1d6',
      }}
    >
      {navItems.map(({ label, route }) => (
        <button
          key={route}
          onClick={() => setNavigation(route)}
          style={{
            background: current === route ? '#e0e0e0' : 'none',
            border: 'none',
            color: '#222',
            fontWeight: 600,
            fontSize: 16,
            margin: '0 24px',
            padding: '8px 0',
            cursor: 'pointer',
            borderBottom: current === route ? '2px solid #888' : '2px solid transparent',
            transition: 'color 0.2s, border-bottom 0.2s, background 0.2s',
            letterSpacing: 1,
            borderRadius: 4,
          }}
        >
          {label}
        </button>
      ))}
    </nav>
  );
}
