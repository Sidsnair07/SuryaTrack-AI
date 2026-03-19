# 🧘 SuryaTrack AI

**Real-time Surya Namaskar pose detection and coaching powered by on-device AI.**

SuryaTrack AI is a web and mobile application that uses **MediaPipe Pose** to guide users through the 12 poses of Surya Namaskar (Sun Salutation) with live feedback, joint-angle analysis, and session tracking — all processed entirely on-device at the edge.

---

## ✨ Features

- **Real-time Pose Detection** — MediaPipe Pose landmark tracking with skeleton overlay
- **12-Pose Guided Flow** — Complete Surya Namaskar cycle with automatic pose progression
- **Joint Angle Analysis** — Live angle computation for 8 key joints (elbows, shoulders, hips, knees)
- **Accuracy Scoring** — Per-pose percentage score with configurable thresholds
- **Hold Timer** — Validates sustained correct form before advancing
- **Breathing Guide** — Inhale/Exhale cues synchronized with each pose
- **Difficulty Modes** — Beginner, Intermediate, and Advanced with adjusted tolerances
- **Body Calibration** — One-time calibration to detect user body proportions
- **Session History** — Logs every session with per-pose scores, feedback, and screenshots
- **Reference Images** — Side-by-side reference postures with key alignment points
- **Progressive Web App** — Installable on mobile devices via PWA support
- **Android App** — Native Android build via Capacitor

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 |
| Pose AI | MediaPipe Pose (on-device, edge inference) |
| Styling | Inline CSS with Outfit + JetBrains Mono fonts |
| Charts | Chart.js + react-chartjs-2 |
| Mobile | Capacitor (Android) |
| PWA | Service Worker with offline support |

---

## 🚀 Getting Started

### Prerequisites
- Node.js ≥ 16
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/Sidsnair07/SuryaTrack-AI.git
cd SuryaTrack-AI

# Install dependencies
npm install

# Start development server
npm start
```

The app will open at `http://localhost:3000`. Allow camera access when prompted.

### Android Build (Optional)

```bash
npm run build
npx cap sync android
npx cap open android
```

---

## 📁 Project Structure

```
SuryaTrack-AI/
├── public/
│   ├── poses/              # Reference pose images (12 poses)
│   ├── index.html           # App shell
│   ├── manifest.json        # PWA manifest
│   └── sw.js                # Service worker
├── src/
│   ├── App.js               # Main application (pose logic, UI, settings)
│   ├── index.js             # React entry point
│   └── serviceWorkerRegistration.js
├── capacitor.config.ts      # Capacitor config for Android
├── package.json
└── README.md
```

---

## 🎯 How It Works

1. **Camera captures** the user's body in real-time
2. **MediaPipe Pose** extracts 33 body landmarks on-device
3. **Angle computation** calculates joint angles from landmark positions
4. **Pose evaluation** compares angles against predefined thresholds
5. **Hold validation** ensures the correct pose is sustained for the required duration
6. **Auto-advance** moves to the next pose in the Surya Namaskar sequence

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 👤 Author

**Sidsnair07** — [GitHub](https://github.com/Sidsnair07)
