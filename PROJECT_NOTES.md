# AlgoQuest — Project Notes & Implementation Guide

## 🎯 Educational Goal

**AlgoQuest** introduces learners to computational logic, algorithmic reasoning, and fundamental Data Structures and Algorithms (DSA) through hands-on, gamified challenges.

---

## 🧩 Module Breakdown

| Level | Module | Player Action | Concept Demonstrated |
|:---:|---|---|---|
| **01** | **Sequence Swamp** | Arrange and execute directional commands to navigate a 5×5 grid maze, avoid walls, and collect power crystals. | Sequential algorithms, spatial decomposition, debugging. |
| **02** | **Loop Lair** | Configure a `for` loop repeat count to cross bridges, execute multi-action loop bodies, and scale 2D staircases. | Iteration, loops, DRY principle, loop invariants. |
| **03** | **Conditional Cavern** | Configure an IF / ELIF / ELSE decision tree coupled with a live sensor radar to handle variable hazards. | Boolean expressions, condition evaluation, decision trees. |
| **04** | **Array Armory** | Step through adjacent element comparisons on a vertical bar visualizer to execute Bubble Sort. | Arrays, zero-based indexing, pairwise comparison, sorting. |
| **05** | **Pathfinding Peak** | Step through or auto-solve Breadth-First Search on a 7×7 grid with custom wall placement and live FIFO queue inspection. | Graph modeling, FIFO queue mechanics, shortest path discovery. |

---

## 🔒 Data & Privacy Guarantee

- **Local Storage:** The game only persists the player's chosen name and array of completed level IDs in the browser's `localStorage`.
- **Zero Tracking:** No account, registration, login, external database, analytics service, or third-party tracking scripts.
- **Client-Side Synthesis:** All audio is synthesized via the browser's Web Audio API in real time—no external media files required.

---

## 📋 Quality Assurance Checklist

- [x] **Overview Screen:** Hero renders cleanly with responsive progress tracking and quick resume.
- [x] **Theme Switcher:** Light mode provides clean, high-contrast display; Dark mode provides comfortable nighttime playing.
- [x] **Level 1 (Sequence Swamp):** Commands can be individually deleted. Walls trigger friendly error messages. Goal with all crystals completes stage.
- [x] **Level 2 (Loop Lair):** Changing repeat count updates live code. Stepping through updates iteration counter `i = 0, 1, 2...` and validates distance.
- [x] **Level 3 (Conditional Cavern):** Sensor radar beam highlights upcoming obstacle. Matching decision branch illuminates in real time.
- [x] **Level 4 (Array Armory):** Bar heights accurately reflect values. Interactive Mode validates correct comparisons. Auto Mode visualizes sorting passes.
- [x] **Level 5 (Pathfinding Peak):** Cells toggle walls on click. FIFO queue visually pushes to back and pops from front. Shortest path is traced upon goal reach.
- [x] **Certificate of Completion:** Generates personalized Quest Certificate and prints cleanly on A4 paper via browser print.
