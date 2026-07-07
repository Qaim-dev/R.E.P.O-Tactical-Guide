# R.E.P.O. Tactical Advisor

An AI-powered tactical planning assistant for the horror extraction game R.E.P.O. Feed in your run parameters—map, team size, loot %, extractions remaining, and active monsters—and get back a risk-scored extraction plan built from community field knowledge.

**[Live Demo](https://repo-tactical-guide.vercel.app)** • **[Portfolio Piece](#why-this-project)**

## Features

- **Structured Game State Input**: Card-based UI for entering map, team composition, loot percentage, extractions remaining, and hostile monsters
- **AI-Powered Tactical Plans**: Multi-phase extraction strategies with reasoning chains, contingencies, and confidence scores
- **Risk Assessment**: Evaluated threat analysis based on team state and environmental factors
- **Source Attribution**: Plans include citations to community knowledge sources
- **Community Knowledge Base**: RAG-augmented retrieval from scraped R.E.P.O. guides and forums
- **Structured Output**: Reliable JSON schema validation ensures plans are always actionable

## Architecture

### Frontend
- **Framework**: Next.js 16.2 with React 19 and TypeScript
- **State Management**: Zustand for lightweight game state
- **Styling**: Tailwind CSS with custom design tokens
- **Components**: Fully typed React components with "use client" boundaries

### Backend
- **Framework**: Python FastAPI
- **LLM Integration**: Llama 3.1 (8B) via Ollama (dev) or Groq (production)
- **Knowledge Base**: Supabase + pgvector for hybrid semantic search
- **Embeddings**: nomic-embed-text via Ollama
- **Output Validation**: Pydantic models with JSON schema enforcement

### Data Pipeline
1. Community knowledge scraped from R.E.P.O. wikis/forums
2. Semantically chunked and embedded with nomic-embed-text
3. Stored in Supabase `documents` table with vector embeddings
4. Hybrid search (vector similarity + keyword) retrieves top-K relevant documents
5. Documents injected into few-shot CoT prompts
6. LLM outputs validated against strict JSON schema

## Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | Next.js, React, TypeScript, Tailwind, Zustand |
| Backend | FastAPI, Python, Pydantic |
| LLM | Llama 3.1 (Ollama/Groq) |
| Database | Supabase (PostgreSQL + pgvector) |
| Hosting | Vercel (frontend), Render (backend) |

## Getting Started

### Prerequisites
- Node.js 18+
- Python 3.11+
- Ollama (for local LLM, optional for dev)

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:3000`

### Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python main.py
```

Backend runs on `http://localhost:8000`

### Environment Variables

**Backend** (`.env`):
```env
OLLAMA_URL=http://localhost:11434/api/generate  # Or Groq endpoint for production
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
```

## Development

### Project Structure

```
.
├── frontend/
│   ├── app/                    # Next.js app router
│   ├── src/
│   │   ├── home/              # Page components & card selectors
│   │   ├── services/          # API clients
│   │   ├── stores/            # Zustand stores
│   │   └── types/             # Shared TypeScript types
│   └── public/images/          # Game assets (maps, monsters)
├── backend/
│   └── main.py                # FastAPI server & RAG pipeline
└── README.md
```

### Key Files

- **Monster Selection**: `frontend/src/home/monsters-row.tsx` (29 monsters, count selector)
- **Map Selection**: `frontend/src/home/map-row.tsx`
- **Extraction Plan Display**: `frontend/src/home/extraction-plan-modal.tsx`
- **Game State Store**: `frontend/src/stores/extraction-store.ts` (Zustand)
- **Tactical Plan Generation**: `backend/main.py` (FastAPI `/plan` endpoint)

## API Reference

### POST `/plan`

**Request**:
```json
{
  "map": "Headman Manor",
  "players": 2,
  "extractions_remaining": 2,
  "loot_percent": 99,
  "monsters": [
    { "name": "Nurse", "count": 1 },
    { "name": "Clown", "count": 2 }
  ]
}
```

**Response**:
```json
{
  "phases": [
    {
      "name": "Phase 1: Recon",
      "actions": ["Check east corridor", "Mark safe routes"],
      "reasoning": "Minimize visibility with small team..."
    }
  ],
  "risk_assessment": "Moderate risk. Two Clowns present...",
  "confidence": 75,
  "sources": ["wiki_extraction_tips", "community_clown_guide"]
}
```

## Deployment

### Frontend (Vercel)
```bash
cd frontend
vercel deploy
```

### Backend (Render)
1. Push to GitHub
2. Connect Render to GitHub repo
3. Set environment variables in Render dashboard
4. Deploy from `backend/` directory

**Free tier considerations**:
- Render: 750 free dyno hours/month, 15-min cold start
- Vercel: 100 GB/month bandwidth
- Groq: 14,400 req/day free tier

## Why This Project

This is a **portfolio piece for AI engineering transition**, deliberately showcasing:

- **RAG Architecture**: Vector embeddings, hybrid search, prompt injection, chunking strategies
- **LLM Integration**: Structured output validation, JSON schema enforcement, hallucination guards
- **Provider Abstraction**: `LLM_MODE` config allows swapping Ollama ↔ Groq without code changes
- **Production Constraints**: Built within free-tier limits (Groq rate limits, Render cold starts, Vercel bandwidth)
- **Full Stack AI**: Not just API glue, but embedding pipelines, retrieval ranking, prompt engineering with CoT/few-shot

**Not a chatbot.** Deliberately structured UI (cards, dropdowns, counters) over free-form chat to:
- Ensure valid game state as input
- Simplify RAG context (fixed schema)
- Make outputs more deterministic and actionable

## Roadmap

- [ ] Pre-generated visual guides (level maps, monster spawns)
- [ ] Agentic workflows (ReAct, tool-calling for dynamic re-planning)
- [ ] Conversation memory & multi-turn planning refinement
- [ ] Multi-agent orchestration (team composition analyzer)
- [ ] Vision models for screenshot understanding
- [ ] WebLLM for privacy-focused edge inference
- [ ] Dynamic image generation with ComfyUI + FLUX

## License

MIT

## Contact

[Muhammad Qaim](https://github.com/Qaim-dev) • [Portfolio](https://muhammadqaim.dev)
