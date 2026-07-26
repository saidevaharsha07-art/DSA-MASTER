// components/homepage/WorldViewport.tsx
import React from "react";
import Image from "next/image";
import RoadsOverlay from "./RoadsOverlay";
import KingdomMarkers from "./KingdomMarkers";
import styles from "../../styles/homepage.module.css";
import worldImage from "../../public/assets/homepage/continent.jpg"; // next will handle static import

export default function WorldViewport() {
  return (
    <div className={styles.worldViewport}>
      {/* Background continent image */}
      <Image
        src={worldImage}
        alt="Fantasy continent"
        fill
        priority
        style={{ objectFit: "cover" }}
        quality={100}
      />
      {/* Overlays */}
      <RoadsOverlay />
      <KingdomMarkers />
    </div>
  );
}
