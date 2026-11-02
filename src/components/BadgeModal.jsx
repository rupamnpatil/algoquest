import React from 'react';
import { Award, ArrowRight, RotateCcw, Sparkles } from 'lucide-react';
import { sound } from '../utils/sound';

export default function BadgeModal({
  level,
  onNext,
  onReplay,
  onClose
}) {
  if (!level) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '440px', textAlign: 'center', padding: '2rem 1.5rem' }}
      >
        <div style={{
          width: '72px',
          height: '72px',
          borderRadius: '50%',
          backgroundColor: `var(--${level.color}-bg)`,
          border: `2px solid var(--${level.color}-border)`,
          color: `var(--${level.color}-solid)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.25rem',
          boxShadow: '0 0 20px rgba(99, 102, 241, 0.2)'
        }}>
          <Award size={36} />
        </div>

        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '4px',
          fontSize: '0.72rem',
          fontWeight: 700,
          color: `var(--${level.color}-solid)`,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          marginBottom: '0.35rem'
        }}>
          <Sparkles size={14} />
          <span>Badge Unlocked</span>
        </div>

        <h3 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
          {level.badge}
        </h3>

        <p style={{ fontSize: '0.85rem', color: 'var(--text-body)', lineHeight: 1.5, marginBottom: '1.5rem' }}>
          {level.badgeDesc}
        </p>

        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
          <button
            className="btn btn-secondary"
            onClick={() => {
              sound.play('click');
              onReplay();
            }}
          >
            <RotateCcw size={15} />
            <span>Practice Again</span>
          </button>

          <button
            className="btn btn-primary"
            onClick={() => {
              sound.play('click');
              onNext();
            }}
          >
            <span>Next Challenge</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
