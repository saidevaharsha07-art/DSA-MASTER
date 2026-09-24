import { PlayerInventoryItem } from '../player/types';

export const INITIAL_INVENTORY: PlayerInventoryItem[] = [
  {
    id: 'item_title_novice',
    name: 'Novice Explorer',
    type: 'title',
    icon: '🎖️',
    rarity: 'Common',
    description: 'Granted to all brave coders embarking on DSA Magna.',
    unlockedAt: '2026-07-01',
    equipped: true,
  },
  {
    id: 'item_frame_neon',
    name: 'Purple Neon Frame',
    type: 'frame',
    icon: '🔮',
    rarity: 'Rare',
    description: 'A glowing purple glassmorphism border earned at Level 10.',
    unlockedAt: '2026-07-10',
    equipped: true,
  },
  {
    id: 'item_theme_dark_fantasy',
    name: 'Dark Fantasy IDE Theme',
    type: 'theme',
    icon: '🎨',
    rarity: 'Epic',
    description: 'AAA RPG visual theme for Monaco Editor and Practice Arena.',
    unlockedAt: '2026-07-01',
    equipped: true,
  },
  {
    id: 'item_artifact_chronos',
    name: 'Chronos Memory Crystal',
    type: 'artifact',
    icon: '💎',
    rarity: 'Legendary',
    description: 'Doubles revision efficiency for SM-2 spaced repetition.',
    unlockedAt: '2026-07-20',
  },
];
