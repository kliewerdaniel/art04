You are assisting in building a full-stack open-source project named `art01` — an Art + Philanthropy platform. The goal of this platform is to connect volunteers with homeless artists, track art distribution, mentorship, financial transactions, and mental-health assessments (PHQ-9, GAD-7), and provide optional AI-driven analysis of outcomes. 

Project context:

1. **Frontend**: Next.js (TypeScript), TailwindCSS, shadcn/ui components. Should include:
   - Landing page, artist galleries, volunteer dashboards
   - Artist profile cards, artwork catalog, shopping cart
   - API routes for CRUD operations using Prisma
   - Charts using Recharts for time-based financial and wellbeing metrics
   - Authentication via NextAuth.js (email + optional GitHub OAuth)
   - Static export of artist sites (ZIP or Next.js static pages)

2. **Backend / DB**:
   - Local-first SQLite with Prisma ORM
   - Optional cloud Postgres via Supabase free tier
   - Models: User, Artist, Artwork, Interaction, Assessment, Allocation, SiteExport
   - Relationships normalized and types generated via Prisma

3. **Optional ML/Analytics Service**:
   - Python FastAPI service
   - Endpoints: /train, /score, /explain, /export-model
   - Uses PyTorch and scikit-learn for tabular and neural network modeling
   - Reads SQLite DB or CSV/JSON export
   - Outputs: success probability, feature importances, recommended allocations
   - Containerized via Docker

4. **Scripts & Utilities**:
   - `scripts/export-artist.js` for static site export
   - `scripts/import-data.js` for importing CSV/JSON into SQLite
   - CLI-friendly, documented usage

5. **Dev tooling**:
   - pnpm (or npm/yarn)
   - ESLint, Prettier, Husky + lint-staged, Vitest/Jest
   - Docker + docker-compose for ML service

6. **Deployment**:
   - Frontend: deployable to Netlify free tier
   - Optional ML/DB remain local

7. **Security & Privacy**:
   - Encrypt sensitive assessment data
   - Store minimal personal info
   - Explicit artist consent for data usage

---

You have a file named `prompts.md` in the project root. This file contains **staged iterative prompts for building the application**, including:
- Scaffold folder/file structure
- Initialize Next.js frontend
- Set up Prisma models and types
- Create API routes
- Build FastAPI ML service
- Implement scripts for export/import
- Add charts and analytics
- Configure authentication and security
- Deployment instructions
- Documentation generation

---

**Your instructions**:

1. Read and understand the full project context.
2. Use `prompts.md` to guide your iterative development.
3. Begin by executing the first stage: scaffold the project structure and placeholder files.
4. Output shell commands or file scaffolding code that I can run to create the initial folder structure and entry-point files.
5. After I confirm the structure is created, wait for further instructions to proceed to the next stage in `prompts.md`.

**Constraints**:
- Output only actionable, executable code or file content.
- Do not assume anything outside the context provided.
- Keep file names, folder hierarchy, and types exactly as specified.

⸻

Stage 1 — Scaffold Project Structure

Prompt 1:

Create the full folder and file structure for a project named `art01` as described:
- Next.js frontend with pages, components, styles, API routes.
- Prisma schema with migrations folder.
- Optional FastAPI ML service with models and routes.
- Scripts for export/import.
- Docs for metrics and research.
- Public uploads folder.
Include placeholder files for key entry points (next.config.js, package.json, tsconfig.json, app.py, Dockerfile, schema.prisma, export/import scripts, README.md, .env.example, .gitignore).
Output: a series of shell commands to create this structure in one go.

CLINe Action: Output mkdir + touch commands or direct file scaffolding.

⸻

Stage 2 — Initialize Frontend

Prompt 2:

In `apps/web` folder, initialize a Next.js app with TypeScript, TailwindCSS, and shadcn/ui components.
- Include a landing page, artist gallery page, dashboard page.
- Add placeholder components: ArtistCard, ArtistList, Navigation, Footer.
- Include NextAuth.js configuration for email login.
- Include TailwindCSS setup and basic global styles.
Output: folder structure with starter TSX/JSX files and example components.

