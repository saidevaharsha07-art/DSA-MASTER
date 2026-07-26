export interface CompareResult {
  passed: boolean;
  expectedNormalized: string;
  receivedNormalized: string;
  diffMessage?: string;
}

export function validateTestcaseOutput(expected: string, received: string): CompareResult {
  const normExpected = expected.replace(/[\r\n]+$/, '').trim();
  const normReceived = received.replace(/[\r\n]+$/, '').trim();

  const passed = normExpected === normReceived;

  return {
    passed,
    expectedNormalized: normExpected,
    receivedNormalized: normReceived,
    diffMessage: passed ? undefined : `Expected: "${normExpected}"\nReceived: "${normReceived}"`,
  };
}
