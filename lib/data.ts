
// All music data below is fictional demonstration data.

export type Track = {
  id: number;
  title: string;
  artist: string;
  album: string;
  hue: number;
  duration: number;
  mood: string;
  audioSrc: string;
};

export const tracks: Track[] = [
  { id: 1, title: "Neon Horizon", artist: "Kira Vale", album: "Afterglow", hue: 270, duration: 214, mood: "energetic synthwave", audioSrc: "/audio/demo.mp3" },
  { id: 2, title: "Static Bloom", artist: "Moon Atlas", album: "Night Garden", hue: 190, duration: 187, mood: "dreamy chill", audioSrc: "/audio/demo.mp3" },
  { id: 3, title: "Low Tide Signals", artist: "Oro & The Wave", album: "Salt Air", hue: 210, duration: 242, mood: "calm focus", audioSrc: "/audio/demo.mp3" },
  { id: 4, title: "Velvet Circuit", artist: "Kira Vale", album: "Afterglow", hue: 300, duration: 198, mood: "late night electronic", audioSrc: "/audio/demo.mp3" },
  { id: 5, title: "Paper Satellites", artist: "Juno Park", album: "Orbit Notes", hue: 240, duration: 226, mood: "indie uplifting", audioSrc: "/audio/demo.mp3" },
  { id: 6, title: "Glass Rain", artist: "Moon Atlas", album: "Night Garden", hue: 175, duration: 203, mood: "rainy day ambient", audioSrc: "/audio/demo.mp3" },
  { id: 7, title: "Run the Skyline", artist: "Dax Orion", album: "Highway Pulse", hue: 330, duration: 176, mood: "workout energetic", audioSrc: "/audio/demo.mp3" },
  { id: 8, title: "Quiet Engines", artist: "Oro & The Wave", album: "Salt Air", hue: 200, duration: 255, mood: "calm focus", audioSrc: "/audio/demo.mp3" },
  { id: 9, title: "Hearts in Reverb", artist: "Juno Park", album: "Orbit Notes", hue: 260, duration: 191, mood: "romantic dreamy", audioSrc: "/audio/demo.mp3" },
  { id: 10, title: "Overdrive Bloom", artist: "Dax Orion", album: "Highway Pulse", hue: 20, duration: 208, mood: "workout energetic", audioSrc: "/audio/demo.mp3" },
  { id: 11, title: "Midnight Cartography", artist: "Lumen Row", album: "Blue Hours", hue: 225, duration: 233, mood: "late night chill", audioSrc: "/audio/demo.mp3" },
  { id: 12, title: "Afterimage", artist: "Lumen Row", album: "Blue Hours", hue: 285, duration: 219, mood: "late night electronic", audioSrc: "/audio/demo.mp3" },
];

export const albums = [
  { name: "Afterglow", artist: "Kira Vale", hue: 270 },
  { name: "Night Garden", artist: "Moon Atlas", hue: 190 },
  { name: "Salt Air", artist: "Oro & The Wave", hue: 210 },
  { name: "Orbit Notes", artist: "Juno Park", hue: 240 },
  { name: "Highway Pulse", artist: "Dax Orion", hue: 330 },
  { name: "Blue Hours", artist: "Lumen Row", hue: 225 },
];

export const playlists = [
  { name: "Deep Focus", desc: "Calm, steady textures for work", hue: 205, ids: [3, 8, 6, 11] },
  { name: "After Dark", desc: "Late-night electronic glow", hue: 285, ids: [4, 12, 1, 11] },
  { name: "Power Hour", desc: "High-energy workout fuel", hue: 340, ids: [7, 10, 1, 5] },
  { name: "Rainy Window", desc: "Ambient and dreamy", hue: 180, ids: [6, 2, 9, 3] },
];

export const fmt = (s: number) =>
  `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
