from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import json
from pathlib import Path

app = FastAPI(title="Commit Detective API")

# Allow the React dev server to call this API during development/demo.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["GET"],
    allow_headers=["*"],
)

DATA_FILE = Path(__file__).parent / "data" / "investigations.json"


def load_investigations():
    if not DATA_FILE.exists():
        raise HTTPException(status_code=500, detail="Investigation data file not found")
    with open(DATA_FILE, "r", encoding="utf-8") as f:
        return json.load(f)


@app.get("/api/investigations")
def list_investigations():
    """Return a summary list of all investigations (id, title, subtitle) for a picker/menu."""
    data = load_investigations()
    return [
        {"id": inv["id"], "title": inv["title"], "subtitle": inv.get("subtitle", "")}
        for inv in data["investigations"]
    ]


@app.get("/api/investigations/{investigation_id}")
def get_investigation(investigation_id: str):
    """Return the full stage-by-stage detail for one investigation."""
    data = load_investigations()
    for inv in data["investigations"]:
        if inv["id"] == investigation_id:
            return inv
    raise HTTPException(status_code=404, detail=f"Investigation '{investigation_id}' not found")


@app.get("/")
def root():
    return {"status": "ok", "service": "Commit Detective API"}