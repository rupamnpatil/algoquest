import {
  Route,
  RotateCcw,
  GitBranch,
  Layers3,
  Compass,
} from 'lucide-react';

export const LEVELS = [
  {
    id: 1,
    title: 'Sequence Swamp',
    subtitle: 'Algorithms & Sequence Ordering',
    tag: 'BEGINNER',
    icon: Route,
    color: 'emerald',
    concept: 'Sequence & Debugging',
    time: '5–8 min',
    badge: 'Algorithm Pioneer',
    badgeDesc: 'Mastered command order and step-by-step program execution.',
    learningObjectives: [
      'Understand how programs execute sequentially from top to bottom.',
      'Deconstruct a complex movement problem into discrete, ordered steps.',
      'Identify and debug bugs when the robot encounters unexpected barriers.'
    ],
    theory: {
      summary: 'A computer cannot guess intent; it strictly executes instructions in the exact chronological sequence provided.',
      pythonSample: `# Robot Sequential Navigation\nstep_forward()\nturn_right()\nstep_forward()\npick_gem()`,
      takeaway: 'Order matters: doing the right instruction at the wrong time results in an algorithm failure!'
    }
  },
  {
    id: 2,
    title: 'Loop Lair',
    subtitle: 'Loops & Iterative Efficiency',
    tag: 'BEGINNER',
    icon: RotateCcw,
    color: 'indigo',
    concept: 'For Loops & DRY Principle',
    time: '5–8 min',
    badge: 'Loop Specialist',
    badgeDesc: 'Mastered repetitive iteration without duplicate code.',
    learningObjectives: [
      'Eliminate repetitive code using "for" loops and counting iterators.',
      'Understand the DRY (Don\'t Repeat Yourself) principle of engineering.',
      'Learn how zero-based ranges like range(n) produce n total cycles.'
    ],
    theory: {
      summary: 'Loops allow a programmer to write an instruction once and execute it dozens, hundreds, or millions of times.',
      pythonSample: `# Repetition with range()\nfor step in range(5):\n    move_forward()\n    collect_energy()`,
      takeaway: 'Using a loop reduces 100 lines of repetitive instructions into just 2 lines.'
    }
  },
  {
    id: 3,
    title: 'Conditional Cavern',
    subtitle: 'Branching Decisions & If/Else',
    tag: 'BEGINNER+',
    icon: GitBranch,
    color: 'amber',
    concept: 'Conditionals & Boolean Logic',
    time: '7–10 min',
    badge: 'Logic Sentinel',
    badgeDesc: 'Created dynamic decision-making logic for unpredictable hazards.',
    learningObjectives: [
      'Understand boolean logic and environmental evaluation.',
      'Construct IF, ELIF, and ELSE decision trees to handle diverse situations.',
      'Verify that a generalized algorithm solves multiple randomized courses.'
    ],
    theory: {
      summary: 'Conditional statements allow programs to make decisions in real time by testing true/false statements.',
      pythonSample: `# Conditional Decision Tree\nif sensor == "lava":\n    jump_over_hazard()\nelif sensor == "gem":\n    collect_item()\nelse:\n    step_forward()`,
      takeaway: 'Conditionals give programs autonomy to respond intelligently to changing inputs.'
    }
  },
  {
    id: 4,
    title: 'Array Armory',
    subtitle: 'Arrays, Zero-Indexing & Bubble Sort',
    tag: 'INTERMEDIATE',
    icon: Layers3,
    color: 'violet',
    concept: 'Arrays & Sorting Algorithms',
    time: '8–12 min',
    badge: 'Sorting Sorcerer',
    badgeDesc: 'Executed adjacent comparisons and bubble sorting mechanics.',
    learningObjectives: [
      'Understand array data structures and zero-based index positions (0, 1, 2, ...).',
      'Execute adjacent pairwise comparisons and value swaps.',
      'Observe why Bubble Sort has an average time complexity of O(n²).'
    ],
    theory: {
      summary: 'An array stores an ordered list of elements. Bubble Sort repeatedly steps through the list, comparing adjacent items and swapping them if they are out of order.',
      pythonSample: `# Bubble Sort Algorithm\nfor i in range(len(arr)):\n    for j in range(0, len(arr) - i - 1):\n        if arr[j] > arr[j + 1]:\n            arr[j], arr[j + 1] = arr[j + 1], arr[j]`,
      takeaway: 'With each full pass, the largest remaining element "bubbles up" to its correct final position.'
    }
  },
  {
    id: 5,
    title: 'Pathfinding Peak',
    subtitle: 'Graphs, Queues & Breadth-First Search',
    tag: 'INTERMEDIATE',
    icon: Compass,
    color: 'rose',
    concept: 'Graph Traversal & BFS',
    time: '8–12 min',
    badge: 'Pathfinding Master',
    badgeDesc: 'Mastered FIFO queue mechanics and shortest-path graph search.',
    learningObjectives: [
      'Model 2D grid environments as mathematical graphs of nodes and edges.',
      'Implement a FIFO (First In, First Out) Queue for systematic search.',
      'Understand why BFS mathematically guarantees the shortest path in unweighted networks.'
    ],
    theory: {
      summary: 'Breadth-First Search (BFS) explores all neighbors at the present depth level before moving on to nodes at the next depth level.',
      pythonSample: `# Breadth-First Search with FIFO Queue\nqueue = [start]\nvisited = {start}\nwhile queue:\n    node = queue.pop(0)  # FIFO\n    for neighbor in get_neighbors(node):\n        if neighbor not in visited:\n            visited.add(neighbor)\n            queue.append(neighbor)`,
      takeaway: 'BFS spreads like an expanding ripple, ensuring that the first time the destination is reached, the path taken is optimal!'
    }
  }
];

export const CEP_INFO = {
  courseName: 'Community Engagement Project (CEP)',
  university: 'University of Mumbai',
  projectTitle: 'AlgoQuest: Interactive Computational Thinking & Logic Labyrinth',
  theme: 'Coding through Games & Hands-on Activities',
  targetAudience: 'School Students (Grades 6–10) & Beginner Coders',
  pedagogy: 'Experiential Learning & Visual Gamification (NEP 2020)',
  offlineCommitment: '100% Client-Side, Zero External Dependencies, Zero Cost',
  collegePlaceholder: 'Mumbai University Affiliated Engineering College',
  academicYear: 'Academic Year 2026–2027'
};
