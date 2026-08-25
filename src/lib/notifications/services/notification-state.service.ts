/**
 * Observable Notification State Store
 */

import { NotificationItem } from '../models/notification.models';
import { Reminder } from '../models/reminder.models';

export interface NotificationState {
  readonly items: ReadonlyArray<NotificationItem>;
  readonly reminders: ReadonlyArray<Reminder>;
  readonly unreadCount: number;
}

export class NotificationStateService {
  private state: NotificationState = {
    items: [],
    reminders: [],
    unreadCount: 0,
  };

  private listeners: Set<(state: NotificationState) => void> = new Set();

  public getState(): NotificationState {
    return this.state;
  }

  public setState(next: Partial<NotificationState>): void {
    const items = next.items !== undefined ? next.items : this.state.items;
    const reminders = next.reminders !== undefined ? next.reminders : this.state.reminders;
    const unreadCount = items.filter((i) => !i.isRead && !i.isDismissed).length;

    this.state = Object.freeze({
      items,
      reminders,
      unreadCount,
    });
    this.listeners.forEach((l) => l(this.state));
  }

  public subscribe(listener: (state: NotificationState) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }
}
