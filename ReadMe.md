# Commit Detective
Commit Detective points Bob at a
codebase's real git history and has it independently reconstruct the
story behind confusing or risky changes — what was built, what broke,
why, and how it was fixed — then verifies its own findings against any
existing human documentation.

## The problem

When something in a codebase looks fragile, over-engineered, or just
confusing, the person who understands *why* it's that way has often
moved on. Reconstructing that history manually means digging through
commit messages, diffs, and whatever docs happen to still be accurate —
a slow, easy-to-skip step that most developers do only when forced to.

## The solution

Commit Detective uses IBM Bob 2.0's Agent mode to investigate a
repository's git history on a given topic, independently reconstruct
the causal chain of what happened, and only *afterward* cross-check its
findings against the project's own documentation — surfacing both
confirmation and gaps in what was written down.

This was run against
[`github-analyzer`](https://github.com/onurdlk/github-analyzer), a real
public FastAPI + React project, producing three independent
investigations:

1. **The AI Summary Feature: Full Causal Chain** — a model deprecation
   that silently introduced a token-budget bug, plus a false-negative
   caused by a stale cache.
2. **Sequential to Concurrent: The API Calls Story** — a performance
   and security fix that quietly introduced new architectural
   tradeoffs (blocking SQLite calls inside an async function,
   all-or-nothing failure semantics).
3. **Counting Contributors: The Pagination Trap** — a bug diagnosed
   from reasoning about the GitHub API's behavior, before it was ever
   observed failing live, fixed with a clever pagination trick.

In each case, Bob's independent investigation was verified against the
findings, and each surfaced real details the human-written notes
omitted.

## How it works

1. **Investigate** — Bob is pointed at a topic (not an exact commit)
   and searches the repository's git history itself, reading real
   diffs and commit messages to reconstruct what happened and why.
2. **Verify** — Bob cross-checks its own independent findings against
   the project's existing documentation, reporting both matches and
   gaps.
3. **Serve** — the structured findings are stored and served through a
   FastAPI backend.
4. **Display** — a React frontend renders each investigation as an
   expandable timeline, with Bob's most notable independent findings
   highlighted separately.

Evidence of every Bob session used to produce these investigations is
in [`bob_sessions/`](bob_sessions/).

## Project structure

```
commit-detective-submission/
  backend/            FastAPI app serving investigation data
    main.py
    requirements.txt
    data/
      investigations.json
  frontend/           React + TypeScript + Vite + Tailwind app
  bob_sessions/       Bob IDE task session summary screenshots
  README.md
```

## Running it locally

### Backend

```bash
cd backend
pip install -r requirements.txt
python -m uvicorn main:app --reload
```
Runs at `http://localhost:8000`. Confirm it's working by visiting
`http://localhost:8000/api/investigations`.

### Frontend

```bash
cd frontend
npm install
npm run dev
```
Runs at `http://localhost:5173` (or the next available port). Requires
the backend to be running.

## Tech stack

- **Backend:** Python, FastAPI
- **Frontend:** React, TypeScript, Vite, Tailwind CSS
- **AI:** IBM Bob 2.0 (Agent mode, subagents, document understanding)
