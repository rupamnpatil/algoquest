import React from 'react';
import { CheckCircle2, BookOpen, Compass, ShieldCheck, Sparkles, Home } from 'lucide-react';
import { LEVELS } from '../utils/levelsData';
import { sound } from '../utils/sound';

export default function Sidebar({
  activeLevelIndex,
  completedLevels,
  onSelectLevel,
  mobileOpen,
  onCloseMobile
}) {
  const handleSelect = (idx) => {
    sound.play('click');
    onSelectLevel(idx);
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <aside className={`sidebar ${mobileOpen ? 'mobile-open' : ''}`}>
      <div className="sidebar-section-title">Curriculum Path</div>

      <nav className="sidebar-nav">
        {/* Home / Overview */}
        <button
          className={`sidebar-item ${activeLevelIndex === -1 ? 'active' : ''}`}
          onClick={() => handleSelect(-1)}
        >
          <div className="sidebar-icon" style={{ backgroundColor: 'var(--bg-muted)', color: 'var(--text-main)' }}>
            <Home size={16} />
          </div>
          <div className="sidebar-item-info">
            <span className="sidebar-item-title">Overview</span>
            <span className="sidebar-item-subtitle">Syllabus & Modules</span>
          </div>
        </button>

        {LEVELS.map((level, index) => {
          const Icon = level.icon;
          const isDone = completedLevels.includes(level.id);
          const isActive = activeLevelIndex === index;

          return (
            <button
              key={level.id}
              className={`sidebar-item ${isActive ? 'active' : ''}`}
              onClick={() => handleSelect(index)}
            >
              <div
                className="sidebar-icon"
                style={{
                  backgroundColor: `var(--${level.color}-bg)`,
                  color: `var(--${level.color}-solid)`,
                  border: `1px solid var(--${level.color}-border)`
                }}
              >
                <Icon size={16} />
              </div>

              <div className="sidebar-item-info">
                <span className="sidebar-item-title">
                  {String(level.id).padStart(2, '0')}. {level.title}
                </span>
                <span className="sidebar-item-subtitle">{level.concept}</span>
              </div>

              {isDone && (
                <CheckCircle2 size={16} className="sidebar-check" />
              )}
            </button>
          );
        })}
      </nav>

      <div className="sidebar-footer-box">
        <h4>
          <ShieldCheck size={16} color="var(--emerald-solid)" />
          <span>CEP Guarantee</span>
        </h4>
        <p>
          100% offline-compatible. Zero data tracking, zero ads, and zero server costs.
        </p>
      </div>
    </aside>
  );
}
