import { useSetAtom, useAtomValue } from 'jotai';
import { navigationAtom } from '../state/navigationAtom';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

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
        padding: '8px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxSizing: 'border-box',
        zIndex: 1000,
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <span style={{ fontSize: 22, fontWeight: 700, color: '#e0e0e0' }}>EVAN AU</span>
        <span style={{ fontSize: 14, color: '#b0b0b0' }}>Hi, my name is Evan Au. Welcome to my website!</span>
      </div>
      <div style={{ display: 'flex', gap: 16 }}>
        {/* GitHub Icon */}
        <a href="https://github.com/evanau" target="_blank" rel="noopener noreferrer" style={{ color: '#e0e0e0', fontSize: 28 }} aria-label="GitHub">
          <FaGithub />
        </a>
        {/* LinkedIn Icon */}
        <a href="https://linkedin.com/in/evanau" target="_blank" rel="noopener noreferrer" style={{ color: '#e0e0e0', fontSize: 28 }} aria-label="LinkedIn">
          <FaLinkedin />
        </a>
        {/* Email Icon */}
        <a href="mailto:evan.au@email.com" target="_blank" rel="noopener noreferrer" style={{ color: '#e0e0e0', fontSize: 28 }} aria-label="Email">
          <svg height="28" width="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="4" width="20" height="16" rx="2" ry="2" />
            <polyline points="2,4 12,14 22,4" />
          </svg>
        </a>
      </div>
    </nav>
  );
}
