'use client';

import React, { useState, useEffect, use } from 'react';
import { curriculumEngine } from '@/src/engines/curriculum';
import { notFound } from 'next/navigation';
import { CheckCircle, Activity, MonitorPlay, EyeOff, Clock, FileText } from 'lucide-react';
import { ThinkingPhase } from '@/components/workspace/ThinkingPhase';
import { AlgorithmVisualizer } from '@/components/visualizer/AlgorithmVisualizer';
import { AIComparison } from '@/components/workspace/AIComparison';
import { ReflectionPhase } from '@/components/workspace/ReflectionPhase';
import { sessionEngine } from '@/src/engines/session';
import { eventBus } from '@/src/core/events';
import { WorkspaceLayout } from '@/src/components/layouts/WorkspaceLayout';
import { Button, Badge, Card, ScrollArea } from '@/src/components/ui';
import Link from 'next/link';
import { typography, colors } from '@/src/design';
import { useSettings } from '@/src/context/SettingsContext';

type WorkspacePhase = 'thinking' | 'visualizing' | 'coding' | 'evaluation' | 'reflection' | 'summary';

export default function ProblemPage(props: { params: Promise<{ slug: string }> }) {
  const params = use(props.params);
  const { settings } = useSettings();
  const { timerEnabled, showEditorial } = settings.practice;
  const { hintFrequency } = settings.learningEngine;

  const [phase, setPhase] = useState<WorkspacePhase>('thinking');
  const [interviewMode, setInterviewMode] = useState(false);
  const [showEditorialTab, setShowEditorialTab] = useState(false);

  const problems = curriculumEngine.getAllProblems();
  const problem = problems.find(p => p.slug === params.slug);
  
  useEffect(() => {
    sessionEngine.startSession();
  }, []);

  useEffect(() => {
    if (interviewMode && (phase === 'thinking' || phase === 'visualizing')) {
      setPhase('coding');
    }
  }, [interviewMode, phase]);

  if (!problem) return notFound();

  const handleSimulateSolve = () => {
    eventBus.publish('ProblemSolved', {
      problemId: problem.id,
      patternId: problem.patterns?.[0] || '',
      timeTakenSeconds: 300 
    });
    setPhase('evaluation');
  };

  const leftPanel = (
    <ScrollArea style={{ height: '100%', paddingRight: '16px' }}>
      {phase === 'thinking' && (
        <ThinkingPhase problemId={problem.id} onComplete={() => setPhase('visualizing')} />
      )}

      {phase === 'visualizing' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <AlgorithmVisualizer problemId={problem.id} onComplete={() => setPhase('coding')} />
        </div>
      )}

      {phase === 'coding' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h3 style={{ fontSize: typography.fontSize.h3, fontWeight: typography.fontWeight.bold, margin: 0, color: "var(--text-primary)" }}>Problem Description</h3>
            <Badge variant={problem.difficulty.toLowerCase() as any}>{problem.difficulty}</Badge>
          </div>
          <Card padding="md" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            <p style={{ color: "var(--text-secondary)", fontSize: typography.fontSize.caption, lineHeight: 1.6, margin: 0 }}>{problem.bruteForceIdea}</p>
          </Card>
          
          {hintFrequency !== "none" && (
            <Card padding="md" style={{ backgroundColor: "var(--primary-soft)", borderColor: 'var(--primary-soft)' }}>
               <h3 style={{ fontSize: typography.fontSize.body, fontWeight: typography.fontWeight.bold, color: "var(--primary)", margin: '0 0 8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                 <Activity size={18} /> AI Coach Hints ({hintFrequency} mode)
               </h3>
               <ul style={{ paddingLeft: '20px', margin: 0, color: "var(--text-primary)", fontSize: typography.fontSize.caption, lineHeight: 1.6 }}>
                 {problem.hints.map((hint, i) => (
                   <li key={i} style={{ marginBottom: '4px' }}>{hint}</li>
                 ))}
               </ul>
            </Card>
          )}

          {showEditorial && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowEditorialTab(!showEditorialTab)}
              style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--text-primary)" }}
            >
              <FileText size={16} /> {showEditorialTab ? "Hide Editorial Solution" : "View Editorial Solution"}
            </Button>
          )}

          {showEditorialTab && (
            <Card padding="md" style={{ background: "var(--card)", border: "1px solid var(--primary)" }}>
              <h4 style={{ margin: "0 0 8px 0", color: "var(--primary)" }}>Editorial Solution</h4>
              <p style={{ fontSize: "12px", color: "var(--text-secondary)", margin: 0 }}>
                Optimal Time Complexity: O(N), Space Complexity: O(N) using hash map prefix indexing.
              </p>
            </Card>
          )}
        </div>
      )}

      {phase === 'evaluation' && (
        <AIComparison problemId={problem.id} onNext={() => setPhase('reflection')} />
      )}

      {phase === 'reflection' && (
        <ReflectionPhase problemId={problem.id} onComplete={() => setPhase('summary')} />
      )}

      {phase === 'summary' && (
        <Card padding="xl" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '24px', background: "var(--card)", border: "1px solid var(--border)" }}>
          <CheckCircle size={48} style={{ color: colors.success, margin: '0 auto' }} />
          <h2 style={{ fontSize: typography.fontSize.h2, margin: 0, fontWeight: typography.fontWeight.bold, color: "var(--text-primary)" }}>Solve Completed!</h2>
          <p style={{ color: "var(--text-secondary)", margin: 0 }}>Your reflection and mistake timeline have been updated.</p>
          <Button asChild variant="primary" style={{ background: "var(--primary)", color: "#FFF" }}>
            <Link href="/practice">Return to Arena</Link>
          </Button>
        </Card>
      )}
    </ScrollArea>
  );

  const centerPanel = (
    <div style={{ background: 'var(--card)', borderRadius: '12px', height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden', border: "1px solid var(--border)" }}>
      <div style={{ padding: '12px 16px', background: 'var(--surface)', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
         <div style={{ display: 'flex', alignItems: 'center', gap: '16px', color: 'var(--text-secondary)', fontSize: '14px' }}>
           <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Python</span>
           <span>C++</span>
           <span>Java</span>
         </div>
         {timerEnabled && (
           <Badge style={{ background: "var(--primary-soft)", color: 'var(--primary)', border: 'none', display: "flex", alignItems: "center", gap: "4px" }}>
             <Clock size={12} /> Timer Active
           </Badge>
         )}
      </div>

      <div style={{ padding: '24px', flexGrow: 1, color: 'var(--text-primary)', fontFamily: 'var(--font-sans)', fontSize: '14px', position: 'relative', overflowY: 'auto' }}>
         {(phase === 'thinking' || phase === 'visualizing') && !interviewMode && (
           <div style={{
             position: 'absolute', inset: 0, background: 'rgba(10,14,26,0.85)', backdropFilter: 'blur(4px)',
             display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10
           }}>
             <Card padding="xl" style={{ textAlign: 'center', background: "var(--card)", border: "1px solid var(--border)" }}>
               <MonitorPlay size={32} style={{ color: "var(--primary)", margin: '0 auto 12px' }} />
               <h3 style={{ fontSize: typography.fontSize.h3, margin: '0 0 8px', fontWeight: typography.fontWeight.bold, color: "var(--text-primary)" }}>Editor Locked</h3>
               <p style={{ color: "var(--text-secondary)", margin: 0 }}>Complete the {phase} phase on the left to unlock.</p>
             </Card>
           </div>
         )}
         <pre style={{ margin: 0 }}>
            <code>{problem.template[0]?.code || '# Write your code here'}</code>
         </pre>
      </div>
      
      <div style={{ padding: '16px', background: 'var(--surface)', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
         <Button variant="ghost" style={{ color: 'var(--text-primary)' }}>Run Code</Button>
         <Button 
            variant="primary"
            style={{ backgroundColor: "var(--primary)", color: "#FFF" }}
            onClick={handleSimulateSolve}
            disabled={phase === 'thinking' || phase === 'visualizing' || phase === 'evaluation' || phase === 'reflection' || phase === 'summary'}
         >
           Submit Solution
         </Button>
      </div>
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 80px)', gap: '16px' }}>
      {/* Top Toolbar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px' }}>
        <h1 style={{ fontSize: typography.fontSize.h3, fontWeight: typography.fontWeight.bold, margin: 0, color: "var(--text-primary)" }}>{problem.title}</h1>
        <Button 
          variant={interviewMode ? 'outline' : 'ghost'}
          onClick={() => setInterviewMode(!interviewMode)}
          style={{ 
            color: interviewMode ? colors.danger : "var(--text-secondary)",
            borderColor: interviewMode ? colors.danger : 'transparent'
          }}
        >
          <EyeOff size={16} />
          {interviewMode ? 'Exit Interview Mode' : 'Enter Interview Mode'}
        </Button>
      </div>

      <WorkspaceLayout 
        leftPanel={!interviewMode ? leftPanel : null}
        leftSize={40}
        centerPanel={centerPanel} 
        centerSize={60}
      />
    </div>
  );
}
