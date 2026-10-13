# AI / LLM Prep

AI engineering prep for LLM roles: an 8-week track with
runnable Python exercises and projects, IBM Technology videos,
and the skills real AI Engineer postings ask for. No build step, no backend: plain HTML, CSS and
JavaScript. One of four Job Preps apps, each in its own repo: DSA Prep, Cloud Prep, AI / LLM Prep and System Design Prep.

**Live:** https://janeset.github.io/AI-jobPrep-static/

You need basic Python for the exercises; the app doesn't teach it. It links one free course,
[Kaggle Learn: Python](https://www.kaggle.com/learn/python) (about 5 hours), from Home and the AI from zero lessons.

## Run it

```bash
python -m http.server 5176
```

Then visit http://localhost:5176. Opening `index.html` directly also works, but embedded videos need a server.

## What's inside

| Page | What it does |
| --- | --- |
| Home | One **Start here** button above the fold (it opens the first lesson), "Where are you starting from?" (New to AI, or I know the AI basics) and the beginner lessons. Streak, today's count, track progress and role readiness appear once you pass your first exercise; then Start here becomes Continue. Also a weekly rhythm and the 8 weeks at a glance |
| AI / LLM | Overview, roadmap, lessons, interview question bank, exam-style quiz, projects with resume bullets, certification paths. Learn starts with **AI from zero** (5 lessons for people with no ML background; optional for people who know the basics; the exercises use a little Python, and a note links a free Python course), then 18 topics. Every lesson has a worked example you can run and at least 3 Python exercises checked in the browser, each with an example, a hint and a model answer; nothing needs an API key. A lesson is complete when all its exercises pass (Roles lessons without code: when all their checks are answered correctly). Week 1 ends with a small milestone project, **First working AI app** (a script that gets a structured JSON response from a model API, finished in one or two sessions). Projects are self-reported, with what to do, what you should see and a hint for each step, and a cost / API-key note before each project |
| Claude & Anthropic | Anthropic's official courses in learning order (AI Fluency: Framework & Foundations, Claude 101, Building with the Claude API, then the two MCP courses), the four Claude certifications with Anthropic's Partner Network eligibility note, and the OpenAI Academy courses. Every entry links to the official page and shows a "last verified" date. Also in AI / LLM > Learn (sidebar) and on the Certs page |
| AI / LLM > IBM Videos | Every IBM Technology playlist playable in the app with done-tracking and links to matching lessons, an expandable list of every video in each playlist, the IBM videos picked for each lesson, and a title search |
| Interview | Timed mock interviews (technical questions for AI Engineer, plus behavioural) with self-scoring; weak answers are flagged "Review again" in the question bank. STAR story bank with theme and skill coverage; history |
| Roles | AI Engineer: skill demand across postings, self-rating and readiness, per-posting fit and prep notes, an **Add posting** form with skill suggestions, gap lessons, questions, quiz and projects |
| Companies | What AI interviews look like at each tier of employer, and an application tracker linked to postings. The Toronto & Kitchener-Waterloo job market (example employers here, built-in local postings in Roles) is an optional setting, off by default, on Companies and Roles > Postings |
| Settings | 9 themes, accent colour, text size, density, where you're starting from, plan start date, export / import |
| Search | **Ctrl+K** (or **/**) searches lessons, Claude & Anthropic courses and certifications, questions, projects, role skills, postings, IBM videos and your stories |

Python exercises are auto-graded in the browser via [Pyodide](https://pyodide.org) (loaded from a CDN on first run, with a loading message and a 30-second timeout). Each exercise says above its code box to replace the `pass` placeholder; typing on that line replaces it, and an untouched starter is not run. Exercises have a stable `key`; progress is saved under it, so exercises can be reordered without moving anyone's progress.

### Short Learn addresses

Some Learn addresses are deliberate shortcuts to a lesson, listed in `AI.aliases` (`ai-zero.js`) and
`aliases` in `roles-learn.js`. For example `#/ai/learn/softmax` opens **Sampling in depth: logits,
softmax and temperature** (the lesson with the softmax exercise), `#/ai/learn/start` opens the first
lesson, and `#/roles/learn/azdevops` opens the CI/CD lesson it was renamed to. The address bar then
shows the lesson's own address. The start of a lesson's id or title also works when it matches only
one lesson (`#/ai/learn/sampl`). Anything else shows "Lesson not found".

## Files

| File | Contents |
| --- | --- |
| `index.html`, `style.css`, `app.js` | App shell, design system / themes, Home / Companies / Settings and the Python runner |
| `tracks.js` | Video helpers (including `IBM`), the track registry and `extendTrack` (loaded first) |
| `ai.js`, `ai-more.js` | AI / LLM track content, and extra lessons (including Sampling in depth), exercises, questions and glossary merged into it |
| `ai-zero.js` | The beginner lessons (AI from zero), plus short Learn addresses (`#/ai/learn/start`, `#/ai/learn/softmax`) |
| `trackview.js` | Track engine (overview, learn, questions, quiz, projects, certs) and the Home page: the learning path for each starting level, earned lesson completion, exercise cards, and the migration of saved exercise progress to stable exercise keys |
| `anthropic.js` | Claude & Anthropic: official courses, Claude certifications, the OpenAI Academy entry, "last verified" dates, and the page / Learn / Certs rendering |
| `ibmvideos.js`, `ibmplaylists.js` | IBM Technology playlists, the IBM Videos tab, and every video in each playlist |
| `roles.js` | Role definitions, the shared skill catalog, skill keywords and built-in postings |
| `roles-learn.js` | Roles lessons, exercises, questions, quiz (including the checks for lessons without code), projects and glossary |
| `roleview.js` | Roles pages: demand, readiness, postings and the add-posting form |
| `interview.js` | Mock interviews, behavioural question bank, STAR story bank and mock history |
| `router.js` | URL routing (`#/ai/learn/rag`, `#/ai/ibm/...`, `#/interview/mock`...): refresh, Back/Forward and bookmarks |
| `search.js` | Search index and the Ctrl+K dialog |

## Keeping external links current

Every certification, course list and video list shows a **Last verified** date. Change a date only after
re-checking that content: `PY_COURSE.verified` in `trackview.js` (the free Python course), `CLAUDE.verified` and `OPENAI_LEARN.verified` in `anthropic.js` (official
Anthropic and OpenAI pages), and `VIDEOS_VERIFIED` in `tracks.js` (every YouTube video and playlist id,
checked through YouTube's oEmbed endpoint). Exam prices are deliberately not stored: link to the official page.

## Your data

Progress is stored in the browser's `localStorage` under `ai-prep-v1`, including postings you
add, stories and mock history. Use **Settings > Export** to back it up. Backups from before stable exercise keys still import: progress moves to the new keys, and old "Mark as reviewed" ticks are kept but no longer count as complete. Progress from the removed Python beginner lessons (`pz-*` keys) is kept in the data and in exports, but not shown. An export from the
combined Prep Hub app imports here too (its AI track, IBM and Roles progress carries over).

## License

Copyright (c) 2026 Jane S. All rights reserved. See [LICENSE](LICENSE).
