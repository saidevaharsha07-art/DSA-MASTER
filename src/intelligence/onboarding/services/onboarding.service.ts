/**
 * DSA MASTER — Onboarding Intelligence Service
 * Manages first-time learner onboarding state, weak prior signals,
 * diagnostic micro-assessment scoring, and first mission generation.
 */

import { storage } from '@/src/core/storage/LocalStorageAdapter';
import { EventBus } from '@/src/core/events/event-bus';
import { serverPersistenceBridge } from '@/src/core/storage/server-persistence.bridge';
import { getSupabaseClient } from '@/src/lib/supabase/client';
import {
  OnboardingProfile,
  OnboardingStatus,
  AssessmentQuestion,
  AssessmentAnswer,
  AssessmentResult,
  FirstMission,
  SelfReportedLevel,
  LearningGoal,
} from '../types/onboarding.types';

const STORAGE_KEY_PREFIX = 'dsa_onboarding_profile_';
const STORAGE_EVENTS_KEY_PREFIX = 'dsa_onboarding_events_';

export class OnboardingService {
  public static readonly ASSESSMENT_QUESTIONS: ReadonlyArray<AssessmentQuestion> = [
    {
      id: 'q_lookup_complexity',
      order: 1,
      title: 'Lookup Complexity',
      question: 'What is the average time complexity to check if an element exists in a standard Hash Map vs an unsorted Array of size N?',
      options: [
        { id: 'opt_a', text: 'O(1) for Hash Map, O(N) for Array' },
        { id: 'opt_b', text: 'O(N) for Hash Map, O(1) for Array' },
        { id: 'opt_c', text: 'O(log N) for Hash Map, O(N) for Array' },
        { id: 'opt_d', text: 'O(1) for both data structures' },
      ],
      correctOptionId: 'opt_a',
      explanation: 'Hash tables provide average O(1) lookups via hashing keys to buckets, whereas searching an unsorted array requires scanning up to N elements.',
      difficulty: 'Easy',
      topic: 'Arrays & Hashing',
      topicId: 'arrays-hashing',
    },
    {
      id: 'q_complement_pattern',
      order: 2,
      title: 'Complement Lookup Pattern',
      question: 'Given an unsorted list of integers, you need to find two numbers summing to target T in a single pass O(N). Which approach enables this?',
      options: [
        { id: 'opt_a', text: 'Hash Map storing visited elements to check complement (T - num)' },
        { id: 'opt_b', text: 'Queue storing elements and comparing front and back values' },
        { id: 'opt_c', text: 'Binary Search Tree built by inserting all elements' },
        { id: 'opt_d', text: 'Stack popping elements in LIFO order' },
      ],
      correctOptionId: 'opt_a',
      explanation: 'By recording each seen number in a Hash Map, we can immediately check if its required complement (target - num) was already visited in O(1) time.',
      difficulty: 'Easy',
      topic: 'Arrays & Hashing',
      topicId: 'arrays-hashing',
    },
    {
      id: 'q_two_pointers',
      order: 3,
      title: 'Two Pointers Invariant',
      question: 'When verifying whether a string is a palindrome, what is the most space-efficient O(1) auxiliary space method?',
      options: [
        { id: 'opt_a', text: 'Two pointers starting at left & right ends, advancing inward while comparing characters' },
        { id: 'opt_b', text: 'Reversing the string into a new string copy and checking string equality' },
        { id: 'opt_c', text: 'Pushing all characters onto a recursion call stack' },
        { id: 'opt_d', text: 'Generating all character pairs in nested loops' },
      ],
      correctOptionId: 'opt_a',
      explanation: 'Two pointers converging from opposite ends require zero extra memory allocations (O(1) auxiliary space) and run in O(N) linear time.',
      difficulty: 'Easy',
      topic: 'Two Pointers',
      topicId: 'two-pointers',
    },
    {
      id: 'q_binary_search',
      order: 4,
      title: 'Binary Search Division',
      question: 'In a sorted array, what property allows Binary Search to achieve O(log N) logarithmic time complexity?',
      options: [
        { id: 'opt_a', text: 'Each comparison with the midpoint eliminates half of the remaining search interval' },
        { id: 'opt_b', text: 'It hashes the middle element directly to the target memory address' },
        { id: 'opt_c', text: 'It runs asynchronous threads scanning all indices concurrently' },
        { id: 'opt_d', text: 'It re-sorts the array elements on every cycle' },
      ],
      correctOptionId: 'opt_a',
      explanation: 'Because the data is ordered, comparing the target to the midpoint safely discards half of the candidate elements in every iteration.',
      difficulty: 'Easy',
      topic: 'Binary Search',
      topicId: 'binary-search',
    },
  ];

