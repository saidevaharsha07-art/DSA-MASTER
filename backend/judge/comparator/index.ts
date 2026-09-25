export interface CompareOptions {
  ignoreWhitespace?: boolean;
  ignoreTrailingNewlines?: boolean;
  caseSensitive?: boolean;
}

export function compareOutputs(
  expected: string,
  actual: string,
  options: CompareOptions = { ignoreWhitespace: true, ignoreTrailingNewlines: true, caseSensitive: true }
): { isMatch: boolean; diff?: string } {
  let exp = expected;
  let act = actual;

  if (options.ignoreTrailingNewlines) {
    exp = exp.replace(/[\r\n]+$/, '');
    act = act.replace(/[\r\n]+$/, '');
  }

  if (options.ignoreWhitespace) {
    exp = exp.split('\n').map((l) => l.trim()).join('\n');
    act = act.split('\n').map((l) => l.trim()).join('\n');
  }

  if (!options.caseSensitive) {
    exp = exp.toLowerCase();
    act = act.toLowerCase();
  }

  const isMatch = exp === act;

  if (isMatch) {
    return { isMatch: true };
  }

  return {
    isMatch: false,
    diff: `Expected: "${expected.trim()}"\nActual:   "${actual.trim()}"`,
  };
}
