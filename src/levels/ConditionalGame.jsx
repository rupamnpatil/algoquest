import React, { useState, useEffect, useRef } from 'react';
import {
  GitBranch,
  Play,
  CheckCircle2,
  AlertCircle,
  Code2,
  Sparkles,
  Flame,
  Shield,
  RotateCcw,
  Radio
} from 'lucide-react';
import { sound } from '../utils/sound';

const COURSES = [
  {
    id: 1,
    name: 'Course Alpha',
    track: ['start', 'clear', 'lava', 'clear', 'gem', 'clear', 'lava', 'goal'],
    desc: 'Basic course with lava pits and energy gems.'
  },
  {
    id: 2,
    name: 'Course Beta (Verification)',
    track: ['start', 'lava', 'clear', 'gem', 'clear', 'lava', 'gem', 'goal'],
    desc: 'Verify that your logic solves a different randomized layout!'
  }
];

export default function ConditionalGame({ onComplete }) {
  const [courseIdx, setCourseIdx] = useState(0);
  const course = COURSES[courseIdx];

  // Conditional Logic Config
  const [ifCondition, setIfCondition] = useState('lava');
  const [ifAction, setIfAction] = useState('jump');

  const [hasElif, setHasElif] = useState(true);
  const [elifCondition, setElifCondition] = useState('gem');
  const [elifAction, setElifAction] = useState('collect');

  const [elseAction, setElseAction] = useState('walk');

  // Simulation State
  const [pos, setPos] = useState(0);
  const [scannedTile, setScannedTile] = useState(null);
  const [activeBranch, setActiveBranch] = useState(null); // 'if' | 'elif' | 'else'
  const [running, setRunning] = useState(false);
  const [status, setStatus] = useState({
    type: 'info',
    msg: 'Program the sensor decisions to handle all environmental obstacles.'
  });
  const [log, setLog] = useState([]);
  const runningRef = useRef(false);

  useEffect(() => {
    handleReset();
  }, [courseIdx]);

  const handleReset = () => {
    runningRef.current = false;
    setRunning(false);
    setPos(0);
    setScannedTile(null);
    setActiveBranch(null);
    setLog([]);
    setStatus({
      type: 'info',
      msg: 'Program the sensor decisions to handle all environmental obstacles.'
    });
    sound.play('click');
  };

  const handleRunSimulation = async () => {
    if (running) return;
    runningRef.current = true;
    setRunning(true);
    setPos(0);
    setLog([]);
    setStatus({ type: 'info', msg: 'Robot scanning path ahead...' });

    let p = 0;
    let crashed = false;
    const history = [];

    while (p < course.track.length - 1 && runningRef.current) {
      const nextTile = course.track[p + 1];
      setScannedTile(p + 1);
      sound.play('click');
      await new Promise((r) => setTimeout(r, 450));
      if (!runningRef.current) break;

      // Evaluate decision tree
      let chosenAction = elseAction;
      let branchName = 'else';

      if (nextTile === ifCondition) {
        chosenAction = ifAction;
        branchName = 'if';
      } else if (hasElif && nextTile === elifCondition) {
        chosenAction = elifAction;
        branchName = 'elif';
      }

      setActiveBranch(branchName);

      // Perform chosen action
      if (chosenAction === 'jump') {
        if (nextTile === 'lava') {
          sound.play('step');
          p += 1; // jumps over lava tile
          history.push(`[IF] Detected ${nextTile} -> JUMPED successfully.`);
        } else {
          sound.play('error');
          crashed = true;
          setStatus({
            type: 'error',
            msg: `Unnecessary jump! Next tile was '${nextTile}', not lava. Check your condition.`
          });
          break;
        }
      } else if (chosenAction === 'collect') {
        if (nextTile === 'gem') {
          sound.play('gem');
          p += 1;
          history.push(`[ELIF] Detected ${nextTile} -> COLLECTED energy.`);
        } else {
          sound.play('error');
          crashed = true;
          setStatus({
            type: 'error',
            msg: `Tried to collect on '${nextTile}', but no gem was present!`
          });
          break;
        }
      } else if (chosenAction === 'walk') {
        if (nextTile === 'lava') {
          sound.play('error');
          crashed = true;
          setStatus({
            type: 'error',
            msg: `Hazard crash! The robot stepped into Lava! You must configure an IF rule to JUMP.`
          });
          break;
        } else {
          sound.play('step');
          p += 1;
          history.push(`[ELSE] Tile is ${nextTile} -> STEPPED forward.`);
        }
      }

      setPos(p);
      setLog([...history]);
      await new Promise((r) => setTimeout(r, 380));
    }

    if (!crashed && runningRef.current && p === course.track.length - 1) {
      sound.play('success');
      setStatus({
        type: 'success',
        msg: `Great job! Your conditional decision tree conquered ${course.name}!`
      });

      if (courseIdx === COURSES.length - 1) {
        onComplete();
      } else {
        setTimeout(() => {
          setCourseIdx(1);
        }, 1500);
      }
    }

    setRunning(false);
    runningRef.current = false;
  };

  return (
    <div className="game-workspace-grid">
      {/* Left Column: Visual Hazard Course */}
      <div className="game-main-card">
        <div className="card-header-row">
          <div>
            <h3 className="card-title">{course.name}</h3>
            <span className="card-subtitle">{course.desc}</span>
          </div>

          <div className="stage-selector-bar" style={{ margin: 0 }}>
            {COURSES.map((c, idx) => (
              <button
                key={c.id}
                className={`stage-btn ${courseIdx === idx ? 'active' : ''}`}
                onClick={() => {
                  sound.play('click');
                  setCourseIdx(idx);
                }}
                disabled={running}
              >
                Course {c.id}
              </button>
            ))}
          </div>
        </div>

        {/* Course Track */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '6px' }}>
            <span>START</span>
            <span>RADAR DETECTION SCANNER</span>
            <span>GOAL</span>
          </div>

          <div className="hazard-course-track">
            {course.track.map((tile, i) => {
              const isPlayer = pos === i;
              const isScanned = scannedTile === i;
              const isPassed = i < pos;

              return (
                <div
                  key={i}
                  className={`hazard-track-cell ${tile} ${isScanned ? 'scanned' : ''}`}
                >
                  {isScanned && <div className="radar-beam" />}

                  {isPlayer ? (
                    <span style={{ fontSize: '1.4rem' }}>🤖</span>
                  ) : tile === 'lava' ? (
                    <Flame size={20} color="var(--rose-solid)" />
                  ) : tile === 'gem' ? (
                    <Sparkles size={20} color="var(--amber-solid)" />
                  ) : tile === 'goal' ? (
                    <span style={{ fontSize: '1.2rem' }}>🏁</span>
                  ) : isPassed ? (
                    <CheckCircle2 size={16} color="var(--emerald-solid)" />
                  ) : (
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{i}</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Live Decision Log */}
        <div style={{
          background: 'var(--bg-subtle)',
          borderRadius: 'var(--radius-md)',
          padding: '0.75rem 1rem',
          border: '1px solid var(--border-subtle)',
          minHeight: '75px',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.35rem',
          fontSize: '0.78rem',
          fontFamily: 'var(--font-mono)'
        }}>
          <div style={{ fontWeight: 700, color: 'var(--text-muted)', fontSize: '0.7rem' }}>
            DECISION EXECUTION LOG
          </div>
          {log.length === 0 ? (
            <span style={{ color: 'var(--text-muted)' }}>Run the simulation to inspect live decisions.</span>
          ) : (
            log.slice(-3).map((item, idx) => (
              <div key={idx} style={{ color: 'var(--text-body)' }}>{item}</div>
            ))
          )}
        </div>

        {/* Status Alert */}
        <div className={`status-box ${status.type === 'success' ? 'success' : status.type === 'error' ? 'error' : ''}`}>
          {status.type === 'success' && <CheckCircle2 size={18} />}
          {status.type === 'error' && <AlertCircle size={18} />}
          <span>{status.msg}</span>
        </div>
      </div>

      {/* Right Column: If/Elif/Else Rules Builder */}
      <div className="game-side-card">
        <div className="card-header-row">
          <h4 className="card-title">Decision Logic Tree</h4>
          <GitBranch size={18} color="var(--amber-solid)" />
        </div>

        <div className="rules-tree-builder">
          {/* IF Node */}
          <div className={`rule-node ${activeBranch === 'if' ? 'active-branch' : ''}`}>
            <span className="rule-label" style={{ color: 'var(--indigo-solid)' }}>IF sensor ==</span>
            <select
              className="loop-counter-select"
              value={ifCondition}
              onChange={(e) => { sound.play('click'); setIfCondition(e.target.value); }}
              disabled={running}
            >
              <option value="lava">"lava"</option>
              <option value="gem">"gem"</option>
              <option value="clear">"clear"</option>
            </select>
            <span className="rule-label">:</span>
            <div style={{ width: '100%', marginTop: '4px', paddingLeft: '1rem' }}>
              <select
                className="loop-counter-select"
                value={ifAction}
                onChange={(e) => { sound.play('click'); setIfAction(e.target.value); }}
                disabled={running}
              >
                <option value="jump">jump_hazard()</option>
                <option value="walk">step_forward()</option>
                <option value="collect">collect_gem()</option>
              </select>
            </div>
          </div>

          {/* ELIF Node */}
          {hasElif && (
            <div className={`rule-node ${activeBranch === 'elif' ? 'active-branch' : ''}`}>
              <span className="rule-label" style={{ color: 'var(--amber-solid)' }}>ELIF sensor ==</span>
              <select
                className="loop-counter-select"
                value={elifCondition}
                onChange={(e) => { sound.play('click'); setElifCondition(e.target.value); }}
                disabled={running}
              >
                <option value="gem">"gem"</option>
                <option value="lava">"lava"</option>
                <option value="clear">"clear"</option>
              </select>
              <span className="rule-label">:</span>
              <div style={{ width: '100%', marginTop: '4px', paddingLeft: '1rem' }}>
                <select
                  className="loop-counter-select"
                  value={elifAction}
                  onChange={(e) => { sound.play('click'); setElifAction(e.target.value); }}
                  disabled={running}
                >
                  <option value="collect">collect_gem()</option>
                  <option value="jump">jump_hazard()</option>
                  <option value="walk">step_forward()</option>
                </select>
              </div>
            </div>
          )}

          {/* ELSE Node */}
          <div className={`rule-node ${activeBranch === 'else' ? 'active-branch' : ''}`}>
            <span className="rule-label" style={{ color: 'var(--emerald-solid)' }}>ELSE:</span>
            <div style={{ width: '100%', marginTop: '4px', paddingLeft: '1rem' }}>
              <select
                className="loop-counter-select"
                value={elseAction}
                onChange={(e) => { sound.play('click'); setElseAction(e.target.value); }}
                disabled={running}
              >
                <option value="walk">step_forward()</option>
                <option value="jump">jump_hazard()</option>
                <option value="collect">collect_gem()</option>
              </select>
            </div>
          </div>
        </div>

        {/* Python Snippet Preview */}
        <div style={{
          background: 'var(--bg-subtle)',
          padding: '0.75rem',
          borderRadius: 'var(--radius-md)',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.75rem',
          lineHeight: 1.5,
          color: 'var(--text-body)'
        }}>
          <code>
            {`if sensor == "${ifCondition}":\n    ${ifAction}()\n`}
            {hasElif && `elif sensor == "${elifCondition}":\n    ${elifAction}()\n`}
            {`else:\n    ${elseAction}()`}
          </code>
        </div>

        {/* Playback Controls */}
        <div className="playback-controls-row">
          <button
            className="btn btn-primary"
            style={{ flex: 1 }}
            onClick={handleRunSimulation}
            disabled={running}
          >
            <Play size={15} />
            <span>{running ? 'Testing Logic...' : 'Run Decision Engine'}</span>
          </button>

          <button
            className="btn btn-secondary"
            onClick={handleReset}
            title="Reset Simulation"
          >
            <RotateCcw size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
