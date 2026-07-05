from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import httpx
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

OLLAMA_URL = os.getenv("OLLAMA_URL", "http://localhost:11434/api/generate")

class GameState(BaseModel):
    map: str
    players: int
    extractions_remaining: int
    loot_percent: float
    monsters: list[str]

@app.post("/plan")
async def generate_plan(state: GameState):
    prompt = f"""You are a tactical advisor for the game R.E.P.O.
Given the current game state, output a step-by-step extraction plan as JSON.
If you are uncertain about any game mechanic, state that clearly instead of guessing.

Current state:
- Map: {state.map}
- Players: {state.players}
- Extractions remaining: {state.extractions_remaining}
- Loot percentage: {state.loot_percent}%
- Active monsters: {', '.join(state.monsters)}

Output a JSON object exactly like this:
{{
  "phases": [
    {{
      "name": "string",
      "actions": ["string"],
      "reasoning": "string"
    }}
  ],
  "risk_assessment": "string",
  "confidence": 0-100,
  "sources": ["string"]
}}"""

    async with httpx.AsyncClient(timeout=60) as client:
        response = await client.post(OLLAMA_URL, json={
            "model": "llama3.1:8b",
            "prompt": prompt,
            "stream": False,
            "format": "json"
        })
        data = response.json()
        return {"plan": data["response"]}