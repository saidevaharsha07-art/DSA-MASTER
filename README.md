# DSA Master Roadmap

A local-first Next.js DSA learning platform. It reads its complete problem catalogue from `public/data/problems.json`—no problem data is embedded in application code.

## Start

```bash
npm install
npm run dev
```

## Import problems

Replace `public/data/problems.json` with a JSON array. Each object must use the requested shape:

```json
[
  {
    "id": 26,
    "title": "Remove Duplicates from Sorted Array",
    "difficulty": "Easy",
    "topic": "Arrays",
    "pattern": "Two Pointers",
    "estimatedTime": "10 mins",
    "acceptance": "72%",
    "companies": ["Amazon"],
    "tags": ["Array"],
    "url": "https://leetcode.com/problems/remove-duplicates-from-sorted-array/",
    "resources": { "official": "" }
  }
]
```

Completed problems, favourites, revisions, notes and XP are stored in the browser under `dsa-state`.
