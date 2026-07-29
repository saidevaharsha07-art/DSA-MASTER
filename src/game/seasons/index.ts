export interface SeasonInfo {
  id: string;
  name: string;
  seasonNumber: number;
  startDate: string;
  endDate: string;
  theme: string;
  exclusiveTitle: string;
  exclusiveFrame: string;
}

export const CURRENT_SEASON: SeasonInfo = {
  id: 'season_01',
  name: 'Season of the Archon',
  seasonNumber: 1,
  startDate: '2026-07-01',
  endDate: '2026-09-30',
  theme: 'Dark Purple Neon Fantasy',
  exclusiveTitle: 'Archon Pioneer',
  exclusiveFrame: 'Legend Archon Frame',
};
