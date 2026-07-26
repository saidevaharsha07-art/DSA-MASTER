// src/design/worldData.ts
// Data model for the 25 kingdoms. Coordinates are relative to the 3840x2160 continent image.
// All values are in pixels (x, y) with (0,0) at top‑left of the image.

export interface Kingdom {
  id: number; // 1‑25
  name: string;
  x: number;
  y: number;
  isBoss?: boolean;
}

export const kingdoms: Kingdom[] = [
  { id: 1, name: "Valley of Origins", x: 600, y: 1500 },
  { id: 2, name: "Number Hills", x: 900, y: 1400 },
  { id: 3, name: "Recursion Forest", x: 1200, y: 1300 },
  { id: 4, name: "Array Valley", x: 1500, y: 1250 },
  { id: 5, name: "Hash Forest (Boss)", x: 1800, y: 1200, isBoss: true },
  { id: 6, name: "Sliding River", x: 2100, y: 1150 },
  { id: 7, name: "Two Pointer Mountains", x: 2400, y: 1100 },
  { id: 8, name: "Prefix Plains", x: 2700, y: 1050 },
  { id: 9, name: "Binary Search Canyon", x: 3000, y: 1000 },
  { id: 10, name: "String City (Boss)", x: 3300, y: 950, isBoss: true },
  { id: 11, name: "Linked Lake", x: 1150, y: 1600 },
  { id: 12, name: "Stack Volcano", x: 1600, y: 800 },
  { id: 13, name: "Queue Harbor", x: 1400, y: 600 },
  { id: 14, name: "Tree Kingdom", x: 2000, y: 500 },
  { id: 15, name: "BST Castle (Boss)", x: 2300, y: 400, isBoss: true },
  { id: 16, name: "Heap Mine", x: 2600, y: 300 },
  { id: 17, name: "Greedy Desert", x: 3000, y: 200 },
  { id: 18, name: "Graph Empire", x: 3400, y: 400 },
  { id: 19, name: "Backtracking Jungle", x: 3800, y: 600 },
  { id: 20, name: "DP Temple (Boss)", x: 3500, y: 800, isBoss: true },
  { id: 21, name: "Bit Caverns", x: 3200, y: 1000 },
  { id: 22, name: "Advanced Citadel", x: 2900, y: 1200 },
  { id: 23, name: "Algorithm Galaxy", x: 2600, y: 1400 },
  { id: 24, name: "Interview Arena", x: 2300, y: 1600 },
  { id: 25, name: "Grand Master Galaxy (Final Boss)", x: 2000, y: 1800, isBoss: true },
];

// SVG path for the glowing campaign road. This path sequentially connects each kingdom.
export const roadPath = `M${kingdoms[0].x},${kingdoms[0].y} ` +
  kingdoms.slice(1).map(k => `L${k.x},${k.y}`).join(' ');
