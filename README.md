# AlgoQuest — The Logic Labyrinth
### Mumbai University Community Engagement Project (CEP)
**Course:** Community Engagement Project (CEP) · NEP 2020 Experiential Learning  
**Target:** School Students (Grades 6–10), NGO Workshops & Beginner Coders  
**Pedagogy:** Interactive Computational Thinking, Gamified Logic & Zero-Cost Architecture  

---

## 🌟 Overview

**AlgoQuest** is a modern, offline-first educational web application built specifically for Mumbai University's Community Engagement Project. It teaches essential programming logic, algorithmic sequence, iteration loops, conditionals, sorting algorithms (Bubble Sort), and graph traversal (Breadth-First Search) through interactive, gamified puzzles.

### Key Highlights
- **100% Offline-First & Zero-Cost:** Requires no internet connection during classroom sessions. Uses native browser Web Audio API for sound synthesis (zero external audio files). Zero external databases, paid APIs, or tracking scripts.
- **Realistic, Modern UI:** Clean, human-crafted design with both a bright **Classroom Light Mode** (high contrast, projector-friendly) and a soothing **Focus Dark Mode**.
- **Personalized Student Experience:** Students can enter their name, earn 5 distinct achievement badges, and generate an official **Printable Mumbai University CEP Certificate of Achievement**.
- **Facilitator & Viva Portal:** Built-in facilitation guide with syllabus alignment, printable student activity worksheets, and one-click viva demonstration controls.
- **Production-Ready & Deployable:** Configured with relative base paths for seamless zero-config deployment to Vercel, Netlify, GitHub Pages, or local offline USB drives.

---

## 🎮 Interactive Curriculum Modules

