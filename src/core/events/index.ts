import { EventType, EventPayload, AppEvent, EventCallback } from './types';
import { storage } from '../storage/LocalStorageAdapter';

type Listeners = {
  [K in EventType]?: EventCallback<K>[];
};

class EventBus {
  private listeners: Listeners = {};

  subscribe<T extends EventType>(type: T, callback: EventCallback<T>): () => void {
    if (!this.listeners[type]) {
      this.listeners[type] = [];
    }
    // @ts-ignore - TS struggles with the union type discrimination here
    this.listeners[type]!.push(callback);

    // Return unsubscribe function
    return () => {
      if (this.listeners[type]) {
        // @ts-ignore
        this.listeners[type] = this.listeners[type]!.filter(cb => cb !== callback);
      }
    };
  }

  publish<T extends EventType>(type: T, payload: EventPayload[T]): void {
    const event: AppEvent<T> = {
      type,
      payload,
      timestamp: new Date().toISOString(),
    };

    // 1. Persist event to the unified Learning Timeline
    this.persistEvent(event);

    // 2. Notify subscribers
    const typeListeners = this.listeners[type];
    if (typeListeners) {
      typeListeners.forEach(callback => {
        try {
          callback(event);
        } catch (e) {
          console.error(`Error in EventBus listener for ${type}:`, e);
        }
      });
    }
  }

  private persistEvent(event: AppEvent<any>) {
    storage.update<AppEvent<any>[]>('dsa_event_timeline', (prev) => {
      const history = prev || [];
      return [...history, event];
    });
  }

  getTimeline(): AppEvent<any>[] {
    return storage.get<AppEvent<any>[]>('dsa_event_timeline') || [];
  }
}

export const eventBus = new EventBus();
