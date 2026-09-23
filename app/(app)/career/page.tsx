'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Building2, Award, Briefcase, FileText, Target, Sparkles, AlertCircle, Brain, Play, CheckCircle2, ShieldAlert, ArrowRight } from 'lucide-react';
import { CareerAdapterService } from '@/src/features/career/services/career-adapter.service';
import { InterviewPreparationAdapterService } from '@/src/features/interview/services/interview-prep-adapter.service';

export default function CareerDashboardPage() {
  const [selectedCompanyId, setSelectedCompanyId] = useState<string>('amazon');

  const summary = useMemo(() => {
    return CareerAdapterService.getCareerSummary('default_user');
  }, []);

  const selectedTrack = summary.companyTracks.find((c) => c.id === selectedCompanyId) || summary.companyTracks[0];

  const prepSummary = useMemo(() => {
    return InterviewPreparationAdapterService.getInterviewPrepSummary('default_user', selectedTrack.name);
  }, [selectedCompanyId]);

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-[1200px] mx-auto text-white">
      
      {/* HEADER STRIP */}
      <div className="mb-7 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 style={{ margin: 0, fontSize: '28px', fontWeight: 900, color: '#FFF' }}>
            Career Intelligence & Interview Preparation Command Center
          </h1>
          <p style={{ margin: '6px 0 0 0', fontSize: '13px', color: '#C084FC' }}>
            Personalized FAANG roadmaps, deterministic interview readiness, pattern intelligence matrix, and SRS memory alerts.
          </p>
        </div>

        <div style={{ padding: '10px 18px', borderRadius: '14px', background: 'rgba(16, 185, 129, 0.15)', border: '1px solid #10B981', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Target size={18} style={{ color: '#10B981' }} />
          <div>
            <span style={{ fontSize: '10px', color: '#94A3B8', display: 'block', fontWeight: 800 }}>Target: {selectedTrack.name}</span>
            <strong style={{ fontSize: '14px', color: '#10B981' }}>
              {typeof prepSummary.readiness.readinessScore === 'number'
                ? `${prepSummary.readiness.readinessScore}% Interview Ready`
                : 'Unrated Readiness'}
            </strong>
          </div>
        </div>
      </div>

      {/* HONEST EMPTY STATE BANNER FOR NEW USERS */}
      {prepSummary.readiness.isUnrated && (
        <div style={{ marginBottom: '24px', padding: '16px 20px', borderRadius: '16px', background: 'rgba(56, 189, 248, 0.1)', border: '1px solid rgba(56, 189, 248, 0.3)', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <AlertCircle size={20} style={{ color: '#38BDF8', flexShrink: 0 }} />
          <div style={{ fontSize: '13px', color: '#CBD5E1', lineHeight: '1.5' }}>
            <strong style={{ color: '#38BDF8', display: 'block' }}>Initial Candidate Profile (Level 1 • 0 Solved)</strong>
            {prepSummary.readiness.statusMessage}
          </div>
        </div>
      )}

      {/* TARGET COMPANY SELECTOR TABS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '10px', marginBottom: '28px' }}>
        {summary.companyTracks.map((comp) => {
          const isSel = comp.id === selectedCompanyId;
          return (
            <button
              key={comp.id}
              onClick={() => setSelectedCompanyId(comp.id)}
              style={{
                padding: '12px',
                borderRadius: '12px',
                background: isSel ? 'rgba(168, 85, 247, 0.2)' : 'rgba(255,255,255,0.03)',
                border: isSel ? '2px solid #C084FC' : '1px solid rgba(255,255,255,0.08)',
                color: isSel ? '#FFF' : '#94A3B8',
                fontWeight: 800,
                fontSize: '12px',
                cursor: 'pointer',
                textAlign: 'center',
              }}
            >
              <div>{comp.name}</div>
              <span style={{ fontSize: '10px', color: isSel ? '#C084FC' : '#64748B', display: 'block', marginTop: '2px' }}>
                {comp.solvedCompanyProblems} / {comp.totalCompanyProblems} Solved
              </span>
            </button>
          );
        })}
      </div>

      {/* INTERVIEW READINESS SNAPSHOT CARDS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '28px' }}>
        <div style={{ padding: '16px', borderRadius: '16px', background: 'rgba(20, 16, 38, 0.9)', border: '1px solid rgba(168, 85, 247, 0.2)' }}>
          <span style={{ fontSize: '10px', color: '#94A3B8', fontWeight: 800, display: 'block' }}>Company Problem Coverage</span>
          <h3 style={{ margin: '4px 0 0 0', fontSize: '22px', color: '#C084FC' }}>
            {prepSummary.track.solvedInterviewProblems} / {prepSummary.track.totalInterviewProblems} ({prepSummary.track.companyCoveragePercentage}%)
          </h3>
        </div>
        <div style={{ padding: '16px', borderRadius: '16px', background: 'rgba(20, 16, 38, 0.9)', border: '1px solid rgba(168, 85, 247, 0.2)' }}>
          <span style={{ fontSize: '10px', color: '#94A3B8', fontWeight: 800, display: 'block' }}>Pattern Coverage</span>
          <h3 style={{ margin: '4px 0 0 0', fontSize: '22px', color: '#38BDF8' }}>
            {prepSummary.readiness.patternCoverageScore}%
          </h3>
        </div>
        <div style={{ padding: '16px', borderRadius: '16px', background: 'rgba(20, 16, 38, 0.9)', border: '1px solid rgba(168, 85, 247, 0.2)' }}>
          <span style={{ fontSize: '10px', color: '#94A3B8', fontWeight: 800, display: 'block' }}>Difficulty Stage</span>
          <h3 style={{ margin: '4px 0 0 0', fontSize: '18px', color: '#10B981' }}>
            {prepSummary.track.currentStage}
          </h3>
        </div>
        <div style={{ padding: '16px', borderRadius: '16px', background: 'rgba(20, 16, 38, 0.9)', border: '1px solid rgba(168, 85, 247, 0.2)' }}>
          <span style={{ fontSize: '10px', color: '#94A3B8', fontWeight: 800, display: 'block' }}>SRS Memory Retention</span>
          <h3 style={{ margin: '4px 0 0 0', fontSize: '22px', color: '#F59E0B' }}>
            {prepSummary.readiness.memoryRetentionScore}%
          </h3>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        
        {/* LEFT COLUMN: NEXT SESSION PLAN & PATTERN INTELLIGENCE MATRIX */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* NEXT INTERVIEW SESSION PLAN */}
          <div style={{ padding: '24px', borderRadius: '20px', background: 'rgba(20, 16, 38, 0.95)', border: '1px solid rgba(168, 85, 247, 0.3)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Play size={18} style={{ color: '#C084FC' }} />
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800, color: '#FFF' }}>
                  Recommended Next Interview Session
                </h3>
              </div>
              <span style={{ fontSize: '11px', fontWeight: 800, padding: '4px 10px', borderRadius: '8px', background: 'rgba(168, 85, 247, 0.2)', color: '#C084FC' }}>
                {prepSummary.nextSessionPlan.targetDifficulty} • {prepSummary.nextSessionPlan.recommendedDurationMinutes} Mins
              </span>
            </div>

            <h4 style={{ margin: '0 0 6px 0', fontSize: '14px', fontWeight: 800, color: '#38BDF8' }}>
              Objective: {prepSummary.nextSessionPlan.objective}
            </h4>
            <p style={{ margin: '0 0 16px 0', fontSize: '12px', color: '#CBD5E1', lineHeight: '1.5' }}>
              {prepSummary.nextSessionPlan.rationale}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {prepSummary.nextSessionPlan.exercises.map((ex, idx) => (
                <div key={ex.problemId} style={{ padding: '12px 16px', borderRadius: '12px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <span style={{ fontSize: '10px', color: '#94A3B8' }}>{idx + 1}. {ex.pattern} • {ex.difficulty}</span>
                    <h5 style={{ margin: '2px 0 0 0', fontSize: '13px', fontWeight: 800, color: '#FFF' }}>{ex.title}</h5>
                  </div>
                  <a
                    href={`/practice/${ex.problemId}`}
                    style={{ padding: '6px 12px', borderRadius: '8px', background: 'rgba(56, 189, 248, 0.2)', color: '#38BDF8', fontSize: '11px', fontWeight: 800, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}
                  >
                    Practice <ArrowRight size={12} />
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* INTERVIEW PATTERN INTELLIGENCE MATRIX */}
          <div style={{ padding: '24px', borderRadius: '20px', background: 'rgba(20, 16, 38, 0.95)', border: '1px solid rgba(168, 85, 247, 0.3)' }}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: 800, color: '#FFF' }}>
              Interview Pattern Intelligence Matrix
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {prepSummary.patternStatuses.map((pat) => (
                <div
                  key={pat.patternName}
                  style={{
                    padding: '14px',
                    borderRadius: '12px',
                    background: pat.status === 'Mastered' ? 'rgba(16, 185, 129, 0.1)' : pat.status === 'At Risk' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(255,255,255,0.03)',
                    border: pat.status === 'Mastered' ? '1px solid #10B981' : pat.status === 'At Risk' ? '1px solid #EF4444' : '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <h5 style={{ margin: 0, fontSize: '13px', fontWeight: 800, color: '#FFF' }}>{pat.patternName}</h5>
                    <span style={{ fontSize: '10px', fontWeight: 800, padding: '2px 6px', borderRadius: '4px', background: pat.priority === 'Critical' ? '#EF4444' : '#C084FC', color: '#000' }}>
                      {pat.priority}
                    </span>
                  </div>
                  <div style={{ fontSize: '11px', color: '#94A3B8' }}>
                    Status: <strong style={{ color: pat.status === 'Mastered' ? '#10B981' : pat.status === 'At Risk' ? '#EF4444' : '#CBD5E1' }}>{pat.status}</strong> • {pat.solvedCount} Solved
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: MEMORY ALERTS & APPLICATION TRACKING */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* MEMORY-AWARE REVISION ALERTS */}
          <div style={{ padding: '24px', borderRadius: '20px', background: 'rgba(20, 16, 38, 0.95)', border: '1px solid rgba(245, 158, 11, 0.3)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <ShieldAlert size={18} style={{ color: '#F59E0B' }} />
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800, color: '#FFF' }}>SRS Memory Alerts</h3>
            </div>

            {prepSummary.memoryAlerts.length === 0 ? (
              <p style={{ fontSize: '12px', color: '#94A3B8', margin: 0 }}>
                No overdue concepts detected. SRS memory retention health is optimal.
              </p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {prepSummary.memoryAlerts.map((alert) => (
                  <div key={alert.conceptId} style={{ padding: '12px', borderRadius: '10px', background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.2)', fontSize: '11px', color: '#CBD5E1', lineHeight: '1.4' }}>
                    <strong style={{ color: '#F59E0B', display: 'block' }}>{alert.conceptName} ({alert.urgency} Urgency)</strong>
                    {alert.recommendedAction}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* APPLICATION PIPELINE TRACKING */}
          <div style={{ padding: '24px', borderRadius: '20px', background: 'rgba(20, 16, 38, 0.95)', border: '1px solid rgba(168, 85, 247, 0.3)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <Briefcase size={18} style={{ color: '#C084FC' }} />
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800, color: '#FFF' }}>Application Pipeline</h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {summary.applications.map((app) => (
                <div key={app.id} style={{ padding: '12px', borderRadius: '10px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <h5 style={{ margin: 0, fontSize: '12px', fontWeight: 800, color: '#FFF' }}>{app.companyName}</h5>
                    <span style={{ fontSize: '10px', fontWeight: 800, padding: '2px 6px', borderRadius: '4px', background: 'rgba(168, 85, 247, 0.2)', color: '#C084FC' }}>
                      {app.status}
                    </span>
                  </div>
                  <span style={{ fontSize: '11px', color: '#94A3B8', display: 'block', marginTop: '2px' }}>{app.roleTitle}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
