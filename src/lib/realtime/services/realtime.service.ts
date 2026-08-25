/**
 * Core Real-Time Service & EventBus Subscriber
 */

import { RealtimeRepository } from '../repositories/realtime.repository';
import { RealtimeStateService } from './realtime-state.service';
import { ChannelManager } from '../streaming/channel.manager';
import { HeartbeatManager } from '../streaming/heartbeat.manager';
import { RealtimeEngine } from '../engine/realtime.engine';
import { RealtimeProviderRegistry } from '../providers/provider.registry';
import { RealtimeEvent } from '../models/realtime-event.models';
import { ConnectionState } from '../models/connection.models';
import { ChannelState } from '../models/channel.models';
import { EventBus, AppEvent } from '@/src/core/events/event-bus';

export class RealtimeService {
  private repository: RealtimeRepository;
  public readonly stateService: RealtimeStateService;
  public readonly channelManager: ChannelManager;
  public readonly heartbeatManager: HeartbeatManager;
  private engine: RealtimeEngine;
  private seqCounter = 0;

  constructor(repository?: RealtimeRepository, stateService?: RealtimeStateService) {
    this.repository = repository || new RealtimeRepository();
    this.stateService = stateService || new RealtimeStateService();
    this.channelManager = new ChannelManager();
    this.heartbeatManager = new HeartbeatManager();
    this.engine = new RealtimeEngine();

    RealtimeProviderRegistry.registerDefaults();

    // Listen globally to EventBus to forward relevant system events onto real-time stream channels
    EventBus.subscribeAll((event: AppEvent) => {
      this.handleAppEvent(event);
    });
  }

  private async handleAppEvent(event: AppEvent): Promise<void> {
    const channelMap: Partial<Record<string, string>> = {
      ProblemSolved: 'practice',
      MemoryReviewed: 'memory',
      ContestCompleted: 'contest',
      AchievementUnlocked: 'achievements',
      NotificationCreated: 'notifications',
      SyncCompleted: 'sync',
      BackupCompleted: 'backup',
    };

    const targetChannel = channelMap[event.type];
    if (targetChannel) {
      await this.publish(targetChannel, event.type, event.payload);
    }
  }

  public async connect(): Promise<boolean> {
    const provider = RealtimeProviderRegistry.getActiveProvider();
    const ok = await provider.connect();
    if (ok) {
      this.stateService.setState({
        connection: {
          status: 'connected',
          providerId: provider.providerId,
          connectedAt: new Date().toISOString(),
          reconnectAttempts: 0,
        },
        presence: { userId: 'guest', status: 'online', lastActiveAt: new Date().toISOString() },
      });
      EventBus.publish('RealtimeConnected', { providerId: provider.providerId });
    }
    return ok;
  }

  public async disconnect(): Promise<void> {
    const provider = RealtimeProviderRegistry.getActiveProvider();
    await provider.disconnect();
    this.stateService.setState({
      connection: { status: 'disconnected', providerId: provider.providerId, reconnectAttempts: 0 },
      presence: { userId: 'guest', status: 'offline', lastActiveAt: new Date().toISOString() },
    });
    EventBus.publish('RealtimeDisconnected', { providerId: provider.providerId });
  }

  public subscribe(channel: string, callback: (event: RealtimeEvent) => void): () => void {
    const provider = RealtimeProviderRegistry.getActiveProvider();
    this.channelManager.subscribeChannel(channel);
    this.stateService.setState({ channels: this.channelManager.getChannelStates() });

    const unsub = provider.subscribe(channel, callback);
    return () => {
      unsub();
      this.channelManager.unsubscribeChannel(channel);
      this.stateService.setState({ channels: this.channelManager.getChannelStates() });
    };
  }

  public async publish(channel: string, type: string, payload: unknown): Promise<boolean> {
    this.seqCounter++;
    const realtimeEvent: RealtimeEvent = {
      eventId: `rt-evt-${Date.now()}-${this.seqCounter}`,
      channel,
      type,
      payload,
      timestamp: new Date().toISOString(),
      sequenceNumber: this.seqCounter,
    };

    await this.repository.saveEvent(realtimeEvent);
    await this.engine.publishEvent(realtimeEvent);

    const currentCount = this.stateService.getState().eventThroughputCount;
    this.stateService.setState({ eventThroughputCount: currentCount + 1 });
    return true;
  }

  public replay(): number {
    return this.engine.replayEvents((evt) => {
      const provider = RealtimeProviderRegistry.getActiveProvider();
      provider.publish(evt);
    });
  }

  public getConnectionState(): ConnectionState {
    return this.stateService.getState().connection;
  }

  public getSubscriptions(): ReadonlyArray<ChannelState> {
    return this.channelManager.getChannelStates();
  }
}
