# My Nutririon

🌐 Live: https://yurikilian.github.io/mynutrition/

Static frontend planner for a 7-day nutrition protocol, built for fast day-to-day meal decisions with calorie-safe swaps.

## 1) Business Understanding

### Product Goal
Help a user follow a fixed daily target (`1670 kcal/day`) with low-friction planning and substitution, without breaking calorie constraints.

### Primary User Context
- Male, 35 years old, sedentary routine.
- Fixed caloric target already defined.
- Needs practical execution, not dynamic metabolic calculations.

### Core Value Proposition
- Plan is ready immediately (7 days pre-filled).
- Every swap keeps caloric equivalence by slot.
- Locks protect user intent during shuffle.
- PDF exports support sharing/printing (card, day, week).

### Functional Scope
- 4 meals/day:
  - Breakfast (`250 kcal`)
  - Lunch (`670 kcal`)
  - Snack (`410 kcal = 250 + 90 + 70`)
  - Dinner (`340 kcal`)
- Interactions:
  - Shuffle meal/day/week
  - Manual swap by valid equivalents
  - Lock/unlock meal
  - Reset day or full plan
  - Export PDF (card/day/week)
- Persistence:
  - State stored in `localStorage`

### UX Principles Implemented
- Mobile-first navigation and actions.
- Touch-friendly controls and swipe between days.
- Clear calorie/time indicators per meal.
- Fast feedback via toast notifications.

---

## 2) Developer Experience (DX)

### Stack
- React + TypeScript + Vite
- Tailwind CSS
- shadcn/ui + Radix primitives
- `sonner` for toasts
- `html2canvas` + `jsPDF` for exports

### Run Locally
```bash
pnpm install
pnpm dev
```

### Quality Commands
```bash
pnpm lint
pnpm build
```

### Project Structure
```text
src/
  components/
  data/
  lib/
  types/
```

Key files:
- `src/components/meal-plan-page.tsx`: top-level page composition and global actions
- `src/components/day-view.tsx`: current-day rendering and day-level actions
- `src/components/meal-card.tsx`: meal card UI + meal-level actions
- `src/lib/shuffle.ts`: shuffle/swap rules
- `src/lib/kcal.ts`: calorie invariants
- `src/lib/pdf.ts`: PDF export pipeline
- `src/lib/storage.ts`: localStorage persistence

### Business Rules for Developers
- Do not change slot calories.
- Snack must remain `250 + 90 + 70`.
- Locks block both shuffle and manual swap for that slot.
- Reset day/plan restores initial state and clears locks.
- Shuffle must avoid immediate repetition when alternatives exist.

### PDF Export Notes
- Export modes: card/day/week.
- Week export uses one page per day.
- Non-exportable controls are hidden using `.no-export`.
- Theme color compatibility is handled in export utilities.

---

## 3) Repository Operations

### Git
- Main branch: `main`
- Remote: `origin` (`https://github.com/yurikilian/mynutrition.git`)

### Local Codex History Tracker (SQLite)
Database is versioned in-repo:
- `.codex/history/history.db`

Commands:
```bash
pnpm history:init
pnpm history:tail
```

Manual event logging:
```bash
bash scripts/history/log.sh codex note "summary" "optional-ref" "optional-details"
```

Automatic commit logging:
- Hook file: `.githooks/post-commit`
- Enable hook path:
```bash
git config core.hooksPath .githooks
```

### Agent Conventions
See:
- `AGENTS.md`
