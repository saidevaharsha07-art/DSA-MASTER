'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Clock,
  ShieldCheck,
} from 'lucide-react';
import { useAuth } from '@/src/lib/auth/hooks/useAuth';
import { useSettings } from '@/src/context/SettingsContext';
import {
  OnboardingService,
  SelfReportedLevel,
  LearningGoal,
  AssessmentAnswer,
  OnboardingProfile,
} from '@/src/intelligence/onboarding';

const TOPIC_LIST = [
  { id: 'arrays', label: 'Arrays' },
  { id: 'strings', label: 'Strings' },
  { id: 'hashing', label: 'Hashing' },
  { id: 'two-pointers', label: 'Two Pointers' },
  { id: 'sliding-window', label: 'Sliding Window' },
  { id: 'linked-lists', label: 'Linked Lists' },
  { id: 'stacks', label: 'Stacks' },
  { id: 'queues', label: 'Queues' },
  { id: 'trees', label: 'Trees' },
  { id: 'graphs', label: 'Graphs' },
  { id: 'recursion', label: 'Recursion' },
  { id: 'dynamic-programming', label: 'Dynamic Programming' },
  { id: 'binary-search', label: 'Binary Search' },
  { id: 'heaps', label: 'Heaps' },
  { id: 'greedy', label: 'Greedy' },
];

const LEVEL_OPTIONS: Array<{ id: SelfReportedLevel; title: string; desc: string }> = [
  { id: 'beginner', title: 'Complete beginner', desc: 'Brand new to data structures, algorithms, and time complexities.' },
  { id: 'basics', title: 'I have learned the basics', desc: 'Understand basic arrays and loops, but struggle with algorithmic patterns.' },
  { id: 'easy_solver', title: 'I can solve Easy problems', desc: 'Comfortable with LeetCode/CodeChef Easy problems; working toward Mediums.' },
  { id: 'medium_solver', title: 'I regularly solve Medium problems', desc: 'Solve most Medium problems with solid data structure intuition.' },
  { id: 'interview_prep', title: 'I am preparing for interviews', desc: 'Focusing on high-frequency company patterns and system optimization.' },
  { id: 'contest_prep', title: 'I am preparing for contests', desc: 'Targeting competitive rating climb, fast implementation, and hard graphs/DP.' },
];

const GOAL_OPTIONS: Array<{ id: LearningGoal; title: string; desc: string }> = [
  { id: 'strong_fundamentals', title: 'Build strong fundamentals', desc: 'Master core patterns from the ground up with crystal clarity.' },
  { id: 'coding_interviews', title: 'Coding interviews', desc: 'Target general software engineering technical rounds.' },
  { id: 'product_interviews', title: 'Product-company interviews', desc: 'Focus on FAANG / top tech tier technical benchmarks.' },
  { id: 'college_exams', title: 'College / exams', desc: 'Semester curriculum, coursework exams, and placement prep.' },
  { id: 'competitive_programming', title: 'Competitive programming', desc: 'Codeforces, CodeChef, and LeetCode contest rating acceleration.' },
  { id: 'general_improvement', title: 'General DSA improvement', desc: 'Keep problem-solving sharp, learn advanced algorithms, and have fun.' },
];

const STEPS_NAV = [
  { num: 1, label: 'Welcome' },
  { num: 2, label: 'Level' },
  { num: 3, label: 'Experience' },
  { num: 4, label: 'Goal' },
  { num: 5, label: 'Baseline' },
  { num: 6, label: 'Your Path' },
];

