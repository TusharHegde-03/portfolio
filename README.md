# TUSHIRO — Immersive Futuristic Portfolio

> Production-quality personal portfolio website for Tushiro (Tushar Hegde).
> Computer Science Engineer | Data Engineer | AI Builder | Developer | Builder | Explorer

---

## 🚀 Architectural Overview

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS, Framer Motion, Lucide React icons
- **Backend**: Node.js, Express, TypeScript (`/api/contact`, `/api/health`, `/api/projects`)
- **Design Language**: Cyberpunk Cinematic Tech, Electric Cyan HUD, Holographic Glassmorphism
- **Asset Hierarchy**: Clean modular breakdown under `/public/`
- **3D-Ready**: `/public/assets/3d/` structure prepared for Three.js / React Three Fiber integration

---

## 🛠️ Installation & Setup

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start Development Environment**:
   ```bash
   # Starts both Vite Frontend (Port 5173) and Express Backend API (Port 3001)
   npm run dev:all
   ```

3. **Production Build**:
   ```bash
   npm run build
   ```

---

## 📁 Project Structure

```
├── src/                    # Frontend application (React + TypeScript)
│   ├── components/         # Reusable sections and UI components
│   ├── data/               # Frontend-only content data
│   ├── App.tsx             # Application composition and navigation
│   └── index.css           # Global styles
├── server/                 # Backend application (Express API)
│   └── index.ts            # Contact, health, and projects endpoints
├── shared/                 # Data used by both frontend and backend
│   └── projects.ts         # Project content and types
├── public/                 # Runtime assets served with the frontend
│   ├── references/       # Original reference mockups
│   ├── images/           # Cinematic background layers & assets
│   ├── characters/       # Tushar & Tushiro identity cutouts
│   ├── icons/            # SVG icons
│   └── videos/           # Browser-ready video files
├── assets/source/         # Original editable media, not served at runtime
│   ├── images/
│   ├── videos/
│   └── character-frames/
├── docs/
│   └── design.md          # Visual design system and rules
└── package.json
```

---

## 📄 Updating Content

- **Projects**: Edit `/shared/projects.ts`
- **Journey Chapters**: Edit `/src/data/journey.ts`
- **Skills**: Edit `/src/data/skills.ts`
- **Personal Bio & Links**: Edit `/src/data/profile.ts`
- **Resume File**: Place your updated PDF at `/public/resume/Tushiro-Resume.pdf`

## Free Hosting

Recommended split: host the React frontend on **Cloudflare Pages** and the small Express API on **Render Free**. Cloudflare Pages can build directly from GitHub and deploy on every push; it supports a custom build command and output directory. Render has a free Node web-service tier, though a service sleeps after 15 minutes without traffic and may take about a minute to wake up. [Cloudflare Pages build configuration](https://developers.cloudflare.com/pages/configuration/build-configuration/) · [Cloudflare Git integration](https://developers.cloudflare.com/pages/configuration/git-integration/) · [Render Free limitations](https://render.com/docs/free)

1. Create a GitHub repository and push this project. Do not commit `.env`.
2. In Cloudflare, open **Workers & Pages → Create → Pages → Connect to Git** and select the repository.
3. Set **Build command** to `npm run build` and **Build output directory** to `dist`.
4. In Render, create a **Web Service** from the same repository. Set **Build command** to `npm install && npm run build`, **Start command** to `npm run start`, and select the Free plan.
5. Copy the Render URL, then add a Cloudflare Pages environment variable named `VITE_API_BASE_URL` with that URL (for example `https://your-portfolio-api.onrender.com`). Redeploy Pages afterward.

The contact endpoint currently validates and logs submissions. To receive emails, add a real mail-provider implementation and set its secret key only in Render’s environment variables—never in the frontend or GitHub repository.
