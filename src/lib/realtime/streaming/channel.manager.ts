/**
 * Channel Manager
 */

import { ChannelState } from '../models/channel.models';
import { EventBus } from '@/src/core/events/event-bus';

export class ChannelManager {
  private activeChannels: Map<string, number> = new Map();

  public subscribeChannel(channel: string): void {
    const count = (this.activeChannels.get(channel) || 0) + 1;
    this.activeChannels.set(channel, count);
    EventBus.publish('ChannelSubscribed', { channel, subscriberCount: count });
  }

  public unsubscribeChannel(channel: string): void {
    const count = Math.max(0, (this.activeChannels.get(channel) || 0) - 1);
    if (count === 0) {
      this.activeChannels.delete(channel);
    } else {
      this.activeChannels.set(channel, count);
    }
    EventBus.publish('ChannelUnsubscribed', { channel, subscriberCount: count });
  }

  public getChannelStates(): ReadonlyArray<ChannelState> {
    return Object.freeze(
      Array.from(this.activeChannels.entries()).map(([channelName, subscriberCount]) => ({
        channelName,
        subscriberCount,
        isSubscribed: true,
      }))
    );
  }
}
