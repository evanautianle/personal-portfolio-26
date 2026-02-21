import { useState } from 'react';
import { useSetAtom, useAtomValue } from 'jotai';
import { navigationAtom } from '../state/navigationAtom';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import './ui-text.css';

const LINKS = [
  { icon: <FaGithub />, href: 'https://github.com/evanau', label: 'GitHub' },
  { icon: <FaLinkedin />, href: 'https://linkedin.com/in/evanau', label: 'LinkedIn' },
  {
    icon: (
      <svg height="20" width="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="4" width="20" height="16" />
        <polyline points="2,4 12,14 22,4" />
      </svg>
    ),
    href: 'mailto:evan.au@email.com',
    label: 'Email',
  },
];

const styles = `
  .navbar-root {
    position: fixed;
    top: 16px;
    left: 16px;
    right: 16px;
    height: 64px;
    z-index: 1000;
    display: flex;
  }

  .navbar-bar {
    display: flex;
    width: 100%;
    height: 100%;
    background: #0a0a0a;
    border: 1px solid #222;
    box-shadow: 0 0 12px rgba(0,0,0,0.6);
    align-items: center;
  }

  .navbar-left {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 10px;
    padding-left: 20px;
    border-right: 1px solid #222;
    height: 100%;
  }

  .navbar-center {
    width: 260px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    border-right: 1px solid #222;
    border-left: 1px solid #222;
    height: 100%;
  }

  .navbar-title {
    font-size: 18px;
    font-weight: 700;
    color: #e0e0e0;
    letter-spacing: 4px;
  }

  .navbar-right {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 18px;
    padding-right: 20px;
    height: 100%;
  }

  .navbar-btn {
    background: transparent;
    color: #cfd8dc;
    border: 1px solid #2a2a2a;
    padding: 6px 16px;
    font-weight: 600;
    cursor: pointer;
    font-size: 13px;
    letter-spacing: 1.2px;
    transition: all 0.15s ease;
    white-space: nowrap;
  }
  .navbar-btn:hover {
    background: #1a1a1a;
    border-color: #4FC3F7;
    color: #4FC3F7;
  }

  .navbar-icon-link {
    color: #9e9e9e;
    font-size: 22px;
    display: flex;
    align-items: center;
    transition: all 0.15s ease;
    text-decoration: none;
  }
  .navbar-icon-link:hover {
    color: #4FC3F7;
    transform: translateY(-1px);
  }

  .navbar-hamburger {
    display: none;
    background: transparent;
    border: 1px solid #2a2a2a;
    color: #cfd8dc;
    cursor: pointer;
    padding: 6px 10px;
    font-size: 20px;
    transition: all 0.15s ease;
    margin-right: 16px;
    line-height: 1;
  }
  .navbar-hamburger:hover {
    border-color: #4FC3F7;
    color: #4FC3F7;
  }

  .navbar-drawer {
    display: none;
    position: fixed;
    top: 96px;
    left: 16px;
    right: 16px;
    background: #0a0a0a;
    border: 1px solid #222;
    box-shadow: 0 8px 24px rgba(0,0,0,0.7);
    z-index: 999;
    flex-direction: column;
    padding: 16px 20px;
    gap: 12px;
  }
  .navbar-drawer.open {
    display: flex;
  }
  .navbar-drawer-section {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
  }
  .navbar-drawer-divider {
    height: 1px;
    background: #222;
    width: 100%;
  }

  /* Tablet (<=900px): hide left buttons, show hamburger */
  @media (max-width: 900px) {
    .navbar-left {
      display: none;
    }
    .navbar-center {
      width: auto;
      flex: 1;
      border-left: none;
      justify-content: flex-start;
      padding-left: 20px;
    }
    .navbar-hamburger {
      display: block;
    }
  }

  /* Mobile (<=520px): hide icon links in bar, show in drawer */
  @media (max-width: 520px) {
    .navbar-right .navbar-icon-link {
      display: none;
    }
    .navbar-center {
      border-right: none;
    }
  }
`;

export function Navbar() {
  const setNavigation = useSetAtom(navigationAtom);
  const current = useAtomValue(navigationAtom);
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <style>{styles}</style>

      <div className="navbar-root">
        <div className="navbar-bar navbar-text-style">

          {/* LEFT — hidden on tablet/mobile */}
          <div className="navbar-left">
            {['HOW TO USE', 'SIMPLE VIEW'].map((text) => (
              <button key={text} className="navbar-btn navbar-text-style">
                {text}
              </button>
            ))}
          </div>

          {/* CENTER */}
          <div className="navbar-center">
            <span className="navbar-title navbar-text-style">EVAN AU</span>
          </div>

          {/* RIGHT */}
          <div className="navbar-right">
            {LINKS.map(({ icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="navbar-icon-link"
              >
                {icon}
              </a>
            ))}

            {/* Hamburger — visible on tablet/mobile only */}
            <button
              className="navbar-hamburger navbar-text-style"
              aria-label={drawerOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setDrawerOpen((o) => !o)}
            >
              {drawerOpen ? '✕' : '☰'}
            </button>
          </div>

        </div>
      </div>

      {/* Drawer — slides in below the bar on tablet/mobile */}
      <div className={`navbar-drawer navbar-text-style${drawerOpen ? ' open' : ''}`}>
        <div className="navbar-drawer-section">
          {['HOW TO USE', 'SIMPLE VIEW'].map((text) => (
            <button key={text} className="navbar-btn navbar-text-style">
              {text}
            </button>
          ))}
        </div>
        <div className="navbar-drawer-divider" />
        <div className="navbar-drawer-section" style={{ gap: 20 }}>
          {LINKS.map(({ icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="navbar-icon-link"
            >
              {icon}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}