"use client";
import { useEffect, useState } from "react";
import { Play, Search, MessageSquareText, AudioLines, Route, ListEnd } from "lucide-react";
import Art from "./Art";
import { ViewId } from "./Sidebar";
import { Track, albums, fmt, playlists, tracks } from "@/lib/data";

type Props = { view: ViewId; setView: (v: ViewId) => void; query: string; setQuery: (q: string) => void; current: Track; playing: boolean; play: (t: Track) => void };

const byId = (ids: number[]) => ids.map((id) => tracks.find((t) => t.id === id)!);
const Heading = ({ children, sub }: { children: React.ReactNode; sub?: string }) => (
  <div className="mb-4 mt-10 first:mt-0">
    <h2 className="text-xl font-semibold text-white">{children}</h2>
    {sub && <p className="text-sm text-slate-500">{sub}</p>}
  </div>
);
const Demo = () => <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-2 py-0.5 text-[10px] uppercase tracking-wide text-cyan-300">Demo data</span>;

function Visualizer({ active }: { active: boolean }) {
  return (
    <div className={`flex h-16 items-end gap-1 ${active ? "" : "paused"}`} aria-hidden>
      {Array.from({ length: 28 }, (_, i) => (
        <span key={i} className="eq-bar w-1.5 flex-1 rounded-full bg-gradient-to-t from-violet-500 to-cyan-300" style={{ height: "100%", animationDelay: `${(i * 97) % 900}ms`, animationDuration: `${700 + ((i * 131) % 700)}ms` }} />
      ))}
    </div>
  );
}

function Rows({ list, current, playing, play }: { list: Track[]; current: Track; playing: boolean; play: (t: Track) => void }) {
  if (!list.length) return <p className="py-10 text-center text-slate-500">No tracks match your search.</p>;
  return (
    <div className="flex flex-col">
      {list.map((t, i) => (
        <button key={t.id} onClick={() => play(t)} className="group grid grid-cols-[2rem_1fr_auto] items-center gap-3 rounded-xl px-3 py-2 text-left transition hover:bg-white/5 md:grid-cols-[2rem_1fr_1fr_auto]">
          <span className={`text-sm ${t.id === current.id ? "text-cyan-300" : "text-slate-500"}`}>{t.id === current.id && playing ? "♪" : i + 1}</span>
          <span className="flex min-w-0 items-center gap-3">
            <Art hue={t.hue} className="h-10 w-10 shrink-0" />
            <span className="min-w-0">
              <span className={`block truncate text-sm ${t.id === current.id ? "text-cyan-300" : "text-white"}`}>{t.title}</span>
              <span className="block truncate text-xs text-slate-400">{t.artist}</span>
            </span>
          </span>
          <span className="hidden truncate text-sm text-slate-500 md:block">{t.album}</span>
          <span className="text-xs text-slate-500">{fmt(t.duration)}</span>
        </button>
      ))}
    </div>
  );
}

const features = [
  { icon: MessageSquareText, title: "Conversational Music Search", text: "Describe a mood or moment and find music. Currently simple keyword matching on sample data; no AI yet.", view: "search" as ViewId },
  { icon: AudioLines, title: "Dynamic Music Visualizer", text: "Animated frequency bars that react to play/pause. Decorative for now, not driven by real audio.", view: "home" as ViewId },
  { icon: Route, title: "Music Journey", text: "A timeline of your listening story. Uses hard-coded sample stats.", view: "journey" as ViewId },
  { icon: ListEnd, title: "Smart Queue", text: "An up-next view built for mood-aware ordering. Static demo order today.", view: "queue" as ViewId },
];

