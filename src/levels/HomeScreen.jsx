import React from 'react';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  BookOpen,
  Award,
  ShieldCheck,
  Zap,
  Code2,
  GraduationCap
} from 'lucide-react';
import { LEVELS, CEP_INFO } from '../utils/levelsData';
import { sound } from '../utils/sound';

export default function HomeScreen({
  completedLevels,
  onStart,
  onSelectLevel,
  onOpenCertificate,
  onOpenFacilitator,
  studentName
}) {
  const completedCount = completedLevels.length;
  const progressPercent = Math.round((completedCount / LEVELS.length) * 100);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
      {/* Hero Section */}
      <div style={{
        background: 'linear-gradient(135deg, var(--bg-surface) 0%, var(--bg-subtle) 100%)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-xl)',
        padding: '2.5rem 2rem',
        boxShadow: 'var(--shadow-sm)',
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1.3fr) minmax(240px, 0.7fr)',
        gap: '2rem',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.75rem',
            fontWeight: 700,
            color: 'var(--indigo-solid)',
            textTransform: 'uppercase',
            letterSpacing: '0.08em'
          }}>
            <GraduationCap size={16} />
            <span>{CEP_INFO.university} · {CEP_INFO.courseName}</span>
          </div>

          <h1 style={{
            fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
            fontWeight: 800,
            color: 'var(--text-main)',
            letterSpacing: '-0.03em',
            lineHeight: 1.15
          }}>
            Think in Steps. <br />
            <span style={{ color: 'var(--indigo-solid)' }}>Solve with Code.</span>
          </h1>

          <p style={{ fontSize: '0.95rem', color: 'var(--text-body)', lineHeight: 1.6, maxWidth: '540px' }}>
            Welcome, <strong>{studentName || 'Learner'}</strong>! AlgoQuest is an offline-friendly, interactive learning 
            labyrinth designed to teach programming sequence, loops, conditionals, sorting algorithms, and graph traversal 
            through tangible puzzles.
          </p>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
            <button
              className="btn btn-primary"
              onClick={() => {
                sound.play('click');
                onStart();
              }}
              style={{ padding: '0.75rem 1.25rem', fontSize: '0.9rem' }}
            >
              <span>{completedCount > 0 ? 'Resume Learning' : 'Start Level 01'}</span>
              <ArrowRight size={17} />
            </button>

            <button
              className="btn btn-secondary"
              onClick={() => {
                sound.play('click');
                onOpenFacilitator();
              }}
              style={{ padding: '0.75rem 1.25rem' }}
            >
              <BookOpen size={16} />
              <span>Facilitator & Viva Guide</span>
            </button>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.25rem',
            fontSize: '0.78rem',
            color: 'var(--text-muted)',
            marginTop: '0.5rem',
            flexWrap: 'wrap'
          }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <CheckCircle2 size={14} color="var(--emerald-solid)" /> 5 Progressive Modules
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <CheckCircle2 size={14} color="var(--emerald-solid)" /> 100% Offline-First
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <CheckCircle2 size={14} color="var(--emerald-solid)" /> Printable MU Certificate
            </span>
          </div>
        </div>

        {/* Hero Right Visual Card */}
        <div style={{
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.5rem',
          boxShadow: 'var(--shadow-md)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>YOUR PROGRESS</span>
            <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--indigo-solid)' }}>{progressPercent}%</span>
          </div>

          <div className="topbar-progress-bar" style={{ height: '8px' }}>
            <div className="topbar-progress-fill" style={{ width: `${progressPercent}%` }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            {LEVELS.map((lvl) => {
              const done = completedLevels.includes(lvl.id);
              return (
                <div
                  key={lvl.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '0.8rem',
                    color: done ? 'var(--text-main)' : 'var(--text-muted)'
                  }}
                >
                  <span style={{ fontWeight: done ? 600 : 400 }}>
                    {lvl.id}. {lvl.title}
                  </span>
                  {done ? (
                    <CheckCircle2 size={15} color="var(--emerald-solid)" />
                  ) : (
                    <span style={{ fontSize: '0.72rem' }}>{lvl.time}</span>
                  )}
                </div>
              );
            })}
          </div>

          {completedCount >= 1 && (
            <button
              className="btn btn-sm btn-outline"
              onClick={onOpenCertificate}
              style={{ width: '100%', marginTop: '0.25rem' }}
            >
              <Award size={15} color="var(--amber-solid)" />
              <span>View Your Certificate</span>
            </button>
          )}
        </div>
      </div>

      {/* Curriculum Grid */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.25rem' }}>
          <div>
            <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>
              Learning Modules & Challenges
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              From initial sequential algorithms to advanced graph traversal.
            </p>
          </div>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>
            BEGINNER → INTERMEDIATE
          </span>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
          gap: '1rem'
        }}>
          {LEVELS.map((lvl, idx) => {
            const Icon = lvl.icon;
            const isDone = completedLevels.includes(lvl.id);

            return (
              <div
                key={lvl.id}
                style={{
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '1.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.85rem',
                  boxShadow: 'var(--shadow-sm)',
                  transition: 'transform 0.15s, box-shadow 0.15s',
                  cursor: 'pointer'
                }}
                onClick={() => {
                  sound.play('click');
                  onSelectLevel(idx);
                }}
                role="button"
                tabIndex={0}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: `var(--${lvl.color}-bg)`,
                      color: `var(--${lvl.color}-solid)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Icon size={18} />
                  </div>

                  <span
                    className="level-badge-pill"
                    style={{
                      backgroundColor: `var(--${lvl.color}-bg)`,
                      color: `var(--${lvl.color}-solid)`
                    }}
                  >
                    {lvl.tag}
                  </span>
                </div>

                <div>
                  <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)' }}>
                    LEVEL 0{lvl.id}
                  </div>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-main)', margin: '2px 0' }}>
                    {lvl.title}
                  </h3>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    {lvl.concept}
                  </p>
                </div>

                <div style={{
                  marginTop: 'auto',
                  paddingTop: '0.75rem',
                  borderTop: '1px solid var(--border-subtle)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '0.75rem'
                }}>
                  <span style={{ color: 'var(--text-muted)' }}>{lvl.time}</span>
                  {isDone ? (
                    <span style={{ color: 'var(--emerald-solid)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '3px' }}>
                      <CheckCircle2 size={14} /> Completed
                    </span>
                  ) : (
                    <span style={{ color: 'var(--indigo-solid)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '3px' }}>
                      Start <ArrowRight size={13} />
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
