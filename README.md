# Auralis

**Feel Every Frequency.**

Auralis is a premium music streaming and discovery platform. This repository contains the **initial frontend prototype**: a polished interface built on sample data, with no backend or real audio.

## Features (current prototype)

- Sidebar navigation: Home, Discover, Search, Your Library, Playlists, Music Journey, Smart Queue
- Home page with greeting, featured music, recently played, popular albums, recommended playlists
- Bottom player: play/pause, previous/next, seekable progress bar, volume and mute (simulated playback clock)
- Search that filters the demo catalogue by title, artist, album and mood keywords
- Animated visualizer, Music Journey timeline and Smart Queue views
- Responsive layout for desktop and mobile, generated gradient artwork (no copyrighted images)

## Signature features and status

| Feature | Status |
| --- | --- |
| Conversational Music Search | UI + keyword filter only. No AI. |
| Dynamic Music Visualizer | Decorative animation, not audio-reactive |
| Music Journey | Hard-coded sample stats |
| Smart Queue | Static ordering, no recommendation logic |

## Tech stack

Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS, Lucide React.

## Getting started

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build check
```

## Project structure

```
app/          Next.js layout, global styles, main page (player state)
components/   Sidebar, Player, Views, Art
lib/data.ts   Fictional demo catalogue
```

## Development status

Early frontend prototype. **Not implemented:** authentication, real streaming or audio, AI/LLM search, recommendation algorithms, analytics, database (e.g. Supabase). All tracks, artists and statistics are fictional demonstration data.

## Roadmap

1. Real audio playback integration
2. Authentication and persistence
3. AI-powered conversational search
4. Audio-reactive visualizer (Web Audio API)
5. Data-driven Music Journey and Smart Queue
