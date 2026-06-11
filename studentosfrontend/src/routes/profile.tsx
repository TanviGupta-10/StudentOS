import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/ui-bits";
import { Button } from "@/components/ui/button";
import { achievements, user } from "@/lib/mock";
import { Flame, Trophy, Play, Pause, RotateCcw, Mail, MapPin, Calendar } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "Profile — StudentOS" }] }),
  component: Profile,
});

function Profile() {
  const currentUser: any = JSON.parse(
    localStorage.getItem("user") || "{}"
  );
  return (
    <AppShell>
      <PageHeader title="Profile" description="Your account, achievements, and focus tools." />

      <div className="grid lg:grid-cols-3 gap-5">
        {/* Profile card */}
        <div className="glass-card rounded-2xl p-6 shadow-elegant text-center relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-24 gradient-primary-bg opacity-50" />
          <div className="relative">
            <div className="size-24 rounded-full mx-auto gradient-primary-bg flex items-center justify-center text-3xl font-bold text-primary-foreground shadow-glow border-4 border-background">
              {currentUser?.name
               ? currentUser.name.split(" ").map((n: string) => n[0]).join("")
              : "U"}
            </div>
            <h2 className="mt-4 text-xl font-semibold">{JSON.parse(localStorage.getItem("user") || "{}")?.name || user.name}</h2>
            <p className="text-sm text-muted-foreground">Year 12 • Pre-Med Track</p>
            <div className="mt-5 grid grid-cols-3 gap-2 text-center">
              <div className="p-2 rounded-lg bg-white/[0.03]">
                <div className="text-lg font-semibold">{user.level}</div>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Level</div>
              </div>
              <div className="p-2 rounded-lg bg-white/[0.03]">
                <div className="text-lg font-semibold flex items-center justify-center gap-1"><Flame className="size-4 text-warning" />{user.streak}</div>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Streak</div>
              </div>
              <div className="p-2 rounded-lg bg-white/[0.03]">
                <div className="text-lg font-semibold">{user.totalHours}</div>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Hours</div>
              </div>
            </div>
            <div className="mt-5">
              <div className="flex justify-between text-xs mb-1.5">
                <span className="flex items-center gap-1"><Trophy className="size-3.5 text-warning" />XP</span>
                <span className="text-muted-foreground">{user.xp} / {user.xpToNext}</span>
              </div>
              <div className="h-2.5 rounded-full bg-muted overflow-hidden">
                <div className="h-full gradient-primary-bg" style={{ width: `${(user.xp/user.xpToNext)*100}%` }} />
              </div>
            </div>
            <ul className="mt-5 text-left text-sm space-y-2 text-muted-foreground">
              <li className="flex items-center gap-2"><Mail className="size-4" /> {currentUser?.email || "No email"}</li>
              <li className="flex items-center gap-2"><MapPin className="size-4" /> Not Set</li>
              <li className="flex items-center gap-2"><Calendar className="size-4" /> Recently Joined</li>
            </ul>
          </div>
        </div>

        {/* Pomodoro + Challenges */}
        <div className="lg:col-span-2 space-y-5">
          <PomodoroCard />

          <div className="glass-card rounded-2xl p-6 shadow-elegant">
            <h3 className="font-semibold mb-4">Achievement badges</h3>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
              {achievements.map(a => (
                <div key={a.name} className={`flex flex-col items-center p-3 rounded-xl border ${a.earned ? "bg-white/[0.04] border-primary/40 shadow-glow" : "bg-white/[0.02] border-white/5 opacity-50"}`}>
                  <div className="text-3xl">{a.icon}</div>
                  <div className="text-[11px] text-center mt-1 font-medium">{a.name}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6 shadow-elegant">
            <h3 className="font-semibold mb-4">Active challenges</h3>
            <ul className="space-y-3">
              {[
                { name: "Study 25h this week", progress: 64, reward: "+200 XP" },
                { name: "Solve 50 math problems", progress: 38, reward: "Math Wizard Badge" },
                { name: "30-day streak", progress: 40, reward: "Streak Champion" },
              ].map(c => (
                <li key={c.name} className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium">{c.name}</span>
                    <span className="text-xs gradient-text font-semibold">{c.reward}</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div className="h-full gradient-primary-bg" style={{ width: `${c.progress}%` }} />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

function PomodoroCard() {
  const [seconds, setSeconds] = useState(25 * 60);
  const [running, setRunning] = useState(false);
  const ref = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (running) {
      ref.current = setInterval(() => {
        setSeconds(s => {
          if (s <= 1) {
            setRunning(false);
            toast.success("🎉 Pomodoro complete! +50 XP");
            return 25 * 60;
          }
          return s - 1;
        });
      }, 1000);
    }
    return () => { if (ref.current) clearInterval(ref.current); };
  }, [running]);

  const m = Math.floor(seconds / 60).toString().padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  const pct = ((25 * 60 - seconds) / (25 * 60)) * 100;

  return (
    <div className="glass-card rounded-2xl p-6 shadow-elegant relative overflow-hidden">
      <div className="absolute -top-20 -right-20 size-64 rounded-full gradient-primary-bg opacity-20 blur-3xl" />
      <div className="relative flex items-center gap-6">
        <div className="relative size-32 shrink-0">
          <svg className="size-32 -rotate-90">
            <circle cx="64" cy="64" r="56" stroke="rgba(255,255,255,0.08)" strokeWidth="8" fill="none" />
            <circle cx="64" cy="64" r="56" stroke="url(#pomoGrad)" strokeWidth="8" fill="none" strokeDasharray={2 * Math.PI * 56} strokeDashoffset={2 * Math.PI * 56 * (1 - pct / 100)} strokeLinecap="round" className="transition-all" />
            <defs>
              <linearGradient id="pomoGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="oklch(0.56 0.24 290)" />
                <stop offset="100%" stopColor="oklch(0.72 0.15 210)" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold font-mono">{m}:{s}</div>
        </div>
        <div className="flex-1">
          <h3 className="font-semibold">Focus timer</h3>
          <p className="text-sm text-muted-foreground mt-1">25-min Pomodoro session</p>
          <div className="mt-4 flex gap-2">
            <Button onClick={() => setRunning(r => !r)} className="gradient-primary-bg shadow-glow">
              {running ? <><Pause className="size-4 mr-1" />Pause</> : <><Play className="size-4 mr-1" />Start</>}
            </Button>
            <Button variant="outline" onClick={() => { setRunning(false); setSeconds(25 * 60); }}>
              <RotateCcw className="size-4 mr-1" />Reset
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
