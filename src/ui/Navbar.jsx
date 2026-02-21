import { useState, useEffect } from 'react';
import { useSetAtom, useAtomValue } from 'jotai';
import { navigationAtom } from '../state/navigationAtom';
import { simpleViewAtom } from '../state/simpleViewAtom';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import './ui-text.css';
import HowToUsePopup from './howToUse';

const LINKS = [
  { icon: <FaGithub />, href: 'https://github.com/evanautianle', label: 'GitHub' },
  { icon: <FaLinkedin />, href: 'https://www.linkedin.com/in/evan-au-01667630a/', label: 'LinkedIn' },
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
  :root {
    --navbar-height: clamp(48px, 6vh, 72px);
    --navbar-side: 0px; /* full-width: no side inset */
    --navbar-padding: clamp(8px, 1.2vw, 20px);
    --navbar-gap: clamp(8px, 1.2vw, 18px);
    --center-min: clamp(140px, 26vw, 320px);
  }

  .navbar-root {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: var(--navbar-height);
    z-index: 1000;
    display: flex;
    overflow: visible;
  }

  .navbar-bar {
    display: flex;
    position: relative;
    width: 100%;
    height: 100%;
    background: #0a0a0a;
    border: 1px solid #222;
    box-shadow: 0 0 12px rgba(0,0,0,0.6);
    align-items: center;
    padding: 0 var(--navbar-padding);
    gap: var(--navbar-gap);
    overflow: visible;
  }

  .navbar-left {
    flex: 1 1 auto;
    display: flex;
    align-items: center;
    gap: calc(var(--navbar-gap) / 1.5);
    padding-left: calc(var(--navbar-padding) / 1.2);
    height: 100%;
  }

  .navbar-center {
    flex: 0 0 var(--center-min);
    display: flex;
    align-items: center;
    justify-content: center;
    /* absolutely center the title irrespective of left/right content */
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    gap: calc(var(--navbar-gap) * 0.8);
    height: 100%;
    pointer-events: none; /* allow clicks to pass through to left/right if needed */
  }

  /* ensure children (the title) can still receive pointer events */
  .navbar-center > * { pointer-events: auto; }

  .navbar-title {
    font-size: clamp(16px, 1.8vw, 20px);
    font-weight: 700;
    color: #e0e0e0;
    letter-spacing: 0.25em;
  }

  .navbar-right {
    flex: 1 1 auto;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: calc(var(--navbar-gap) * 1.1);
    padding-right: calc(var(--navbar-padding) / 1.2);
    height: 100%;
  }

  .navbar-btn {
    background: transparent;
    color: #cfd8dc;
    border: 1px solid #2a2a2a;
    padding: clamp(6px, 0.8vh, 10px) clamp(10px, 1.6vw, 16px);
    font-weight: 600;
    cursor: pointer;
    font-size: clamp(12px, 1.2vw, 14px);
    text-decoration: none;
    line-height: 1.2;
    letter-spacing: 0.08em;
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
    font-size: clamp(18px, 2.2vw, 24px);
    display: flex;
    align-items: center;
    transition: all 0.15s ease;
    text-decoration: none;
  }
  .navbar-icon-link:hover {
    color: #4FC3F7;
    transform: translateY(-2px);
  }

  .navbar-hamburger {
    display: none;
    background: transparent;
    border: 1px solid #2a2a2a;
    color: #cfd8dc;
    cursor: pointer;
    padding: clamp(6px,0.8vh,10px) clamp(8px,1.2vw,12px);
    font-size: clamp(16px,2.4vw,22px);
    transition: all 0.15s ease;
    margin-right: calc(var(--navbar-gap) / 1.2);
    line-height: 1;
  }
  .navbar-hamburger:hover {
    border-color: #4FC3F7;
    color: #4FC3F7;
  }

  .navbar-drawer {
    display: none;
    position: fixed;
    top: var(--navbar-height);
    left: 0;
    right: 0;
    background: #0a0a0a;
    border: 1px solid #222;
    box-shadow: 0 8px 24px rgba(0,0,0,0.7);
    z-index: 999;
    flex-direction: column;
    padding: calc(var(--navbar-padding) * 0.9);
    gap: calc(var(--navbar-gap) * 0.8);
  }
  .navbar-drawer.open {
    display: flex;
  }
  .navbar-drawer-section {
    display: flex;
    align-items: center;
    gap: calc(var(--navbar-gap) / 1.5);
    flex-wrap: wrap;
  }
  .navbar-drawer-divider {
    height: 1px;
    background: #222;
    width: 100%;
  }

  /* Tablet: hide left buttons, show hamburger */
  @media (max-width: 900px) {
    .navbar-left { display: none; }
    /* revert to normal flow on tablet so the center behaves like a normal flex item */
    .navbar-center { position: static; transform: none; flex: 1 1 auto; min-width: 0; pointer-events: auto; }
    .navbar-hamburger { display: block; }
  }

  /* Mobile: hide icon links in bar, show in drawer */
  @media (max-width: 520px) {
    .navbar-right .navbar-icon-link { display: none; }
  }

  /* Center links for SimpleSite: left/right with fade + slide */
  .navbar-links {
    display: flex;
    gap: 12px;
    opacity: 0;
    transform: translateY(-50%) translateX(0);
    transition: opacity 0.35s ease, transform 0.35s ease;
    align-items: center;
    white-space: nowrap;
  }
  .navbar-links.active {
    opacity: 1;
    transform: translateY(-50%) translateX(0);
  }
  .navbar-links.left { transform: translateY(-50%) translateX(-1.25rem); }
  .navbar-links.right { transform: translateY(-50%) translateX(1.25rem); }

  .navbar-simple-links {
    display: flex;
    gap: 10px;
    opacity: 0;
    transform: translateY(0);
    transition: opacity 0.28s ease, transform 0.28s ease;
    align-items: center;
  }
  .navbar-simple-links.active { opacity: 1; transform: translateY(0); }
`;

export function Navbar() {
  const setNavigation = useSetAtom(navigationAtom);
  const current = useAtomValue(navigationAtom);
  const simpleView = useAtomValue(simpleViewAtom);
  const setSimpleView = useSetAtom(simpleViewAtom);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [howOpen, setHowOpen] = useState(false);
  const [howAnimateOut, setHowAnimateOut] = useState(false);

  useEffect(() => {
    if (simpleView) {
      try {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      } catch (e) {
        // ignore in non-browser environments
      }
    }
  }, [simpleView]);

  const SIMPLE_LINKS = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleSimpleLinkClick = (e, href) => {
    if (!simpleView) return; // let normal anchors work when not in simple view
    e.preventDefault();
    try {
      const overlay = document.getElementById('simplesite-overlay');
      const target = overlay ? overlay.querySelector(href) : document.querySelector(href);
      if (!target) return;
      if (!overlay) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
      const overlayRect = overlay.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();
      const navbar = document.querySelector('.navbar-root');
      const navbarHeight = navbar ? navbar.getBoundingClientRect().height : 64;
      // dynamic margin based on navbar height for responsive layouts
      const margin = Math.round(navbarHeight * 1.25);
      const offset = navbarHeight + margin;
      const scrollTop = overlay.scrollTop + (targetRect.top - overlayRect.top) - offset;
      overlay.scrollTo({ top: Math.max(0, scrollTop), behavior: 'smooth' });
    } catch (err) {
      // fallback: let browser handle it
      try { window.location.hash = href; } catch (e) {}
    }
  };

  const handleOpenHow = () => {
    setHowAnimateOut(false);
    setHowOpen(true);
  };

  const handleCloseHow = () => setHowAnimateOut(true);

  const handleHowAnimationEnd = () => {
    if (howAnimateOut) {
      setHowOpen(false);
      setHowAnimateOut(false);
    }
  };

  return (
    <>
      <style>{styles}</style>

      <div className="navbar-root">
        <div className="navbar-bar navbar-text-style">

          {/* LEFT — hidden on tablet/mobile */}
          <div className="navbar-left">
            {['HOW TO USE', 'SIMPLE VIEW'].map((text) => (
              <button
                key={text}
                className="navbar-btn navbar-text-style"
                onClick={() => {
                  if (text === 'HOW TO USE') handleOpenHow();
                  if (text === 'SIMPLE VIEW') setSimpleView((s) => !s);
                }}
              >
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
            <div className={`navbar-simple-links ${simpleView ? 'active' : ''}`}>
              {SIMPLE_LINKS.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="navbar-btn navbar-text-style"
                  style={{ padding: '6px 10px' }}
                  onClick={(e) => handleSimpleLinkClick(e, href)}
                >
                  {label}
                </a>
              ))}
            </div>
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
            <button
              key={text}
              className="navbar-btn navbar-text-style"
              onClick={() => {
                if (text === 'HOW TO USE') handleOpenHow();
                if (text === 'SIMPLE VIEW') setSimpleView((s) => !s);
                setDrawerOpen(false);
              }}
            >
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
      <HowToUsePopup
        open={howOpen}
        animateOut={howAnimateOut}
        onClose={handleCloseHow}
        onAnimationEnd={handleHowAnimationEnd}
      />
    </>
  );
}