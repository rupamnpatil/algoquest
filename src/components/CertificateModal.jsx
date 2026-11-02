import React, { useState } from 'react';
import { X, Printer, CheckCircle2, Award, Sparkles } from 'lucide-react';
import { LEVELS, APP_INFO } from '../utils/levelsData';
import { sound } from '../utils/sound';

export default function CertificateModal({
  studentName,
  onUpdateName,
  completedLevels,
  onClose
}) {
  const [name, setName] = useState(studentName || 'Curious Coder');
  const currentDate = new Date().toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const handlePrint = () => {
    sound.play('click');
    window.print();
  };

  const handleNameChange = (val) => {
    setName(val);
    onUpdateName(val);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '880px' }}>
        <div className="modal-header no-print">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Award size={20} color="var(--amber-solid)" />
            <h3 className="modal-title">Certificate of Completion</h3>
          </div>
          <button className="icon-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          {/* Instructions for student */}
          <div className="no-print" style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'var(--bg-subtle)',
            padding: '12px 16px',
            borderRadius: '10px',
            border: '1px solid var(--border-subtle)',
            gap: '12px',
            flexWrap: 'wrap'
          }}>
            <div style={{ fontSize: '0.85rem' }}>
              <strong>Personalize Certificate:</strong> Type your name below to appear on the certificate.
            </div>
            <input
              type="text"
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="Enter your name"
              style={{
                padding: '6px 12px',
                fontSize: '0.9rem',
                borderRadius: '6px',
                border: '1px solid var(--border-strong)',
                background: 'var(--bg-surface)',
                color: 'var(--text-main)',
                minWidth: '220px'
              }}
            />
          </div>

          {/* Printable Certificate */}
          <div className="certificate-container">
            <div className="cert-corner-decor cert-top-left" />
            <div className="cert-corner-decor cert-top-right" />
            <div className="cert-corner-decor cert-bottom-left" />
            <div className="cert-corner-decor cert-bottom-right" />

            <div className="cert-header">
              <span className="cert-org-logo">
                {APP_INFO.issuer} · {APP_INFO.subtitle}
              </span>
              <h2 className="cert-main-title">Certificate of Achievement</h2>
              <span className="cert-subtitle">in Computational Thinking, Logic & Data Structures</span>
            </div>

            <div className="cert-recipient-block">
              <p className="cert-presented-to">This certificate is proudly awarded to</p>
              <h3 className="cert-student-name">{name || 'Curious Coder'}</h3>
            </div>

            <p className="cert-body-desc">
              for successfully conquering interactive algorithmic challenges in 
              <strong> {APP_INFO.appName}: {APP_INFO.tagline}</strong>, 
              demonstrating mastery in sequential logic, iteration loops, conditional branching, sorting algorithms, and graph pathfinding.
            </p>

            <div className="cert-badges-row">
              {LEVELS.map((lvl) => {
                const isCompleted = completedLevels.includes(lvl.id);
                return (
                  <div
                    key={lvl.id}
                    className="cert-badge-chip"
                    style={{
                      opacity: isCompleted ? 1 : 0.45,
                      borderColor: isCompleted ? `var(--${lvl.color}-border)` : '#cbd5e1'
                    }}
                  >
                    <CheckCircle2 size={13} color={isCompleted ? `var(--${lvl.color}-solid)` : '#94a3b8'} />
                    <span>{lvl.badge}</span>
                  </div>
                );
              })}
            </div>

            <div className="cert-footer-row">
              <div className="cert-signature-box">
                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#334155' }}>{currentDate}</div>
                <div className="cert-sig-line" />
                <span className="cert-sig-title">Date of Issue</span>
              </div>

              <div className="cert-seal-badge">
                <Sparkles size={16} />
                <span>ALGOQUEST</span>
                <span style={{ fontSize: '0.55rem' }}>VERIFIED</span>
              </div>

              <div className="cert-signature-box">
                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#1e3a8a' }}>AlgoQuest Academy</div>
                <div className="cert-sig-line" />
                <span className="cert-sig-title">Platform Verification</span>
              </div>
            </div>
          </div>
        </div>

        <div className="modal-footer no-print">
          <button className="btn btn-secondary" onClick={onClose}>
            Close
          </button>
          <button className="btn btn-primary" onClick={handlePrint}>
            <Printer size={16} />
            <span>Print / Save as PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
}
