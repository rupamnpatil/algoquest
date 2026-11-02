import React from 'react';
import { CEP_INFO } from '../utils/levelsData';

export default function Footer({ onOpenFacilitator, onOpenCertificate }) {
  return (
    <footer className="app-footer">
      <div className="app-footer-inner">
        <div>
          <span className="app-footer-brand">AlgoQuest · Logic Labyrinth</span>
          <span> — {CEP_INFO.university} ({CEP_INFO.courseName})</span>
        </div>

        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <button
            onClick={onOpenFacilitator}
            style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}
          >
            Facilitator Guide
          </button>
          <span>·</span>
          <button
            onClick={onOpenCertificate}
            style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}
          >
            Certificate
          </button>
          <span>·</span>
          <span>Offline & Free Open Source</span>
        </div>
      </div>
    </footer>
  );
}
