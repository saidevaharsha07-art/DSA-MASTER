export interface AdaptiveHint {
  level: number;
  type: 'concept' | 'technique' | 'data_structure' | 'pseudo_strategy';
  text: string;
}

export interface MentorChatMessage {
  id: string;
  sender: 'oracle' | 'player';
  text: string;
  timestamp: string;
  suggestedAction?: string;
}

export const PROBLEM_HINTS: Record<string, AdaptiveHint[]> = {
  'two-sum': [
    { level: 1, type: 'concept', text: 'Think about how you can check if target - current_element has already been seen.' },
    { level: 2, type: 'technique', text: 'Can a Hash Table / Map store previously visited numbers as keys and their indices as values in O(1) time?' },
    { level: 3, type: 'data_structure', text: 'Iterate through the array once. For each element `nums[i]`, compute `diff = target - nums[i]`.' },
    { level: 4, type: 'pseudo_strategy', text: 'If `diff` exists in your map, return `[map.get(diff), i]`. Otherwise, `map.set(nums[i], i)`.' },
  ],
};

class OracleMentorService {
  private chatHistory: MentorChatMessage[] = [
    {
      id: 'm1',
      sender: 'oracle',
      text: 'Greetings, Coder! I am The Oracle, your FAANG AI Mentor. How may I guide your algorithmic journey today?',
      timestamp: new Date().toISOString(),
    },
  ];

  public getChatHistory(): MentorChatMessage[] {
    return this.chatHistory;
  }

  public getHint(problemSlug: string, hintLevel: number): AdaptiveHint | null {
    const hints = PROBLEM_HINTS[problemSlug] || PROBLEM_HINTS['two-sum'];
    return hints.find((h) => h.level === hintLevel) || null;
  }

  public sendMessage(text: string): MentorChatMessage {
    const userMsg: MentorChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'player',
      text,
      timestamp: new Date().toISOString(),
    };
    this.chatHistory.push(userMsg);

    const oracleReply: MentorChatMessage = {
      id: `msg-oracle-${Date.now()}`,
      sender: 'oracle',
      text: `Let's analyze that approach. Have you considered optimizing the inner loop using a Hash Table to achieve O(N) time complexity?`,
      timestamp: new Date().toISOString(),
    };
    this.chatHistory.push(oracleReply);

    return oracleReply;
  }
}

export const oracleMentorService = new OracleMentorService();
