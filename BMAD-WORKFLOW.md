# BMAD Workflow Guide

This project includes BMAD V6 (Break Method Agile Development) for structured AI-assisted development.

## Why BMAD?

BMAD provides:
- Structured SDLC with clear phases
- Agent personas for different roles (PO, Architect, Dev, QA)
- Sprint tracking and story management
- Quality gates and validation workflows

## Directory Structure

```
_bmad/                          # BMAD methodology core
├── _config/                    # Configuration files
├── bmm/                        # BMAD Method workflows
│   └── workflows/              # Workflow definitions
└── core/                       # Core agent definitions

_bmad-output/                   # Project artifacts (your work goes here)
├── planning-artifacts/         # PRD, architecture, epics
│   ├── prd.md
│   ├── architecture.md
│   └── epics.md
└── implementation-artifacts/   # Stories ready for development
    └── sprint-status.yaml      # Sprint tracking (created by BMAD)
```

## Getting Started with BMAD

### Phase 1: Project Planning

Before writing any code, create planning artifacts:

1. **Start Claude Code** in your project directory
2. **Run planning workflow:**
   ```
   /bmad-bmm-analyst.agent
   ```
3. Create these artifacts in `_bmad-output/planning-artifacts/`:
   - `product-brief.md` — Vision, users, scope
   - `prd.md` — Requirements, features, constraints
   - `architecture.md` — Tech decisions, structure
   - `epics.md` — Features broken into stories

### Phase 2: Sprint Planning

Initialize sprint tracking BEFORE developing stories:

1. **Run sprint planning:**
   ```
   /bmad-bmm-sprint-planning
   ```
2. This creates `sprint-status.yaml` to track story progress
3. Organizes stories into sprints with priorities

### Phase 3: Story Development

Develop stories one at a time:

1. **Create a story from epics:**
   ```
   /bmad-bmm-create-story
   ```
   - This generates a full story file in `implementation-artifacts/`
   - Includes acceptance criteria, tasks, test requirements

2. **Implement the story:**
   ```
   /bmad-bmm-dev-story
   ```
   - BMAD finds the next ready story automatically
   - Implements tasks, writes tests, validates

3. **Repeat** for each story in the sprint

### Phase 4: Quality & Review

After implementation:

1. **Run QA validation:**
   ```
   /bmad-bmm-testarch-test-design
   ```

2. **Check sprint status:**
   ```
   /bmad-bmm-sprint-status
   ```

## Key BMAD Commands (Claude Code)

| Command | Purpose |
|---------|---------|
| `/bmad-bmm-sprint-planning` | Initialize/manage sprint tracking |
| `/bmad-bmm-create-story` | Create story from epics |
| `/bmad-bmm-dev-story` | Implement next ready story |
| `/bmad-bmm-quick-dev` | Flexible dev (tech-specs or direct) |
| `/bmad-bmm-dev.agent` | Full dev agent persona |
| `/bmad-bmm-analyst.agent` | Planning/analysis agent |
| `/bmad-bmm-sm.agent` | Scrum master agent |
| `/bmad-bmm-sprint-status` | Check sprint progress |
| `/bmad-bmm-correct-course` | Adjust when things go off track |

## BMAD vs Direct Prompting

**Use BMAD when:**
- Starting a new project from scratch
- You want structured, repeatable process
- Multiple sprints with tracked progress
- You value ceremony and documentation

**Use direct prompting when:**
- Retrofitting existing codebase
- Quick fixes or one-off features
- Project is already mid-flight without BMAD setup

## Example: Starting a New Project

```bash
# 1. Clone the starter
git clone https://github.com/1Jadaru/jadaru-starter.git my-project
cd my-project

# 2. Start Claude Code
claude --dangerously-skip-permissions

# 3. Run analyst agent for planning
/bmad-bmm-analyst.agent
# -> Create PRD, architecture, epics in _bmad-output/planning-artifacts/

# 4. Initialize sprint tracking
/bmad-bmm-sprint-planning
# -> Creates sprint-status.yaml, organizes stories

# 5. Create first story
/bmad-bmm-create-story
# -> Generates detailed story file in implementation-artifacts/

# 6. Implement the story
/bmad-bmm-dev-story
# -> TDD implementation with validation

# 7. Repeat steps 5-6 for each story
```

## Tips

- **Don't skip sprint planning** — BMAD agents expect `sprint-status.yaml` to exist
- **Stories go in implementation-artifacts/** — Not just epics.md
- **Let BMAD drive** — The agents know the workflow; follow their prompts
- **Course correct early** — Use `/bmad-bmm-correct-course` if you drift

---

*BMAD V6 is designed for AI-assisted development. Let the agents guide the process.*
