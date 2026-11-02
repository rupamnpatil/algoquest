import React, { useState, useEffect } from 'react';
import {
  ChevronRight,
  ChevronLeft,
  BookOpen,
  CheckCircle2,
  Award,
  Sparkles,
  ArrowRight
} from 'lucide-react';

import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import CertificateModal from './components/CertificateModal';
import FacilitatorGuideModal from './components/FacilitatorGuideModal';
import BadgeModal from './components/BadgeModal';

import HomeScreen from './levels/HomeScreen';
import SequenceGame from './levels/SequenceGame';
import LoopGame from './levels/LoopGame';
import ConditionalGame from './levels/ConditionalGame';
import SortGame from './levels/SortGame';
import BFSGame from './levels/BFSGame';

import { LEVELS } from './utils/levelsData';
import { sound } from './utils/sound';

function readStorage(key, fallback) {
  try {
    const val = localStorage.getItem(key);
    return val !== null ? JSON.parse(val) : fallback;
  } catch {
    return fallback;
  }
}

export default function App() {
  const [activeLevel, setActiveLevel] = useState(-1); // -1 is Overview/HomeScreen
  const [completed, setCompleted] = useState(() => {
    // Check both new and old storage keys for backward compatibility
    return readStorage('algoquest_completed', readStorage('algoquest-progress', []));
  });
  const [studentName, setStudentName] = useState(() => {
    return readStorage('algoquest_student_name', 'Curious Learner');
  });
  const [theme, setTheme] = useState(() => {
    return readStorage('algoquest_theme', 'light');
  });
  const [isMuted, setIsMuted] = useState(!sound.isEnabled());

  const [showGuide, setShowGuide] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);
  const [showFacilitator, setShowFacilitator] = useState(false);
  const [unlockedBadgeLevel, setUnlockedBadgeLevel] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toast, setToast] = useState('');

  // Persist storage
  useEffect(() => {
    try {
      localStorage.setItem('algoquest_completed', JSON.stringify(completed));
    } catch {}
  }, [completed]);

  useEffect(() => {
    try {
      localStorage.setItem('algoquest_student_name', JSON.stringify(studentName));
    } catch {}
  }, [studentName]);

  useEffect(() => {
    try {
      localStorage.setItem('algoquest_theme', JSON.stringify(theme));
      document.documentElement.setAttribute('data-theme', theme);
    } catch {}
  }, [theme]);

  // Toast auto-dismiss
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(''), 3000);
    return () => clearTimeout(t);
  }, [toast]);

  const handleToggleTheme = () => {
    sound.play('click');
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleToggleSound = () => {
    const newSoundState = sound.toggle();
    setIsMuted(!newSoundState);
  };

  const markLevelComplete = (levelId) => {
    if (!completed.includes(levelId)) {
      setCompleted((prev) => [...prev, levelId]);
    }
    const currentLevelObj = LEVELS.find((l) => l.id === levelId);
    sound.play('celebrate');
    setUnlockedBadgeLevel(currentLevelObj);
    setToast(`Level 0${levelId} Completed! Badge Earned: ${currentLevelObj?.badge}`);
  };

  const handleUnlockAll = () => {
    setCompleted([1, 2, 3, 4, 5]);
    setToast('All 5 levels unlocked!');
  };

  const handleResetProgress = () => {
    setCompleted([]);
    setToast('Progress reset. Ready for a new coding quest!');
  };

  const currentLevelData = activeLevel >= 0 ? LEVELS[activeLevel] : null;

  return (
    <div className="app-shell">
      {/* Navbar */}
      <Navbar
        completedCount={completed.length}
        totalLevels={LEVELS.length}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        isMuted={isMuted}
        onToggleSound={handleToggleSound}
        studentName={studentName}
        onUpdateStudentName={setStudentName}
        onOpenCertificate={() => { sound.play('click'); setShowCertificate(true); }}
        onOpenGuide={() => { sound.play('click'); setShowFacilitator(true); }}
        mobileOpen={mobileMenuOpen}
        onToggleMobile={() => setMobileMenuOpen(!mobileMenuOpen)}
        onGoHome={() => { sound.play('click'); setActiveLevel(-1); }}
      />

      {/* Main Layout */}
      <div className="layout-container">
        {/* Sidebar */}
        <Sidebar
          activeLevelIndex={activeLevel}
          completedLevels={completed}
          onSelectLevel={(idx) => {
            setActiveLevel(idx);
            setShowGuide(false);
          }}
          mobileOpen={mobileMenuOpen}
          onCloseMobile={() => setMobileMenuOpen(false)}
        />

        {/* Content Wrapper */}
        <main className="main-wrapper">
          {activeLevel === -1 ? (
            <HomeScreen
              completedLevels={completed}
              onStart={() => setActiveLevel(0)}
              onSelectLevel={(idx) => setActiveLevel(idx)}
              onOpenCertificate={() => setShowCertificate(true)}
              onOpenGuide={() => setShowFacilitator(true)}
              studentName={studentName}
            />
          ) : (
            <>
              {/* Breadcrumb */}
              <div className="breadcrumb-nav">
                <span
                  style={{ cursor: 'pointer' }}
                  onClick={() => { sound.play('click'); setActiveLevel(-1); }}
                >
                  CURRICULUM
                </span>
                <ChevronRight size={14} />
                <span>LEVEL 0{currentLevelData.id}</span>
                <ChevronRight size={14} />
                <span className="breadcrumb-item active">{currentLevelData.title.toUpperCase()}</span>
              </div>

              {/* Level Header */}
              <div className="level-header">
                <div className="level-header-left">
                  <div className="level-tag-row">
                    <span
                      className="level-badge-pill"
                      style={{
                        backgroundColor: `var(--${currentLevelData.color}-bg)`,
                        color: `var(--${currentLevelData.color}-solid)`
                      }}
                    >
                      {currentLevelData.tag}
                    </span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      Estimated Time: {currentLevelData.time}
                    </span>
                  </div>

                  <h2 className="level-title">{currentLevelData.title}</h2>
                  <p className="level-desc">{currentLevelData.subtitle}</p>
                </div>

                <div className="level-header-actions">
                  <button
                    className={`btn btn-sm ${showGuide ? 'btn-primary' : 'btn-outline'}`}
                    onClick={() => { sound.play('click'); setShowGuide(!showGuide); }}
                  >
                    <BookOpen size={15} />
                    <span>{showGuide ? 'Hide Guide' : 'Concept Guide'}</span>
                  </button>
                </div>
              </div>

              {/* Concept Guide Banner */}
              {showGuide && (
                <div className="learning-guide-card">
                  <div className="guide-theory">
                    <h4>{currentLevelData.concept} Snapshot</h4>
                    <p>{currentLevelData.theory.summary}</p>
                    <div className="guide-takeaway">
                      Key Takeaway: {currentLevelData.theory.takeaway}
                    </div>
                  </div>

                  <div className="guide-code-box">
                    <span className="guide-code-header">Python Pedagogical Pattern</span>
                    <pre>{currentLevelData.theory.pythonSample}</pre>
                  </div>
                </div>
              )}

              {/* Active Level Interactive Component */}
              {activeLevel === 0 && (
                <SequenceGame onComplete={() => markLevelComplete(1)} />
              )}
              {activeLevel === 1 && (
                <LoopGame onComplete={() => markLevelComplete(2)} />
              )}
              {activeLevel === 2 && (
                <ConditionalGame onComplete={() => markLevelComplete(3)} />
              )}
              {activeLevel === 3 && (
                <SortGame onComplete={() => markLevelComplete(4)} />
              )}
              {activeLevel === 4 && (
                <BFSGame onComplete={() => markLevelComplete(5)} />
              )}

              {/* Bottom Level Navigation */}
              <div className="bottom-nav-bar">
                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    sound.play('click');
                    if (activeLevel > 0) setActiveLevel(activeLevel - 1);
                    else setActiveLevel(-1);
                  }}
                >
                  <ChevronLeft size={16} />
                  <span>{activeLevel === 0 ? 'Back to Overview' : 'Previous Level'}</span>
                </button>

                <div className="bottom-nav-indicator">
                  MODULE {activeLevel + 1} OF {LEVELS.length}
                </div>

                <button
                  className="btn btn-primary"
                  onClick={() => {
                    sound.play('click');
                    if (activeLevel < LEVELS.length - 1) setActiveLevel(activeLevel + 1);
                    else setActiveLevel(-1);
                  }}
                >
                  <span>{activeLevel === LEVELS.length - 1 ? 'Curriculum Overview' : 'Next Level'}</span>
                  <ChevronRight size={16} />
                </button>
              </div>
            </>
          )}
        </main>
      </div>

      {/* Footer */}
      <Footer
        onOpenGuide={() => setShowFacilitator(true)}
        onOpenCertificate={() => setShowCertificate(true)}
      />

      {/* Modals */}
      {showCertificate && (
        <CertificateModal
          studentName={studentName}
          onUpdateName={setStudentName}
          completedLevels={completed}
          onClose={() => setShowCertificate(false)}
        />
      )}

      {showFacilitator && (
        <FacilitatorGuideModal
          onUnlockAll={handleUnlockAll}
          onResetProgress={handleResetProgress}
          onClose={() => setShowFacilitator(false)}
        />
      )}

      {unlockedBadgeLevel && (
        <BadgeModal
          level={unlockedBadgeLevel}
          onNext={() => {
            setUnlockedBadgeLevel(null);
            if (activeLevel < LEVELS.length - 1) {
              setActiveLevel(activeLevel + 1);
            } else {
              setActiveLevel(-1);
            }
          }}
          onReplay={() => setUnlockedBadgeLevel(null)}
          onClose={() => setUnlockedBadgeLevel(null)}
        />
      )}

      {/* Toast */}
      {toast && (
        <div className="app-toast">
          <CheckCircle2 size={18} color="var(--emerald-solid)" />
          <span>{toast}</span>
        </div>
      )}
    </div>
  );
}
