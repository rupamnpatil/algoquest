# AlgoQuest — The Logic Labyrinth
> **Learn Programming Logic, Algorithms, and Data Structures Through Interactive Games**

---

## 🌟 Overview

**AlgoQuest** is a browser-based, offline-friendly educational game designed to teach essential computer science concepts through hands-on challenges. From building basic sequential instructions to exploring graph networks with Breadth-First Search, AlgoQuest transforms abstract programming principles into tangible, interactive puzzles.

### Highlights
- **100% Offline & Private:** Runs entirely client-side. No sign-up, no personal data collection, zero ads, and zero server costs.
- **Dual Visual Themes:** Seamlessly switch between **Classroom Light Mode** (crisp, high-contrast, ideal for daytime study and projector screens) and **Focus Dark Mode**.
- **Synthesized Audio Feedback:** Features native Web Audio sound effects (robot movement steps, crystal chimes, sorting swaps, victory fanfares) synthesized in real time with zero external audio assets.
- **Interactive Certificate of Completion:** Players can personalize their name and generate a verified, printable Quest Certificate when they conquer the challenges.
- **Production-Ready & Deployable:** Fully configured for 1-click deployment on Vercel, Netlify, GitHub Pages, or running locally from a USB drive.

---

## 🎮 Game Modules & Curriculum

| Level | Module | Challenge | Core Computer Science Concept |
|:---:|---|---|---|
| **01** | **Sequence Swamp** | Program robot movement across 3 progressive 5×5 grid mazes, collecting crystals and avoiding walls. Includes a line-by-line debugger and Python code preview. | Sequential execution, spatial problem deconstruction, syntax-free debugging. |
| **02** | **Loop Lair** | Configure `for i in range(n)` iterations across linear bridges, compound loops (`move` + `recharge`), and 2D geometric staircases. Inspect live iteration variable `i`. | Iteration, for-loops, DRY (Don't Repeat Yourself) principle, zero-based counting. |
| **03** | **Conditional Cavern** | Construct `IF / ELIF / ELSE` decision logic connected to a live radar beam that evaluates hazards (lava pits, energy cells, clear paths) across multiple courses. | Boolean logic, conditional branching, decision trees, generalizable algorithms. |
| **04** | **Array Armory** | Interactive bar chart visualizer. Act as the CPU to compare adjacent pairs (`arr[j]` vs `arr[j+1]`) and decide Swap or Keep, or watch auto-sort visualize elements bubbling up to sorted positions. | Array indexing, adjacent pairwise comparison, Bubble Sort, Time Complexity $O(n^2)$. |
| **05** | **Pathfinding Peak** | Step through or auto-solve Breadth-First Search on an interactive 7×7 graph grid. Click cells to place custom walls, inspect the live FIFO Queue, and visualize the guaranteed shortest path. | Graph modeling, FIFO Queue (`pop(0)`), visited sets, shortest-path optimality. |

---

## 🚀 Running Locally

### Prerequisites
- Node.js LTS (v18 or v20+)
- npm (bundled with Node.js)

### Quick Start
```bash
# 1. Open the project folder
cd algoquest

# 2. Install dependencies (runs only once)
npm install

# 3. Start local development server
npm run dev
```
Open the local address printed by Vite (typically `http://localhost:5173`).

---

## 🌐 Deploying to Production (Free)

The application is completely static and ready for instant deployment:

### Option A: Vercel (1-Click Deployment)
1. Push your repository to GitHub.
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Select your repository. Vite will be detected automatically. Click **Deploy**!
*(A `vercel.json` file is included for route handling).*

### Option B: GitHub Pages (Automated via Actions)
1. Push your repository to GitHub on branch `main`.
2. In your GitHub repository, navigate to **Settings → Pages → Source** and choose **GitHub Actions**.
3. The included workflow `.github/workflows/deploy.yml` will automatically build and publish your site.

### Option C: Netlify / Cloudflare Pages
1. Run `npm run build`.
2. Drag and drop the generated `dist/` folder into Netlify Drop or connect your repository.
*(The included `public/_redirects` file ensures correct static routing).*

### Option D: Offline USB Drive Distribution
1. Run `npm run build`.
2. Copy the `dist/` folder onto any USB drive or computer.
3. Open `dist/index.html` in Chrome, Edge, or Firefox—no internet connection or Node.js required!

---

## 🛠️ Project Architecture

```
algoquest/
├── .github/workflows/deploy.yml   # GitHub Actions automated deployment
├── public/
│   └── _redirects                 # Static SPA routing redirects
├── src/
│   ├── components/
│   │   ├── BadgeModal.jsx         # Level completion celebratory modal
│   │   ├── CertificateModal.jsx   # Printable Quest Certificate of Completion
│   │   ├── FacilitatorGuideModal.jsx # Curriculum notes & practice worksheet
│   │   ├── Footer.jsx             # Clean product footer
│   │   ├── Navbar.jsx             # Sticky topbar with audio, theme & player badge
│   │   └── Sidebar.jsx            # Curriculum navigation with progress badges
│   ├── levels/
│   │   ├── HomeScreen.jsx         # Hero, syllabus overview and progress dashboard
│   │   ├── SequenceGame.jsx       # Level 1: 5x5 maze, debugger & D-pad
│   │   ├── LoopGame.jsx           # Level 2: Loop tracker, compound bodies & 2D stairs
│   │   ├── ConditionalGame.jsx    # Level 3: Radar sensor, multi-branch logic tree
│   │   ├── SortGame.jsx           # Level 4: Interactive Bubble Sort bar visualizer
│   │   └── BFSGame.jsx            # Level 5: 7x7 graph grid, FIFO queue & pathfinder
│   ├── styles/
│   │   ├── certificate.css        # Certificate & print styling
│   │   ├── components.css         # Buttons, cards, modals, layout & responsive
│   │   ├── levels.css             # Grid worlds, robot avatar, bars & queue flow
│   │   └── theme.css              # Design tokens, classroom light & dark themes
│   ├── utils/
│   │   ├── levelsData.js          # Curriculum metadata & theory notes
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

## 📜 License

This project is licensed under the MIT License — free for educational, personal, and commercial learning use.
