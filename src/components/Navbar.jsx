import React, { useState } from 'react';
import {
  Code2,
  Volume2,
  VolumeX,
  Sun,
  Moon,
  Award,
  BookOpen,
  Menu,
  X,
  User,
  GraduationCap
} from 'lucide-react';
import { sound } from '../utils/sound';

export default function Navbar({
  completedCount,
  totalLevels,
  theme,
  onToggleTheme,
  isMuted,
  onToggleSound,
  studentName,
  onUpdateStudentName,
  onOpenCertificate,
  onOpenFacilitator,
  mobileOpen,
  onToggleMobile,
  onGoHome
}) {
  const [editingName, setEditingName] = useState(false);
  const [tempName, setTempName] = useState(studentName);

  const handleSaveName = (e) => {
    e.preventDefault();
    if (tempName.trim()) {
      onUpdateStudentName(tempName.trim());
      sound.play('click');
    }
    setEditingName(false);
  };

  const progressPercent = Math.round((completedCount / totalLevels) * 100);

  return (
    <header className="topbar">
      <div className="brand" onClick={onGoHome} style={{ cursor: 'pointer' }} role="button" tabIndex={0}>
        <div className="brand-icon">
          <Code2 size={22} />
        </div>
        <div className="brand-text">
          <h1>algo<span>quest</span></h1>
          <div className="brand-cep-tag">Mumbai Univ. CEP · Logic Labyrinth</div>
        </div>
      </div>

      <div className="topbar-right">
        {/* Student Name Badge */}
        {editingName ? (
          <form onSubmit={handleSaveName} style={{ display: 'flex', gap: '4px' }}>
            <input
              type="text"
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              placeholder="Your name"
              autoFocus
              style={{
                padding: '4px 8px',
                fontSize: '0.8rem',
                borderRadius: '6px',
                border: '1px solid var(--border-strong)',
                background: 'var(--bg-subtle)',
                color: 'var(--text-main)',
                width: '120px'
              }}
            />
            <button type="submit" className="btn btn-sm btn-primary">Save</button>
          </form>
        ) : (
          <button
            className="student-badge-btn"
            onClick={() => {
              setTempName(studentName);
              setEditingName(true);
            }}
            title="Click to edit your name for the certificate"
          >
            <User size={14} />
            <span>{studentName || 'Student'}</span>
          </button>
        )}

        {/* Mini Progress */}
        <div className="topbar-progress">
          <div className="topbar-progress-text">
            <span>Progress</span>
            <span>{completedCount}/{totalLevels}</span>
          </div>
          <div className="topbar-progress-bar">
            <div className="topbar-progress-fill" style={{ width: `${progressPercent}%` }} />
          </div>
        </div>

        {/* Certificate Button */}
        <button
          className={`btn btn-sm ${completedCount === totalLevels ? 'btn-success' : 'btn-secondary'}`}
          onClick={onOpenCertificate}
          title="View & Print Official CEP Certificate"
        >
          <Award size={15} />
          <span style={{ display: 'none', md: 'inline' }}>Certificate</span>
        </button>

        {/* Facilitator & CEP Guide */}
        <button
          className="btn btn-sm btn-outline"
          onClick={onOpenFacilitator}
          title="Mumbai University CEP Documentation & Facilitator Guide"
        >
          <GraduationCap size={16} />
          <span>CEP Guide</span>
        </button>

        {/* Audio Toggle */}
        <button
          className="icon-btn"
          onClick={onToggleSound}
          title={isMuted ? 'Unmute Sound FX' : 'Mute Sound FX'}
          aria-label="Toggle Sound"
        >
          {isMuted ? <VolumeX size={17} /> : <Volume2 size={17} />}
        </button>

        {/* Theme Toggle */}
        <button
          className="icon-btn"
          onClick={onToggleTheme}
          title={`Switch to ${theme === 'dark' ? 'Classroom Light' : 'Dark'} mode`}
          aria-label="Toggle Theme"
        >
          {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
        </button>

        {/* Mobile Menu Toggle */}
        <button
          className="icon-btn mobile-menu-btn"
          onClick={onToggleMobile}
          aria-label="Toggle Navigation"
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>
    </header>
  );
}
