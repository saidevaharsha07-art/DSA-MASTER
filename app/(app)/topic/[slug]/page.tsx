import React from 'react';
import { curriculumEngine } from '@/src/engines/curriculum';
import { notFound } from 'next/navigation';
import { BookOpen, Activity, Play, Star, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default async function TopicPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const slug = params.slug;
  const pattern = curriculumEngine.getPattern(`pattern.${slug}`);
  
  if (!pattern) return notFound();

  const allPatterns = curriculumEngine.getAllPatterns();
  const relatedProblems = curriculumEngine.getProblemsForPattern(pattern.id);

  return (
    <div style={{ display: 'flex', height: 'calc(100vh - 80px)', gap: '24px' }}>
      
      {/* LEFT: Pattern Navigation */}
      <div style={{ width: '280px', borderRight: '1px solid var(--border)', paddingRight: '24px', overflowY: 'auto' }}>
        <h3 className="eyebrow" style={{ marginBottom: '16px' }}>Curriculum</h3>
        <div className="layout-stack-sm">
          {allPatterns.map(p => (
            <Link 
              key={p.id} 
              href={`/topic/${p.slug}`}
              style={{ 
                padding: '12px 16px', 
                borderRadius: '8px', 
                display: 'block',
                background: p.id === pattern.id ? 'var(--card)' : 'transparent',
                border: p.id === pattern.id ? '1px solid var(--border)' : '1px solid transparent',
                color: p.id === pattern.id ? 'var(--primary)' : 'var(--muted)',
                fontWeight: p.id === pattern.id ? 'bold' : 'normal'
              }}
            >
              {p.title}
            </Link>
          ))}
        </div>
      </div>

      {/* MIDDLE: Pattern Content */}
      <div style={{ flex: 1, padding: '0 24px', overflowY: 'auto' }}>
        <div className="layout-row-between" style={{ marginBottom: '24px' }}>
          <h1 className="title" style={{ fontSize: '36px', margin: 0 }}>{pattern.title}</h1>
          <span className="pill medium">{pattern.difficulty}</span>
        </div>
        
        <div className="panel" style={{ marginBottom: '32px' }}>
          <h2 className="title" style={{ fontSize: '20px', marginBottom: '16px' }}>Overview</h2>
          <p style={{ color: 'var(--foreground)', lineHeight: 1.6, fontSize: '16px' }}>
            {pattern.overview}
          </p>
        </div>

        <div className="panel" style={{ marginBottom: '32px', background: 'rgba(99, 102, 241, 0.05)', borderColor: 'rgba(99, 102, 241, 0.2)' }}>
          <h2 className="title" style={{ fontSize: '20px', marginBottom: '16px', color: 'var(--primary)' }}>Intuition</h2>
          <p style={{ color: 'var(--foreground)', lineHeight: 1.6, fontSize: '16px' }}>
            {pattern.intuition}
          </p>
        </div>

        <div className="panel" style={{ marginBottom: '32px' }}>
          <h2 className="title" style={{ fontSize: '20px', marginBottom: '16px' }}>Visual Explanation</h2>
          <pre style={{ background: 'var(--background)', padding: '16px', borderRadius: '8px', overflowX: 'auto', border: '1px solid var(--border)' }}>
            <code>{pattern.visualExplanation}</code>
          </pre>
        </div>

        <div className="panel" style={{ marginBottom: '32px' }}>
          <div className="layout-row-between" style={{ marginBottom: '16px' }}>
             <h2 className="title" style={{ fontSize: '20px', margin: 0 }}>Practice Problems</h2>
             <span className="pill">{relatedProblems.length}</span>
          </div>
          <div className="layout-stack-sm">
            {relatedProblems.map(prob => (
              <Link 
                key={prob.id} 
                href={`/practice/${prob.slug}`}
                className="card"
                style={{ padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
              >
                <div>
                  <h4 style={{ margin: '0 0 4px', fontSize: '16px' }}>{prob.title}</h4>
                  <div style={{ fontSize: '12px', color: 'var(--muted)', display: 'flex', gap: '8px' }}>
                     <span>{prob.difficulty}</span>
                     <span>•</span>
                     <span>{prob.companies.slice(0,2).join(', ')}</span>
                  </div>
                </div>
                <div style={{ padding: '8px', background: 'var(--background)', borderRadius: '8px', color: 'var(--primary)' }}>
                  <Play size={20} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT: Quick Notes & Signals */}
      <div style={{ width: '320px', paddingLeft: '24px', borderLeft: '1px solid var(--border)', overflowY: 'auto' }}>
        <div className="card" style={{ padding: '20px', marginBottom: '24px' }}>
           <h3 className="title layout-row" style={{ fontSize: '16px', gap: '8px', marginBottom: '16px' }}>
             <Star size={18} style={{ color: '#eab308' }} /> Recognition Signals
           </h3>
           <ul style={{ paddingLeft: '20px', margin: 0, color: 'var(--muted)', fontSize: '14px', lineHeight: 1.6 }}>
             {pattern.aiMetadata?.recognitionSignals?.map((signal, i) => (
               <li key={i} style={{ marginBottom: '8px' }}>{signal}</li>
             ))}
           </ul>
        </div>

        <div className="card" style={{ padding: '20px', marginBottom: '24px', border: '1px solid var(--primary)' }}>
           <h3 className="title layout-row" style={{ fontSize: '16px', gap: '8px', marginBottom: '16px' }}>
             <AlertCircle size={18} style={{ color: 'var(--primary)' }} /> Interview Tips
           </h3>
           <ul style={{ paddingLeft: '20px', margin: 0, color: 'var(--muted)', fontSize: '14px', lineHeight: 1.6 }}>
             {pattern.resources.notes.interviewTips.map((tip, i) => (
               <li key={i} style={{ marginBottom: '8px' }}>{tip}</li>
             ))}
           </ul>
        </div>

        <div className="card" style={{ padding: '20px', marginBottom: '24px' }}>
           <h3 className="title layout-row" style={{ fontSize: '16px', gap: '8px', marginBottom: '16px' }}>
             <BookOpen size={18} style={{ color: 'var(--muted)' }} /> Common Pitfalls
           </h3>
           <ul style={{ paddingLeft: '20px', margin: 0, color: 'var(--muted)', fontSize: '14px', lineHeight: 1.6 }}>
             {pattern.aiMetadata?.commonMisconceptions?.map((pitfall, i) => (
               <li key={i} style={{ marginBottom: '8px' }}>{pitfall}</li>
             ))}
           </ul>
        </div>
      </div>

    </div>
  );
}
