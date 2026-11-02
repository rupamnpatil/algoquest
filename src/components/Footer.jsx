import React from 'react';
import { APP_INFO } from '../utils/levelsData';

export default function Footer({ onOpenGuide, onOpenCertificate }) {
  return (
    <footer className="app-footer">
      <div className="app-footer-inner">
        <div>
          <span className="app-footer-brand">{APP_INFO.appName} · {APP_INFO.tagline}</span>
          <span> — {APP_INFO.subtitle}</span>
        </div>

        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <button
            onClick={onOpenGuide}
            style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}
          >
            Curriculum Guide
          </button>
          <span>·</span>
          <button
            onClick={onOpenCertificate}
            style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}
          >
            Certificate
          </button>
          <span>·</span>
          <span>100% Offline & Free</span>
        </div>
      </div>
    </footer>
  );
}
