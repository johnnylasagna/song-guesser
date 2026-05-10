# Song Guesser

A music guessing game built with React. Load a YouTube playlist, listen to a short clip, and guess the song.

## Features

- Load songs from any YouTube playlist
- Play a randomized clip before each guess
- Multiple-choice mode or full playlist selection with search
- Score tracking across attempts
- Option to remove correctly guessed songs from the pool

## Tech Stack

React 19, Vite, React YouTube, Font Awesome

## Getting Started

You'll need Node.js 18+, npm, and a YouTube Data API key.

```bash
npm install
```

Create a `.env` file in the project root:

```env
YOUTUBE_API_KEY=your_api_key_here
```

```bash
npm run dev
```

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## Notes

- Spotify and Apple Music buttons are present but not yet implemented
- Requires a valid YouTube Data API key — without it, playlists won't load