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
        top: 20,
        left: 20,
        right: 20,
        height: 64,
        background: '#0a0a0a',
        padding: '8px',
        display: 'flex',
        alignItems: 'stretch',
        boxSizing: 'border-box',
        zIndex: 1000,
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      <div
        style={{
          display: 'flex',
          width: '100%',
          gap: 8, // space between buttons
        }}
      >
        {navItems.map(({ label, route }) => {
          const active = current === route;

          return (
            <button
              key={route}
              onClick={() => setNavigation(route)}
              style={{
                flex: 1,
                background: active ? '#e8e8e8' : 'transparent',
                border: '1px solid #2a2a2a',
                borderRadius: 0,
                color: active ? '#111' : '#e0e0e0',
                fontSize: 15,
                fontWeight: 400,
                padding: '12px 20px',
                cursor: 'pointer',
                textAlign: 'left',
                display: 'flex',
                alignItems: 'center',
                boxSizing: 'border-box',
                transition: 'background 0.15s ease, color 0.15s ease',
              }}
              onMouseEnter={(e) => {
                if (!active) e.currentTarget.style.background = '#111';
              }}
              onMouseLeave={(e) => {
                if (!active) e.currentTarget.style.background = 'transparent';
              }}
            >
              {label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
