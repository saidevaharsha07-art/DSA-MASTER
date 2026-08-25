/**
 * CodeChef Platform Module — Difficulty & Rating Helpers
 * Provides rating normalization, division ranges, icons, and color mappings.
 */

export const CODECHEF_DIVISIONS = [
  { id: '500', label: '< 500', name: 'Beginner Novice', min: 0, max: 499, color: 'emerald', icon: '🌱' },
  { id: '500-1000', label: '500 - 1000', name: 'Basic Logical', min: 500, max: 999, color: 'teal', icon: '⚔️' },
  { id: '1000-1400', label: '1000 - 1400', name: '1-Star Division', min: 1000, max: 1399, color: 'sky', icon: '⭐' },
  { id: '1400-1600', label: '1400 - 1600', name: '2-Star Specialist', min: 1400, max: 1599, color: 'indigo', icon: '⭐⭐' },
  { id: '1600-1800', label: '1600 - 1800', name: '3-Star Expert', min: 1600, max: 1799, color: 'purple', icon: '⭐⭐⭐' },
  { id: '1800-2000', label: '1800 - 2000', name: '4-Star Candidate Master', min: 1800, max: 1999, color: 'amber', icon: '👑' },
  { id: '2000-2500', label: '2000 - 2500', name: '5-Star Master', min: 2000, max: 2499, color: 'rose', icon: '🔥' },
] as const;

export function parseCodeChefRating(ratingInput: number | string | undefined | null): number {
  if (typeof ratingInput === 'number') {
    return isNaN(ratingInput) ? 500 : ratingInput;
  }
  if (typeof ratingInput === 'string') {
    const parsed = parseInt(ratingInput.replace(/[^0-9]/g, ''), 10);
    return isNaN(parsed) ? 500 : parsed;
  }
  return 500;
}

export function getCodeChefDifficultyLabel(rating: number): string {
  if (rating < 500) return 'Beginner (< 500)';
  if (rating < 1000) return 'Basic (500-1000)';
  if (rating < 1400) return '1-Star (1000-1400)';
  if (rating < 1600) return '2-Star (1400-1600)';
  if (rating < 1800) return '3-Star (1600-1800)';
  if (rating < 2000) return '4-Star (1800-2000)';
  return '5-Star Master (2000-2500)';
}

export function getCodeChefDivisionId(rating: number): string {
  const division = CODECHEF_DIVISIONS.find((d) => rating >= d.min && rating <= d.max);
  return division ? division.id : rating < 500 ? '500' : '2000-2500';
}

export function getRatingRangeForDivision(divisionId: string): { min: number; max: number } {
  const found = CODECHEF_DIVISIONS.find((d) => d.id === divisionId);
  if (found) return { min: found.min, max: found.max };
  return { min: 0, max: 4000 };
}
