/**
 * Runtime Configuration Validator
 */

export interface ConfigValidationResult {
  readonly isValid: boolean;
  readonly errors: ReadonlyArray<string>;
}

export class ConfigValidator {
  public static validate(): ConfigValidationResult {
    const errors: string[] = [];
    // Check essential runtime properties
    if (!process.env) {
      errors.push('Process environment is undefined.');
    }
    return {
      isValid: errors.length === 0,
      errors: Object.freeze(errors),
    };
  }
}
