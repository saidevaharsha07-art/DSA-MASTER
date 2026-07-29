export interface ActivityFeedItem {
  id: string;
  username: string;
  action: string;
  timestamp: string;
  avatar: string;
}

export const MOCK_ACTIVITY_FEED: ActivityFeedItem[] = [
  { id: 'act-1', username: 'Harsha', action: 'completed Kingdom of Beginnings', timestamp: '5 mins ago', avatar: '/avatars/1.png' },
  { id: 'act-2', username: 'Ananya', action: 'reached Level 25 (Algorithm Knight)', timestamp: '12 mins ago', avatar: '/avatars/2.png' },
  { id: 'act-3', username: 'Rahul', action: 'unlocked DP Sage achievement', timestamp: '25 mins ago', avatar: '/avatars/3.png' },
  { id: 'act-4', username: 'Team Alpha', action: 'won the Guild War Tournament', timestamp: '1 hour ago', avatar: '/avatars/4.png' },
];

class SocialService {
  public getActivityFeed(): ActivityFeedItem[] {
    return MOCK_ACTIVITY_FEED;
  }
}

export const socialService = new SocialService();