  public static getQuestions(): ReadonlyArray<AssessmentQuestion> {
    return this.ASSESSMENT_QUESTIONS;
  }

  public static getProfile(userId = 'default_user'): OnboardingProfile {
    const cleanUserId = userId || 'guest-user';
    const key = STORAGE_KEY_PREFIX + cleanUserId;
    const existing = storage.get<OnboardingProfile>(key);

    if (existing) {
      return existing;
    }

    const now = new Date().toISOString();
    const defaultProfile: OnboardingProfile = {
      userId: cleanUserId,
      status: 'ONBOARDING_NOT_STARTED',
      currentStep: 1,
      selectedTopics: [],
      assessmentEvidence: [],
      createdAt: now,
      updatedAt: now,
    };

    return defaultProfile;
  }

  /**
   * Asynchronously loads and synchronizes onboarding profile between local storage cache and remote server/Supabase.
   * Deterministically handles cross-device drafts, completed states, and last-write timestamps.
   */
  public static async loadProfileAsync(userId: string): Promise<OnboardingProfile> {
    const localProfile = this.getProfile(userId);
    if (!userId || userId === 'guest' || userId === 'guest-user' || userId === 'default_user') {
      return localProfile;
    }

    try {
      // 1. Try fetching from Supabase directly if client available
      let remoteProfile: OnboardingProfile | null = null;
      const supabase = getSupabaseClient();
      if (supabase) {
        try {
          const { data, error } = await supabase
            .from('user_onboarding')
            .select('*')
            .eq('user_id', userId)
            .maybeSingle();

          if (!error && data) {
            remoteProfile = {
              userId: data.user_id,
              status: data.status,
              currentStep: data.current_step,
              selfReportedLevel: data.self_reported_level,
              learningGoal: data.learning_goal,
              selectedTopics: Array.isArray(data.selected_topics) ? data.selected_topics : [],
              assessmentScore: data.assessment_score,
              assessmentEvidence: Array.isArray(data.assessment_evidence) ? data.assessment_evidence : [],
              assessmentResult: data.assessment_result || undefined,
              firstMission: data.first_mission || undefined,
              completedAt: data.completed_at || undefined,
              skippedAt: data.skipped_at || undefined,
              createdAt: data.created_at || localProfile.createdAt,
              updatedAt: data.updated_at || new Date().toISOString(),
            };
          }
        } catch {
          // Fallback to ServerPersistenceBridge
        }
      }

      // 2. Fallback to ServerPersistenceBridge if remoteProfile not yet found
      if (!remoteProfile) {
        remoteProfile = await serverPersistenceBridge.fetchRemoteData<OnboardingProfile>('onboarding', userId);
      }

      // 3. Deterministic Merge Logic
      if (remoteProfile) {
        const remoteIsFinal = remoteProfile.status === 'ONBOARDING_COMPLETED' || remoteProfile.status === 'ONBOARDING_SKIPPED';
        const localIsFinal = localProfile.status === 'ONBOARDING_COMPLETED' || localProfile.status === 'ONBOARDING_SKIPPED';

        const remoteTime = new Date(remoteProfile.updatedAt || remoteProfile.createdAt || 0).getTime();
        const localTime = new Date(localProfile.updatedAt || localProfile.createdAt || 0).getTime();

        if (remoteIsFinal && !localIsFinal) {
          // Remote is completed on another device, overwrite local draft
          const key = STORAGE_KEY_PREFIX + userId;
          storage.save(key, remoteProfile);
          return remoteProfile;
        } else if (localIsFinal && !remoteIsFinal) {
          // Local is completed, push to remote
          this.saveProfile(localProfile);
          return localProfile;
        } else if (remoteTime > localTime) {
          // Remote is newer draft
          const key = STORAGE_KEY_PREFIX + userId;
          storage.save(key, remoteProfile);
          return remoteProfile;
        } else if (localTime > remoteTime) {
          // Local is newer draft, push to remote
          this.saveProfile(localProfile);
          return localProfile;
        }
        return remoteProfile;
      }
    } catch (err) {
      console.warn('[OnboardingService] loadProfileAsync fallback to local cache:', err);
    }

    return localProfile;
  }

