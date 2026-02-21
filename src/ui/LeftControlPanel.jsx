import React, { useState, useEffect } from 'react';

export default function LeftControlPanel({
  routes,
  cardIndex,
  setCardIndex,
  pendingTab,
  currentTab,
  plotCourse
}) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        boxSizing: 'border-box',
      }}
    >
      {/* STATUS */}
      <div
        style={{
          fontSize: 12,
          fontWeight: 600,
          letterSpacing: 2,
          marginBottom: 10,
          textAlign: 'center',
          textTransform: 'uppercase',
          color: pendingTab !== currentTab ? '#fff' : '#555',
          transition: 'all 0.25s ease',
          width: '100%',
        }}
      >
        {pendingTab !== currentTab
          ? `COURSE PLOTTED: ${pendingTab.toUpperCase()}`
          : 'PLOT A COURSE'}
      </div>
      {/* SLIDER RAIL */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: 260,
          height: 200,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        {routes.map((route, i) => {
          const offset = i - cardIndex;
          const isCentered = i === cardIndex;
          const isSelected = route === pendingTab && pendingTab !== currentTab;
          return (
            <div
              key={route}
              onClick={() => setCardIndex(i)}
              style={{
                position: 'absolute',
                width: isCentered ? 140 : 100,
                height: isCentered ? 100 : 80,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: isCentered ? 18 : 14,
                fontWeight: 600,
                letterSpacing: 2,
                cursor: 'pointer',
                transition: 'all 0.35s ease',
                transform: `translateX(${offset * 80}px) scale(${isCentered ? 1 : 0.85})`,
                background: isSelected ? '#fff' : '#000',
                color: isSelected ? '#000' : '#fff',
                border: isCentered ? '1px solid #fff' : '1px solid #444',
                opacity: Math.abs(offset) > 1 ? 0 : 1,
                zIndex: isCentered ? 2 : 1,
                textTransform: 'uppercase',
              }}
            >
              {route.toUpperCase()}
            </div>
          );
        })}
      </div>
      {/* INDICATORS */}
      <div
        style={{
          marginTop: 16,
          display: 'flex',
          gap: 6,
        }}
      >
        {routes.map((_, i) => (
          <div
            key={i}
            style={{
              width: i === cardIndex ? 22 : 10,
              height: 2,
              background: i === cardIndex ? '#fff' : '#333',
              transition: 'all 0.25s ease',
            }}
          />
        ))}
      </div>
      {/* SELECT BUTTON */}
      <button
        onClick={plotCourse}
        disabled={routes[cardIndex] === currentTab}
        style={{
          marginTop: 24,
          width: '100%',
          height: 42,
          border: '1px solid #fff',
          background:
            routes[cardIndex] === currentTab ? '#111' : '#fff',
          color:
            routes[cardIndex] === currentTab ? '#555' : '#000',
          fontWeight: 600,
          letterSpacing: 2,
          fontSize: 12,
          cursor:
            routes[cardIndex] === currentTab
              ? 'not-allowed'
              : 'pointer',
          textTransform: 'uppercase',
          transition: 'all 0.2s ease',
        }}
      >
        {routes[cardIndex] === currentTab
          ? 'CURRENT DESTINATION'
          : 'SELECT COURSE'}
      </button>
    </div>
  );
}