| Level | Module | Student Task | Core Pedagogical Concept |
|:---:|---|---|---|
| **01** | **Sequence Swamp** | Build, debug, and execute robot movement sequences on 5×5 grid worlds with wall obstacles and collectible crystals. Includes step-by-step debugger and Python code view. | Sequential execution, spatial problem deconstruction, syntax-free debugging. |
| **02** | **Loop Lair** | Configure `for i in range(n)` loops to cross bridges, repeat compound action blocks (`move` + `recharge`), and climb 2D geometric staircases. Features live iteration variable tracker `i`. | Iteration, loops, DRY (Don't Repeat Yourself) principle, zero-based counting. |
| **03** | **Conditional Cavern** | Construct `IF`, `ELIF`, and `ELSE` decision trees evaluated by a live radar sensor beam to navigate hazards (lava pits, energy cells, clear paths) across randomized courses. | Boolean logic, conditional branching, decision trees, generalizable algorithms. |
| **04** | **Array Armory** | Interactive bar chart visualizer. Act as the CPU to compare adjacent pairs (`arr[j]` vs `arr[j+1]`) and decide Swap or Keep, or watch auto-sort visualize elements bubbling up to sorted positions. | Array indexing, adjacent pairwise comparison, Bubble Sort, Time Complexity $O(n^2)$. |
| **05** | **Pathfinding Peak** | Step through or auto-solve Breadth-First Search on an interactive 7×7 graph grid. Click cells to place custom walls, inspect the live FIFO Queue, and visualize the guaranteed shortest path. | Graph modeling, FIFO Queue (`pop(0)`), visited sets, shortest-path optimality. |

---

## 🚀 Running Locally

### Prerequisites
- Node.js LTS (v18 or v20+)
- npm (comes with Node.js)

### Quick Start
```bash
# 1. Clone or extract the project folder
cd algoquest

# 2. Install dependencies (runs only once)
npm install

# 3. Start local development server
npm run dev
```
Open the local URL displayed in the terminal (usually `http://localhost:5173`).

---

## 🌐 Deploying to Production (Free)

The application is fully configured for deployment with zero backend requirements:

### Option A: 1-Click Deploy to Vercel (Recommended)
1. Push your repository to GitHub.
2. Go to [vercel.com](https://vercel.com) and click **"New Project"**.
3. Import your `algoquest` repository.
4. Framework Preset will auto-detect **Vite**. Click **Deploy**!
*(A `vercel.json` file is already included for automatic routing).*

### Option B: GitHub Pages (Automated via Actions)
1. Push your repository to GitHub on branch `main`.
2. Go to **Repository Settings → Pages → Source** and select **"GitHub Actions"**.
3. The included workflow `.github/workflows/deploy.yml` will automatically build and publish your site at `https://<your-username>.github.io/<repo-name>/`.

### Option C: Netlify / Cloudflare Pages
1. Run `npm run build`.
2. Drag and drop the generated `dist/` folder into Netlify Drop or connect your GitHub repository.
*(The included `public/_redirects` file ensures correct static SPA routing).*

### Option D: Offline USB Drive Distribution
1. Run `npm run build`.
2. Copy the `dist/` folder to any USB drive.
3. Because `vite.config.js` sets `base: './'`, opening `dist/index.html` in Chrome/Edge/Firefox works completely offline without needing Node.js on the school computer!

---

## 🎓 Mumbai University CEP Features

### 1. Printable Certificate of Completion
When students complete the challenges, they can click **Certificate** in the top navigation:
- Automatically formats student name, completion date, and verified level badges.
- Native `@media print` CSS ensures crisp, beautiful printing directly to an A4 landscape sheet or PDF export via the browser.

### 2. Facilitator Guide & Activity Worksheet
Click **CEP Guide** in the top bar to access:
- **Curriculum & Pedagogy Matrix:** Maps challenges to Bloom's taxonomy and NEP 2020 experiential learning goals.
- **Classroom Worksheet:** A printable pen-and-paper worksheet for students in schools with limited device access.
- **Viva Demo Shortcuts:** One-click "Unlock All Levels" button to immediately demonstrate any module to university examiners and faculty evaluators.

---

## 🛠️ Project Structure

```
algoquest/
├── .github/workflows/deploy.yml   # GitHub Actions automated Pages deployment
├── public/
│   └── _redirects                 # Static SPA routing redirects
├── src/
│   ├── components/
│   │   ├── BadgeModal.jsx         # Level completion celebratory modal
│   │   ├── CertificateModal.jsx   # Printable Mumbai University CEP Certificate
│   │   ├── FacilitatorGuideModal.jsx # Curriculum, worksheets, and viva controls
│   │   ├── Footer.jsx             # Official attribution and CEP notes
│   │   ├── Navbar.jsx             # Sticky topbar with audio, theme & student badge
│   │   └── Sidebar.jsx            # Curriculum navigation with progress badges
│   ├── levels/
│   │   ├── HomeScreen.jsx         # Hero, syllabus overview and progress dashboard
│   │   ├── SequenceGame.jsx       # Level 1: 5x5 maze, debugger & D-pad
│   │   ├── LoopGame.jsx           # Level 2: Loop tracker, compound bodies & 2D stairs
│   │   ├── ConditionalGame.jsx    # Level 3: Radar sensor, multi-branch logic tree
│   │   ├── SortGame.jsx           # Level 4: Interactive Bubble Sort bar visualizer
│   │   └── BFSGame.jsx            # Level 5: 7x7 graph grid, FIFO queue & pathfinder
│   ├── styles/
│   │   ├── certificate.css        # Official certificate & @media print styles
│   │   ├── components.css         # Buttons, cards, modals, layout & responsive
│   │   ├── levels.css             # Grid worlds, robot avatar, bars & queue flow
│   │   └── theme.css              # Design tokens, classroom light & dark themes
│   ├── utils/
│   │   ├── levelsData.js          # Curriculum metadata, syllabus & theory notes
│   │   └── sound.js               # Web Audio API synthesizer (100% offline)
│   ├── App.jsx                    # Root application controller
│   ├── main.jsx                   # React 18 entry point
│   └── styles.css                 # Master stylesheet importing modular styles
├── index.html                     # HTML5 shell with responsive metadata
├── package.json                   # Dependencies and build scripts
├── vercel.json                    # Vercel deployment configuration
├── vite.config.js                 # Vite bundler configuration with relative base
└── README.md                      # Comprehensive documentation
```

---

## 📜 Academic Attribution

- **Institution:** University of Mumbai
- **Project Scheme:** Community Engagement Project (CEP)
- **Developed for:** Academic Demonstration, School Engagement & Community Coding Workshops
- **License:** Open-source educational software (MIT)
