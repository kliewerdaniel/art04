# art02 — Art + Philanthropy Platform

**One-line:** art02 is a free, open-source platform that helps volunteers connect homeless artists with buyers and mentors, track outcomes (financial and psychological), and analyze effectiveness with locally-run AI. The frontend is a Next.js app deployable to Netlify for free; heavier AI work runs locally via an optional FastAPI Python service using PyTorch and scikit-learn.

---

## Table of contents

- Project vision
    
- Features
    
- Architecture overview
    
- Data model
    
- Tech stack and libraries
    
- Local development (frontend + backend + ML service)
    
- Deployment (Netlify + local ML)
    
- Security & privacy
    
- How the AI/analytics pipeline works
    
- UX and accessibility notes
    
- Example API contract
    
- Developer workflow & contributing
    
- License
    

---

## Project vision

This project aims to turn acts of charity into lasting opportunity. Volunteers distribute art supplies and mentorship; the platform registers artists, hosts portfolios, records transactions and standardized mental-health assessments (PHQ-9 / GAD-7), and generates structured metadata for analysis. The goal is to measure whether and how arts-based micro-economies improve both financial outcomes and subjective wellbeing.

Important constraints:

- The **UI+app is Next.js** and designed to be hosted on Netlify for free.
    
- Any compute-heavy or proprietary components (ML training, heavy vector databases) are **optional** and run locally (or in your own controlled environment). The app works fully without these extras.
    
- All code is free, open-source, and intended to be runnable locally.
    

---

## Features

User-facing:

- Volunteer dashboard: create walks, log distributions of supplies, add follow-ups.
    
- Artist profiles: bio, portfolio (images), pricing, contact preferences.
    
- Artwork catalog + shopping cart for buyers (simple checkout/donation flow).
    
- Admin tools: assign mentorships, log time/money allocations, tag interactions.
    
- Standardized assessments: PHQ-9 and GAD-7 forms per artist, timestamped.
    
- Exportable static artist sites (zip) for easy Netlify deployment per artist.
    

Data & analytics:

- Persistent metadata capture for every interaction (money, time, inventory, assessments).
    
- CSV / JSON export for external analysis.
    
- Optional ML service that accepts metadata and returns model outputs (recommendations, success probability, optimized graph suggestions).
    
- Charts (recharts) in-app visualizing money/time vs. symptom scores.
    

Developer & operational:

- Full TypeScript codebase (frontend + API routes).
    
- Local-first design: SQLite via Prisma for local work; optional Supabase/Postgres for cloud.
    
- Dockerfiles and `docker-compose` examples for ML service and combined dev environment.
    

---

## Architecture overview

1. **Next.js Frontend (TypeScript)** — pages, API routes, and UI. Runs on Netlify.
    
    - Static generation for public pages (artist galleries, landing).
        
    - Server-side API routes for lightweight tasks (sending emails via SMTP or transactional email services with free tiers).
        
    - Client-side React for dashboards and interactive forms.
        
2. **Database (local-first)**
    
    - Primary: SQLite (Prisma) for local dev.
        
    - Optional production: Postgres (Supabase has a free tier) when you want remote persistence shared between devices.
        
3. **Authentication**
    
    - NextAuth.js for volunteers/admins (email magic link, GitHub OAuth).
        
    - Optional local-only admin unlock via `.env` secret for offline use.
        
4. **File storage**
    
    - Default (free): store uploads in the repo `public/uploads/` (not suitable for scale; intended for local or single-maintainer use).
        
    - Recommended: Cloudinary or S3-compatible storage (both have free tiers) — configurable via environment variables.
        
5. **ML & Analytics Service (optional, local-only)**
    
    - FastAPI app (Python) that loads PyTorch models and scikit-learn utilities.
        
    - Exposes endpoints: `/train`, `/score`, `/explain`, `/export-model`.
        
    - Reads from the same SQLite DB (or accepts CSV/JSON payloads).
        
    - Containerized with Docker for reproducible local runs.
        
6. **Static export tool**
    
    - CLI script in Node that can export any artist profile as a tiny Next.js static site or a ZIP bundle ready for Netlify drag-drop deploy.
        
