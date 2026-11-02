# AlgoQuest — Project Implementation & CEP Notes

## 🏛️ Project Link to Mumbai University CEP

- **University:** University of Mumbai
- **Course Mandate:** Community Engagement Project (CEP)
- **Activity Title:** Coding through Games and Interactive Activities
- **Software Deliverable:** AlgoQuest — The Logic Labyrinth
- **Target Audience:** School Students (Grades 6–10), Municipal / NGO Workshops, First-time Coders
- **Core Pedagogical Aim:** Foster computational thinking, algorithmic decomposition, iteration, conditional branching, sorting analysis, and graph exploration through tactile, visual puzzles.

---

## 🧩 Implemented Game Modules & Pedagogical Matrix

| Level | Module | Student Task | Concept Demonstrated | Pedagogical Outcome |
|:---:|---|---|---|---|
| **01** | **Sequence Swamp** | Program robot movement across 3 progressive 5×5 grid mazes, collecting crystals and navigating around walls. Uses step-by-step debugger and Python code toggle. | Algorithms, execution sequence, debugging | Deconstruct problems into ordered sub-steps; predict and debug path errors. |
| **02** | **Loop Lair** | Configure `for i in range(n)` iterations across linear bridges, compound loops (`move` + `recharge`), and 2D geometric staircases. Inspect live index counter `i`. | `for` loops, iteration counter, DRY principle | Eliminate duplicate code; understand zero-based `range(n)` counting. |
| **03** | **Conditional Cavern** | Construct `IF / ELIF / ELSE` decision logic connected to a live radar beam that evaluates hazards (lava, energy cells, clear terrain) across multiple courses. | Boolean conditions, branching, decision trees | Build robust, generalizable logic that handles dynamic environmental conditions. |
| **04** | **Array Armory** | Interactive vertical bar visualizer. Compare adjacent pairs (`arr[j]` vs `arr[j+1]`) and choose Swap or Keep, or observe auto-sort visualizer. | Arrays, zero-indexing, Bubble Sort, $O(n^2)$ | Understand pairwise comparisons, adjacent swapping, and pass invariants. |
| **05** | **Pathfinding Peak** | Step through Breadth-First Search on an interactive 7×7 grid. Place custom barrier walls, inspect the FIFO Queue flow, and observe the reconstructed shortest path. | Graph modeling, FIFO Queue, Breadth-First Search | Comprehend equidistant frontier expansion and shortest-path guarantee in unweighted graphs. |

---

## 🔒 Privacy & Zero-Cost Architecture

1. **Pure Client-Side Execution:** The application executes entirely within the student's browser. No data leaves the device.
2. **Local Storage:** Only the student's chosen display name and list of completed level IDs are cached locally.
3. **Zero Cost & Free Hosting:**
   - Client bundle is static HTML/JS/CSS.
   - Deployable at zero cost on GitHub Pages (automated workflow included) or Vercel.
   - Built-in Web Audio API synthesizes all sound effects natively without loading any audio files or third-party audio libraries.

---

## 📋 Comprehensive Testing Checklist

Execute these checks on the workshop laptop / classroom projector before the community demonstration:

- [x] **Curriculum Overview:** Home screen renders all 5 curriculum modules with progress percentage.
- [x] **Theme & Display:** Classroom Light mode delivers high contrast for bright projector screens; Focus Dark mode works smoothly.
- [x] **Audio Synthesizer:** Sound effects (move blip, gem chime, swap whoosh, victory fanfare) play clearly and can be toggled via the mute button.
- [x] **Level 1 (Sequence Swamp):** Commands can be added, deleted individually, and cleared. Wall collisions and bounds errors trigger explanatory debug messages. Reaching the goal with all crystals triggers stage progression.
- [x] **Level 2 (Loop Lair):** Changing repeat count updates the loop code statement. Stepping through updates the live variable tracker `i = 0, 1, 2...` and validates exact target distance.
- [x] **Level 3 (Conditional Cavern):** Radar sensor highlights the tile ahead. Matching branches (`IF`, `ELIF`, `ELSE`) illuminate in real time. Handles both Course Alpha and Course Beta.
- [x] **Level 4 (Array Armory):** Bar chart visually reflects numerical heights. Interactive Swap/Keep validates correct comparisons and counts swaps. Auto-sort visualizes bubbling elements to sorted state.
- [x] **Level 5 (Pathfinding Peak):** Cells toggle walls on click. FIFO queue displays front and back nodes. BFS exploration discovers neighbors and draws shortest path trail.
- [x] **Certificate Generation:** Certificate modal personalizes student name, displays earned badges, and prints cleanly to an A4 sheet with `@media print`.
- [x] **Facilitator Portal:** "Unlock All Levels" shortcut unlocks all modules for quick examiner demonstration during viva; "Reset All" clears state for new classes.

---

## 📑 Evidence to Collect for Mumbai University CEP Report

Following your community workshop session, record these details for your official CEP report:

1. **Partner School / NGO Details:** Name of school, principal/coordinator permission letter, address, and date of session.
2. **Participant Demographics:** Number of participating students, age group, grade level, and gender ratio.
3. **Session Attendance Record:** Signed participant sheet (with appropriate child safeguarding compliance).
4. **Photographic Evidence:** Geo-tagged photos of student interactions, team conducting the demo, and certificate distribution.
5. **Pre- and Post-Activity Evaluation:** Student quiz results (using the printable worksheet from the Facilitator Portal).
6. **Facilitator & Teacher Feedback:** Qualitative testimonial from the host school's computer teacher or NGO leader.
