# 🌲 FOREST TYPE — Bioluminescent MERN Typing Practice Application

[![Stack](https://img.shields.io/badge/Stack-MERN-315F43?style=flat-square)](https://mongodb.com)
[![Frontend](https://img.shields.io/badge/Frontend-React%20%2B%20Vite-72A96B?style=flat-square)](https://vitejs.dev)
[![Backend](https://img.shields.io/badge/Backend-Node.js%20%2B%20Express-A8D8A0?style=flat-square)](https://expressjs.com)
[![License](https://img.shields.io/badge/License-MIT-D8D1A0?style=flat-square)](LICENSE)

A complete, production-ready, browser-based typing practice and training web application built using the **MERN stack** (MongoDB, Express, React, Node.js). 

The application features an original visual identity inspired by the dark, mysterious, bioluminescent ecosystem of an ancient forest (deep forest green `#07120E`, moss `#315F43`, pale luminous green `#A8D8A0`, warm amber highlights `#D8D1A0`, and subtle ambient Canvas spore particles). Zero copyrighted assets are used.

**No user registration or login is required.** Users can immediately launch the website and start practicing across 9 distinct game modes, track personal analytics stored in versioned browser `localStorage`, and submit verified high scores to a MongoDB Record Board guarded by server-side anti-cheat scoring rules and rate limiting.

---

## 🚀 Key Features

* **Zero-Latency Typing Engine**: High-frequency key handling using React `useRef` for transient metrics to prevent component re-rendering overhead on fast keystrokes up to 200+ WPM.
* **No Authentication Needed**: Instant start. Personal analytics persist in browser `localStorage`.
* **9 Practice Modes & Games**:
  1. **Word Trail (Classic Practice)**: Standard typing test with configurable duration (15s, 30s, 60s, 120s) and difficulty tiers.
  2. **Forest Rush (Speed Rush)**: 30-second rapid speed burst with streak-based score multipliers up to 4.0x.
  3. **Deep Cavern (Accuracy Mode)**: Strict scoring mode (+10 for correct, -20 for errors) with mistake caps.
  4. **Endless Grove**: Infinite typing stream with dynamic difficulty ramping (Easy 🌱 → Medium 🌿 → Hard 🌲 → Expert 🔮).
  5. **Spore Fall (Falling Spore Words)**: Descending bioluminescent spore word game with combo multipliers and lives.
  6. **Thorns (Word Survival)**: Zero-mistake survival mode where a single typo ends the run.
  7. **Precision Diagnostics**: Error reduction mode that tracks mistyped character frequencies and identifies weak key areas.
  8. **Pathfinder (Progressive Challenge)**: Level 1–5 adaptive progression from simple short words to numbers, punctuation, and code symbols.
  9. **Keyboard Runes (Keyboard Trainer)**: Interactive virtual keyboard for specific finger zones and row placement drills.
* **Standard International Metrics**:
  * $\text{WPM} = (\text{correct characters} / 5) / \text{elapsed minutes}$
  * $\text{Accuracy} = (\text{correct characters} / \text{total typed characters}) \times 100$
  * $\text{CPM} = \text{correct characters} / \text{elapsed minutes}$
  * $\text{Consistency} = \max(0, 100 \times (1 - \sigma_{\text{wpm}} / \bar{\text{wpm}}))$
* **Record Grove Leaderboard**: MongoDB Atlas high-score record board with server-side validation against unrealistic WPMs (>250), score anomalies, and IP rate limiting (10 submissions per 15 min).
* **Optional Web Audio API Synthesizer**: Pure JavaScript audio generator for subtle wood keystroke clicks, error thuds, and achievement chimes (default OFF, user toggleable).
* **Personal Analytics Dashboard**: Interactive WPM trend chart, session history log, weakest key diagnostic output, and local data reset.

---

## 🛠 Tech Stack

* **Frontend**: React 18, Vite, Lucide Icons, Recharts, HTML5 Canvas Ambient Particles, Vanilla CSS Design Tokens.
* **Backend**: Node.js, Express, Mongoose (MongoDB Atlas), Helmet, CORS, Express Rate Limit.
* **Database**: MongoDB Atlas (with graceful offline fallback).

---

## 📁 Project Structure

```text
/
├── package.json              # Root script orchestrator
├── README.md                 # Project documentation
├── .env.example              # Environment variables template
│
├── server/                   # Express backend API
│   ├── package.json
│   ├── server.js             # Express entrypoint & security middleware
│   ├── config/
│   │   └── db.js             # Mongoose connection with fallback safety
│   ├── models/
│   │   └── Record.js         # Leaderboard MongoDB schema
│   ├── controllers/
│   │   └── recordController.js # Get & Create record handlers
│   ├── routes/
│   │   └── recordRoutes.js   # Router endpoints
│   ├── middleware/
│   │   ├── antiCheat.js      # Server-side scoring validation
│   │   ├── rateLimiter.js    # Submission rate limiter
│   │   └── errorHandler.js   # Centralized error handler
│   └── utils/
│       └── validation.js     # Input sanitization
│
└── client/                   # Vite + React frontend
    ├── index.html
    ├── vite.config.js
    ├── package.json
    ├── public/
    │   └── favicon.svg       # Bioluminescent tree SVG icon
    └── src/
        ├── main.jsx
        ├── App.jsx
        ├── index.css         # Dark forest theme & design tokens
        ├── components/
        │   ├── layout/       # Navbar, Footer, AtmosphericCanvas
        │   ├── typing/       # TypingDisplay, StatsHeader, ResultCard
        │   ├── keyboard/     # VirtualKeyboard, FingerZoneGuide
        │   └── games/        # WordTrail, ForestRush, DeepCavern, EndlessGrove, SporeFall, Thorns, PrecisionChallenge, Pathfinder, KeyboardRunes
        ├── hooks/
        │   ├── useTypingEngine.js # Zero-latency typing hook
        │   ├── useTimer.js        # Millisecond timer hook
        │   ├── useAudio.js        # Web Audio API synthesizer
        │   └── useLocalStats.js   # Versioned localStorage manager
        ├── services/
        │   └── api.js        # Backend API service wrapper
        ├── utils/
        │   ├── scoring.js    # WPM/Accuracy/Consistency math
        │   └── storage.js    # Local storage versioning
        ├── data/
        │   ├── wordSets.js   # Categorized vocabulary pools
        │   ├── sentenceSets.js # Sentence & quote datasets
        │   └── keyboardMap.js # QWERTY layout & finger maps
        └── pages/
            ├── Home.jsx
            ├── Practice.jsx
            ├── Games.jsx
            ├── Records.jsx
            ├── Stats.jsx
            └── About.jsx
```

---

## ⚡ Local Setup & Development

### Prerequisites
* Node.js v18+ and npm installed.
* (Optional) MongoDB Atlas database connection URI.

### 1. Install Dependencies
Install root, client, and server dependencies concurrently:
```bash
npm run install:all
```

### 2. Configure Environment Variables
Create a `.env` file in the `server` directory (or use `.env.example`):
```env
PORT=5000
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/foresttype?retryWrites=true&w=majority
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

Create a `.env` file in the `client` directory:
```env
VITE_API_URL=http://localhost:5000/api
```

### 3. Run Development Servers
Start both Node backend and Vite frontend concurrently:
```bash
npm run dev
```
Open your browser at `http://localhost:5173`.

---

## 🔌 Backend API Endpoints

| Method | Endpoint | Description | Constraints & Security |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/records` | Fetch high score leaderboard | Query params: `?mode=all` & `?limit=50` |
| `GET` | `/api/records/:mode` | Fetch high scores for mode | Validates mode parameter |
| `POST` | `/api/records` | Submit new high score | Anti-cheat guard + Rate limited (10/15min) |
| `GET` | `/api/health` | System health check | Returns uptime & MongoDB status |

### Record Submission Anti-Cheat Rules
All submitted scores must satisfy:
1. `playerName`: String, 1–20 characters (HTML tags sanitized).
2. `wpm`: $0 \le \text{WPM} \le 260$.
3. `accuracy`: $0 \le \text{Accuracy} \le 100$.
4. `cpm`: Math ratio checked against WPM ($\approx \text{WPM} \times 5 \pm 30\%$).
5. `score`: Bounded by maximum theoretical threshold for session duration.

---

## 📝 How to Add New Typing Content

### Adding Words or Vocabulary
Edit `client/src/data/wordSets.js`:
```js
export const wordSets = {
  beginner: [...],
  intermediate: [...],
  customCategory: ['new', 'words', 'here'] // Add your custom array
};
```

### Adding Quotes or Sentences
Edit `client/src/data/sentenceSets.js`:
```js
export const sentenceSets = [
  "Your new practice sentence goes here.",
  ...
];
```

---

## 🌐 Production Deployment

### Frontend (Vercel / Netlify)
1. Set Build Command: `npm run build`
2. Output Directory: `dist`
3. Set Environment Variable: `VITE_API_URL=https://your-backend-api.onrender.com/api`

### Backend (Render / Railway)
1. Set Root Directory: `server`
2. Build Command: `npm install`
3. Start Command: `node server.js`
4. Set Environment Variables:
   * `MONGODB_URI`
   * `CLIENT_URL=https://your-frontend-app.vercel.app`
   * `NODE_ENV=production`

---

## 📄 License
MIT License. Created for typing enthusiasts and developers.
