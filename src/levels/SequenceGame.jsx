import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Play,
  RotateCcw,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Code2,
  Sparkles,
  Bug,
  FastForward,
  StepForward,
  X
} from 'lucide-react';
import { sound } from '../utils/sound';

const STAGES = [
  {
    id: 1,
    name: 'Stage 1: Basic Path',
    start: { r: 0, c: 0 },
    goal: { r: 3, c: 3 },
    gems: [{ r: 1, c: 2 }],
    walls: ['0,2', '1,1', '2,1', '3,1'],
    hint: 'Move Right, Down, collect the crystal, then reach the portal.'
  },
  {
    id: 2,
    name: 'Stage 2: Maze Turn',
    start: { r: 0, c: 0 },
    goal: { r: 4, c: 4 },
    gems: [{ r: 2, c: 2 }, { r: 4, c: 1 }],
    walls: ['1,0', '1,1', '1,2', '2,4', '3,2', '3,3'],
    hint: 'Find the open hallway around the barrier wall.'
  },
  {
    id: 3,
    name: 'Stage 3: Logic Labyrinth',
    start: { r: 0, c: 0 },
    goal: { r: 4, c: 4 },
    gems: [{ r: 0, c: 4 }, { r: 3, c: 0 }],
    walls: ['1,1', '1,3', '2,1', '2,3', '3,1', '3,3'],
    hint: 'Collect all crystals before entering the goal portal!'
  }
];

const DIRS = [
  { id: 'UP', label: 'Up', icon: ArrowUp, dr: -1, dc: 0, key: 'ArrowUp' },
  { id: 'DOWN', label: 'Down', icon: ArrowDown, dr: 1, dc: 0, key: 'ArrowDown' },
  { id: 'LEFT', label: 'Left', icon: ArrowLeft, dr: 0, dc: -1, key: 'ArrowLeft' },
  { id: 'RIGHT', label: 'Right', icon: ArrowRight, dr: 0, dc: 1, key: 'ArrowRight' }
];