7. **Background jobs (optional)**
    
    - Local cron or Netlify scheduled functions for periodic exports, email reminders, or nightly backups.
        

---

## Data model (high-level)

- `User` (volunteer/admin)
    
    - id, name, email, role, createdAt
        
- `Artist`
    
    - id, name, handle, bio, contactPref, createdAt
        
- `Artwork`
    
    - id, artistId, title, description, price, imagePath, createdAt
        
- `Interaction`
    
    - id, artistId, volunteerId, type (supply, purchase, mentorship), quantity, money, notes, timestamp, location
        
- `Assessment`
    
    - id, artistId, type (PHQ-9, GAD-7), answers, score, createdAt
        
- `Allocation`
    
    - id, volunteerId, artistId, timeMinutes, moneyCents, purpose, createdAt
        
- `SiteExport`
    
    - id, artistId, generatedAt, zipPath
        

Relationships are normalized. Use Prisma schema to generate TypeScript types.

---

## Tech stack & libraries

### Frontend (Next.js)

- `next` (v14+)
    
- `react`, `react-dom`
    
- `typescript`
    
- `tailwindcss` + `autoprefixer`
    
- `shadcn/ui` (optional component building blocks)
    
- `lucide-react` for icons
    
- `react-hook-form` for forms + validation
    
- `zod` for schema validation
    
- `next-auth` for authentication
    
- `prisma` ORM with SQLite / Postgres
    
- `recharts` for charts
    
- `react-dropzone` or `@uploadthing/react` for uploads
    
- `clsx`, `date-fns`
    

### Backend (Next API routes + optional Python service)

- `prisma` + `@prisma/client`
    
- `nodemailer` or using transactional email provider with free tier
    

**Optional ML service (Python)**

- `fastapi`, `uvicorn`, `pydantic`
    
- `pandas`, `numpy`
    
- `scikit-learn` (feature engineering & classical models)
    
- `torch` / `pytorch` for neural nets
    
- `joblib` for model persistence
    
- `sqlalchemy` or `sqlite3` (if reading DB directly)
    
- `faiss-cpu` (optional) for similarity search if you add content-based retrieval
    

### Dev tooling

- `eslint`, `prettier`
    
- `husky` + `lint-staged`
    
- `vitest` or `jest` for unit tests
    
- `docker` + `docker-compose` for local ML container
    

---

## Local development (quickstart)

> Requirements: Node 20+, pnpm (or npm/yarn), Python 3.10+, Docker (optional)

1. Clone repo
    

```bash
git clone https://github.com/kliewerdaniel/art02.git
cd art02
pnpm install
```

2. Setup environment
    

Copy the example env file and configure minimal values:

```bash
cp .env.example .env
# set DATABASE_URL="file:./dev.db" and other keys
```

3. Prisma setup
    

```bash
pnpm prisma migrate dev --name init
pnpm prisma generate
```

4. Start Next.js (dev)
    

```bash
pnpm dev
# or: pnpm next dev
```

5. Optional: start ML service locally (recommended in separate terminal)
    

```bash
cd ml-service
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app:app --reload --port 8001
```

6. Connect frontend to ML service via `NEXT_PUBLIC_ML_API=http://localhost:8001` in `.env`
    

---

## Deployment

### Frontend (Netlify)

- Build command: `pnpm build`
    
- Publish directory: `.next` (Netlify supports Next.js builds)
    
- Set environment variables in Netlify UI (DATABASE_URL only if you use an external DB like Supabase)
    

**Notes:**

- If you rely on the local Python ML service or local SQLite DB, those components remain local and do not run on Netlify. The deployed app will be fully functional for registering artists, uploading artwork (to configured cloud storage), and tracking interactions. Analytics requiring heavy ML are optional and run locally.
    

### Optional DB & file storage

- For a free remote DB: use Supabase free tier (Postgres). Update `DATABASE_URL` accordingly and run migrations.
    
- For file storage: Cloudinary free tier or Supabase Storage (free tier). Configure `CLOUDINARY_URL` or Supabase credentials.
    

### Static export for artist sites

- Use the built-in `scripts/export-artist.js` to generate a static site zip.
    
