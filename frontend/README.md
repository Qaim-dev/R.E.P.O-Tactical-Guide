# R.E.P.O. Tactical Advisor — Frontend

The user-facing interface for AI-powered tactical extraction planning for R.E.P.O., a horror extraction game.

## What It Does

This frontend presents a structured, card-based UI where players input their current run state and receive AI-generated extraction plans. Instead of free-form chat, the interface uses:

- **Map Selection**: Choose your extraction level (Headman Manor, Mcjannek Station, Museum of Human Art, Swiftbroom Academy)
- **Monster Roster**: Select and count active threats (29 different monster types)
- **Run Parameters**: Specify team size, loot percentage, and extractions remaining
- **Extraction Plan Request**: Submit your scenario to generate a risk-scored tactical plan

The backend analyzes your input against a community knowledge base (RAG-augmented from scraped R.E.P.O. guides) and returns:
- Multi-phase extraction strategies with actionable steps
- Risk assessment and confidence scoring
- Reasoning chains explaining decisions
- Contingency plans for hostile encounters
- Source citations from community field notes

## Architecture

**Framework**: Next.js 16 (React 19 + TypeScript)  
**State Management**: Zustand (lightweight game state store)  
**Styling**: Tailwind CSS with custom design tokens for a dark, atmospheric UI  
**API Client**: Fetches tactical plans from FastAPI backend via `/plan` endpoint  

## Key Components

| Component | Purpose |
|-----------|---------|
| [header.tsx](src/home/header.tsx) | Hero section with R.E.P.O. logo, tagline, and Semibot attribution |
| [map-row.tsx](src/home/map-row.tsx) | Map selection grid (4 maps, card-based UI) |
| [monsters-row.tsx](src/home/monsters-row.tsx) | Monster roster with count selectors (29 monsters) |
| [monster-card.tsx](src/home/monster-card.tsx) | Individual monster card with image and count controls |
| [extraction-plan-button.tsx](src/home/extraction-plan-button.tsx) | Submit button to request plan from backend |
| [extraction-plan-modal.tsx](src/home/extraction-plan-modal.tsx) | Modal displaying AI-generated tactical plan |
| [selection-card.tsx](src/home/selection-card.tsx) | Reusable card component for map/location selection |

**State Store**: [extraction-store.ts](src/stores/extraction-store.ts) — Zustand store managing map, team size, loot %, extractions remaining, and selected monsters

## Getting Started

### Prerequisites
- Node.js 18+
- Backend API running (default: `http://localhost:8000`)

### Development

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:3000`

### Build & Deploy

```bash
npm run build
npm start       # Production server
```

Deploy to Vercel (free tier):
```bash
vercel deploy
```

## Environment

The frontend expects the backend API at:
- **Development**: `http://localhost:8000`
- **Production**: Set via `NEXT_PUBLIC_API_URL` or infer from deployment

No API keys required on the frontend; sensitive keys (Groq, Supabase) are backend-only.

## Development Notes

- **UI Constraints**: Card-based selection ensures valid game state before API requests
- **No Free-Form Chat**: Deliberately structured to keep extraction plans deterministic and actionable
- **Type Safety**: All components fully typed with TypeScript; shared types in [src/types/](src/types/)
- **Service Layer**: API calls in [src/services/](src/services/) keep components clean
- **Dark Theme**: Tailwind tokens optimized for atmospheric horror game aesthetic

## Roadmap

- Pre-generated visual guides (level maps, monster spawns with density heatmaps)
- Agentic refinement (re-plan based on user feedback in multi-turn flows)
- Conversation memory for plan modifications
- Vision model integration for screenshot understanding
- WebLLM for privacy-focused edge inference (run models in-browser)

## License

MIT
