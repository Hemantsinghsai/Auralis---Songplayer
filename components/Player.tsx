import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from "lucide-react";
import Art from "./Art";
import { Track, fmt } from "@/lib/data";

type Props = {
  track: Track; playing: boolean; progress: number; volume: number;
  onToggle: () => void; onPrev: () => void; onNext: () => void;
  onSeek: (s: number) => void; onVolume: (v: number) => void;
};

export default function Player({ track, playing, progress, volume, onToggle, onPrev, onNext, onSeek, onVolume }: Props) {
  const range = "h-1 w-full cursor-pointer accent-violet-500";
  return (
    <footer className="grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-2 border-t border-white/10 bg-panel/95 px-4 py-3 backdrop-blur md:grid-cols-[1fr_2fr_1fr]">
      <div className="flex min-w-0 items-center gap-3">
        <Art hue={track.hue} className="h-12 w-12 shrink-0" />
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-white">{track.title}</p>
          <p className="truncate text-xs text-slate-400">{track.artist}</p>
        </div>
      </div>
      <div className="flex flex-col items-center gap-1">
        <div className="flex items-center gap-4">
          <button aria-label="Previous" onClick={onPrev} className="text-slate-400 transition hover:text-white"><SkipBack size={20} /></button>
          <button
            aria-label={playing ? "Pause" : "Play"}
            onClick={onToggle}
            className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-violet-500 to-cyan-400 text-white shadow-lg shadow-violet-500/30 transition hover:scale-105"
          >
            {playing ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
          </button>
          <button aria-label="Next" onClick={onNext} className="text-slate-400 transition hover:text-white"><SkipForward size={20} /></button>
        </div>
        <div className="hidden w-full max-w-md items-center gap-2 text-[11px] text-slate-500 md:flex">
          <span className="w-8 text-right">{fmt(progress)}</span>
          <input type="range" aria-label="Progress" min={0} max={track.duration} value={progress} onChange={(e) => onSeek(+e.target.value)} className={range} />
          <span className="w-8">{fmt(track.duration)}</span>
        </div>
      </div>
      <div className="hidden items-center justify-end gap-2 md:flex">
        <button aria-label="Mute" onClick={() => onVolume(volume ? 0 : 70)} className="text-slate-400 hover:text-white">
          {volume ? <Volume2 size={18} /> : <VolumeX size={18} />}
        </button>
        <input type="range" aria-label="Volume" min={0} max={100} value={volume} onChange={(e) => onVolume(+e.target.value)} className={`${range} max-w-28`} />
      </div>
      <input type="range" aria-label="Progress" min={0} max={track.duration} value={progress} onChange={(e) => onSeek(+e.target.value)} className={`${range} col-span-2 md:hidden`} />
    </footer>
  );
}
