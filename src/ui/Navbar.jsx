
import { useSetAtom, useAtomValue } from 'jotai';
import { navigationAtom } from '../state/navigationAtom';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import './ui-text.css';

const navItems = [
  { label: 'Home', route: 'home' },
  { label: 'About', route: 'about' },
  { label: 'Projects', route: 'projects' },
  { label: 'Contact', route: 'contact' },
];

export function Navbar() {
  const setNavigation = useSetAtom(navigationAtom);
  const current = useAtomValue(navigationAtom);

  const buttonBase = {
    background: 'transparent',
    color: '#cfd8dc',
    border: '1px solid #2a2a2a',
    padding: '6px 16px',
    fontWeight: 600,
    cursor: 'pointer',
    fontSize: 13,
    letterSpacing: 1.2,
    transition: 'all 0.15s ease',
  };

  const buttonHover = {
    background: '#1a1a1a',
    borderColor: '#4FC3F7',
    color: '#4FC3F7',
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 16,
        left: 16,
        right: 16,
        height: 64,
        display: 'flex',
        zIndex: 1000,
        pointerEvents: 'none',
      }}
    >
      {/* Main Bar Container */}
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          background: '#0a0a0a',
          border: '1px solid #222',
          boxShadow: '0 0 12px rgba(0,0,0,0.6)',
          pointerEvents: 'auto',
        }}
      >
        {/* LEFT */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            paddingLeft: 20,
            borderRight: '1px solid #222',
          }}
        >
          {['HOW TO USE', 'SIMPLE VIEW'].map((text) => (
            <button
              key={text}
              style={buttonBase}
              className="navbar-text-style"
              onMouseEnter={(e) =>
                Object.assign(e.currentTarget.style, buttonBase, buttonHover)
              }
              onMouseLeave={(e) =>
                Object.assign(e.currentTarget.style, buttonBase)
              }
            >
              {text}
            </button>
          ))}
        </div>

        {/* CENTER */}
        <div
          style={{
            width: 260,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRight: '1px solid #222',
            borderLeft: '1px solid #222',
          }}
        >
          <span
            className="navbar-text-style"
            style={{
              fontSize: 18,
              fontWeight: 700,
              color: '#e0e0e0',
              letterSpacing: 4,
            }}
          >
            EVAN AU
          </span>
        </div>

        {/* RIGHT */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            gap: 18,
            paddingRight: 20,
          }}
        >
          {[
            {
              icon: <FaGithub />,
              href: 'https://github.com/evanau',
              label: 'GitHub',
            },
            {
              icon: <FaLinkedin />,
              href: 'https://linkedin.com/in/evanau',
              label: 'LinkedIn',
            },
            {
              icon: (
                <svg
                  height="24"
                  width="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="2" y="4" width="20" height="16" />
                  <polyline points="2,4 12,14 22,4" />
                </svg>
              ),
              href: 'mailto:evan.au@email.com',
              label: 'Email',
            },
          ].map(({ icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              style={{
                color: '#9e9e9e',
                fontSize: 22,
                transition: 'all 0.15s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#4FC3F7';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#9e9e9e';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {icon}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
