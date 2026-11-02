import React, { useState, useEffect, useRef } from 'react';
import {
  Layers3,
  Play,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  ArrowLeftRight,
  Shuffle,
  Zap,
  Info
} from 'lucide-react';
import { sound } from '../utils/sound';

const PRESETS = [
  { id: 'default', label: 'Default [5, 2, 4, 1, 3]', arr: [5, 2, 4, 1, 3] },
  { id: 'reversed', label: 'Worst-Case [7, 5, 4, 2, 1]', arr: [7, 5, 4, 2, 1] },
  { id: 'nearly', label: 'Nearly Sorted [1, 3, 2, 4, 5]', arr: [1, 3, 2, 4, 5] }
];

export default function SortGame({ onComplete }) {
  const [mode, setMode] = useState('challenge'); // 'challenge' | 'auto'
  const [values, setValues] = useState([5, 2, 4, 1, 3]);
  const [comparingIdx, setComparingIdx] = useState(0);
  const [pass, setPass] = useState(1);
  const [comparisons, setComparisons] = useState(0);
  const [swaps, setSwaps] = useState(0);
  const [sortedIndices, setSortedIndices] = useState(new Set());
  const [status, setStatus] = useState({
    type: 'info',
    msg: 'Compare adjacent elements. Swap if left value > right value.'
  });
  const [autoRunning, setAutoRunning] = useState(false);
  const autoRef = useRef(false);

  useEffect(() => {
    handleReset();
  }, []);

  const isSorted = (arr) => arr.every((v, i) => i === 0 || arr[i - 1] <= v);

  const handleReset = (newArr = [5, 2, 4, 1, 3]) => {
    autoRef.current = false;
    setAutoRunning(false);
    setValues([...newArr]);
    setComparingIdx(0);
    setPass(1);
    setComparisons(0);
    setSwaps(0);
    setSortedIndices(new Set());
    setStatus({
      type: 'info',
      msg: 'Compare adjacent elements. Swap if left value > right value.'
    });
    sound.play('click');
  };

  const handleRandomize = () => {
    const randomVals = Array.from({ length: 5 }, () => Math.floor(Math.random() * 8) + 1);
    handleReset(randomVals);
  };

  // Student makes interactive choice
  const handleUserChoice = (doSwap) => {
    if (autoRunning || isSorted(values)) return;

    const left = values[comparingIdx];
    const right = values[comparingIdx + 1];
    const shouldSwap = left > right;

    setComparisons((prev) => prev + 1);

    if (doSwap !== shouldSwap) {
      sound.play('error');
      if (shouldSwap) {
        setStatus({
          type: 'error',
          msg: `Mistake! ${left} is greater than ${right}. In ascending order, larger items must swap right!`
        });
      } else {
        setStatus({
          type: 'error',
          msg: `Mistake! ${left} is already ≤ ${right}. No swap is needed here.`
        });
      }
      return;
    }

    // Valid choice
    let nextArr = [...values];
    if (doSwap) {
      sound.play('swap');
      nextArr[comparingIdx] = right;
      nextArr[comparingIdx + 1] = left;
      setSwaps((prev) => prev + 1);
      setStatus({
        type: 'info',
        msg: `Swapped ${left} and ${right}!`
      });
    } else {
      sound.play('step');
      setStatus({
        type: 'info',
        msg: `${left} and ${right} are already in order. Kept as is.`
      });
    }

    setValues(nextArr);

    // Check if fully sorted
    if (isSorted(nextArr)) {
      sound.play('success');
      setSortedIndices(new Set([0, 1, 2, 3, 4]));
      setStatus({
        type: 'success',
        msg: 'Array completely sorted! You mastered Bubble Sort mechanics!'
      });
      onComplete();
      return;
    }

    // Advance index or start next pass
    const maxIdxForPass = values.length - 1 - pass;
    if (comparingIdx >= maxIdxForPass) {
      const nextSorted = new Set(sortedIndices);
      nextSorted.add(values.length - pass);
      setSortedIndices(nextSorted);

      setComparingIdx(0);
      setPass((prev) => prev + 1);
      sound.play('click');
    } else {
      setComparingIdx((prev) => prev + 1);
    }
  };

  // Automatic visualizer
  const handleAutoRun = async () => {
    if (autoRunning) return;
    autoRef.current = true;
    setAutoRunning(true);
    let arr = [...values];
    let n = arr.length;
    let totalCmp = comparisons;
    let totalSwp = swaps;
    const sortedSet = new Set();

    for (let i = 0; i < n - 1; i++) {
      let swappedInPass = false;
      for (let j = 0; j < n - i - 1; j++) {
        if (!autoRef.current) break;
        setComparingIdx(j);
        setPass(i + 1);
        totalCmp += 1;
        setComparisons(totalCmp);

        await new Promise((r) => setTimeout(r, 450));
        if (!autoRef.current) break;

        if (arr[j] > arr[j + 1]) {
          const temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
          totalSwp += 1;
          setSwaps(totalSwp);
          swappedInPass = true;
          sound.play('swap');
          setValues([...arr]);
          await new Promise((r) => setTimeout(r, 450));
        } else {
          sound.play('step');
        }
      }
      sortedSet.add(n - 1 - i);
      setSortedIndices(new Set(sortedSet));
      if (!swappedInPass) break;
    }

    if (autoRef.current) {
      sound.play('success');
      setSortedIndices(new Set([0, 1, 2, 3, 4]));
      setStatus({
        type: 'success',
        msg: 'Auto-sort complete! All elements placed in sorted order.'
      });
      onComplete();
    }

    setAutoRunning(false);
    autoRef.current = false;
  };

  const currentLeft = values[comparingIdx];
  const currentRight = values[comparingIdx + 1];

  return (
    <div className="game-workspace-grid">
      {/* Left Column: Visual Bar Chart */}
      <div className="game-main-card">
        <div className="card-header-row">
          <div>
            <h3 className="card-title">Interactive Array Visualizer</h3>
            <span className="card-subtitle">Values and Zero-Based Indices</span>
          </div>

          {/* Mode Switcher */}
          <div className="stage-selector-bar" style={{ margin: 0 }}>
            <button
              className={`stage-btn ${mode === 'challenge' ? 'active' : ''}`}
              onClick={() => { sound.play('click'); setMode('challenge'); }}
              disabled={autoRunning}
            >
              Interactive Mode
            </button>
            <button
              className={`stage-btn ${mode === 'auto' ? 'active' : ''}`}
              onClick={() => { sound.play('click'); setMode('auto'); }}
              disabled={autoRunning}
            >
              Auto-Visualize
            </button>
          </div>
        </div>

        {/* Bar Chart Container */}
        <div className="bars-chart-container">
          {values.map((val, idx) => {
            const isComparing = (idx === comparingIdx || idx === comparingIdx + 1) && !isSorted(values);
            const isDone = sortedIndices.has(idx) || isSorted(values);
            const barHeight = Math.max(30, val * 18);

            return (
              <div
                key={idx}
                className={`bar-column ${isComparing ? 'comparing' : ''} ${isDone ? 'sorted' : ''}`}
              >
                <div
                  className="bar-pillar"
                  style={{ height: `${barHeight}px` }}
                >
                  <span>{val}</span>
                </div>
                <div className="bar-index-label">[{idx}]</div>
              </div>
            );
          })}
        </div>

        {/* Comparison Details Banner */}
        {!isSorted(values) && (
          <div style={{
            textAlign: 'center',
            fontSize: '0.85rem',
            background: 'var(--bg-subtle)',
            padding: '0.65rem',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-subtle)'
          }}>
            Comparing: <strong>arr[{comparingIdx}] = {currentLeft}</strong> and{' '}
            <strong>arr[{comparingIdx + 1}] = {currentRight}</strong>. Should they swap?
          </div>
        )}

        {/* Statistics Bar */}
        <div className="sort-stats-strip">
          <div className="stat-card">
            <div className="stat-label">Pass #</div>
            <div className="stat-value">{pass}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Comparisons</div>
            <div className="stat-value">{comparisons}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Swaps Made</div>
            <div className="stat-value">{swaps}</div>
          </div>
        </div>

        {/* Status Box */}
        <div className={`status-box ${status.type === 'success' ? 'success' : status.type === 'error' ? 'error' : ''}`}>
          {status.type === 'success' && <CheckCircle2 size={18} />}
          {status.type === 'error' && <AlertCircle size={18} />}
          <span>{status.msg}</span>
        </div>
      </div>

      {/* Right Column: Actions & Presets */}
      <div className="game-side-card">
        <div className="card-header-row">
          <h4 className="card-title">Sorting Controls</h4>
          <Layers3 size={18} color="var(--violet-solid)" />
        </div>

        {/* Interactive Mode Action Buttons */}
        {mode === 'challenge' ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <button
              className="btn btn-primary"
              onClick={() => handleUserChoice(true)}
              disabled={isSorted(values)}
              style={{ padding: '0.75rem' }}
            >
              <ArrowLeftRight size={16} />
              <span>Swap Values ({currentLeft} &gt; {currentRight})</span>
            </button>

            <button
              className="btn btn-secondary"
              onClick={() => handleUserChoice(false)}
              disabled={isSorted(values)}
              style={{ padding: '0.75rem' }}
            >
              <CheckCircle2 size={16} />
              <span>Keep As Is ({currentLeft} &le; {currentRight})</span>
            </button>
          </div>
        ) : (
          /* Auto Mode Controls */
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <button
              className="btn btn-primary"
              onClick={handleAutoRun}
              disabled={autoRunning || isSorted(values)}
            >
              <Play size={15} />
              <span>{autoRunning ? 'Sorting...' : 'Play Bubble Sort'}</span>
            </button>
          </div>
        )}

        {/* Array Presets & Randomizer */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.5rem' }}>
          <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)' }}>
            CHOOSE ARRAY PRESET
          </span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {PRESETS.map((p) => (
              <button
                key={p.id}
                className="btn btn-sm btn-outline"
                onClick={() => handleReset(p.arr)}
                disabled={autoRunning}
                style={{ justifyContent: 'flex-start' }}
              >
                {p.label}
              </button>
            ))}
            <button
              className="btn btn-sm btn-secondary"
              onClick={handleRandomize}
              disabled={autoRunning}
            >
              <Shuffle size={14} />
              <span>Randomize Array</span>
            </button>
          </div>
        </div>

        {/* Complexity Card */}
        <div style={{
          background: 'var(--bg-subtle)',
          borderRadius: 'var(--radius-md)',
          padding: '0.85rem',
          fontSize: '0.78rem',
          lineHeight: 1.5,
          color: 'var(--text-body)',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.25rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 700, color: 'var(--text-main)' }}>
            <Info size={14} color="var(--indigo-solid)" />
            <span>Complexity Note</span>
          </div>
          <div><strong>Worst & Average Case:</strong> O(n²) comparisons.</div>
          <div><strong>Best Case (Sorted):</strong> O(n) with swap flag.</div>
        </div>

        {/* Reset */}
        <button
          className="btn btn-outline"
          onClick={() => handleReset()}
          disabled={autoRunning}
        >
          <RotateCcw size={15} />
          <span>Reset Default</span>
        </button>
      </div>
    </div>
  );
}
