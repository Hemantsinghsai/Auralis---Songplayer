export default function Art({ hue, className = "" }: { hue: number; className?: string }) {
  return (
    <div
      className={`relative overflow-hidden rounded-xl ${className}`}
      style={{ background: `linear-gradient(135deg, hsl(${hue} 85% 58%), hsl(${(hue + 70) % 360} 85% 35%))` }}
    >
      <div className="absolute -right-1/4 -top-1/4 h-3/4 w-3/4 rounded-full bg-white/15 blur-xl" />
      <div className="absolute bottom-0 left-0 h-1/2 w-full bg-gradient-to-t from-black/40 to-transparent" />
    </div>
  );
}