  public static saveProfile(profile: OnboardingProfile): void {
    if (!profile.userId || profile.userId === 'guest' || profile.userId === 'guest-user') {
      return;
    }
    const key = STORAGE_KEY_PREFIX + profile.userId;
    const now = new Date().toISOString();
    const updatedProfile: OnboardingProfile = {
      ...profile,
      updatedAt: now,
    };

    // 1. Immediate local draft cache
    storage.save(key, updatedProfile);

    // 2. Server persistence bridge sync
    serverPersistenceBridge.saveDurableData('onboarding', profile.userId, updatedProfile).catch(() => {});

    // 3. Supabase direct sync if authenticated
    const supabase = getSupabaseClient();
    if (supabase) {
      try {
        Promise.resolve(
          supabase
            .from('user_onboarding')
            .upsert({
              user_id: profile.userId,
              status: profile.status,
              current_step: profile.currentStep,
              self_reported_level: profile.selfReportedLevel || null,
              learning_goal: profile.learningGoal || null,
              selected_topics: profile.selectedTopics || [],
              assessment_score: profile.assessmentScore ?? null,
              assessment_evidence: profile.assessmentEvidence || [],
              assessment_result: profile.assessmentResult || null,
              first_mission: profile.firstMission || null,
              completed_at: profile.completedAt || null,
              skipped_at: profile.skippedAt || null,
              updated_at: now,
            })
        ).catch(() => {});
      } catch {
        // Safe failover
      }
    }
  }

  public static updateStep(
    userId: string,
    step: number,
    partialData: Partial<OnboardingProfile> = {}
  ): OnboardingProfile {
    const current = this.getProfile(userId);
    const updated: OnboardingProfile = {
      ...current,
      ...partialData,
      currentStep: Math.min(Math.max(step, 1), 6),
      status: current.status === 'ONBOARDING_NOT_STARTED' ? 'ONBOARDING_IN_PROGRESS' : current.status,
      updatedAt: new Date().toISOString(),
    };

    this.saveProfile(updated);
    this.emitEvent(userId, 'OnboardingStepCompleted', { step: updated.currentStep, status: updated.status });
    return updated;
  }

  public static submitAssessment(
    userId: string,
    answers: ReadonlyArray<AssessmentAnswer>
  ): OnboardingProfile {
    const current = this.getProfile(userId);
    const totalQuestions = this.ASSESSMENT_QUESTIONS.length;
    let correctCount = 0;
    let answeredCount = 0;
    let skippedCount = 0;
    let totalTimeSpentMs = 0;
    const evidenceSummary: string[] = [];

    answers.forEach((ans) => {
      totalTimeSpentMs += ans.timeSpentMs || 0;
      if (ans.skipped) {
        skippedCount++;
      } else {
        answeredCount++;
        if (ans.isCorrect) correctCount++;
      }
    });

    const scorePercentage = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

    evidenceSummary.push('Diagnostic Assessment: ' + correctCount + '/' + totalQuestions + ' questions correct (' + scorePercentage + '% baseline)');
    if (current.selfReportedLevel) {
      evidenceSummary.push('Self-reported familiarity: ' + current.selfReportedLevel);
    }
    if (current.learningGoal) {
      evidenceSummary.push('Primary goal: ' + current.learningGoal.replace(/_/g, ' '));
    }
    if (current.selectedTopics && current.selectedTopics.length > 0) {
      evidenceSummary.push('Prior topic exposure: ' + current.selectedTopics.slice(0, 3).join(', ') + (current.selectedTopics.length > 3 ? ' +more' : ''));
    }
    evidenceSummary.push('Zero verified practice solves recorded (Baseline prior established)');

    const assessmentResult: AssessmentResult = {
      totalQuestions,
      answeredCount,
      correctCount,
      skippedCount,
      totalTimeSpentMs,
      scorePercentage,
      answers,
      evidenceSummary,
    };

    const firstMission = this.generateFirstMission({
      ...current,
      assessmentScore: scorePercentage,
      assessmentEvidence: evidenceSummary,
    });

    const updated: OnboardingProfile = {
      ...current,
      currentStep: 6,
      assessmentScore: scorePercentage,
      assessmentEvidence: evidenceSummary,
      assessmentResult,
      firstMission,
      status: 'ONBOARDING_IN_PROGRESS',
      updatedAt: new Date().toISOString(),
    };

    this.saveProfile(updated);
    this.emitEvent(userId, 'OnboardingAssessmentCompleted', {
      score: scorePercentage,
      correct: correctCount,
      total: totalQuestions,
    });
    return updated;
  }

  public static completeOnboarding(userId: string): OnboardingProfile {
    const current = this.getProfile(userId);
    const firstMission = current.firstMission || this.generateFirstMission(current);
    const now = new Date().toISOString();

    const completed: OnboardingProfile = {
      ...current,
      currentStep: 6,
      status: 'ONBOARDING_COMPLETED',
      firstMission,
      completedAt: now,
      updatedAt: now,
    };

    this.saveProfile(completed);
    this.emitEvent(userId, 'OnboardingCompleted', {
      missionId: firstMission.id,
      destinationRoute: firstMission.destinationRoute,
    });
    return completed;
  }

