import React, { useState, useEffect, useRef } from 'react';
import {
  RotateCcw,
  Play,
  CheckCircle2,
  AlertCircle,
  Code2,
  Sparkles,
  ArrowRight,
  Zap,
  Repeat
} from 'lucide-react';
import { sound } from '../utils/sound';

const STAGES = [
  {
    id: 1,
    title: 'Stage 1: Linear March',
    subtitle: 'Cross the bridge in a single loop',
    targetDistance: 6,
    needsRecharge: false,
    instruction: 'Set the loop count so the robot moves exactly to the flag.'
  },
  {
    id: 2,
    title: 'Stage 2: Compound Loop',
    subtitle: 'Move and collect energy cells',
    targetDistance: 5,
    needsRecharge: true,
    instruction: 'In each iteration, the robot moves forward and collects a battery cell.'
  },
  {
    id: 3,
    title: 'Stage 3: Pattern Repeater',
    subtitle: 'Multi-action staircase climbing',
    targetDistance: 4,
    isStaircase: true,
    instruction: 'Repeat the pattern [Step Right, Step Up] to reach the pyramid apex!'
  }
];

export default function LoopGame({ onComplete }) {
  const [stageIdx, setStageIdx] = useState(0);
  const stage = STAGES[stageIdx];

  const [repeatCount, setRepeatCount] = useState(3);
  const [currentIteration, setCurrentIteration] = useState(0);
  const [pos, setPos] = useState({ r: 0, c: 0 }); // for 2D or 1D
  const [collectedCells, setCollectedCells] = useState(0);
  const [running, setRunning] = useState(false);
  const [status, setStatus] = useState({ type: 'info', msg: stage.instruction });
  const runningRef = useRef(false);

  useEffect(() => {
    handleReset();
  }, [stageIdx]);

  const handleReset = () => {
    runningRef.current = false;
    setRunning(false);
    setCurrentIteration(0);
    setPos({ r: 0, c: 0 });
    setCollectedCells(0);
    setStatus({ type: 'info', msg: stage.instruction });
    sound.play('click');
  };

  const handleRunLoop = async () => {
    if (running) return;
    runningRef.current = true;
    setRunning(true);
    setPos({ r: 0, c: 0 });
    setCurrentIteration(0);
    setCollectedCells(0);
    setStatus({ type: 'info', msg: `Executing loop: for i in range(${repeatCount})...` });

    let curP = { r: 0, c: 0 };
    let curCells = 0;

    for (let i = 0; i < repeatCount; i++) {
      if (!runningRef.current) break;
      setCurrentIteration(i + 1);

      if (stage.isStaircase) {
        // Step Right
        curP = { r: curP.r, c: curP.c + 1 };
        setPos({ ...curP });
        sound.play('step');
        await new Promise((r) => setTimeout(r, 280));

        // Step Up
        curP = { r: curP.r + 1, c: curP.c };
        setPos({ ...curP });
        sound.play('step');
        await new Promise((r) => setTimeout(r, 280));
      } else {
        curP = { r: 0, c: curP.c + 1 };
        setPos({ ...curP });
        sound.play('step');
        await new Promise((r) => setTimeout(r, 320));

        if (stage.needsRecharge) {
          curCells += 1;
          setCollectedCells(curCells);
          sound.play('gem');
          await new Promise((r) => setTimeout(r, 200));
        }
      }
    }

    if (runningRef.current) {
      const reachedTarget = stage.isStaircase
        ? curP.c === stage.targetDistance && curP.r === stage.targetDistance
        : curP.c === stage.targetDistance;

      if (reachedTarget) {
        sound.play('success');
        setStatus({
          type: 'success',
          msg: `Awesome! Loop completed ${repeatCount} iterations and successfully reached the target!`
        });

        if (stageIdx === STAGES.length - 1) {
          onComplete();
        } else {
          setTimeout(() => {
            setStageIdx((prev) => prev + 1);
          }, 1500);
        }
      } else if (curP.c < stage.targetDistance) {
        sound.play('error');
        setStatus({
          type: 'error',
          msg: `Undershot! The loop only ran ${repeatCount} times, but needed ${stage.targetDistance}. Increase range().`
        });
      } else {
        sound.play('error');
        setStatus({
          type: 'error',
          msg: `Overshot! The robot passed the flag. Decrease range() to match the exact distance.`
        });
      }
    }

    setRunning(false);
    runningRef.current = false;
  };

  return (
    <div className="game-workspace-grid">
      {/* Left Column: Visual Corridor */}
      <div className="game-main-card">
        <div className="card-header-row">
          <div>
            <h3 className="card-title">{stage.title}</h3>
            <span className="card-subtitle">{stage.subtitle}</span>
          </div>

          <div className="stage-selector-bar" style={{ margin: 0 }}>
            {STAGES.map((s, idx) => (
              <button
                key={s.id}
                className={`stage-btn ${stageIdx === idx ? 'active' : ''}`}
                onClick={() => {
                  sound.play('click');
                  setStageIdx(idx);
                }}
                disabled={running}
              >
                Stage {s.id}
              </button>
            ))}
          </div>
        </div>

        {/* 1D Corridor or 2D Staircase */}
        {!stage.isStaircase ? (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '6px' }}>
              <span>START (Index 0)</span>
              <span>GOAL (Tile {stage.targetDistance})</span>
            </div>

            <div className="loop-corridor-grid" style={{ gridTemplateColumns: `repeat(${stage.targetDistance + 1}, 1fr)` }}>
              {Array.from({ length: stage.targetDistance + 1 }, (_, i) => {
                const isPlayer = pos.c === i;
                const isGoal = i === stage.targetDistance;
                const isPassed = i < pos.c;

                return (
                  <div
                    key={i}
                    className={`loop-tile ${isPassed ? 'passed' : ''} ${isPlayer ? 'current' : ''} ${isGoal ? 'flag' : ''}`}
                  >
                    {isPlayer ? (
                      <span style={{ fontSize: '1.4rem' }}>🤖</span>
                    ) : isGoal ? (
                      <span style={{ fontSize: '1.2rem' }}>🏁</span>
                    ) : isPassed ? (
                      <CheckCircle2 size={16} color="var(--emerald-solid)" />
                    ) : (
                      <span>{i}</span>
                    )}

                    {stage.needsRecharge && i > 0 && i < stage.targetDistance && !isPassed && (
                      <Zap size={14} color="var(--amber-solid)" style={{ marginTop: '2px' }} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* 2D Staircase Board */
          <div style={{ display: 'flex', justifyContent: 'center', padding: '1rem' }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${stage.targetDistance + 1}, 1fr)`,
                gap: '6px',
                width: '100%',
                maxWidth: '340px'
              }}
            >
              {Array.from({ length: (stage.targetDistance + 1) * (stage.targetDistance + 1) }, (_, idx) => {
                const r = stage.targetDistance - Math.floor(idx / (stage.targetDistance + 1));
                const c = idx % (stage.targetDistance + 1);
                const isPlayer = pos.r === r && pos.c === c;
                const isGoal = r === stage.targetDistance && c === stage.targetDistance;
                const isStepPath = r === c;

                return (
                  <div
                    key={idx}
                    style={{
                      aspectRatio: 1,
                      borderRadius: '8px',
                      border: '1px solid var(--border-subtle)',
                      background: isPlayer
                        ? 'var(--indigo-bg)'
                        : isGoal
                        ? 'var(--amber-bg)'
                        : isStepPath
                        ? 'var(--bg-subtle)'
                        : 'transparent',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {isPlayer ? '🤖' : isGoal ? '🏁' : isStepPath ? '·' : ''}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Live Variable Tracker */}
        <div className="loop-variable-tracker">
          <div>
            <strong>Variable i: </strong>
            <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--indigo-solid)', fontWeight: 700 }}>
              {currentIteration > 0 ? currentIteration - 1 : 'not started'}
            </span>
          </div>

          <div>
            <strong>Iterations Run: </strong>
            <span>{currentIteration} / {repeatCount}</span>
          </div>

          {stage.needsRecharge && (
            <div>
              <strong>Energy Cells: </strong>
              <span style={{ color: 'var(--amber-solid)', fontWeight: 700 }}>
                {collectedCells} / {stage.targetDistance - 1}
              </span>
            </div>
          )}
        </div>

        {/* Status Box */}
        <div className={`status-box ${status.type === 'success' ? 'success' : status.type === 'error' ? 'error' : ''}`}>
          {status.type === 'success' && <CheckCircle2 size={18} />}
          {status.type === 'error' && <AlertCircle size={18} />}
          <span>{status.msg}</span>
        </div>
      </div>

      {/* Right Column: Loop Code Builder */}
      <div className="game-side-card">
        <div className="card-header-row">
          <h4 className="card-title">Loop Logic Block</h4>
          <Repeat size={18} color="var(--indigo-solid)" />
        </div>

        <div className="loop-code-card">
          <div className="loop-header-tag">
            <RotateCcw size={14} />
            <span>Python For-Loop Structure</span>
          </div>

          <div className="loop-statement-line">
            <span>for step in range(</span>
            <select
              className="loop-counter-select"
              value={repeatCount}
              onChange={(e) => {
                sound.play('click');
                setRepeatCount(Number(e.target.value));
              }}
              disabled={running}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
            <span>):</span>
          </div>

          {/* Indented Loop Body */}
          <div className="loop-body-block">
            {stage.isStaircase ? (
              <>
                <div className="loop-action-chip">
                  <ArrowRight size={14} />
                  <span>robot.move_right()</span>
                </div>
                <div className="loop-action-chip">
                  <ArrowRight size={14} style={{ transform: 'rotate(-90deg)' }} />
                  <span>robot.move_up()</span>
                </div>
              </>
            ) : (
              <>
                <div className="loop-action-chip">
                  <ArrowRight size={14} />
                  <span>robot.move_forward()</span>
                </div>
                {stage.needsRecharge && (
                  <div className="loop-action-chip" style={{ color: 'var(--amber-solid)' }}>
                    <Zap size={14} />
                    <span>robot.recharge_cell()</span>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        <div style={{
          fontSize: '0.8rem',
          color: 'var(--text-body)',
          lineHeight: 1.5,
          background: 'var(--bg-subtle)',
          padding: '0.85rem',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-subtle)'
        }}>
          <strong>Did you know?</strong> In Python, <code>range({repeatCount})</code> creates sequence{' '}
          <code>[{Array.from({ length: repeatCount }, (_, i) => i).join(', ')}]</code>. 
          The loop runs exactly <strong>{repeatCount}</strong> times.
        </div>

        <div className="playback-controls-row">
          <button
            className="btn btn-primary"
            style={{ flex: 1 }}
            onClick={handleRunLoop}
            disabled={running}
          >
            <Play size={15} />
            <span>{running ? 'Loop Running...' : 'Execute Loop'}</span>
          </button>

          <button
            className="btn btn-secondary"
            onClick={handleReset}
            title="Reset Loop"
          >
            <RotateCcw size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
