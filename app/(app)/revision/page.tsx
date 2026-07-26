'use client';

import React from 'react';
import { memoryEngine } from '@/src/engines/memory';
import { Clock, AlertCircle, Calendar, Play, Brain } from 'lucide-react';
import Link from 'next/link';
import { useSettings } from '@/src/context/SettingsContext';

export default function RevisionPage() {
  const { settings } = useSettings();
  const { revisionPerDay, memoryStrength, reviewAlgorithm, reviewOrder } = settings.revision;
  const { masteryThreshold } = settings.learningEngine;

  const dueRevisions = memoryEngine.getDueRevisions();

  return (
    <div className="layout-stack" style={{ maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
      <div className="layout-stack-sm" style={{ marginBottom: '24px' }}>
        <h1 className="title" style={{ fontSize: '36px', display: 'flex', alignItems: 'center', gap: '12px', color: "var(--text-primary)" }}>
          <Clock style={{ color: 'var(--primary)' }} size={32} />
          Revision Center
        </h1>
        <p className="muted" style={{ fontSize: '16px', color: "var(--text-secondary)" }}>
          Spaced repetition for DSA. Algorithm: <strong style={{ color: "var(--primary)", textTransform: "capitalize" }}>{reviewAlgorithm}</strong> ({reviewOrder} order). Target mastery threshold: <strong>{masteryThreshold}%</strong>.
        </p>
      </div>

      <div className="dashboard-grid">
         {/* Due Today Queue */}
         <div className="layout-stack">
            <div className="row" style={{ marginBottom: '12px' }}>
               <h3 style={{ margin: 0, fontSize: '18px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-primary)' }}>
                  <AlertCircle size={20} color="var(--primary)" />
                  Due Today ({dueRevisions.length || revisionPerDay})
               </h3>
            </div>
            
            <div className="layout-stack-sm">
               {dueRevisions.length === 0 ? (
                  <div className="card" style={{ padding: '40px', textAlign: 'center', background: "var(--card)", border: "1px solid var(--border)" }}>
                     <Brain size={32} style={{ color: "var(--primary)", margin: "0 auto 12px" }} />
                     <h3 className="title" style={{ fontSize: '18px', marginBottom: '8px', color: "var(--text-primary)" }}>You are all caught up!</h3>
                     <p className="muted" style={{ color: "var(--text-secondary)" }}>Memory strength target is currently <strong>{memoryStrength}%</strong>.</p>
                  </div>
               ) : (
                  dueRevisions.map(pattern => (
                     <div key={pattern.id} className="card layout-row-between" style={{ padding: '20px', background: "var(--card)", border: "1px solid var(--border)" }}>
                        <div>
                           <h3 className="title" style={{ fontSize: '18px', margin: '0 0 8px 0', color: "var(--text-primary)" }}>{pattern.title}</h3>
                           <p className="muted" style={{ margin: 0, fontSize: '14px', color: "var(--text-secondary)" }}>Retention at {memoryStrength}%</p>
                        </div>
                        <Link href={`/topic/${pattern.slug}`} className="button ghost" style={{ color: "var(--primary)" }}>
                           <Play size={16} style={{ marginRight: '8px' }} /> Review
                        </Link>
                     </div>
                  ))
               )}
            </div>
         </div>

         {/* Upcoming Overview */}
         <div className="layout-stack">
            <div className="card layout-stack-sm" style={{ background: 'var(--card)', border: '1px solid var(--primary-soft)' }}>
               <h3 className="title" style={{ fontSize: '18px', margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '8px', color: "var(--text-primary)" }}>
                 <Calendar size={20} style={{ color: 'var(--primary)' }} /> Upcoming Schedule
               </h3>
               <div className="layout-row-between" style={{ padding: '12px', background: 'var(--surface)', borderRadius: '8px', border: '1px solid var(--border)' }}>
                  <span className="muted" style={{ color: "var(--text-secondary)" }}>Tomorrow</span>
                  <span className="pill" style={{ color: "var(--primary)" }}>{Math.ceil(revisionPerDay * 0.4)} patterns</span>
               </div>
               <div className="layout-row-between" style={{ padding: '12px', background: 'var(--surface)', borderRadius: '8px', border: '1px solid var(--border)' }}>
                  <span className="muted" style={{ color: "var(--text-secondary)" }}>In 3 Days</span>
                  <span className="pill" style={{ color: "var(--primary)" }}>{Math.ceil(revisionPerDay * 0.8)} patterns</span>
               </div>
               <div className="layout-row-between" style={{ padding: '12px', background: 'var(--surface)', borderRadius: '8px', border: '1px solid var(--border)' }}>
                  <span className="muted" style={{ color: "var(--text-secondary)" }}>In 1 Week</span>
                  <span className="pill" style={{ color: "var(--primary)" }}>{revisionPerDay * 2} patterns</span>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
