import React, { useState, useEffect } from 'react';
import { Viewscreen } from '../viewscreen/Viewscreen';

export default function RightControlPanel({
  pendingTab,
  currentTab,
  setSpeed,
  setNavigation,
  setEnhancedScreen,
  enhancedScreen
}) {
  // Animation state for enhanced popup
  const [showEnhanced, setShowEnhanced] = useState(false);
  const [animateOut, setAnimateOut] = useState(false);

  // Sync showEnhanced with enhancedScreen (open)
  useEffect(() => {
    if (enhancedScreen) {
      setShowEnhanced(true);
      setAnimateOut(false);
    }
    // Only hide after animation, not immediately
    if (!enhancedScreen && showEnhanced) {
      setAnimateOut(true);
    }
    // eslint-disable-next-line
  }, [enhancedScreen]);

  // Handle close (triggers animation)
  const handleCloseEnhanced = () => {
    setAnimateOut(true);
  };

  // After animation, unmount and update parent
  const handleAnimationEnd = () => {
    if (animateOut) {
      setShowEnhanced(false);
      setAnimateOut(false);
      // Only update parent if still open
      if (enhancedScreen) setEnhancedScreen(false);
    }
  };
  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flex: 1, minHeight: 0 }}>
        <div
          style={{
            fontSize: 11,
            color: pendingTab !== currentTab ? '#fff' : '#666',
            minHeight: 16,
            transition: 'color 0.2s',
            fontFamily: 'system-ui, sans-serif',
            padding: 0
          }}
        >
          {pendingTab !== currentTab ? 'READY TO ENGAGE' : 'PLOT A COURSE FIRST'}
        </div>
        <button
          style={{
            flex: 1,
            minHeight: 80,
            background: pendingTab === currentTab ? '#333' : '#fff',
            border: '1px solid #333',
            color: pendingTab === currentTab ? '#666' : '#111',
            fontWeight: 500,
            fontSize: 14,
            padding: 0,
            cursor: pendingTab === currentTab ? 'not-allowed' : 'pointer',
            fontFamily: 'system-ui, sans-serif',
            outline: 'none',
            margin: 0,
            transition: 'background 0.15s, color 0.15s',
            textTransform: 'uppercase',
          }}
          disabled={pendingTab === currentTab}
          onClick={() => {
            if (pendingTab !== currentTab) {
              window.dispatchEvent(new CustomEvent("captain-speech", { detail: { type: "engage" } }));
              setTimeout(() => {
                setSpeed('warp');
                setNavigation(pendingTab === 'home' ? 'home' : pendingTab);
              }, 1100);
            }
          }}
        >
          ENGAGE
        </button>
        <div style={{ display: 'flex', gap: 8, flex: 1, minHeight: 60 }}>
          <button
            style={{
              flex: 1,
              border: '1px solid #333',
              background: 'transparent',
              color: '#fff',
              fontWeight: 500,
              fontSize: 12,
              cursor: 'pointer',
              fontFamily: 'system-ui, sans-serif',
              outline: 'none',
              margin: 0,
              padding: 0,
              transition: 'background 0.15s, color 0.15s',
              textTransform: 'uppercase',
            }}
            onClick={() => {
              window.dispatchEvent(new CustomEvent("captain-speech", { detail: { type: "enhance" } }));
              setTimeout(() => {
                setEnhancedScreen(true);
              }, 1200); // 1.2s delay before popup
            }}
          >
            ENHANCE
          </button>
        </div>
      </div>
      {showEnhanced && (
        <>
          <style>{`
            @keyframes slideUpEnhancedPopup {
              from {
                transform: translateY(100vh);
                opacity: 0.5;
              }
              to {
                transform: translateY(0);
                opacity: 1;
              }
            }
            @keyframes slideDownEnhancedPopup {
              from {
                transform: translateY(0);
                opacity: 1;
              }
              to {
                transform: translateY(100vh);
                opacity: 0.5;
              }
            }
          `}</style>
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              background: 'rgba(0,0,0,0.6)',
              zIndex: 3000,
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'center',
              pointerEvents: 'auto',
            }}
            onClick={handleCloseEnhanced}
          >
            <div
              style={{
                width: '55%',
                height: '84%',
                marginTop: 120,
                maxWidth: 1920,
                maxHeight: 1080,
                background: '#181828',
                boxShadow: '0 0 64px #000a',
                overflow: 'hidden',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                animation: `${animateOut ? 'slideDownEnhancedPopup' : 'slideUpEnhancedPopup'} 0.5s cubic-bezier(0.33,1,0.68,1)`,
              }}
              onClick={e => e.stopPropagation()}
              onAnimationEnd={handleAnimationEnd}
            >
              {/* CLOSE button removed as requested */}
              {/* Main viewscreen popup */}
              <div style={{ width: '100%', height: '100%' }}>
                <Viewscreen enhanced />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