export default function SequenceGame({ onComplete }) {
  const [stageIdx, setStageIdx] = useState(0);
  const stage = STAGES[stageIdx];
  const wallsSet = useMemo(() => new Set(stage.walls), [stage]);

  const [commands, setCommands] = useState([]);
  const [pos, setPos] = useState(stage.start);
  const [collectedGems, setCollectedGems] = useState(new Set());
  const [running, setRunning] = useState(false);
  const [activeStep, setActiveStep] = useState(-1);
  const [speed, setSpeed] = useState(380); // ms per step
  const [status, setStatus] = useState({ type: 'info', msg: stage.hint });
  const [showCode, setShowCode] = useState(false);
  const runningRef = useRef(false);

  // Reset when stage changes
  useEffect(() => {
    handleReset();
  }, [stageIdx]);

  const handleReset = () => {
    runningRef.current = false;
    setRunning(false);
    setPos(stage.start);
    setCollectedGems(new Set());
    setActiveStep(-1);
    setStatus({ type: 'info', msg: stage.hint });
    sound.play('click');
  };

  const addCommand = (dirId) => {
    if (running || commands.length >= 20) return;
    sound.play('click');
    setCommands((prev) => [...prev, dirId]);
  };

  const removeCommand = (index) => {
    if (running) return;
    sound.play('click');
    setCommands((prev) => prev.filter((_, i) => i !== index));
  };

  // Run all commands automatically
  const handleRunAll = async () => {
    if (running || commands.length === 0) return;
    runningRef.current = true;
    setRunning(true);
    setPos(stage.start);
    setCollectedGems(new Set());
    setActiveStep(-1);
    setStatus({ type: 'info', msg: 'Executing algorithm step-by-step...' });

    let cur = { ...stage.start };
    let curGems = new Set();
    let crashed = false;

    for (let i = 0; i < commands.length; i++) {
      if (!runningRef.current) break;
      setActiveStep(i);
      const d = DIRS.find((x) => x.id === commands[i]);
      const next = { r: cur.r + d.dr, c: cur.c + d.dc };

      await new Promise((r) => setTimeout(r, speed));
      if (!runningRef.current) break;

      // Check bounds
      if (next.r < 0 || next.c < 0 || next.r >= 5 || next.c >= 5) {
        sound.play('error');
        setStatus({
          type: 'error',
          msg: `Step ${i + 1}: Out of bounds! The robot tried to move off the grid.`
        });
        crashed = true;
        break;
      }

      // Check walls
      const k = `${next.r},${next.c}`;
      if (wallsSet.has(k)) {
        sound.play('error');
        setStatus({
          type: 'error',
          msg: `Step ${i + 1}: Wall collision! Debug the direction before step ${i + 1}.`
        });
        crashed = true;
        break;
      }

      cur = next;
      setPos(cur);
      sound.play('step');

      // Check gem pickup
      stage.gems.forEach((g) => {
        if (g.r === cur.r && g.c === cur.c && !curGems.has(`${g.r},${g.c}`)) {
          curGems.add(`${g.r},${g.c}`);
          setCollectedGems(new Set(curGems));
          sound.play('gem');
        }
      });
    }

    if (!crashed && runningRef.current) {
      const isAtGoal = cur.r === stage.goal.r && cur.c === stage.goal.c;
      const allGemsPicked = curGems.size === stage.gems.length;

      if (isAtGoal && allGemsPicked) {
        sound.play('success');
        setStatus({
          type: 'success',
          msg: `Success! Goal reached and all ${stage.gems.length} crystals collected!`
        });
        if (stageIdx === STAGES.length - 1) {
          onComplete();
        } else {
          setTimeout(() => {
            setStageIdx((prev) => prev + 1);
          }, 1400);
        }
      } else if (isAtGoal && !allGemsPicked) {
        sound.play('error');
        setStatus({
          type: 'error',
          msg: `Reached goal, but missed some crystals (${curGems.size}/${stage.gems.length})! Revise your path.`
        });
      } else {
        sound.play('error');
        setStatus({
          type: 'error',
          msg: 'Finished all commands, but the robot did not reach the goal flag. Add more steps.'
        });
      }
    }

    setRunning(false);
    runningRef.current = false;
  };

  return (
    <div className="game-workspace-grid">
      {/* Left Column: Board & Stages */}
      <div className="game-main-card">
        <div className="card-header-row">
          <div>
            <h3 className="card-title">Robot Maze Grid</h3>
            <span className="card-subtitle">Grid Coordinates (Row 0–4, Col 0–4)</span>
          </div>

          {/* Stage Selector */}
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

        {/* 5x5 Grid World */}
        <div className="sequence-board-container">
          <div className="grid-5x5">
            {Array.from({ length: 25 }, (_, idx) => {
              const r = Math.floor(idx / 5);
              const c = idx % 5;
              const k = `${r},${c}`;
              const isPlayer = pos.r === r && pos.c === c;
              const isGoal = stage.goal.r === r && stage.goal.c === c;
              const isStart = stage.start.r === r && stage.start.c === c;
              const isWall = wallsSet.has(k);
              const hasGem = stage.gems.some((g) => g.r === r && g.c === c && !collectedGems.has(k));

              return (
                <div
                  key={idx}
                  className={`grid-cell ${
                    isWall
                      ? 'cell-wall'
                      : isPlayer
                      ? 'cell-player'
                      : isGoal
                      ? 'cell-goal'
                      : isStart
                      ? 'cell-start'
                      : ''
                  }`}
                >
                  {isPlayer ? (
                    <div className="robot-avatar" title={`Robot at (${r}, ${c})`}>
                      <span style={{ fontSize: '1.6rem' }}>🤖</span>
                    </div>
                  ) : hasGem ? (
                    <Sparkles size={20} className="gem-icon" />
                  ) : isGoal ? (
                    <span style={{ fontSize: '1.3rem' }}>🏁</span>
                  ) : isStart ? (
                    <span style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--emerald-text)' }}>START</span>
                  ) : null}
                </div>
              );
            })}
          </div>

          {/* Status Message */}
          <div className={`status-box ${status.type === 'success' ? 'success' : status.type === 'error' ? 'error' : ''}`}>
            {status.type === 'success' && <CheckCircle2 size={18} />}
            {status.type === 'error' && <AlertCircle size={18} />}
            <span>{status.msg}</span>
          </div>
        </div>
      </div>

      {/* Right Column: Direction Pad & Command Sequence */}
      <div className="game-side-card">
        <div className="card-header-row">
          <div>
            <h4 className="card-title">Algorithm Deck</h4>
            <span className="card-subtitle">{commands.length} / 20 steps</span>
          </div>
          <button
            className="btn btn-sm btn-outline"
            onClick={() => setShowCode(!showCode)}
            title="Toggle Python Code View"
          >
            <Code2 size={14} />
            <span>{showCode ? 'Blocks' : 'Python'}</span>
          </button>
        </div>

        {/* Direction Controls */}
        <div className="dpad-container">
          <div />
          <button
            className="dpad-btn"
            onClick={() => addCommand('UP')}
            disabled={running || commands.length >= 20}
            title="Move Up"
          >
            <ArrowUp size={18} />
            <span>UP</span>
          </button>
          <div />

          <button
            className="dpad-btn"
            onClick={() => addCommand('LEFT')}
            disabled={running || commands.length >= 20}
            title="Move Left"
          >
            <ArrowLeft size={18} />
            <span>LEFT</span>
          </button>
          <button
            className="dpad-btn"
            onClick={() => addCommand('DOWN')}
            disabled={running || commands.length >= 20}
            title="Move Down"
          >
            <ArrowDown size={18} />
            <span>DOWN</span>
          </button>
          <button
            className="dpad-btn"
            onClick={() => addCommand('RIGHT')}
            disabled={running || commands.length >= 20}
            title="Move Right"
          >
            <ArrowRight size={18} />
            <span>RIGHT</span>
          </button>
        </div>

        {/* Sequence List */}
        <div className="command-deck">
          <div className="command-deck-header">
            <span>COMMAND SEQUENCE</span>
            <button
              className="btn btn-sm btn-outline"
              onClick={() => { sound.play('click'); setCommands([]); }}
              disabled={running || commands.length === 0}
              style={{ padding: '2px 6px', fontSize: '0.7rem' }}
            >
              Clear All
            </button>
          </div>

          {showCode ? (
            <div className="command-list-box" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
              {commands.length === 0 ? (
                <div style={{ color: 'var(--text-muted)', textAlign: 'center', marginTop: '2rem' }}>
                  # No instructions yet
                </div>
              ) : (
                commands.map((cmd, i) => (
                  <div key={i} style={{ color: activeStep === i ? 'var(--indigo-solid)' : 'var(--text-body)' }}>
                    <span style={{ color: 'var(--text-muted)' }}>{i + 1}. </span>
                    robot.move_{cmd.toLowerCase()}()
                  </div>
                ))
              )}
            </div>
          ) : (
            <div className="command-list-box">
              {commands.length === 0 ? (
                <div style={{ color: 'var(--text-muted)', textAlign: 'center', margin: 'auto', fontSize: '0.82rem' }}>
                  Click arrows above to add commands.
                </div>
              ) : (
                commands.map((cmd, idx) => {
                  const d = DIRS.find((x) => x.id === cmd);
                  const Icon = d.icon;
                  const isCur = activeStep === idx;
                  return (
                    <div key={idx} className={`command-item ${isCur ? 'executing' : ''}`}>
                      <div className="command-item-left">
                        <span className="command-line-num">{idx + 1}.</span>
                        <Icon size={14} />
                        <span className="command-name">move_{cmd.toLowerCase()}()</span>
                      </div>
                      <button
                        className="command-remove-btn"
                        onClick={() => removeCommand(idx)}
                        disabled={running}
                        title="Remove this command"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  );
                })
              )}
            </div>
          )}
        </div>

        {/* Execution Actions */}
        <div className="playback-controls-row">
          <button
            className="btn btn-primary"
            style={{ flex: 1 }}
            onClick={handleRunAll}
            disabled={running || commands.length === 0}
          >
            <Play size={15} />
            <span>{running ? 'Running...' : 'Run Algorithm'}</span>
          </button>

          <button
            className="btn btn-secondary"
            onClick={handleReset}
            title="Reset Robot Position"
          >
            <RotateCcw size={15} />
          </button>
        </div>

        {/* Speed control */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          <span>Execution Speed:</span>
          <div style={{ display: 'flex', gap: '4px' }}>
            <button
              className={`stage-btn ${speed === 500 ? 'active' : ''}`}
              onClick={() => setSpeed(500)}
              style={{ padding: '2px 6px', fontSize: '0.7rem' }}
            >
              Slow
            </button>
            <button
              className={`stage-btn ${speed === 350 ? 'active' : ''}`}
              onClick={() => setSpeed(350)}
              style={{ padding: '2px 6px', fontSize: '0.7rem' }}
            >
              Normal
            </button>
            <button
              className={`stage-btn ${speed === 150 ? 'active' : ''}`}
              onClick={() => setSpeed(150)}
              style={{ padding: '2px 6px', fontSize: '0.7rem' }}
            >
              Fast
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
