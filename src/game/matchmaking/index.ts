export interface DuelMatch {
  id: string;
  opponentName: string;
  opponentRating: number;
  problemSlug: string;
  timeLimitSeconds: number;
  status: 'searching' | 'matched' | 'in_progress' | 'completed';
}

class MatchmakingService {
  public findMatch(mode: '1v1' | 'GuildBattle'): Promise<DuelMatch> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: `match-${Date.now()}`,
          opponentName: 'ShadowCoder_99',
          opponentRating: 1640,
          problemSlug: 'two-sum',
          timeLimitSeconds: 600,
          status: 'matched',
        });
      }, 1500);
    });
  }
}

export const matchmakingService = new MatchmakingService();
