/**
 * Analytical Utilities — Data Helpers
 * Array sorting, filtering, and safe object cloning utilities.
 */

export function sortMapValuesBy<K, V>(map: ReadonlyMap<K, V>, keyExtractor: (val: V) => number, reverse: boolean = true): V[] {
  const list = Array.from(map.values());
  return list.sort((a, b) => {
    const vA = keyExtractor(a);
    const vB = keyExtractor(b);
    return reverse ? vB - vA : vA - vB;
  });
}

export function safeISODateString(dateInput?: string | number | Date): string {
  if (!dateInput) return new Date().toISOString();
  try {
    return new Date(dateInput).toISOString();
  } catch {
    return new Date().toISOString();
  }
}

export function formatDateYYYYMMDD(dateInput?: string | Date): string {
  const d = dateInput ? new Date(dateInput) : new Date();
  if (isNaN(d.getTime())) return new Date().toISOString().split('T')[0];
  return d.toISOString().split('T')[0];
}
