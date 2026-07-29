export interface RecommendationAction {
  id: string;
  title: string;
  category: 'revision' | 'practice' | 'interview' | 'career';
  reason: string;
  actionUrl: string;
}

class RecommendationEngine {
  public generateRecommendations(): RecommendationAction[] {
    return [
      {
        id: 'rec_1',
        title: 'Revise Sliding Window Pattern',
        category: 'revision',
        reason: 'Confidence score low on 3 recent problems.',
        actionUrl: '/revision',
      },
      {
        id: 'rec_2',
        title: 'Solve 5 Graph BFS Problems',
        category: 'practice',
        reason: 'Required for Amazon SDE target roadmap.',
        actionUrl: '/knowledge/graphs',
      },
      {
        id: 'rec_3',
        title: 'Attempt Amazon Mock Technical Interview',
        category: 'interview',
        reason: 'Interview readiness reached 82%.',
        actionUrl: '/interview',
      },
      {
        id: 'rec_4',
        title: 'Update Resume Project Section with Spreadsheet Engine',
        category: 'career',
        reason: 'Unlocked Array & String Mastery Badge.',
        actionUrl: '/career',
      },
    ];
  }
}

export const recommendationEngine = new RecommendationEngine();
