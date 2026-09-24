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
  Compass,
  Target,
  Zap,
  HelpCircle,
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

  // Initialize and load saved state with async remote synchronization
  useEffect(() => {
    const currentProfile = OnboardingService.getProfile(userId);
    setProfile(currentProfile);
    setStep(currentProfile.currentStep || 1);
    if (currentProfile.selfReportedLevel) setSelectedLevel(currentProfile.selfReportedLevel);
    if (currentProfile.learningGoal) setSelectedGoal(currentProfile.learningGoal);
    if (currentProfile.selectedTopics) setSelectedTopics([...currentProfile.selectedTopics]);
    setQuestionStartTime(Date.now());

    // Asynchronously synchronize with server/Supabase
    OnboardingService.loadProfileAsync(userId)
      .then((synced) => {
        if (synced && synced.userId === userId) {
          setProfile(synced);
          if (synced.currentStep && synced.currentStep > (currentProfile.currentStep || 1)) {
            setStep(synced.currentStep);
          }
          if (synced.selfReportedLevel) setSelectedLevel(synced.selfReportedLevel);
          if (synced.learningGoal) setSelectedGoal(synced.learningGoal);
          if (synced.selectedTopics && synced.selectedTopics.length > 0) {
            setSelectedTopics([...synced.selectedTopics]);
          }
        }
      })
      .catch(() => {});
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
      selectedOptionId: skipped ? undefined : selectedOptionId || undefined,
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
    const destination = completed.firstMission?.destinationRoute || '/practice/contains-duplicate';
    router.push(destination);
  };

  return (
    <div className="min-h-screen w-full bg-[var(--background)] text-[var(--text-primary)] flex flex-col items-center justify-start py-8 sm:py-12 px-4 sm:px-6 transition-colors duration-200 overflow-x-hidden">
      
      {/* ── Top Header & Progress HUD ── */}
      <div className="w-full max-w-2xl mb-6 sm:mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-[var(--accent-primary)]/15 flex items-center justify-center text-[var(--accent-primary)]">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="text-xs font-mono font-bold tracking-wider uppercase text-[var(--text-secondary)]">
              DSA Magna Personalized Setup
            </span>
          </div>

          {step < 6 && (
            <button
              onClick={handleSkip}
              aria-label="Skip onboarding for now"
              className="text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--text-primary)] px-2.5 py-1 rounded-md transition-colors cursor-pointer"
            >
              Skip for now
            </button>
          )}
        </div>

        {/* Steps Progress Track */}
        <div
          role="progressbar"
          aria-valuenow={step}
          aria-valuemin={1}
          aria-valuemax={6}
          aria-label={`Onboarding Step ${step} of 6: ${STEPS_NAV[step - 1]?.label}`}
          className="flex gap-1.5 sm:gap-2 w-full"
        >
          {STEPS_NAV.map((s) => {
            const isCurrent = step === s.num;
            const isDone = step > s.num;
            return (
              <div
                key={s.num}
                className={`flex-1 h-1.5 rounded-full transition-all duration-300 ${
                  isDone
                    ? 'bg-[var(--accent-primary)]'
                    : isCurrent
                    ? 'bg-[var(--accent-primary)]/80 ring-2 ring-[var(--accent-primary)]/20'
                    : 'bg-[var(--border)]'
                }`}
                title={s.label}
              />
            );
          })}
        </div>

        {/* Step Indicator Label */}
        <div className="flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)] mt-2">
          <span>STEP {step.toString().padStart(2, '0')} OF 06</span>
          <span className="uppercase">{STEPS_NAV[step - 1]?.label}</span>
        </div>
      </div>

      {/* ── Main Container Card ── */}
      <div className="w-full max-w-2xl bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 sm:p-8 shadow-xl shadow-black/5 flex flex-col gap-6 transition-colors">
        
        {/* ── STEP 1: WELCOME ── */}
        {step === 1 && (
          <div className="flex flex-col gap-6 animate-in fade-in duration-200">
            <div className="flex flex-col gap-2">
              <div className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[var(--accent-primary)] uppercase tracking-wider">
                <Clock className="w-3.5 h-3.5" /> Estimated time: 2–4 minutes
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--text-primary)]">
                Let&apos;s build your DSA path.
              </h1>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                You don&apos;t need to know where to start. We&apos;ll figure that out from where you are.
              </p>
            </div>

            {/* Overview Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-[var(--surface-secondary)] border border-[var(--border)]">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-mono font-bold text-[var(--text-muted)] uppercase tracking-wider">01 Baseline</span>
                <span className="text-sm font-semibold text-[var(--text-primary)]">Adaptive Diagnostic</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-mono font-bold text-[var(--text-muted)] uppercase tracking-wider">02 Prior</span>
                <span className="text-sm font-semibold text-[var(--text-primary)]">Goal & Background</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-mono font-bold text-[var(--text-muted)] uppercase tracking-wider">03 Action</span>
                <span className="text-sm font-semibold text-[var(--text-primary)]">First Mission Handoff</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-2">
              <button
                onClick={handleSkip}
                className="text-xs sm:text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] px-3 py-2 rounded-lg transition-colors cursor-pointer"
              >
                Skip for now
              </button>
              <button
                onClick={() => goToStep(2)}
                className="h-11 sm:h-12 px-6 bg-[var(--accent-primary)] hover:opacity-90 active:scale-[0.99] text-white font-bold text-xs sm:text-sm rounded-xl flex items-center gap-2 transition-all shadow-md shadow-[var(--accent-glow)] cursor-pointer"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 2: CURRENT LEVEL ── */}
        {step === 2 && (
          <div className="flex flex-col gap-6 animate-in fade-in duration-200">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--accent-primary)]">
                Step 02 · Self-Reported Level
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[var(--text-primary)] mt-1 mb-1.5">
                How comfortable are you with DSA?
              </h2>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
                This helps shape your starting recommendations. Real verified mastery develops as you solve problems.
              </p>
            </div>

            <div role="radiogroup" aria-label="Self-reported DSA level" className="flex flex-col gap-2.5">
              {LEVEL_OPTIONS.map((opt) => {
                const isSelected = selectedLevel === opt.id;
                return (
                  <button
                    key={opt.id}
                    role="radio"
                    aria-checked={isSelected}
                    onClick={() => setSelectedLevel(opt.id)}
                    className={`w-full p-4 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'border-[var(--accent-primary)] bg-[var(--accent-primary)]/10 ring-1 ring-[var(--accent-primary)]'
                        : 'border-[var(--border)] bg-[var(--surface-secondary)] hover:border-[var(--text-muted)]'
                    }`}
                  >
                    <div>
                      <div className="text-sm font-bold text-[var(--text-primary)]">{opt.title}</div>
                      <div className="text-xs text-[var(--text-secondary)] mt-0.5 leading-relaxed">{opt.desc}</div>
                    </div>
                    {isSelected && (
                      <CheckCircle2 className="w-5 h-5 text-[var(--accent-primary)] flex-shrink-0 ml-3" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => setStep(1)}
                className="text-xs sm:text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                onClick={() => goToStep(3, { selfReportedLevel: selectedLevel })}
                className="h-11 sm:h-12 px-6 bg-[var(--accent-primary)] hover:opacity-90 active:scale-[0.99] text-white font-bold text-xs sm:text-sm rounded-xl flex items-center gap-2 transition-all shadow-md shadow-[var(--accent-glow)] cursor-pointer"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 3: EXPERIENCE / TOPICS ── */}
        {step === 3 && (
          <div className="flex flex-col gap-6 animate-in fade-in duration-200">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--accent-primary)]">
                Step 03 · Prior Exposure
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[var(--text-primary)] mt-1 mb-1.5">
                What have you already worked with?
              </h2>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
                Select any topics you have studied or solved before (or select None yet).
              </p>
            </div>

            <div role="group" aria-label="Prior DSA topic exposure" className="flex flex-wrap gap-2">
              {TOPIC_LIST.map((t) => {
                const isSelected = selectedTopics.includes(t.label);
                return (
                  <button
                    key={t.id}
                    role="checkbox"
                    aria-checked={isSelected}
                    onClick={() => handleToggleTopic(t.label)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[var(--accent-primary)] bg-[var(--accent-primary)]/15 text-[var(--accent-primary)] ring-1 ring-[var(--accent-primary)]/50'
                        : 'border-[var(--border)] bg-[var(--surface-secondary)] text-[var(--text-primary)] hover:border-[var(--text-muted)]'
                    }`}
                  >
                    {t.label}
                  </button>
                );
              })}
              <button
                role="checkbox"
                aria-checked={noneTopicsSelected}
                onClick={handleSelectNoneTopics}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                  noneTopicsSelected
                    ? 'border-red-500 bg-red-500/15 text-red-500 ring-1 ring-red-500/50'
                    : 'border-[var(--border)] bg-[var(--surface-secondary)] text-[var(--text-muted)] hover:border-[var(--text-muted)]'
                }`}
              >
                None yet
              </button>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => setStep(2)}
                className="text-xs sm:text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                onClick={() => goToStep(4, { selectedTopics })}
                className="h-11 sm:h-12 px-6 bg-[var(--accent-primary)] hover:opacity-90 active:scale-[0.99] text-white font-bold text-xs sm:text-sm rounded-xl flex items-center gap-2 transition-all shadow-md shadow-[var(--accent-glow)] cursor-pointer"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 4: LEARNING GOAL ── */}
        {step === 4 && (
          <div className="flex flex-col gap-6 animate-in fade-in duration-200">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--accent-primary)]">
                Step 04 · Purpose & Focus
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[var(--text-primary)] mt-1 mb-1.5">
                What are you preparing for?
              </h2>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
                Your goal influences problem recommendation sequences and interview simulation modes.
              </p>
            </div>

            <div role="radiogroup" aria-label="Learning goals" className="flex flex-col gap-2.5">
              {GOAL_OPTIONS.map((g) => {
                const isSelected = selectedGoal === g.id;
                return (
                  <button
                    key={g.id}
                    role="radio"
                    aria-checked={isSelected}
                    onClick={() => setSelectedGoal(g.id)}
                    className={`w-full p-4 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'border-[var(--accent-primary)] bg-[var(--accent-primary)]/10 ring-1 ring-[var(--accent-primary)]'
                        : 'border-[var(--border)] bg-[var(--surface-secondary)] hover:border-[var(--text-muted)]'
                    }`}
                  >
                    <div>
                      <div className="text-sm font-bold text-[var(--text-primary)]">{g.title}</div>
                      <div className="text-xs text-[var(--text-secondary)] mt-0.5 leading-relaxed">{g.desc}</div>
                    </div>
                    {isSelected && (
                      <CheckCircle2 className="w-5 h-5 text-[var(--accent-primary)] flex-shrink-0 ml-3" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => setStep(3)}
                className="text-xs sm:text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                onClick={() => goToStep(5, { learningGoal: selectedGoal })}
                className="h-11 sm:h-12 px-6 bg-[var(--accent-primary)] hover:opacity-90 active:scale-[0.99] text-white font-bold text-xs sm:text-sm rounded-xl flex items-center gap-2 transition-all shadow-md shadow-[var(--accent-glow)] cursor-pointer"
              >
                <span>Start Diagnostic</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 5: MICRO ASSESSMENT ── */}
        {step === 5 && questions.length > 0 && (
          <div className="flex flex-col gap-6 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--accent-primary)]">
                  Diagnostic Question {currentQuestionIndex + 1} of {questions.length}
                </span>
                <h2 className="text-lg sm:text-xl font-extrabold tracking-tight text-[var(--text-primary)] mt-1">
                  {questions[currentQuestionIndex].title}
                </h2>
              </div>
              <button
                onClick={() => handleAnswerQuestion(true)}
                className="text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
              >
                Skip question
              </button>
            </div>

            <div className="p-4 rounded-xl bg-[var(--surface-secondary)] border border-[var(--border)]">
              <p className="text-xs sm:text-sm text-[var(--text-primary)] leading-relaxed font-medium">
                {questions[currentQuestionIndex].question}
              </p>
            </div>

            <div role="radiogroup" aria-label="Diagnostic question options" className="flex flex-col gap-2.5">
              {questions[currentQuestionIndex].options.map((opt) => {
                const isSelected = selectedOptionId === opt.id;
                return (
                  <button
                    key={opt.id}
                    role="radio"
                    aria-checked={isSelected}
                    onClick={() => setSelectedOptionId(opt.id)}
                    className={`w-full p-4 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'border-[var(--accent-primary)] bg-[var(--accent-primary)]/10 ring-1 ring-[var(--accent-primary)]'
                        : 'border-[var(--border)] bg-[var(--surface-secondary)] hover:border-[var(--text-muted)]'
                    }`}
                  >
                    <span className="text-xs sm:text-sm font-semibold text-[var(--text-primary)] leading-relaxed">
                      {opt.text}
                    </span>
                    {isSelected && (
                      <CheckCircle2 className="w-5 h-5 text-[var(--accent-primary)] flex-shrink-0 ml-3" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-2">
              <button
                onClick={handleSkip}
                className="text-xs sm:text-sm font-medium text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
              >
                Skip entire diagnostic
              </button>
              <button
                onClick={() => handleAnswerQuestion(false)}
                disabled={!selectedOptionId}
                className={`h-11 sm:h-12 px-6 font-bold text-xs sm:text-sm rounded-xl flex items-center gap-2 transition-all cursor-pointer ${
                  selectedOptionId
                    ? 'bg-[var(--accent-primary)] hover:opacity-90 active:scale-[0.99] text-white shadow-md shadow-[var(--accent-glow)]'
                    : 'bg-[var(--border)] text-[var(--text-muted)] cursor-not-allowed opacity-60'
                }`}
              >
                <span>{currentQuestionIndex + 1 === questions.length ? 'See My Path' : 'Next Question'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 6: PERSONALIZATION RESULT & FIRST MISSION ── */}
        {step === 6 && (
          <div className="flex flex-col gap-6 animate-in fade-in duration-200">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-emerald-500">
                <ShieldCheck className="w-4 h-4" /> Baseline established
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--text-primary)] mt-1 mb-1.5">
                Here&apos;s where we&apos;ll start.
              </h1>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                Your baseline prior is configured. Real verified mastery will unlock step-by-step as you complete solves.
              </p>
            </div>

            {/* Baseline Diagnostic Summary */}
            <div className="p-4 rounded-xl bg-[var(--surface-secondary)] border border-[var(--border)] flex flex-col gap-2.5">
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--text-muted)]">
                Why this starting point:
              </div>
              <div className="flex flex-col gap-2">
                {(
                  profile?.assessmentEvidence || [
                    'Foundational prerequisite for all 14 canonical DSA topics',
                    'Self-reported level: ' + selectedLevel,
                    'Zero verified practice solves recorded (Clean baseline)',
                  ]
                ).map((ev, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-[var(--text-secondary)]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-primary)] mt-1.5 flex-shrink-0" />
                    <span>{ev}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* First Mission Card */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[var(--accent-primary)]/10 border-2 border-[var(--accent-primary)] flex flex-col gap-3.5 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono font-extrabold tracking-wider uppercase text-[var(--accent-primary)]">
                  YOUR FIRST MISSION
                </span>
                <span className="text-xs font-semibold text-[var(--text-secondary)] flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> {profile?.firstMission?.estimatedMinutes || 15} min
                </span>
              </div>

              <div>
                <h3 className="text-base sm:text-lg font-bold text-[var(--text-primary)] mb-1">
                  {profile?.firstMission?.title || 'Build Arrays & Hashing Foundation'}
                </h3>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                  {profile?.firstMission?.description ||
                    'Establish solid algorithmic intuition with fundamental frequency maps, prefix structures, and lookup patterns.'}
                </p>
              </div>

              <div className="flex flex-col gap-2 pt-1 border-t border-[var(--border)]">
                {(
                  profile?.firstMission?.steps || [
                    'Understand Big-O time and space complexity trade-offs for Hash Maps vs Arrays',
                    'Solve your first foundational problem: Contains Duplicate or Two Sum',
                    'Observe your Adaptive Roadmap unlock subsequent graph nodes based on genuine solves',
                  ]
                ).map((st, sIdx) => (
                  <div key={sIdx} className="flex items-start gap-2 text-xs text-[var(--text-primary)]">
                    <CheckCircle2 className="w-4 h-4 text-[var(--accent-primary)] flex-shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{st}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action CTAs */}
            <div className="flex flex-col gap-3 pt-2">
              <button
                onClick={handleFinishAndStartMission}
                className="w-full h-12 bg-[var(--accent-primary)] hover:opacity-90 active:scale-[0.99] text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 transition-all shadow-md shadow-[var(--accent-glow)] cursor-pointer"
              >
                <span>Start My First Mission</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <Link
                href="/journey"
                className="text-center text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] py-2 transition-colors"
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
