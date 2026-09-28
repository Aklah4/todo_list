# AGENTS.md

## Project

- Before writing or changing any UI, read DESIGN.md and follow it exactly
  - [ ] Apply DESIGN.md (tokens, fonts, masthead, task rows)

A todo list web app. Users can add, complete, edit, and delete tasks.
Keep it small and simple. Do not add dependencies without asking.

## Stack

- TypeScript, React (Vite)
- Storage: localStorage (upgrade later if needed)
- Deploy: Vercel

## Setup commands

- Install deps: `pnpm install`
- Start dev server: `pnpm dev`
- Run tests: `pnpm test`
- Build: `pnpm build`

## Code style

- TypeScript strict mode
- Single quotes, no semicolons
- Use functional patterns where possible

## Structure

- `src/components/`: UI components
- `src/lib/`: task logic and storage helpers
- `src/App.tsx`: entry point

## Workflow rules

- Work on one task from the checklist at a time
- Run `pnpm test` and `pnpm build` before saying a task is done
- Make one small commit per finished task
- Never commit `.env` or secrets

## Task checklist

- [ ] Scaffold project
- [ ] Add task
- [ ] Complete task
- [ ] Delete task
- [ ] Persist to localStorage
- [ ] Deploy to Railway