export default function Views({ view, setView, query, setQuery, current, playing, play }: Props) {
  const [greeting, setGreeting] = useState("Welcome back");
  const [mood, setMood] = useState<string | null>(null);
  const [openPl, setOpenPl] = useState<string | null>(null);
  useEffect(() => {
    const h = new Date().getHours();
    setGreeting(h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening");
  }, []);
  const rp = { current, playing, play };

  if (view === "home")
    return (
      <>
        <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-violet-600/30 via-panel to-cyan-500/20 p-6 md:p-10">
          <p className="text-sm text-cyan-300">{greeting}</p>
          <h1 className="mt-1 text-3xl font-bold text-white md:text-5xl">Feel Every Frequency.</h1>
          <p className="mt-3 max-w-xl text-slate-300">Pick up where you left off, or explore something new.</p>
          <button onClick={() => play(tracks[0])} className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-midnight transition hover:scale-105"><Play size={16} /> Play featured mix</button>
          <div className="mt-8 max-w-xl"><Visualizer active={playing} /></div>
        </section>

        <Heading sub="Hand-picked from the demo catalogue">Featured music</Heading>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {tracks.slice(0, 4).map((t) => (
            <button key={t.id} onClick={() => play(t)} className="group rounded-2xl bg-panel p-3 text-left transition hover:-translate-y-1 hover:bg-white/5">
              <Art hue={t.hue} className="aspect-square w-full" />
              <p className="mt-3 truncate text-sm font-medium text-white">{t.title}</p>
              <p className="truncate text-xs text-slate-400">{t.artist}</p>
            </button>
          ))}
        </div>

        <Heading>Recently played</Heading>
        <Rows list={tracks.slice(4, 8)} {...rp} />

        <Heading>Popular albums</Heading>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {albums.map((a) => (
            <button key={a.name} onClick={() => play(tracks.find((t) => t.album === a.name)!)} className="w-40 shrink-0 rounded-2xl bg-panel p-3 text-left transition hover:-translate-y-1">
              <Art hue={a.hue} className="aspect-square w-full" />
              <p className="mt-3 truncate text-sm font-medium text-white">{a.name}</p>
              <p className="truncate text-xs text-slate-400">{a.artist}</p>
            </button>
          ))}
        </div>

        <Heading>Recommended playlists</Heading>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {playlists.map((p) => (
            <button key={p.name} onClick={() => setView("playlists")} className="flex items-center gap-4 rounded-2xl bg-panel p-3 text-left transition hover:bg-white/5">
              <Art hue={p.hue} className="h-16 w-16 shrink-0" />
              <span><span className="block font-medium text-white">{p.name}</span><span className="text-xs text-slate-400">{p.desc}</span></span>
            </button>
          ))}
        </div>

        <Heading sub="The four pillars of Auralis. Prototypes only; see status notes.">Signature features</Heading>
        <div className="grid gap-4 md:grid-cols-2">
          {features.map(({ icon: Icon, title, text, view: v }) => (
            <button key={title} onClick={() => setView(v)} className="rounded-2xl border border-white/10 bg-gradient-to-br from-panel to-midnight p-5 text-left transition hover:border-violet-400/50">
              <Icon className="mb-3 text-cyan-300" size={24} />
              <p className="font-semibold text-white">{title}</p>
              <p className="mt-1 text-sm text-slate-400">{text}</p>
            </button>
          ))}
        </div>
      </>
    );

  if (view === "search") {
    const q = query.trim().toLowerCase();
    const results = q ? tracks.filter((t) => [t.title, t.artist, t.album, t.mood].some((f) => f.toLowerCase().includes(q))) : tracks;
    return (
      <>
        <Heading sub="Conversational search is a planned feature. This prototype does keyword matching on title, artist, album and mood.">Search</Heading>
        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-panel px-4 py-3 focus-within:border-violet-400">
          <Search size={18} className="text-slate-500" />
          <input autoFocus value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Try “late night”, “calm focus” or an artist…" className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500" />
        </div>
        <div className="mt-6"><Rows list={results} {...rp} /></div>
      </>
    );
  }

  if (view === "discover") {
    const moods = Array.from(new Set(tracks.flatMap((t) => t.mood.split(" "))));
    const list = mood ? tracks.filter((t) => t.mood.includes(mood)) : tracks;
    return (
      <>
        <Heading sub="Browse the demo catalogue by mood keyword">Discover</Heading>
        <div className="mb-6 flex flex-wrap gap-2">
          {moods.map((m) => (
            <button key={m} onClick={() => setMood(mood === m ? null : m)} className={`rounded-full px-4 py-1.5 text-sm capitalize transition ${mood === m ? "bg-violet-500 text-white" : "bg-white/5 text-slate-300 hover:bg-white/10"}`}>{m}</button>
          ))}
        </div>
        <Rows list={list} {...rp} />
      </>
    );
  }

  if (view === "library") return (<><Heading sub="Sample library (no accounts yet)">Your Library</Heading><Rows list={tracks} {...rp} /></>);

  if (view === "playlists")
    return (
      <>
        <Heading sub="Sample playlists">Playlists</Heading>
        <div className="grid gap-4 sm:grid-cols-2">
          {playlists.map((p) => (
            <button key={p.name} onClick={() => setOpenPl(openPl === p.name ? null : p.name)} className={`flex items-center gap-4 rounded-2xl p-3 text-left transition ${openPl === p.name ? "bg-white/10" : "bg-panel hover:bg-white/5"}`}>
              <Art hue={p.hue} className="h-16 w-16 shrink-0" />
              <span><span className="block font-medium text-white">{p.name}</span><span className="text-xs text-slate-400">{p.desc} · {p.ids.length} tracks</span></span>
            </button>
          ))}
        </div>
        {openPl && <div className="mt-6"><Rows list={byId(playlists.find((p) => p.name === openPl)!.ids)} {...rp} /></div>}
      </>
    );

  if (view === "journey") {
    const stats = [["Mar", 42, 270], ["Apr", 58, 220], ["May", 35, 190], ["Jun", 71, 300], ["Jul", 64, 330], ["Aug", 88, 250]] as const;
    return (
      <>
        <Heading sub="Your listening story over time">Music Journey <Demo /></Heading>
        <div className="rounded-2xl bg-panel p-6">
          <p className="mb-4 text-sm text-slate-400">Hours listened per month (sample figures, not real analytics)</p>
          <div className="flex h-48 items-end gap-3">
            {stats.map(([m, h, hue]) => (
              <div key={m} className="flex flex-1 flex-col items-center gap-2">
                <div className="w-full rounded-t-xl transition hover:opacity-80" style={{ height: `${h * 1.8}px`, background: `linear-gradient(to top, hsl(${hue} 80% 40%), hsl(${hue} 90% 65%))` }} />
                <span className="text-xs text-slate-500">{m}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[["Top mood", "Late night electronic"], ["Top artist", "Kira Vale"], ["Discoveries", "27 new artists"]].map(([k, v]) => (
            <div key={k} className="rounded-2xl bg-panel p-5"><p className="text-xs uppercase text-slate-500">{k}</p><p className="mt-1 font-semibold text-white">{v}</p></div>
          ))}
        </div>
      </>
    );
  }

  const idx = tracks.findIndex((t) => t.id === current.id);
  const upNext = [...tracks.slice(idx + 1), ...tracks.slice(0, idx)];
  return (
    <>
      <Heading sub="Mood-aware queueing is planned. This shows the catalogue in order after the current track.">Smart Queue <Demo /></Heading>
      <p className="mb-2 text-xs uppercase text-slate-500">Now playing</p>
      <Rows list={[current]} {...rp} />
      <p className="mb-2 mt-8 text-xs uppercase text-slate-500">Up next</p>
      <Rows list={upNext} {...rp} />
    </>
  );
}