- You can drag-and-drop the ZIP to Netlify or use Netlify CLI / API for automated deploys.
    

---

## AI & analytics pipeline (detailed)

### Goals

- Create reproducible metrics showing the effect of interventions on both financial and psychological outcomes.
    
- Offer recommended next actions per-artist (e.g., increase mentorship hours, buy more supplies) via trained models.
    

### Data flow

1. App stores interactions, assessments, allocations. Each record is timestamped and tied to an `artistId`.
    
2. The ML service ingests CSV/JSON exports or reads the same SQLite DB and performs feature engineering:
    
    - Aggregate features: total donations last 30/90 days, average price per work, number of works, volunteer-hours.
        
    - Assessment deltas: change in PHQ-9 / GAD-7 over time windows.
        
3. Modeling:
    
    - Baseline: scikit-learn pipeline (StandardScaler -> RandomForest / GradientBoosting) for interpretable feature importance.
        
    - Optional: small PyTorch model (tabular NN) for non-linear interactions.
        
4. Outputs:
    
    - `success_probability` (0-1), `feature_importances`, and recommended allocation deltas.
        
    - Export visualizations as PNG or JSON for frontend display.
        

### Example endpoint contract (ML service)

- `POST /score` — body: `{ "artistId": "..." }` => returns `{ "success_probability": 0.42, "drivers": [{"feature":"vol_hours","impact":0.12}, ...] }`
    
- `POST /train` — trigger retrain on local data, returns status and metrics
    
- `GET /export-model` — download model artifact (joblib)
    

### Reproducibility

- All experiments are versioned with `mlruns/` (or `weights/`) and recommended to use local git tags + timestamp.
    
- Dockerfile provided so you can run identical environments on different machines.
    

---

## UX, accessibility & ethics

- Forms use aria labels; color contrast follows WCAG AA by default via Tailwind tokens.
    
- Data minimization: store only necessary personal data; assessments are sensitive—encrypt at rest when possible.
    
- Consent: artists must explicitly opt in to be recorded and have the option to withdraw.
    
- Transparency: display how data is used and whether it may be part of aggregated research.
    

---

## Example API

### Next.js API route: `POST /api/interaction`

Request body:

```json
{
  "artistId": "uuid",
  "volunteerId": "uuid",
  "type": "supply",
  "quantity": 5,
  "money": 0,
  "notes": "gave colored pencils"
}
```

Response: `201` with saved record.

### ML API call from frontend

Fetch to `NEXT_PUBLIC_ML_API + '/score'` with `{ artistId }`.

---

## Developer workflow

- Branches: `main` (production-ready), `dev` (daily), feature branches `feat/*`, bugfix `fix/*`.
    
- Pull request template enforces tests + type checks.
    
- Commit hooks: `pnpm lint:staged`.
    
- Recommended workflow for reproducible ML: run `docker-compose up --build` in `/ml-service`, run `pnpm export:data` to generate CSVs and then `POST /train`.
    

---

## Privacy, security & legal

- Avoid uploading or exposing full legal names without consent.
    
- Assessment data (PHQ-9/GAD-7) is health-related; treat it with care — ideally do not publish it publicly without explicit consent and redaction.
    
- Consider adding field-level encryption for sensitive columns and strict access controls for admin dashboards.
    

---

## What's included in this repo

- `apps/web/` — Next.js frontend + API routes
    
- `prisma/` — schema and migrations
    
- `ml-service/` — FastAPI app and model training code
    
- `scripts/` — export, import, and static site generation utilities
    
- `docs/` — research notes, metrics definitions, questionnaire text
    

---

## Getting help / contributing

- Open an issue for bugs or feature requests.
    
- For ML-specific contributions, include reproducible notebooks and a small sample dataset (synthetic or anonymized).
    
- Add tests for both frontend and backend behavior.
    

---

## Roadmap (next milestones)

-  Implement full export-to-Netlify flow via Netlify API
    
-  Add image optimization pipeline and optional vector search (faiss)
    
-  Integrate Supabase storage + auth as an alternative free cloud option
    
-  Improve ML explainability (SHAP) and UI visualizations
    

---

## License

MIT — see `LICENSE`.

---
