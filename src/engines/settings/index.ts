import { eventBus } from '@/src/core/events';
import { LocalStorageAdapter } from '@/src/core/storage/LocalStorageAdapter';

export interface AppSettings {
  theme: 'dark' | 'light';
  vimMode: boolean;
  offlineMode: boolean;
  autoSave: boolean;
}

const DEFAULT_SETTINGS: AppSettings = {
  theme: 'dark',
  vimMode: false,
  offlineMode: true,
  autoSave: true,
};

class SettingsEngine {
  private storage = new LocalStorageAdapter();
  private settings: AppSettings = DEFAULT_SETTINGS;

  constructor() {
    this.init();
  }

  private init() {
    const saved = this.storage.get<AppSettings>('app_settings');
    if (saved) {
      this.settings = { ...DEFAULT_SETTINGS, ...saved };
    } else {
      this.storage.save('app_settings', this.settings);
    }
  }

  getSettings(): AppSettings {
    return this.settings;
  }

  updateSettings(updates: Partial<AppSettings>) {
    this.settings = { ...this.settings, ...updates };
    this.storage.save('app_settings', this.settings);
    eventBus.publish('SettingsUpdated', this.settings);
  }

  exportData(): string {
    // Collect all local storage data
    const data = {
      settings: this.storage.get('app_settings'),
      memory: localStorage.getItem('dsa_master_memory_v1'),
      session: localStorage.getItem('dsa_master_sessions'),
      achievements: localStorage.getItem('dsa_master_achievements')
    };
    return JSON.stringify(data, null, 2);
  }

  importData(jsonString: string): boolean {
    try {
      const data = JSON.parse(jsonString);
      if (data.settings) this.storage.save('app_settings', data.settings);
      if (data.memory) localStorage.setItem('dsa_master_memory_v1', data.memory);
      if (data.session) localStorage.setItem('dsa_master_sessions', data.session);
      if (data.achievements) localStorage.setItem('dsa_master_achievements', data.achievements);
      this.init();
      eventBus.publish('DataImported', null);
      return true;
    } catch (e) {
      console.error('Failed to import data', e);
      return false;
    }
  }
}

export const settingsEngine = new SettingsEngine();
