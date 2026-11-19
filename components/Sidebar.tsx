import { Home, Compass, Search, Library, ListMusic, Route, ListEnd, AudioWaveform } from "lucide-react";

export const NAV = [
  { id: "home", label: "Home", icon: Home },
  { id: "discover", label: "Discover", icon: Compass },
  { id: "search", label: "Search", icon: Search },
  { id: "library", label: "Your Library", icon: Library },
  { id: "playlists", label: "Playlists", icon: ListMusic },
  { id: "journey", label: "Music Journey", icon: Route },
  { id: "queue", label: "Smart Queue", icon: ListEnd },
] as const;
export type ViewId = (typeof NAV)[number]["id"];

export function Logo() {
  return (
    <div className="flex items-center gap-2.5">
      <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-violet-500 to-cyan-400 shadow-lg shadow-violet-500/30">
        <AudioWaveform size={20} className="text-white" />
      </div>
      <span className="text-xl font-semibold tracking-tight text-white">Auralis</span>
    </div>
  );
}

export default function Sidebar({ view, setView }: { view: ViewId; setView: (v: ViewId) => void }) {
  return (
    <>
      <aside className="hidden w-64 shrink-0 flex-col gap-8 border-r border-white/5 bg-panel/60 p-5 md:flex">
        <Logo />
        <nav className="flex flex-col gap-1">
          {NAV.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setView(id)}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${
                view === id ? "bg-gradient-to-r from-violet-500/25 to-cyan-400/10 text-white" : "text-slate-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon size={18} className={view === id ? "text-cyan-300" : ""} /> {label}
            </button>
          ))}
        </nav>
        <p className="mt-auto text-xs text-slate-500">Feel Every Frequency.<br />Prototype · demo data only</p>
      </aside>
      <div className="border-b border-white/5 bg-panel/60 p-3 md:hidden">
        <Logo />
        <nav className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {NAV.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setView(id)}
              className={`shrink-0 rounded-full px-3 py-1.5 text-xs ${view === id ? "bg-violet-500 text-white" : "bg-white/5 text-slate-400"}`}
            >
              {label}
            </button>
          ))}
        </nav>
      </div>
    </>
  );
}