CLINe Action: Generate Next.js scaffolding files, page components, and configuration.

⸻

Stage 3 — Setup Database (Prisma)

Prompt 3:

In `prisma/schema.prisma`, define models:
- User (id, name, email, role, createdAt)
- Artist (id, name, handle, bio, contactPref, createdAt)
- Artwork (id, artistId, title, description, price, imagePath, createdAt)
- Interaction (id, artistId, volunteerId, type, quantity, money, notes, timestamp, location)
- Assessment (id, artistId, type, answers, score, createdAt)
- Allocation (id, volunteerId, artistId, timeMinutes, moneyCents, purpose, createdAt)
- SiteExport (id, artistId, generatedAt, zipPath)
Include relationships and generate TypeScript types via Prisma client.

CLINe Action: Produce the Prisma schema and TypeScript types.

⸻

Stage 4 — Backend API Routes (Next.js)

Prompt 4:

Create API routes under `apps/web/api` for:
- POST /api/artist
- GET /api/artists
- POST /api/interaction
- POST /api/assessment
- POST /api/allocation
Each route should validate input with zod, interact with Prisma, and return JSON.
Include example request/response.

CLINe Action: Output TypeScript API route files with input validation.

⸻

Stage 5 — ML Service Setup (FastAPI)

Prompt 5:

Create a FastAPI service under `ml-service`:
- Endpoints: /train, /score, /explain, /export-model
- Reads SQLite DB or CSV/JSON export
- Uses PyTorch + scikit-learn pipelines
- Output: JSON with success_probability, feature_importances, recommended allocation deltas
- Include Dockerfile for containerization
- Include requirements.txt with all dependencies

CLINe Action: Produce Python code for the ML service with example endpoints and Dockerfile.

⸻

Stage 6 — Scripts for Export/Import

Prompt 6:

Under `scripts/`, create Node.js scripts:
- export-artist.js: export artist profiles as static Next.js sites or ZIPs
- import-data.js: read CSV/JSON files and insert into SQLite via Prisma
Include CLI usage instructions.

CLINe Action: Generate working scripts with Node.js code and CLI instructions.

⸻

Stage 7 — Charts & Analytics (Frontend)

Prompt 7:

In the dashboard page, use recharts to display:
- Donations over time
- Volunteer hours vs PHQ-9/GAD-7 scores
- Aggregated allocation data
Fetch data from Prisma API routes.
Output TypeScript React components ready to render charts.

CLINe Action: Generate chart components with example mock data.

⸻

Stage 8 — Auth & Security

Prompt 8:

Set up NextAuth.js for volunteers/admins:
- Email magic link login
- Optional GitHub OAuth
- Local-only admin unlock via .env secret
Ensure sensitive data (PHQ-9, GAD-7) is encrypted at rest.
Add middleware for protected routes (dashboard, admin API).

CLINe Action: Output auth setup code, environment config, and middleware.

⸻

Stage 9 — Deployment Instructions

Prompt 9:

Generate Netlify deployment instructions:
- Build command: pnpm build
- Publish directory: .next
- Environment variables
- Instructions for local ML service optional run
Include steps for exporting artist static sites and deploying via CLI or drag-and-drop.

CLINe Action: Output README-ready deployment guide.

⸻

Stage 10 — Final Touches & Docs

Prompt 10:

Generate docs for:
- Metrics definitions (PHQ-9, GAD-7, financial outcomes)
- Sample research notes
- API contract examples
- Developer workflow & contributing guide
Ensure Markdown format compatible with GitHub README/docs folder.

CLINe Action: Create fully formatted .md files for docs.

⸻

✅ Workflow for Iterative CLIne Use
	1.	Run Prompt 1 → scaffold.
	2.	Run Prompt 2 → frontend base.
	3.	Run Prompt 3 → database.
	4.	Run Prompt 4 → backend API.
	5.	Run Prompt 5 → ML service.
	6.	Run Prompt 6 → export/import scripts.
	7.	Run Prompt 7 → charts.
	8.	Run Prompt 8 → auth/security.
	9.	Run Prompt 9 → deployment instructions.
	10.	Run Prompt 10 → docs.

⸻

