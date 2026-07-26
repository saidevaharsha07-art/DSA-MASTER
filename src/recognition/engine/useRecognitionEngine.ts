'use client';
import { useState } from 'react';
import { RecognitionAttempt, RecognitionReport, RecognitionStep } from '../types';
import { ProblemDNA } from '@/src/problem-dna/types';
import { calculateRecognitionScore } from '../scoring';

export function useRecognitionEngine(problem: ProblemDNA) {
  const [step, setStep] = useState<RecognitionStep>('keywords');
  const [attempt, setAttempt] = useState<Partial<RecognitionAttempt>>({
    problemId: problem.id,
    identifiedKeywords: [],
    selectedPatterns: [],
    expectedTimeComplexity: 'O(N)',
    expectedSpaceComplexity: 'O(1)',
    reasoning: '',
    confidence: 3
  });
  
  const [report, setReport] = useState<RecognitionReport | null>(null);

  const updateAttempt = (data: Partial<RecognitionAttempt>) => {
    setAttempt(prev => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    switch (step) {
      case 'keywords': setStep('complexity'); break;
      case 'complexity': setStep('patterns'); break;
      case 'patterns': setStep('reasoning'); break;
      case 'reasoning': 
        const finalReport = calculateRecognitionScore(attempt as RecognitionAttempt, problem);
        setReport(finalReport);
        setStep('report');
        break;
    }
  };

  return {
    step,
    attempt,
    updateAttempt,
    nextStep,
    report,
    reset: () => {
      setStep('keywords');
      setReport(null);
    }
  };
}
