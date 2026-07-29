export interface GuildMember {
  id: string;
  username: string;
  role: 'Captain' | 'Officer' | 'Member';
  level: number;
  xpContributed: number;
  joinedAt: string;
}

export interface Guild {
  id: string;
  name: string;
  tag: string;
  banner: string;
  level: number;
  xp: number;
  coins: number;
  memberCount: number;
  maxMembers: number;
  captainName: string;
  members: GuildMember[];
}

export const INITIAL_GUILD: Guild = {
  id: 'guild_alpha',
  name: 'Algorithm Knights',
  tag: 'AK',
  banner: '⚔️',
  level: 12,
  xp: 45200,
  coins: 12500,
  memberCount: 24,
  maxMembers: 30,
  captainName: 'ArchonCoder',
  members: [
    { id: 'm1', username: 'ArchonCoder', role: 'Captain', level: 18, xpContributed: 8500, joinedAt: '2026-07-01' },
    { id: 'm2', username: 'AnanyaDev', role: 'Officer', level: 25, xpContributed: 12000, joinedAt: '2026-07-03' },
    { id: 'm3', username: 'RahulAlgo', role: 'Member', level: 14, xpContributed: 4200, joinedAt: '2026-07-10' },
  ],
};

class GuildService {
  private currentGuild: Guild | null = INITIAL_GUILD;

  public getUserGuild(): Guild | null {
    return this.currentGuild;
  }

  public contributeXp(amount: number) {
    if (this.currentGuild) {
      this.currentGuild.xp += amount;
      this.currentGuild.coins += Math.floor(amount / 5);
    }
  }
}

export const guildService = new GuildService();
