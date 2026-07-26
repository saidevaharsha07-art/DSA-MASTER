export interface CompilerDiagnostics {
  hasError: boolean;
  errorLine?: number;
  message: string;
}

export function parseCompilerOutput(rawOutput: string): CompilerDiagnostics {
  if (!rawOutput || rawOutput.trim().length === 0) {
    return { hasError: false, message: '' };
  }

  // Regex matchers for common compiler output error line numbers (e.g., "Line 12:", "solution.ts:12:5:")
  const lineMatch = rawOutput.match(/(?:Line\s+|:\s*|\.ts:|\.java:|\.cpp:|\.py:)(\d+)/i);
  const errorLine = lineMatch ? parseInt(lineMatch[1], 10) : undefined;

  return {
    hasError: true,
    errorLine,
    message: rawOutput,
  };
}
