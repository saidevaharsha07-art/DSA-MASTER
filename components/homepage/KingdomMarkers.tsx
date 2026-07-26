// components/homepage/KingdomMarkers.tsx
import React from "react";
import { worlds } from "@/components/journey/worldData";
import styles from "../../styles/homepage.module.css";

export default function KingdomMarkers() {
  return (
    <div className={styles?.markersLayer || ""}>
      {Object.values(worlds).map((world) => (
        <div
          key={world.id}
          style={{
            position: "absolute",
            left: `${world.x * 100}%`,
            top: `${world.y * 100}%`,
            transform: "translate(-50%, -50%)",
            pointerEvents: "auto",
          }}
        >
          <div
            style={{
              padding: "4px 8px",
              background: "rgba(10, 14, 26, 0.85)",
              border: "1px solid rgba(124, 92, 255, 0.5)",
              borderRadius: "6px",
              color: "#fff",
              fontSize: "10px",
              whiteSpace: "nowrap",
            }}
          >
            {world.id}. {world.name}
          </div>
        </div>
      ))}
    </div>
  );
}
