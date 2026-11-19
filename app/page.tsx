
"use client";

import { useEffect, useRef, useState } from "react";
import Sidebar, { ViewId } from "@/components/Sidebar";
import Player from "@/components/Player";
import Views from "@/components/Views";
import { Track, tracks } from "@/lib/data";

export default function Page() {
  const audioRef = useRef<HTMLAudioElement>(null);

  const [view, setView] = useState<ViewId>("home");
  const [query, setQuery] = useState("");
  const [current, setCurrent] = useState<Track>(tracks[0]);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(70);
  const [audioDuration, setAudioDuration] = useState(0);

  const step = (d: number) => {
    const i = tracks.findIndex((t) => t.id === current.id);
    setCurrent(tracks[(i + d + tracks.length) % tracks.length]);
  };

  const play = (t: Track) => {
    setCurrent(t);
    setPlaying(true);
  };

  // Reset when changing tracks
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.currentTime = 0;
    setProgress(0);
  }, [current.id]);

  // Actual audio playback
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.play().catch((error) => {
        console.error("Audio playback failed:", error);
        setPlaying(false);
      });
    } else {
      audio.pause();
    }
  }, [playing, current.id]);

  // Volume control
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  const handleSeek = (value: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value;
      setProgress(value);
    }
  };

  const playerTrack = {
    ...current,
    duration: audioDuration || current.duration,
  };

  return (
    <div className="flex h-screen flex-col bg-gradient-to-b from-midnight to-black">

      <audio
        ref={audioRef}
        src={current.audioSrc}
        preload="metadata"
        onLoadedMetadata={(e) =>
          setAudioDuration(e.currentTarget.duration)
        }
        onTimeUpdate={(e) =>
          setProgress(e.currentTarget.currentTime)
        }
        onEnded={() => step(1)}
        onError={() => setPlaying(false)}
      />

      <div className="flex min-h-0 flex-1 flex-col md:flex-row">

        <Sidebar view={view} setView={setView} />

        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <Views
            view={view}
            setView={setView}
            query={query}
            setQuery={setQuery}
            current={current}
            playing={playing}
            play={play}
          />
        </main>

      </div>

      <Player
        track={playerTrack}
        playing={playing}
        progress={progress}
        volume={volume}
        onToggle={() => setPlaying((p) => !p)}
        onPrev={() => step(-1)}
        onNext={() => step(1)}
        onSeek={handleSeek}
        onVolume={setVolume}
      />

    </div>
  );
}
