# BMAD Workflow Guide

This project includes BMAD V6 (Break Method Agile Development) for structured AI-assisted development.

> 📖 **Official BMAD documentation is in `_bmad/bmm/`** — this file is a quick-start reference.

## Quick Start

### 1. Understand the Phases

BMAD follows a structured SDLC. See `_bmad/bmm/workflows/` for full details:

| Phase | Directory | Purpose |
|-------|-----------|---------|
| 1 | `workflows/1-analysis/` | Research, product brief |
| 2 | `workflows/2-plan-workflows/` | PRD, epics planning |
| 3 | `workflows/3-solutioning/` | Architecture, technical design |
| 4 | `workflows/4-implementation/` | Sprint planning, stories, dev, review |
| — | `workflows/bmad-quick-flow/` | Fast track for simple tasks |

### 2. Key Implementation Workflows

For Phase 4 (where most coding happens), see `_bmad/bmm/workflows/4-implementation/`:

| Workflow | Docs Location | CC Command |
|----------|---------------|------------|
| Sprint Planning | `sprint-planning/instructions.md` | `/bmad-bmm-sprint-planning` |
| Create Story | `create-story/instructions.md` | `/bmad-bmm-create-story` |
| Dev Story | `dev-story/instructions.md` | `/bmad-bmm-dev-story` |
| Code Review | `code-review/instructions.md` | `/bmad-bmm-code-review` |
| Retrospective | `retrospective/instructions.md` | `/bmad-bmm-retrospective` |

### 3. Agent Personas

BMAD agents are defined in `_bmad/bmm/agents/`:

| Agent | File | Specialty |
|-------|------|-----------|
| Analyst | `analyst.md` | Research, product briefs |
| PM | `pm.md` | PRDs, epics & stories |
| Architect | `architect.md` | Technical architecture |
| UX Designer | `ux-designer.md` | UX design, wireframes |
| Scrum Master | `sm.md` | Sprint management |
| Developer | `dev.md` | Implementation & code review |
| Quick Flow | `quick-flow-solo-dev.md` | Fast-track simple tasks |

### 4. Output Locations

| Artifact | Location |
|----------|----------|
| Planning docs | `_bmad-output/planning-artifacts/` |
| Story files | `_bmad-output/implementation-artifacts/` |
| Sprint status | `_bmad-output/implementation-artifacts/sprint-status.yaml` |

## Critical: Workflow Order

⚠️ **Always run `/bmad-bmm-sprint-planning` BEFORE developing stories.**

BMAD agents expect `sprint-status.yaml` to exist. The workflow is:

```
1. /bmad-bmm-sprint-planning  → Creates sprint-status.yaml
2. /bmad-bmm-create-story     → Creates story file in implementation-artifacts/
3. /bmad-bmm-dev-story        → Implements the story (TDD)
4. /bmad-bmm-code-review      → Reviews implementation
5. Repeat 2-4 for each story
6. /bmad-bmm-retrospective    → After epic completes
```

## Configuration

- **Module config:** `_bmad/bmm/config.yaml`
- **Command help:** `_bmad/bmm/module-help.csv`
- **Templates:** `_bmad/bmm/data/`

## Learn More

For detailed workflow instructions, read the `instructions.md` file in each workflow directory:

```bash
# Example: Read sprint planning instructions
cat _bmad/bmm/workflows/4-implementation/sprint-planning/instructions.md
```

---

*BMAD V6 is designed for AI-assisted development. Let the agents guide the process.*
