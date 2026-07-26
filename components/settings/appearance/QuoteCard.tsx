"use client";

import React from "react";
import Image from "next/image";
import { Quote } from "lucide-react";

export function QuoteCard() {
  return (
    <div
      style={{
        position: "relative",
        height: "170px",
        borderRadius: "20px",
        overflow: "hidden",
        border: "1px solid rgba(255, 255, 255, 0.12)",
        boxShadow: "0 25px 80px rgba(0, 0, 0, 0.45)",
      }}
    >
      <Image
        src="/assets/settings/wizard_quote.jpg"
        alt="Fantasy wizard artwork"
        fill
        sizes="(max-width: 768px) 100vw, 380px"
        style={{ objectFit: "cover" }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(135deg, rgba(9, 11, 20, 0.85) 0%, rgba(20, 10, 38, 0.8) 60%, rgba(124, 77, 255, 0.4) 100%)",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          padding: "20px",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Quote size={24} style={{ color: "#A970FF", opacity: 0.8, marginBottom: "8px" }} />
        <p
          style={{
            margin: 0,
            fontSize: "13px",
            fontStyle: "italic",
            fontWeight: 500,
            color: "#FFFFFF",
            lineHeight: 1.5,
            textShadow: "0 2px 4px rgba(0,0,0,0.8)",
          }}
        >
          &ldquo;Every setting you tweak, brings you closer to mastery.&rdquo;
        </p>
      </div>
    </div>
  );
}
