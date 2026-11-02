import React, { useState, useEffect, useRef } from 'react';
import {
  Compass,
  Play,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  StepForward,
  Info,
  Trophy,
  Sliders,
  MapPin
} from 'lucide-react';
import { sound } from '../utils/sound';

const GRID_SIZE = 7;
const START_NODE = { r: 0, c: 0 };
const GOAL_NODE = { r: 6, c: 6 };

const DEFAULT_WALLS = [
  '0,3', '1,1', '1,3', '1,5', '2,5', '3,1', '3,2', '3,5', '4,3', '5,3', '5,5', '6,1'
];

const PRESETS = [
  { id: 'maze', name: 'Labyrinth', walls: DEFAULT_WALLS },
  { id: 'open', name: 'Open Field', walls: ['2,2', '2,4', '4,2', '4,4'] },
  { id: 'choke', name: 'Choke Points', walls: ['0,2', '1,2', '2,2', '4,4', '5,4', '6,4'] }
];

export default function BFSGame({ onComplete }) {
  const [walls, setWalls] = useState(new Set(DEFAULT_WALLS));
  const [queue, setQueue] = useState([START_NODE]);
  const [visited, setVisited] = useState(new Set(['0,0']));
  const [parentMap, setParentMap] = useState({ '0,0': null });
  const [currentNode, setCurrentNode] = useState(null);
  const [shortestPath, setShortestPath] = useState([]);
  const [isFinished, setIsFinished] = useState(false);
  const [expandedCount, setExpandedCount] = useState(0);
  const [autoRunning, setAutoRunning] = useState(false);
  const [status, setStatus] = useState({
    type: 'info',
    msg: 'Press "Step BFS" to dequeue and explore neighbors level-by-level.'
  });

  const autoRef = useRef(false);

  useEffect(() => {
    handleReset(walls);
  }, []);

  const keyOf = (r, c) => `${r},${c}`;

  const handleReset = (wallsToUse = walls) => {
    autoRef.current = false;
    setAutoRunning(false);
    setQueue([START_NODE]);
    setVisited(new Set(['0,0']));
    setParentMap({ '0,0': null });
    setCurrentNode(null);
    setShortestPath([]);
    setIsFinished(false);
    setExpandedCount(0);
    setStatus({
      type: 'info',
      msg: 'Press "Step BFS" to dequeue and explore neighbors level-by-level.'
    });
    sound.play('click');
  };

  const toggleWall = (r, c) => {
    if (autoRunning || isFinished) return;
    const k = keyOf(r, c);
    if (k === '0,0' || k === '6,6') return; // Cannot block start or goal

    const nextWalls = new Set(walls);
    if (nextWalls.has(k)) {
      nextWalls.delete(k);
    } else {
      nextWalls.add(k);
    }
    setWalls(nextWalls);
    sound.play('click');
    handleReset(nextWalls);
  };

  const getValidNeighbors = (node, curWalls, curVisited) => {
    const deltas = [
      [-1, 0], // Up
      [0, 1],  // Right
      [1, 0],  // Down
      [0, -1]  // Left
    ];

    const result = [];
    for (const [dr, dc] of deltas) {
      const nr = node.r + dr;
      const nc = node.c + dc;
      const k = keyOf(nr, nc);

      if (
        nr >= 0 &&
        nc >= 0 &&
        nr < GRID_SIZE &&
        nc < GRID_SIZE &&
        !curWalls.has(k) &&
        !curVisited.has(k)
      ) {
        result.push({ r: nr, c: nc });
      }
    }
    return result;
  };

  const reconstructPath = (parentRecord, goalKey) => {
    const path = [];
    let cur = goalKey;
    while (cur) {
      const [r, c] = cur.split(',').map(Number);
      path.unshift({ r, c });
      cur = parentRecord[cur];
    }
    return path;
  };

  // Perform single BFS exploration step
  const handleStepBFS = () => {
    if (isFinished || queue.length === 0) return;

    const [node, ...restQueue] = queue;
    const k = keyOf(node.r, node.c);
    setCurrentNode(node);

    // Check if goal reached
    if (node.r === GOAL_NODE.r && node.c === GOAL_NODE.c) {
      const path = reconstructPath(parentMap, k);
      setShortestPath(path);
      setIsFinished(true);
      sound.play('success');
      setStatus({
        type: 'success',
        msg: `Goal Reached! BFS discovered optimal shortest path of ${path.length - 1} moves!`
      });
      onComplete();
      return true;
    }

    // Expand neighbors
    const neighbors = getValidNeighbors(node, walls, visited);
    const nextVisited = new Set(visited);
    const nextParents = { ...parentMap };
    const additions = [];

    for (const n of neighbors) {
      const nk = keyOf(n.r, n.c);
      nextVisited.add(nk);
      nextParents[nk] = k;
      additions.push(n);
    }

    const nextQ = [...restQueue, ...additions];
    setVisited(nextVisited);
    setParentMap(nextParents);
    setQueue(nextQ);
    setExpandedCount((prev) => prev + 1);
    sound.play('step');

    // Check if goal was just queued
    const goalFound = additions.find((n) => n.r === GOAL_NODE.r && n.c === GOAL_NODE.c);
    if (goalFound) {
      const path = reconstructPath(nextParents, keyOf(GOAL_NODE.r, GOAL_NODE.c));
      setShortestPath(path);
      setIsFinished(true);
      sound.play('success');
      setStatus({
        type: 'success',
        msg: `Target Found! Optimal path confirmed with length ${path.length - 1}.`
      });
      onComplete();
      return true;
    }

    setStatus({
      type: 'info',
      msg: `Dequeued (${node.r}, ${node.c}). Added ${additions.length} new neighbors to the back of the queue.`
    });
    return false;
  };

  // Auto solver loop
  const handleAutoSolve = async () => {
    if (autoRunning || isFinished) return;
    autoRef.current = true;
    setAutoRunning(true);

    let curQ = [...queue];
    let curVis = new Set(visited);
    let curParents = { ...parentMap };
    let expCount = expandedCount;

    while (curQ.length > 0 && autoRef.current) {
      const node = curQ.shift();
      const k = keyOf(node.r, node.c);
      setCurrentNode(node);
      expCount += 1;
      setExpandedCount(expCount);

      if (node.r === GOAL_NODE.r && node.c === GOAL_NODE.c) {
        const path = reconstructPath(curParents, k);
        setShortestPath(path);
        setIsFinished(true);
        sound.play('success');
        setStatus({
          type: 'success',
          msg: `Goal Found! BFS found shortest route of ${path.length - 1} steps.`
        });
        onComplete();
        break;
      }

      const neighbors = getValidNeighbors(node, walls, curVis);
      const additions = [];
      for (const n of neighbors) {
        const nk = keyOf(n.r, n.c);
        curVis.add(nk);
        curParents[nk] = k;
        additions.push(n);
      }

      curQ = [...curQ, ...additions];
      setVisited(new Set(curVis));
      setParentMap({ ...curParents });
      setQueue([...curQ]);
      sound.play('step');

      const foundGoal = additions.find((n) => n.r === GOAL_NODE.r && n.c === GOAL_NODE.c);
      if (foundGoal) {
        const path = reconstructPath(curParents, keyOf(GOAL_NODE.r, GOAL_NODE.c));
        setShortestPath(path);
        setIsFinished(true);
        sound.play('success');
        setStatus({
          type: 'success',
          msg: `Goal Found! BFS shortest route verified with ${path.length - 1} moves.`
        });
        onComplete();
        break;
      }

      await new Promise((r) => setTimeout(r, 220));
    }

    setAutoRunning(false);
    autoRef.current = false;
  };

  const pathKeys = new Set(shortestPath.map((p) => keyOf(p.r, p.c)));
  const queueKeys = new Set(queue.map((q) => keyOf(q.r, q.c)));

  return (
    <div className="game-workspace-grid">
      {/* Left Column: 7x7 Graph Board */}
      <div className="game-main-card">
        <div className="card-header-row">
          <div>
            <h3 className="card-title">7 × 7 Graph Traversal Grid</h3>
            <span className="card-subtitle">Click any open cell to toggle walls!</span>
          </div>

          {/* Preset Selector */}
          <div className="stage-selector-bar" style={{ margin: 0 }}>
            {PRESETS.map((p) => (
              <button
                key={p.id}
                className="stage-btn"
                onClick={() => {
                  const s = new Set(p.walls);
                  setWalls(s);
                  handleReset(s);
                }}
                disabled={autoRunning}
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>

        {/* 7x7 Board */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div className="bfs-board-grid">
            {Array.from({ length: GRID_SIZE * GRID_SIZE }, (_, idx) => {
              const r = Math.floor(idx / GRID_SIZE);
              const c = idx % GRID_SIZE;
              const k = keyOf(r, c);

              const isStart = r === START_NODE.r && c === START_NODE.c;
              const isGoal = r === GOAL_NODE.r && c === GOAL_NODE.c;
              const isWall = walls.has(k);
              const isPath = pathKeys.has(k);
              const isFrontier = queueKeys.has(k) && !isPath;
              const isVisited = visited.has(k) && !isPath && !isFrontier;
              const isCurrent = currentNode && currentNode.r === r && currentNode.c === c;

              return (
                <div
                  key={k}
                  className={`bfs-cell ${
                    isWall
                      ? 'wall'
                      : isPath
                      ? 'path'
                      : isCurrent
                      ? 'frontier'
                      : isFrontier
                      ? 'frontier'
                      : isVisited
                      ? 'visited'
                      : isStart
                      ? 'start'
                      : isGoal
                      ? 'goal'
                      : ''
                  }`}
                  onClick={() => toggleWall(r, c)}
                  title={`Cell (${r}, ${c})`}
                >
                  {isStart ? 'S' : isGoal ? '🏁' : isPath ? '●' : isWall ? '' : ''}
                </div>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '12px',
          fontSize: '0.75rem',
          color: 'var(--text-muted)',
          flexWrap: 'wrap'
        }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ width: '10px', height: '10px', background: 'var(--indigo-solid)', borderRadius: '2px' }} /> Start (S)
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ width: '10px', height: '10px', background: 'var(--rose-solid)', borderRadius: '2px' }} /> Goal (G)
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ width: '10px', height: '10px', background: 'var(--text-muted)', borderRadius: '2px' }} /> Barrier Wall
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ width: '10px', height: '10px', background: '#93c5fd', borderRadius: '2px' }} /> Visited
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ width: '10px', height: '10px', background: 'var(--emerald-solid)', borderRadius: '2px' }} /> Shortest Path
          </span>
        </div>

        {/* Status Box */}
        <div className={`status-box ${status.type === 'success' ? 'success' : status.type === 'error' ? 'error' : ''}`}>
          {status.type === 'success' && <CheckCircle2 size={18} />}
          {status.type === 'error' && <AlertCircle size={18} />}
          <span>{status.msg}</span>
        </div>
      </div>

      {/* Right Column: FIFO Queue & Controls */}
      <div className="game-side-card">
        <div className="card-header-row">
          <h4 className="card-title">FIFO Queue Data Structure</h4>
          <Compass size={18} color="var(--rose-solid)" />
        </div>

        {/* Queue Display Box */}
        <div className="queue-display-box">
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)' }}>
            <span>FRONT (Dequeues First)</span>
            <span>BACK (Enqueues Here)</span>
          </div>

          <div className="queue-items-flow">
            {queue.length === 0 ? (
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Queue is empty</span>
            ) : (
              queue.slice(0, 7).map((item, idx) => (
                <div key={idx} className={`queue-item-pill ${idx === 0 ? 'front' : ''}`}>
                  ({item.r},{item.c})
                </div>
              ))
            )}
            {queue.length > 7 && (
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>+{queue.length - 7} more</span>
            )}
          </div>
        </div>

        {/* Live Metrics */}
        <div className="sort-stats-strip" style={{ marginTop: '0' }}>
          <div className="stat-card">
            <div className="stat-label">Nodes Expanded</div>
            <div className="stat-value">{expandedCount}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Discovered</div>
            <div className="stat-value">{visited.size}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Path Length</div>
            <div className="stat-value">{shortestPath.length ? shortestPath.length - 1 : '--'}</div>
          </div>
        </div>

        {/* Playback Actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
          <button
            className="btn btn-primary"
            onClick={handleStepBFS}
            disabled={autoRunning || isFinished || queue.length === 0}
          >
            <StepForward size={16} />
            <span>Step Next Node</span>
          </button>

          <button
            className="btn btn-secondary"
            onClick={handleAutoSolve}
            disabled={autoRunning || isFinished || queue.length === 0}
          >
            <Play size={15} />
            <span>{autoRunning ? 'Exploring...' : 'Auto Find Path'}</span>
          </button>

          <button
            className="btn btn-outline"
            onClick={() => handleReset()}
            disabled={autoRunning}
          >
            <RotateCcw size={15} />
            <span>Reset Search</span>
          </button>
        </div>

        {/* Theory Callout */}
        <div style={{
          background: 'var(--bg-subtle)',
          borderRadius: 'var(--radius-md)',
          padding: '0.85rem',
          fontSize: '0.78rem',
          lineHeight: 1.5,
          color: 'var(--text-body)'
        }}>
          <strong>BFS Invariant:</strong> Because BFS explores all nodes at distance <em>k</em> before distance <em>k+1</em>, 
          the first time the goal is popped from the FIFO queue, the path found is guaranteed to be minimal.
        </div>
      </div>
    </div>
  );
}