  public static skipOnboarding(userId: string): OnboardingProfile {
    const current = this.getProfile(userId);
    const now = new Date().toISOString();
    const defaultMission = this.generateFirstMission({
      ...current,
      selfReportedLevel: 'beginner',
    });

    const skipped: OnboardingProfile = {
      ...current,
      status: 'ONBOARDING_SKIPPED',
      firstMission: defaultMission,
      skippedAt: now,
      updatedAt: now,
    };

    this.saveProfile(skipped);
    this.emitEvent(userId, 'OnboardingSkipped', {
      destinationRoute: defaultMission.destinationRoute,
    });
    return skipped;
  }

  public static generateFirstMission(profile: Partial<OnboardingProfile>): FirstMission {
    const level = profile.selfReportedLevel || 'beginner';
    const goal = profile.learningGoal || 'strong_fundamentals';
    const score = profile.assessmentScore ?? 0;

    const isAdvancedCandidate = (level === 'medium_solver' || level === 'contest_prep') && score >= 75;

    if (isAdvancedCandidate) {
      return {
        id: 'mission_two_pointers_adv',
        topic: 'Two Pointers & Sliding Window',
        topicId: 'two-pointers',
        actionType: 'PRACTICE',
        title: 'Master Two Pointers & Window Patterns',
        description: 'Your diagnostic demonstrated strong arrays and complexity fundamentals. Jump straight into optimal two-pointer and sliding window patterns.',
        steps: [
          'Review Two Pointers opposite-end and fast-slow pointer invariants',
          'Solve 1 Classic Two Pointers problem (Two Sum II or Valid Palindrome)',
          'Unlock Sliding Window progressive patterns on your Adaptive Journey',
        ],
        destinationRoute: '/practice?topic=two-pointers',
        estimatedMinutes: 20,
        whySelected: [
          'Diagnostic micro-assessment score >= 75%',
          'Self-reported experience: ' + level.replace(/_/g, ' '),
          'Preparation focus: ' + goal.replace(/_/g, ' '),
        ],
      };
    }

    return {
      id: 'mission_arrays_hashing_foundation',
      topic: 'Arrays & Hashing',
      topicId: 'arrays-hashing',
      actionType: 'LEARN',
      title: 'Build Arrays & Hashing Foundation',
      description: 'Establish solid algorithmic intuition with fundamental frequency maps, prefix structures, and lookup patterns.',
      steps: [
        'Understand Big-O time and space complexity trade-offs for Hash Maps vs Arrays',
        'Solve your first foundational problem: Contains Duplicate or Two Sum',
        'Observe your Adaptive Roadmap unlock subsequent graph nodes based on genuine solves',
      ],
      destinationRoute: '/practice/contains-duplicate',
      estimatedMinutes: 15,
      whySelected: [
        'Foundational prerequisite for all 14 canonical DSA topics',
        'Target goal: ' + goal.replace(/_/g, ' '),
        'Zero verified practice solves recorded yet (Clean baseline starting point)',
      ],
    };
  }

  public static resetForUser(userId: string): void {
    if (!userId || userId === 'guest') return;
    storage.remove(STORAGE_KEY_PREFIX + userId);
    storage.remove(STORAGE_EVENTS_KEY_PREFIX + userId);
  }

  private static emitEvent(userId: string, eventName: string, data: any): void {
    if (!userId || userId === 'guest' || userId === 'guest-user') return;
    const eventsKey = STORAGE_EVENTS_KEY_PREFIX + userId;
    const existingEvents = storage.get<any[]>(eventsKey) || [];

    // Deduplication check: Do not emit duplicate step completion or identical terminal events in immediate succession
    const lastEvent = existingEvents[existingEvents.length - 1];
    if (lastEvent && lastEvent.eventName === eventName && JSON.stringify(lastEvent.data) === JSON.stringify(data)) {
      return;
    }

    const eventRecord = {
      eventName,
      userId,
      data,
      timestamp: new Date().toISOString(),
    };
    existingEvents.push(eventRecord);
    storage.save(eventsKey, existingEvents.slice(-50));
    try {
      EventBus.publish(eventName as any, { userId, ...data });
    } catch {
      // EventBus safe fallback
    }
  }

  public static getEventHistory(userId: string): ReadonlyArray<any> {
    if (!userId || userId === 'guest') return [];
    return storage.get<any[]>(STORAGE_EVENTS_KEY_PREFIX + userId) || [];
  }
}

