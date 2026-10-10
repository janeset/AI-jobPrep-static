# AI / LLM Prep

AI engineering prep for LLM roles around Toronto and Kitchener-Waterloo: an 8-week track with
runnable Python exercises and projects, IBM Technology videos, AWS AI certification practice,
and the skills real AI Engineer postings ask for. No build step, no backend: plain HTML, CSS and
JavaScript. One of four Job Preps apps, each in its own repo: DSA Prep, Cloud Prep, AI / LLM Prep and System Design Prep.

## Run it

```bash
python -m http.server 5176
```

Then visit http://localhost:5176. Opening `index.html` directly also works, but embedded videos need a server.

## What's inside

| Page | What it does |
| --- | --- |
| Home | Track progress, AWS readiness, role readiness, a weekly rhythm and the 8 weeks at a glance |
| AI / LLM | Overview, roadmap, lessons with runnable Python exercises, interview question bank, exam-style quiz, projects with resume bullets, certification paths |
| AI / LLM > IBM Videos | Every IBM Technology playlist playable in the app with done-tracking and links to matching lessons, an expandable list of every video in each playlist, the IBM videos picked for each lesson, and a title search |
| AWS Certs | Exam prep for AIF-C01 and AIP-C01: official domains and weightings, study notes, readiness checklists, week-by-week plans, timed practice exams and tutor mode with per-domain results |
| Interview | Timed mock interviews (technical questions for AI Engineer or AI Cloud Engineer, plus behavioural) with self-scoring; weak answers are flagged "Review again" in the question bank. STAR story bank with theme and skill coverage; history |
| Roles | AI Engineer and AI Cloud Engineer: skill demand across postings, self-rating and readiness, per-posting fit and prep notes, an **Add posting** form with skill suggestions, gap lessons, questions, quiz and projects |
| Companies | What AI interviews look like at each tier of local employer, and an application tracker linked to postings |
| Settings | 9 themes, accent colour, text size, density, plan start date, export / import |
| Search | **Ctrl+K** (or **/**) searches lessons, questions, projects, AWS domains, role skills, postings, IBM videos and your stories |

Python exercises are auto-graded in the browser via [Pyodide](https://pyodide.org) (loaded from a CDN on first run).

## Files

| File | Contents |
| --- | --- |
| `index.html`, `style.css`, `app.js` | App shell, design system / themes, Home / Companies / Settings and the Python runner |
| `tracks.js` | Video helpers (including `IBM`), the track registry and `extendTrack` (loaded first) |
| `ai.js`, `ai-more.js` | AI / LLM track content, and extra lessons, exercises, questions and glossary merged into it |
| `trackview.js` | Track engine (overview, learn, questions, quiz, projects, certs) and the Home page |
| `ibmvideos.js`, `ibmplaylists.js` | IBM Technology playlists, the IBM Videos tab, and every video in each playlist |
| `awscerts.js`, `awsview.js` | AWS certification content and the practice-exam engine |
| `roles.js` | Role definitions, the shared skill catalog, skill keywords and built-in postings |
| `roles-learn.js` | Roles lessons, questions, quiz, projects and glossary |
| `roleview.js` | Roles pages: demand, readiness, postings and the add-posting form |
| `interview.js` | Mock interviews, behavioural question bank, STAR story bank and mock history |
| `router.js` | URL routing (`#/ai/learn/rag`, `#/ai/ibm/...`, `#/aws/aif`...): refresh, Back/Forward and bookmarks |
| `search.js` | Search index and the Ctrl+K dialog |

## Your data

Progress is stored in the browser's `localStorage` under `ai-prep-v1`, including postings you
add, stories and mock history. Use **Settings > Export** to back it up. An export from the
combined Prep Hub app imports here too (its AI track, IBM, AWS and Roles progress carries over).
