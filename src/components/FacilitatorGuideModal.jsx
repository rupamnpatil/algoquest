import React, { useState } from 'react';
import {
  X,
  BookOpen,
  CheckCircle2,
  FileText,
  RotateCcw,
  Sparkles,
  Printer,
  Code2
} from 'lucide-react';
import { APP_INFO, LEVELS } from '../utils/levelsData';
import { sound } from '../utils/sound';

export default function FacilitatorGuideModal({
  onUnlockAll,
  onResetProgress,
  onClose
}) {
  const [activeTab, setActiveTab] = useState('curriculum'); // 'curriculum' | 'worksheet' | 'tools'

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '820px' }}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <BookOpen size={22} color="var(--indigo-solid)" />
            <div>
              <h3 className="modal-title">AlgoQuest — Curriculum & Learning Guide</h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                {APP_INFO.appName}: {APP_INFO.tagline} · {APP_INFO.subtitle}
              </p>
            </div>
          </div>
          <button className="icon-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Tab switcher */}
        <div style={{
          display: 'flex',
          gap: '8px',
          padding: '0 1.5rem',
          borderBottom: '1px solid var(--border-subtle)',
          background: 'var(--bg-subtle)'
        }}>
          <button
            className={`stage-btn ${activeTab === 'curriculum' ? 'active' : ''}`}
            onClick={() => { sound.play('click'); setActiveTab('curriculum'); }}
          >
            Curriculum & Concepts
          </button>
          <button
            className={`stage-btn ${activeTab === 'worksheet' ? 'active' : ''}`}
            onClick={() => { sound.play('click'); setActiveTab('worksheet'); }}
          >
            Practice Worksheet
          </button>
          <button
            className={`stage-btn ${activeTab === 'tools' ? 'active' : ''}`}
            onClick={() => { sound.play('click'); setActiveTab('tools'); }}
          >
            Player & Demo Tools
          </button>
        </div>

        <div className="modal-body">
          {activeTab === 'curriculum' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{
                background: 'var(--bg-subtle)',
                padding: '1rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-subtle)'
              }}>
                <h4 style={{ fontSize: '0.9rem', color: 'var(--text-main)', marginBottom: '0.35rem' }}>
                  Learning Coding Logic Through Interactive Games
                </h4>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-body)', lineHeight: 1.5 }}>
                  AlgoQuest teaches foundational programming principles without syntax friction. 
                  Learners master algorithmic thinking, loops, conditionals, sorting algorithms, and 
                  graph search by solving engaging visual puzzles that translate directly to Python and other modern languages.
                </p>
              </div>

              <div>
                <h4 style={{ fontSize: '0.88rem', fontWeight: 700, marginBottom: '0.75rem' }}>
                  Challenge Matrix & Learning Objectives
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {LEVELS.map((lvl) => (
                    <div
                      key={lvl.id}
                      style={{
                        padding: '0.75rem',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid var(--border-subtle)',
                        background: 'var(--bg-surface)'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                        <strong style={{ fontSize: '0.85rem' }}>Level {lvl.id}: {lvl.title}</strong>
                        <span style={{ fontSize: '0.72rem', color: `var(--${lvl.color}-solid)`, fontWeight: 700 }}>
                          {lvl.concept}
                        </span>
                      </div>
                      <ul style={{ paddingLeft: '1.2rem', fontSize: '0.78rem', color: 'var(--text-body)' }}>
                        {lvl.learningObjectives.map((obj, i) => (
                          <li key={i}>{obj}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'worksheet' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: 'var(--bg-subtle)',
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-md)'
              }}>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-body)' }}>
                  Printable offline challenge sheet for practice and offline problem-solving.
                </span>
                <button className="btn btn-sm btn-primary" onClick={() => window.print()}>
                  <Printer size={14} />
                  <span>Print Sheet</span>
                </button>
              </div>

              <div style={{
                border: '1px solid var(--border-subtle)',
                padding: '1.25rem',
                borderRadius: 'var(--radius-md)',
                background: 'var(--bg-surface)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem'
              }}>
                <div style={{ textAlign: 'center', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.5rem' }}>
                  <h4 style={{ fontSize: '1rem' }}>AlgoQuest — Logic & Algorithms Challenge Sheet</h4>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Name: ______________________  Date: ____________  Score: ______ / 5</p>
                </div>

                <div style={{ fontSize: '0.82rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div>
                    <strong>Q1. Sequence (Level 1):</strong> If a robot needs to move 2 steps right and 3 steps down, 
                    what happens if it steps down first into a wall? Why is execution order crucial?
                    <div style={{ height: '36px', borderBottom: '1px dashed #cbd5e1' }} />
                  </div>

                  <div>
                    <strong>Q2. Loops (Level 2):</strong> You need to repeat <code>move_forward()</code> 6 times. 
                    Write down the Python <code>for</code> loop statement using <code>range()</code>.
                    <div style={{ height: '36px', borderBottom: '1px dashed #cbd5e1' }} />
                  </div>

                  <div>
                    <strong>Q3. Conditionals (Level 3):</strong> Complete the rule: If the sensor detects Lava, the robot must 
                    ___________; otherwise, the robot can ___________.
                    <div style={{ height: '36px', borderBottom: '1px dashed #cbd5e1' }} />
                  </div>

                  <div>
                    <strong>Q4. Bubble Sort (Level 4):</strong> Given the numbers <code>[4, 2, 7, 1]</code>, what does the 
                    first pass of adjacent comparisons do with the largest number <code>7</code>?
                    <div style={{ height: '36px', borderBottom: '1px dashed #cbd5e1' }} />
                  </div>

                  <div>
                    <strong>Q5. BFS Traversal (Level 5):</strong> What does FIFO stand for in a queue, and why does BFS 
                    guarantee finding the shortest path in an unweighted grid?
                    <div style={{ height: '36px', borderBottom: '1px dashed #cbd5e1' }} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'tools' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{
                background: 'var(--bg-subtle)',
                padding: '1rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-subtle)'
              }}>
                <h4 style={{ fontSize: '0.9rem', marginBottom: '0.35rem' }}>Player & Demonstration Controls</h4>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-body)', lineHeight: 1.5 }}>
                  Use these shortcuts to unlock all levels for quick exploration or reset progress to play from the beginning.
                </p>
              </div>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    sound.play('celebrate');
                    onUnlockAll();
                  }}
                >
                  <Sparkles size={16} />
                  <span>Unlock All Levels</span>
                </button>

                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    if (confirm('Reset all progress and start fresh?')) {
                      sound.play('click');
                      onResetProgress();
                    }
                  }}
                >
                  <RotateCcw size={16} />
                  <span>Reset All Progress</span>
                </button>
              </div>

              <div style={{
                border: '1px solid var(--border-subtle)',
                padding: '1rem',
                borderRadius: 'var(--radius-md)'
              }}>
                <h5 style={{ fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.4rem' }}>
                  Key Principles Taught in AlgoQuest:
                </h5>
                <ul style={{ paddingLeft: '1.2rem', fontSize: '0.8rem', color: 'var(--text-body)', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  <li><strong>Deterministic Execution:</strong> Computers follow instructions line-by-line without guessing.</li>
                  <li><strong>Algorithmic Efficiency:</strong> Loops and sorting invariants reduce code duplication and execution time.</li>
                  <li><strong>Optimal Pathfinding:</strong> Queues and breadth-first exploration systematically find shortest routes.</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
