'use client';

import React from 'react';

/**
 * Animated Transitioning Background for Wangaratta Radiators
 * Subtle rebar grid and aggregate texture over an industrial gradient.
 */
export function ScrollingBackground() {
  return (
    <>
      <style>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes patternFadeGrid {
          0%, 100% { opacity: 0.08; }
          50% { opacity: 0.03; }
        }
        .bg-animate-gradient {
          background-size: 200% 200%;
          animation: gradientShift 20s ease infinite;
        }
        .pattern-grid {
          animation: patternFadeGrid 12s ease-in-out infinite;
        }
      `}</style>
      <div 
        className="absolute inset-0 -z-20 pointer-events-none w-full min-h-full bg-animate-gradient"
        style={{ 
          backgroundImage: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%, #f8fafc 100%)',
        }}
      >
        {/* Rebar Grid Pattern */}
        <svg className="w-full h-full fixed pattern-grid" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="Radiators-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path fill="none" stroke="#334155" strokeWidth="1" d="M60 0 L0 0 0 60" />
              <circle cx="0" cy="0" r="1.5" fill="#f59e0b" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#Radiators-grid)" />
        </svg>
      </div>
    </>
  );
}
