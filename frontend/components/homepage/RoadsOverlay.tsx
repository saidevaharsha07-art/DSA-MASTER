// components/homepage/RoadsOverlay.tsx
import React from "react";
import { roadPath } from "@/src/design/worldData";
import styles from "@/frontend/styles/homepage.module.css";

export default function RoadsOverlay() {
  // The road is drawn as an SVG path that we animate using CSS keyframes.
  return (
    <svg
      className={styles.roadsOverlay}
      viewBox="0 0 3840 2160"
      preserveAspectRatio="xMidYMid slice"
    >
      <path
        d={roadPath}
        className={styles.roadPath}
        stroke="url(#goldGradient)"
        strokeWidth="12"
        fill="none"
        strokeDasharray="1000"
        strokeDashoffset="1000"
      />
      <defs>
        <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ffd700" />
          <stop offset="100%" stopColor="#ffb700" />
        </linearGradient>
      </defs>
    </svg>
  );
}