export default function OnboardingPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { settings } = useSettings();
  const isLight = settings.appearance.theme === 'light';

  const userId = user?.id || 'default_user';

  const [profile, setProfile] = useState<OnboardingProfile | null>(null);
  const [step, setStep] = useState(1);
  const [selectedLevel, setSelectedLevel] = useState<SelfReportedLevel>('beginner');
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [noneTopicsSelected, setNoneTopicsSelected] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<LearningGoal>('strong_fundamentals');

  // Assessment State
  const questions = useMemo(() => OnboardingService.getQuestions(), []);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [answers, setAnswers] = useState<AssessmentAnswer[]>([]);
  const [questionStartTime, setQuestionStartTime] = useState<number>(Date.now());

  // Initialize and load saved state
  useEffect(() => {
    const currentProfile = OnboardingService.getProfile(userId);
    setProfile(currentProfile);
    setStep(currentProfile.currentStep || 1);
    if (currentProfile.selfReportedLevel) setSelectedLevel(currentProfile.selfReportedLevel);
    if (currentProfile.learningGoal) setSelectedGoal(currentProfile.learningGoal);
    if (currentProfile.selectedTopics) setSelectedTopics([...currentProfile.selectedTopics]);
    setQuestionStartTime(Date.now());
  }, [userId]);

  const goToStep = (nextStep: number, partialUpdate: Partial<OnboardingProfile> = {}) => {
    const updated = OnboardingService.updateStep(userId, nextStep, {
      selfReportedLevel: selectedLevel,
      learningGoal: selectedGoal,
      selectedTopics,
      ...partialUpdate,
    });
    setProfile(updated);
    setStep(nextStep);
  };

  const handleSkip = () => {
    const skipped = OnboardingService.skipOnboarding(userId);
    setProfile(skipped);
    setStep(6);
  };

  const handleToggleTopic = (topicLabel: string) => {
    setNoneTopicsSelected(false);
    setSelectedTopics((prev) =>
      prev.includes(topicLabel)
        ? prev.filter((t) => t !== topicLabel)
        : [...prev, topicLabel]
    );
  };

  const handleSelectNoneTopics = () => {
    setNoneTopicsSelected(true);
    setSelectedTopics([]);
  };

  const handleAnswerQuestion = (skipped = false) => {
    const q = questions[currentQuestionIndex];
    const timeSpent = Math.max(Date.now() - questionStartTime, 500);
    const isCorrect = !skipped && selectedOptionId === q.correctOptionId;

    const answer: AssessmentAnswer = {
      questionId: q.id,
      selectedOptionId: skipped ? undefined : (selectedOptionId || undefined),
      isCorrect,
      skipped,
      timeSpentMs: timeSpent,
      topicId: q.topicId,
    };

    const nextAnswers = [...answers, answer];
    setAnswers(nextAnswers);
    setSelectedOptionId(null);

    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setQuestionStartTime(Date.now());
    } else {
      const evaluated = OnboardingService.submitAssessment(userId, nextAnswers);
      setProfile(evaluated);
      setStep(6);
    }
  };

  const handleFinishAndStartMission = () => {
    const completed = OnboardingService.completeOnboarding(userId);
    setProfile(completed);
    const destination = completed.firstMission?.destinationRoute || '/learn/beginnings';
    router.push(destination);
  };

  const cardBg = 'var(--card)';
  const borderCol = isLight ? '#E2E8F0' : 'rgba(255, 255, 255, 0.08)';
  const textPrimary = 'var(--text-primary)';
  const textSecondary = 'var(--text-secondary)';
  const textMuted = 'var(--text-muted)';
  const accentPrimary = 'var(--accent-primary)';

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--background)',
        color: textPrimary,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '24px 16px',
      }}
    >
      {/* Top Header & Progress Indicator */}
      <div style={{ width: '100%', maxWidth: '680px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '8px',
                background: 'rgba(99, 102, 241, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: accentPrimary,
              }}
            >
              <Sparkles size={16} />
            </div>
            <span style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', color: textSecondary }}>
              DSA MASTER Personalized Setup
            </span>
          </div>

          {step < 6 && (
            <button
              onClick={handleSkip}
              style={{
                background: 'none',
                border: 'none',
                color: textMuted,
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                padding: '6px 10px',
                borderRadius: '6px',
              }}
            >
              Skip for now
            </button>
          )}
        </div>

        {/* Steps Bar */}
        <div style={{ display: 'flex', gap: '6px', width: '100%' }}>
          {STEPS_NAV.map((s) => {
            const isCurrent = step === s.num;
            const isDone = step > s.num;
            return (
              <div
                key={s.num}
                style={{
                  flex: 1,
                  height: '4px',
                  borderRadius: '2px',
                  background: isDone
                    ? accentPrimary
                    : isCurrent
                    ? 'rgba(99, 102, 241, 0.6)'
                    : isLight
                    ? '#E2E8F0'
                    : 'rgba(255, 255, 255, 0.1)',
                  transition: 'all 0.2s ease',
                }}
                title={s.label}
              />
            );
          })}
        </div>
      </div>

      {/* Main Container Card */}
      <div
        style={{
          width: '100%',
          maxWidth: '680px',
          background: cardBg,
          border: '1px solid ' + borderCol,
          borderRadius: '24px',
          padding: '32px 28px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
        }}
      >
        {/* STEP 1: WELCOME */}
        {step === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: accentPrimary, fontSize: '12px', fontWeight: 700, textTransform: 'uppercase' }}>
                <Clock size={14} /> Estimated time: 2–4 minutes
              </div>
              <h1 style={{ fontSize: '28px', fontWeight: 800, margin: 0, letterSpacing: '-0.02em', lineHeight: 1.2 }}>
                Let&apos;s build your DSA path.
              </h1>
              <p style={{ fontSize: '15px', color: textSecondary, margin: 0, lineHeight: 1.6 }}>
                You don&apos;t need to know where to start. We&apos;ll figure that out from where you are.
              </p>
            </div>

            <div
              style={{
                background: isLight ? '#F8FAFC' : 'rgba(255, 255, 255, 0.03)',
                border: '1px solid ' + borderCol,
                borderRadius: '16px',
                padding: '20px',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
                gap: '16px',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{ fontSize: '11px', fontWeight: 700, color: textMuted, textTransform: 'uppercase' }}>01 Baseline</span>
                <span style={{ fontSize: '13px', fontWeight: 600 }}>Adaptive Diagnostic</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{ fontSize: '11px', fontWeight: 700, color: textMuted, textTransform: 'uppercase' }}>02 Prior</span>
                <span style={{ fontSize: '13px', fontWeight: 600 }}>Goal & Background</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{ fontSize: '11px', fontWeight: 700, color: textMuted, textTransform: 'uppercase' }}>03 Action</span>
                <span style={{ fontSize: '13px', fontWeight: 600 }}>First Mission Handoff</span>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
              <button
                onClick={handleSkip}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: textSecondary,
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  padding: '10px 16px',
                }}
              >
                Skip for now
              </button>
              <button
                onClick={() => goToStep(2)}
                style={{
                  background: accentPrimary,
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '14px',
                  padding: '12px 24px',
                  fontSize: '14px',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                }}
              >
                Get Started <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: CURRENT LEVEL */}
        {step === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: accentPrimary }}>Step 02 · Self-Reported Level</span>
              <h2 style={{ fontSize: '22px', fontWeight: 800, margin: '4px 0 6px 0' }}>
                How comfortable are you with DSA?
              </h2>
              <p style={{ fontSize: '13px', color: textSecondary, margin: 0 }}>
                This helps shape your starting recommendations. Real verified mastery develops as you solve problems.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {LEVEL_OPTIONS.map((opt) => {
                const isSelected = selectedLevel === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => setSelectedLevel(opt.id)}
                    style={{
                      background: isSelected ? 'rgba(99, 102, 241, 0.08)' : 'transparent',
                      border: '1.5px solid ' + (isSelected ? accentPrimary : borderCol),
                      borderRadius: '14px',
                      padding: '14px 18px',
                      textAlign: 'left',
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      color: textPrimary,
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 700 }}>{opt.title}</div>
                      <div style={{ fontSize: '12px', color: textSecondary, marginTop: '2px' }}>{opt.desc}</div>
                    </div>
                    {isSelected && <CheckCircle2 size={18} style={{ color: accentPrimary, flexShrink: 0 }} />}
                  </button>
                );
              })}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
              <button
                onClick={() => setStep(1)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: textSecondary,
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <ArrowLeft size={16} /> Back
              </button>
              <button
                onClick={() => goToStep(3, { selfReportedLevel: selectedLevel })}
                style={{
                  background: accentPrimary,
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '14px',
                  padding: '12px 24px',
                  fontSize: '14px',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                }}
              >
                Continue <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: EXPERIENCE / TOPICS */}
        {step === 3 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: accentPrimary }}>Step 03 · Prior Exposure</span>
              <h2 style={{ fontSize: '22px', fontWeight: 800, margin: '4px 0 6px 0' }}>
                What have you already worked with?
              </h2>
              <p style={{ fontSize: '13px', color: textSecondary, margin: 0 }}>
                Select any topics you have studied or solved before (or select None yet).
              </p>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {TOPIC_LIST.map((t) => {
                const isSelected = selectedTopics.includes(t.label);
                return (
                  <button
                    key={t.id}
                    onClick={() => handleToggleTopic(t.label)}
                    style={{
                      background: isSelected ? 'rgba(99, 102, 241, 0.12)' : 'transparent',
                      border: '1.5px solid ' + (isSelected ? accentPrimary : borderCol),
                      borderRadius: '12px',
                      padding: '8px 14px',
                      fontSize: '13px',
                      fontWeight: isSelected ? 700 : 500,
                      color: isSelected ? accentPrimary : textPrimary,
                      cursor: 'pointer',
                    }}
                  >
                    {t.label}
                  </button>
                );
              })}
              <button
                onClick={handleSelectNoneTopics}
                style={{
                  background: noneTopicsSelected ? 'rgba(239, 68, 68, 0.12)' : 'transparent',
                  border: '1.5px solid ' + (noneTopicsSelected ? '#EF4444' : borderCol),
                  borderRadius: '12px',
                  padding: '8px 14px',
                  fontSize: '13px',
                  fontWeight: noneTopicsSelected ? 700 : 500,
                  color: noneTopicsSelected ? '#EF4444' : textMuted,
                  cursor: 'pointer',
                }}
              >
                None yet
              </button>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
              <button
                onClick={() => setStep(2)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: textSecondary,
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <ArrowLeft size={16} /> Back
              </button>
              <button
                onClick={() => goToStep(4, { selectedTopics })}
                style={{
                  background: accentPrimary,
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '14px',
                  padding: '12px 24px',
                  fontSize: '14px',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                }}
              >
                Continue <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: LEARNING GOAL */}
        {step === 4 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: accentPrimary }}>Step 04 · Purpose & Focus</span>
              <h2 style={{ fontSize: '22px', fontWeight: 800, margin: '4px 0 6px 0' }}>
                What are you preparing for?
              </h2>
              <p style={{ fontSize: '13px', color: textSecondary, margin: 0 }}>
                Your goal influences problem recommendation sequences and interview simulation modes.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {GOAL_OPTIONS.map((g) => {
                const isSelected = selectedGoal === g.id;
                return (
                  <button
                    key={g.id}
                    onClick={() => setSelectedGoal(g.id)}
                    style={{
                      background: isSelected ? 'rgba(99, 102, 241, 0.08)' : 'transparent',
                      border: '1.5px solid ' + (isSelected ? accentPrimary : borderCol),
                      borderRadius: '14px',
                      padding: '14px 18px',
                      textAlign: 'left',
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      color: textPrimary,
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 700 }}>{g.title}</div>
                      <div style={{ fontSize: '12px', color: textSecondary, marginTop: '2px' }}>{g.desc}</div>
                    </div>
                    {isSelected && <CheckCircle2 size={18} style={{ color: accentPrimary, flexShrink: 0 }} />}
                  </button>
                );
              })}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
              <button
                onClick={() => setStep(3)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: textSecondary,
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <ArrowLeft size={16} /> Back
              </button>
              <button
                onClick={() => goToStep(5, { learningGoal: selectedGoal })}
                style={{
                  background: accentPrimary,
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '14px',
                  padding: '12px 24px',
                  fontSize: '14px',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                }}
              >
                Start Diagnostic <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: MICRO ASSESSMENT */}
        {step === 5 && questions.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: accentPrimary }}>
                  Diagnostic Question {currentQuestionIndex + 1} of {questions.length}
                </span>
                <h2 style={{ fontSize: '20px', fontWeight: 800, margin: '4px 0 0 0' }}>
                  {questions[currentQuestionIndex].title}
                </h2>
              </div>
              <button
                onClick={() => handleAnswerQuestion(true)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: textMuted,
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Skip question
              </button>
            </div>

            <p style={{ fontSize: '14px', color: textSecondary, margin: 0, lineHeight: 1.6 }}>
              {questions[currentQuestionIndex].question}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {questions[currentQuestionIndex].options.map((opt) => {
                const isSelected = selectedOptionId === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => setSelectedOptionId(opt.id)}
                    style={{
                      background: isSelected ? 'rgba(99, 102, 241, 0.08)' : 'transparent',
                      border: '1.5px solid ' + (isSelected ? accentPrimary : borderCol),
                      borderRadius: '14px',
                      padding: '14px 18px',
                      textAlign: 'left',
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      color: textPrimary,
                    }}
                  >
                    <span style={{ fontSize: '13.5px', fontWeight: 600, lineHeight: 1.4 }}>{opt.text}</span>
                    {isSelected && <CheckCircle2 size={18} style={{ color: accentPrimary, flexShrink: 0 }} />}
                  </button>
                );
              })}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
              <button
                onClick={handleSkip}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: textMuted,
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Skip entire diagnostic
              </button>
              <button
                onClick={() => handleAnswerQuestion(false)}
                disabled={!selectedOptionId}
                style={{
                  background: selectedOptionId ? accentPrimary : (isLight ? '#E2E8F0' : 'rgba(255, 255, 255, 0.1)'),
                  color: selectedOptionId ? '#FFFFFF' : textMuted,
                  border: 'none',
                  borderRadius: '14px',
                  padding: '12px 24px',
                  fontSize: '14px',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: selectedOptionId ? 'pointer' : 'not-allowed',
                }}
              >
                {currentQuestionIndex + 1 === questions.length ? 'See My Path' : 'Next Question'} <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 6: PERSONALIZATION RESULT & FIRST MISSION */}
        {step === 6 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#10B981', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase' }}>
                <ShieldCheck size={16} /> Baseline established
              </div>
              <h1 style={{ fontSize: '26px', fontWeight: 800, margin: '4px 0 6px 0', letterSpacing: '-0.02em' }}>
                Here&apos;s where we&apos;ll start.
              </h1>
              <p style={{ fontSize: '14px', color: textSecondary, margin: 0, lineHeight: 1.5 }}>
                Your baseline prior is configured. Real verified mastery will unlock step-by-step as you complete solves.
              </p>
            </div>

            {/* Baseline Diagnostic Summary */}
            <div
              style={{
                background: isLight ? '#F8FAFC' : 'rgba(255, 255, 255, 0.03)',
                border: '1px solid ' + borderCol,
                borderRadius: '16px',
                padding: '18px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              <div style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: textMuted }}>
                Why this starting point:
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {(profile?.assessmentEvidence || [
                  'Foundational prerequisite for all 14 canonical DSA topics',
                  'Self-reported level: ' + selectedLevel,
                  'Zero verified practice solves recorded (Clean baseline)',
                ]).map((ev, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '12.5px', color: textSecondary }}>
                    <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: accentPrimary, marginTop: '7px', flexShrink: 0 }} />
                    <span>{ev}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* FIRST MISSION CARD */}
            <div
              style={{
                background: isLight ? '#EEF2FF' : 'rgba(99, 102, 241, 0.08)',
                border: '1.5px solid ' + accentPrimary,
                borderRadius: '20px',
                padding: '22px',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: accentPrimary }}>
                  YOUR FIRST MISSION
                </span>
                <span style={{ fontSize: '11px', fontWeight: 700, color: textSecondary, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Clock size={12} /> {profile?.firstMission?.estimatedMinutes || 15} min
                </span>
              </div>

              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 800, margin: '0 0 6px 0', color: textPrimary }}>
                  {profile?.firstMission?.title || 'Build Arrays & Hashing Foundation'}
                </h3>
                <p style={{ fontSize: '13px', color: textSecondary, margin: 0, lineHeight: 1.5 }}>
                  {profile?.firstMission?.description || 'Establish solid algorithmic intuition with fundamental frequency maps, prefix structures, and lookup patterns.'}
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '4px' }}>
                {(profile?.firstMission?.steps || [
                  'Understand Big-O time and space complexity trade-offs for Hash Maps vs Arrays',
                  'Solve your first foundational problem: Contains Duplicate or Two Sum',
                  'Observe your Adaptive Roadmap unlock subsequent graph nodes based on genuine solves',
                ]).map((st, sIdx) => (
                  <div key={sIdx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: textPrimary }}>
                    <CheckCircle2 size={14} style={{ color: accentPrimary, flexShrink: 0 }} />
                    <span>{st}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ACTION CTAs */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '8px' }}>
              <button
                onClick={handleFinishAndStartMission}
                style={{
                  background: accentPrimary,
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '16px',
                  padding: '14px 28px',
                  fontSize: '15px',
                  fontWeight: 800,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(99, 102, 241, 0.35)',
                }}
              >
                Start My First Mission <ArrowRight size={18} />
              </button>

              <Link
                href="/journey"
                style={{
                  textAlign: 'center',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: textSecondary,
                  textDecoration: 'none',
                  padding: '8px',
                }}
              >
                View Full Adaptive Roadmap →
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
