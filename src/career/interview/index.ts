export interface InterviewReadiness {
  overallScorePct: number;
  arraysPct: number;
  treesPct: number;
  graphsPct: number;
  dpPct: number;
  communicationPct: number;
  problemSolvingPct: number;
}

class InterviewReadinessService {
  public calculateReadiness(): InterviewReadiness {
    return {
      overallScorePct: 82,
      arraysPct: 95,
      treesPct: 80,
      graphsPct: 72,
      dpPct: 65,
      communicationPct: 78,
      problemSolvingPct: 90,
    };
  }
}

export const interviewReadinessService = new InterviewReadinessService();
