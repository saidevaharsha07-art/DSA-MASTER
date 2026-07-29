'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Building2, Award, Briefcase, FileText, CheckCircle2, ChevronRight, Sparkles, Target } from 'lucide-react';
import { COMPANY_TRACKS } from '@/src/career/companies';
import { INITIAL_APPLICATIONS } from '@/src/career/internships';

export default function CareerDashboardPage() {
  const [selectedCompanyId, setSelectedCompanyId] = useState<string>('amazon');

  const selectedTrack = COMPANY_TRACKS.find((c) => c.id === selectedCompanyId) || COMPANY_TRACKS[1];

  return (
    <div style={{ padding: '32px', maxWidth: '1200px', margin: '0 auto', color: '#FFF' }}>
      
      {/* HEADER STRIP */}
      <div style={{ marginBottom: '28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '28px', fontWeight: 900, color: '#FFF' }}>
            Career Intelligence & FAANG Preparation
          </h1>
          <p style={{ margin: '6px 0 0 0', fontSize: '13px', color: '#C084FC' }}>
            Personalized company roadmaps, resume ATS optimization, and internship application tracker.
          </p>
        </div>

        <div style={{ padding: '10px 18px', borderRadius: '14px', background: 'rgba(16, 185, 129, 0.15)', border: '1px solid #10B981', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Target size={18} style={{ color: '#10B981' }} />
          <div>
            <span style={{ fontSize: '10px', color: '#94A3B8', display: 'block', fontWeight: 800 }}>Target: {selectedTrack.name}</span>
            <strong style={{ fontSize: '14px', color: '#10B981' }}>82% Interview Ready</strong>
          </div>
        </div>
      </div>

      {/* FAANG COMPANY TRACK SELECTOR STRIP */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '28px' }}>
        {COMPANY_TRACKS.map((track) => {
          const isSelected = track.id === selectedCompanyId;
          return (
            <motion.div
              key={track.id}
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedCompanyId(track.id)}
              style={{
                padding: '20px',
                borderRadius: '18px',
                background: isSelected ? 'rgba(168, 85, 247, 0.2)' : 'rgba(20, 16, 38, 0.8)',
                border: isSelected ? '2px solid #C084FC' : '1px solid rgba(255, 255, 255, 0.08)',
                boxShadow: isSelected ? '0 8px 24px rgba(168, 85, 247, 0.3)' : 'none',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h4 style={{ margin: 0, fontSize: '16px', fontWeight: 900, color: '#FFF' }}>{track.name}</h4>
                <Building2 size={18} style={{ color: isSelected ? '#C084FC' : '#94A3B8' }} />
              </div>

              <p style={{ margin: 0, fontSize: '11px', color: '#CBD5E1', lineHeight: '1.5' }}>{track.description}</p>

              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '4px' }}>
                {track.topPatterns.slice(0, 3).map((p) => (
                  <span key={p} style={{ fontSize: '10px', fontWeight: 700, padding: '2px 6px', borderRadius: '4px', background: 'rgba(56, 189, 248, 0.15)', color: '#38BDF8' }}>
                    {p}
                  </span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* TWO COLUMN GRID: INTERNSHIP TRACKER & RESUME ATS ASSISTANT */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        
        {/* INTERNSHIP APPLICATION TRACKER */}
        <div style={{ padding: '24px', borderRadius: '20px', background: 'rgba(20, 16, 38, 0.9)', border: '1px solid rgba(168, 85, 247, 0.25)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Briefcase size={18} style={{ color: '#C084FC' }} />
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800, color: '#FFF' }}>Internship & Job Tracker</h3>
            </div>
            <span style={{ fontSize: '11px', color: '#10B981', fontWeight: 800 }}>{INITIAL_APPLICATIONS.length} Active Applications</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {INITIAL_APPLICATIONS.map((app) => (
              <div key={app.id} style={{ padding: '14px', borderRadius: '12px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <h4 style={{ margin: 0, fontSize: '13px', fontWeight: 800, color: '#FFF' }}>{app.companyName} — {app.roleTitle}</h4>
                  <span style={{ fontSize: '10px', color: '#94A3B8' }}>{app.notes}</span>
                </div>
                <span style={{ fontSize: '10px', fontWeight: 800, padding: '4px 8px', borderRadius: '6px', background: 'rgba(16, 185, 129, 0.2)', color: '#10B981' }}>
                  {app.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* RESUME ATS ANALYZER */}
        <div style={{ padding: '24px', borderRadius: '20px', background: 'rgba(20, 16, 38, 0.9)', border: '1px solid rgba(168, 85, 247, 0.25)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FileText size={18} style={{ color: '#38BDF8' }} />
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800, color: '#FFF' }}>Resume ATS Intelligence</h3>
          </div>

          <div style={{ padding: '16px', borderRadius: '14px', background: 'rgba(56, 189, 248, 0.1)', border: '1px solid rgba(56, 189, 248, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <span style={{ fontSize: '11px', color: '#94A3B8', display: 'block' }}>ATS Compatibility Score</span>
              <strong style={{ fontSize: '22px', color: '#38BDF8' }}>88 / 100</strong>
            </div>
            <span style={{ fontSize: '11px', color: '#10B981', fontWeight: 800 }}>✓ FAANG Resume Ready</span>
          </div>

          <div style={{ fontSize: '12px', color: '#CBD5E1', lineHeight: '1.6' }}>
            <strong>Suggested Resume Project Additions:</strong>
            <ul style={{ margin: '6px 0 0 0', paddingLeft: '18px', color: '#94A3B8' }}>
              <li>High-Throughput Spreadsheet Engine (Array & Memory Optimization)</li>
              <li>Distributed URL Shortener Service (Hash Map & Cache Collision Handling)</li>
            </ul>
          </div>
        </div>

      </div>

    </div>
  );
}
