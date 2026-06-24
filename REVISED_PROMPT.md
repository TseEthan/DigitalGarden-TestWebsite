# Revised Prompt — Ethan Tse, "A Digital Garden" (v2)

Build the personal-brand site for Ethan Tse — a digital-garden-style site organized around a
person and their thinking (who they are, how they operate, what they believe), not a portfolio of
work products. This is **v2**, iterating on the v1 draft (frozen at `drafts/v1.html`).

## Phase 1 — Build (use the frontend-design skill)

Before coding, commit to a BOLD-but-grounded aesthetic direction and state it (Purpose / Tone /
Constraints / Differentiation). Default tone is **minimalistic and grounded** with a warm
"herbarium" feeling for the palette and vibe — but the literal herbarium/garden *metaphors in the
copy are optional*; let the design carry the feeling, not the words.

**Keep (from v1):** purpose, tone, color scheme, the grounded vibe; the **sticky side table of
contents** that shows the sections and tracks the current one (keep functionally); the minimalist
feel; the distinctive non-generic type (Young Serif display + Hanken Grotesk body); WCAG AA
contrast; reduced-motion + no-JS fallbacks.

### Structure — each section AND subsection is its own webpage (route)
- **About** (home)
- **25 Learnings**
- **Systems** → subsection **ATOM** (own page)
- **Articles** → each article its own page (editable, to be filled in later)
- **Contact**

Sticky ToC sidebar: pinned while scrolling, highlights the current page; collapses to a top/overlay
menu on mobile.

### Intro animation (first load → opens into the site)
Keep the line **"My digital garden — where I go to muse."** It appears, then a **calm wind with
stylized (NOT photo-realistic) leaves** blows the words away, before opening into the site.
**Total duration: 3.5 seconds, start to finish.** Respect `prefers-reduced-motion`.

### About page content
- **"Hi, I'm Ethan Tse. Curious at the intersection of knowledge, execution, and people — across
  technology, healthcare, and beyond."** (This is the single place the name appears — remove the
  duplicate "Ethan Tse" brand label elsewhere.)
- **North Star:** "Be a force multiplier for the people shaping real progress."
- Below the North Star, **four simple boxes** (capability-oriented, less metaphor):
  - **Strategy** — *Turning complexity into direction.* Using knowledge, trends, and incentives to
    identify the next step.
  - **Operations** — *Turning chaos into function.* Building systems and processes that consistently
    execute.
  - **Business Development** — *Turning leads into opportunities.* Developing partnerships,
    ecosystems, and channels that grow over time.
  - **Innovation** — *Turning possibilities into proof.* Exploring new ideas, debates, and futures
    before they're obvious.

### Systems page
- Section title: **"Systems"** (replaces "Frameworks I build & run.").
- **SaaS I use for productivity** — a simple list: Claude, Gemini, Perplexity, ChatGPT, Grok,
  Notion, NotebookLM, WisprFlow, Dia, Focus To-Do, Calendly, Slack, Granola AI, Airtable, Poke,
  Spotify, LastPass.
- **Subsection — ATOM · Agentic Task Ontology Model**
  - subtitle: "under construction 🚧!"
  - sub-subtitle: "A framework for how I think about 'system-izable' tasks by documenting the what,
    why, and how."

### Articles page
- Keep editable — placeholder/scaffold so Ethan can fill these in later.

### Contact page
- Remove "The door to the garden is always open."
- Remove "Grown by hand · tended with intent."
- Remove "Tending since 2024 / ethantse15@gmail.com."
- Replace contact details with: **Email — contact.ethantse@gmail.com**,
  **LinkedIn — https://www.linkedin.com/in/tse-ethan/**.

### "Wow" creative direction (expert designer / animator / storyteller)
Without being over-the-top, add **tasteful** visual moments that make a visitor think "this person
has extraordinary creativity." Create something cool for **two** sections — **About** and
**Systems**.
- *Intended tool: Higgsfield (used ≥2×).* If Higgsfield is unavailable in the environment, deliver
  equivalent bespoke, hand-coded generative visuals and leave them swappable for real Higgsfield
  assets later.

### Constraints
Vanilla HTML/CSS/JS; distinctive type; performant; accessible; serve on **a new local host** for
preview (separate from the v1 server). Follow `WebDesign.CLAUDE.md`: serve on localhost, screenshot
from localhost, run the compare-and-fix screenshot loop until it matches intent.

## Phase 2 — Refine (use the impeccable skill)
Once functionally complete and screenshot-clean, run the impeccable skill as a separate audit pass
over the live site (visual hierarchy, spacing, typography, accessibility, responsive behavior incl.
the ToC mobile collapse and current-page tracking, motion, and cohesion against the stated
direction). Apply fixes directly.
