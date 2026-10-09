"use client";

import { useEffect } from "react";

const exitDelay = 1080;

export function NZLoadingScreen() {
  useEffect(() => {
    const root = document.documentElement;
    if (root.dataset.nzLoader !== "active") return;

    const finish = window.setTimeout(() => {
      delete root.dataset.nzLoader;
    }, exitDelay);

    return () => window.clearTimeout(finish);
  }, []);

  return (
    <div className="nz-loader-overlay" aria-hidden="true">
      <div className="nz-loader-orbit" aria-hidden="true">
        <span className="nz-loader-particle particle-one" />
        <span className="nz-loader-particle particle-two" />
        <span className="nz-loader-particle particle-three" />
        <span className="nz-loader-particle particle-four" />
        <svg className="nz-loader-mark" viewBox="0 0 220 150" role="presentation">
          <defs>
            <linearGradient id="nz-stroke" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#f4f7fb" />
              <stop offset="0.48" stopColor="#bfe9eb" />
              <stop offset="1" stopColor="#62ddd5" />
            </linearGradient>
            <linearGradient id="nz-sheen" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#62ddd5" stopOpacity="0" />
              <stop offset="0.48" stopColor="#ffffff" />
              <stop offset="1" stopColor="#62ddd5" stopOpacity="0" />
            </linearGradient>
            <filter id="nz-glow" x="-35%" y="-35%" width="170%" height="170%">
              <feGaussianBlur stdDeviation="2.4" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <clipPath id="nz-letters">
              <path d="M45 112V38h18l45 51V38h18v74h-18L63 61v51H45Z M139 38h19l12 24 12-24h19l-22 37v37h-18V75l-22-37Z" />
            </clipPath>
          </defs>
          <circle className="nz-loader-ring ring-back" cx="110" cy="75" r="63" />
          <circle className="nz-loader-ring ring-front" cx="110" cy="75" r="70" />
          <path className="nz-loader-letter" d="M45 112V38h18l45 51V38h18v74h-18L63 61v51H45Z M139 38h19l12 24 12-24h19l-22 37v37h-18V75l-22-37Z" pathLength="1" />
          <rect className="nz-loader-sheen" x="15" y="0" width="46" height="150" fill="url(#nz-sheen)" clipPath="url(#nz-letters)" />
        </svg>
      </div>
      <div className="nz-loader-name">NZAYISENGA <span>ERNESTE</span></div>
      <div className="nz-loader-rule" />
    </div>
  );
}