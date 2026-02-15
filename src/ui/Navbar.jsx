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
        background: 'rgba(20,20,40,0.92)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
        boxShadow: '0 2px 16px #000a',
        borderBottom: '1px solid #23234a',
      }}
    >
      {navItems.map(({ label, route }) => (
        <button
          key={route}
          onClick={() => setNavigation(route)}
          style={{
            background: 'none',
            border: 'none',
            color: current === route ? '#e87d2f' : '#fff',
            fontWeight: 600,
            fontSize: 16,
            margin: '0 24px',
            padding: '8px 0',
            cursor: 'pointer',
            borderBottom: current === route ? '2px solid #e87d2f' : '2px solid transparent',
            transition: 'color 0.2s, border-bottom 0.2s',
            letterSpacing: 1,
          }}
        >
          {label}
        </button>
      ))}
    </nav>
  );
}
