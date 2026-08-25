/**
 * Achievement Rule Registry (Auto-Discovers Rules)
 */

import { IAchievementRule } from './achievement-rule.interface';
import { StreakRule } from './builtin/streak.rule';
import { XpRule } from './builtin/xp.rule';
import { ContestRule } from './builtin/contest.rule';
import { MemoryRule } from './builtin/memory.rule';
import { MasteryRule } from './builtin/mastery.rule';
import { SpeedRule } from './builtin/speed.rule';
import { ConsistencyRule } from './builtin/consistency.rule';
import { PlatformRule } from './builtin/platform.rule';
import { KingdomRule } from './builtin/kingdom.rule';
import { OracleRule } from './builtin/oracle.rule';

export class RuleRegistry {
  private static rules: Map<string, IAchievementRule> = new Map();

  public static register(rule: IAchievementRule): void {
    this.rules.set(rule.definition.id, rule);
  }

  public static getAllRules(): ReadonlyArray<IAchievementRule> {
    return Array.from(this.rules.values());
  }

  public static getRule(id: string): IAchievementRule | undefined {
    return this.rules.get(id);
  }

  public static registerDefaults(): void {
    if (this.rules.size > 0) return;
    [
      new StreakRule(),
      new XpRule(),
      new ContestRule(),
      new MemoryRule(),
      new MasteryRule(),
      new SpeedRule(),
      new ConsistencyRule(),
      new PlatformRule(),
      new KingdomRule(),
      new OracleRule(),
    ].forEach((rule) => this.register(rule));
  }
}
