/**
 * Scheduling Engine
 */

import { ScheduleFrequency } from '../models/schedule.models';

export class SchedulingEngine {
  public static calculateNextTrigger(frequency: ScheduleFrequency, fromDate: Date = new Date()): string {
    const next = new Date(fromDate.getTime());
    switch (frequency) {
      case 'hourly':
        next.setHours(next.getHours() + 1);
        break;
      case 'daily':
        next.setDate(next.getDate() + 1);
        break;
      case 'weekly':
        next.setDate(next.getDate() + 7);
        break;
      case 'monthly':
        next.setMonth(next.getMonth() + 1);
        break;
      case 'once':
      default:
        break;
    }
    return next.toISOString();
  }
}
