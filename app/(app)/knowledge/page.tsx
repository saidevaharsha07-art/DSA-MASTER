'use client';

import React, { useState } from 'react';
import { curriculumEngine } from '@/src/engines/curriculum';
import { memoryEngine } from '@/src/engines/memory';
import { Network, Book, FileText } from 'lucide-react';
import Link from 'next/link';

export default function KnowledgePage() {
  const [activeTab, setActiveTab] = useState<'official' | 'my-notes'>('official');
  const allPatterns = curriculumEngine.getAllPatterns();
  
  return (
    <div className="layout-stack" style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', height: 'calc(100vh - 140px)' }}>
      <div className="layout-stack-sm">
        <h1 className="title" style={{ fontSize: '36px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Network style={{ color: '#c084fc' }} size={32} />
          Knowledge Graph 2.0
        </h1>
        <p className="muted" style={{ fontSize: '16px' }}>
          Your integrated Second Brain. Review official curriculum notes and your personal insights.
        </p>
      </div>

      <div className="grid" style={{ gridTemplateColumns: '1fr 400px', gap: '32px', flex: 1, minHeight: 0 }}>
        {/* Left Column: Notes List */}
        <div className="panel" style={{ padding: 0, display: 'flex', flexDirection: 'column' }}>
          <div className="panel-header" style={{ padding: '24px 24px 0', marginBottom: '16px' }}>
            <div className="layout-row" style={{ gap: '24px', borderBottom: '1px solid var(--border)', width: '100%', paddingBottom: '16px' }}>
              <button 
                onClick={() => setActiveTab('official')}
                style={{ 
                  background: 'none', border: 'none', color: activeTab === 'official' ? 'var(--foreground)' : 'var(--muted)', 
                  fontWeight: activeTab === 'official' ? 600 : 400, fontSize: '14px', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: '8px'
                }}
              >
                <Book size={16} /> Official Notes
              </button>
              <button 
                onClick={() => setActiveTab('my-notes')}
                style={{ 
                  background: 'none', border: 'none', color: activeTab === 'my-notes' ? 'var(--foreground)' : 'var(--muted)', 
                  fontWeight: activeTab === 'my-notes' ? 600 : 400, fontSize: '14px', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: '8px'
                }}
              >
                <FileText size={16} /> My Notes
              </button>
            </div>
          </div>
          
          <div style={{ padding: '0 24px 24px', overflowY: 'auto', flex: 1 }} className="layout-stack-sm">
            {activeTab === 'official' ? (
              allPatterns.map(pattern => (
                <div key={pattern.id} className="card" style={{ padding: '20px' }}>
                  <div className="layout-row-between" style={{ marginBottom: '12px' }}>
                    <h3 className="title" style={{ fontSize: '18px', margin: 0 }}>{pattern.title}</h3>
                    <Link href={`/topic/${pattern.slug}`} className="pill" style={{ color: 'var(--primary)' }}>Go to Topic</Link>
                  </div>
                  
                  {pattern.resources.notes.markdownSections.map((section, idx) => (
                     <div key={idx} style={{ marginBottom: '16px', background: 'var(--background)', padding: '16px', borderRadius: '8px' }}>
                        <h4 style={{ margin: '0 0 8px 0', fontSize: '14px' }}>{section.title}</h4>
                        <p className="muted" style={{ fontSize: '13px', margin: 0, lineHeight: 1.6 }}>{section.content}</p>
                     </div>
                  ))}
                  
                  {pattern.resources.notes.markdownSections.length === 0 && (
                     <p className="muted" style={{ fontSize: '14px' }}>No official notes provided for this pattern yet.</p>
                  )}
                </div>
              ))
            ) : (
              <div style={{ textAlign: 'center', padding: '48px', color: 'var(--muted)', fontSize: '14px' }}>
                You have not saved any personal notes yet.
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Knowledge Graph Preview */}
        <div className="panel" style={{ background: 'linear-gradient(to bottom, rgba(168,85,247,0.05), transparent)', borderColor: 'rgba(168,85,247,0.2)' }}>
          <div className="panel-header">
            <h3 className="panel-title"><Network size={16} style={{ color: '#c084fc' }} /> Graph Visualization</h3>
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: '32px' }}>
             
             {/* Dynamic Graph rendering based on Memory Engine */}
             <div style={{ position: 'relative', width: '300px', height: '300px' }}>
               {/* Connections */}
               <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
                  <line x1="150" y1="50" x2="80" y2="150" stroke="var(--border)" strokeWidth="2" />
                  <line x1="150" y1="50" x2="220" y2="150" stroke="var(--border)" strokeWidth="2" />
               </svg>
               
               {/* Nodes */}
               {allPatterns.slice(0, 3).map((pattern, idx) => {
                 const mastery = memoryEngine.getPatternMastery(pattern.id);
                 let nodeColor = 'var(--border)';
                 let label = 'Locked';
                 
                 if (mastery === 100) { nodeColor = '#10b981'; label = 'Mastered'; }
                 else if (mastery > 0) { nodeColor = '#3b82f6'; label = 'Learning'; }
                 
                 const positions = [
                   { top: '30px', left: '150px' },
                   { top: '150px', left: '80px' },
                   { top: '150px', left: '220px' }
                 ];

                 return (
                   <div key={pattern.id} style={{ 
                     position: 'absolute', 
                     top: positions[idx].top, 
                     left: positions[idx].left, 
                     transform: 'translate(-50%, -50%)',
                     display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px'
                   }}>
                     <div style={{
                       width: '40px', height: '40px', borderRadius: '50%', background: 'var(--card)',
                       border: `3px solid ${nodeColor}`, display: 'flex', alignItems: 'center', justifyContent: 'center',
                       boxShadow: mastery > 0 ? `0 0 15px ${nodeColor}40` : 'none'
                     }}>
                     </div>
                     <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--foreground)' }}>{pattern.title}</span>
                     <span className="pill" style={{ fontSize: '10px', background: `${nodeColor}20`, color: nodeColor, border: 'none' }}>
                       {label}
                     </span>
                   </div>
                 );
               })}
             </div>
             
             <p className="muted" style={{ fontSize: '14px', maxWidth: '250px', margin: 0 }}>
               Your knowledge graph evolves dynamically as you learn.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
}
