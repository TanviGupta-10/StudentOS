import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  GraduationCap,
  CheckCircle2,
  Flame,
  BarChart3,
  CalendarRange,
  Trophy,
  Brain,
  ArrowRight,
  Bot,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "StudentOS — Your AI-Powered Study Companion" },
      { name: "description", content: "Plan smarter, study better, and achieve your goals with AI." },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen hero-bg">
      {/* Nav */}
      <header className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="size-9 rounded-xl gradient-primary-bg flex items-center justify-center shadow-glow">
            <GraduationCap className="size-5 text-primary-foreground" />
          </div>
          <span className="font-semibold tracking-tight">StudentOS</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <a href="#features" className="hover:text-foreground transition">Features</a>
          <a href="#how" className="hover:text-foreground transition">How it works</a>
          <a href="#stats" className="hover:text-foreground transition">For students</a>
        </nav>
        <div className="flex items-center gap-2">
          <Link to="/login">
            <Button variant="ghost" size="sm">Sign In</Button>
          </Link>
          <Link to="/register">
            <Button size="sm" className="gradient-primary-bg text-primary-foreground shadow-glow">Get Started</Button>
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 pt-16 pb-24 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-card text-xs text-muted-foreground mb-6 animate-fade-up">
          <Sparkles className="size-3.5 text-cyan" /> AI-powered • Built for focus
        </div>
        <h1 className="text-5xl md:text-7xl font-semibold tracking-tight leading-[1.05] animate-fade-up">
          Your <span className="gradient-text">AI-Powered</span><br />Study Companion
        </h1>
        <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: "0.1s" }}>
          Plan smarter, study better, and achieve your goals with AI.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3 animate-fade-up" style={{ animationDelay: "0.2s" }}>
          <Link to="/register">
            <Button size="lg" className="gradient-primary-bg shadow-glow hover:opacity-95 transition text-base h-12 px-7">
              Start Studying Smarter <ArrowRight className="size-4 ml-1" />
            </Button>
          </Link>
          <Link to="/login">
            <Button size="lg" variant="outline" className="h-12 px-7 text-base bg-white/5">
              Sign In
            </Button>
          </Link>
        </div>

        {/* Animated dashboard preview */}
        <div className="mt-20 relative max-w-5xl mx-auto animate-fade-up" style={{ animationDelay: "0.3s" }}>
          <div className="absolute inset-x-10 -top-10 h-40 gradient-primary-bg blur-3xl opacity-40 rounded-full" />
          <div className="relative glass-card rounded-3xl p-4 md:p-6 shadow-elegant animate-float">
            <div className="flex items-center gap-1.5 mb-4 px-2">
              <span className="size-3 rounded-full bg-destructive/70" />
              <span className="size-3 rounded-full bg-warning/70" />
              <span className="size-3 rounded-full bg-success/70" />
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <PreviewCard label="Today's Goal" value="4.0 h" hint="2.3 h done" accent="from-primary/40" />
              <PreviewCard label="Study Streak" value="12 🔥" hint="Personal best" accent="from-warning/40" />
              <PreviewCard label="Tasks Today" value="4 / 7" hint="3 completed" accent="from-success/40" />
            </div>
            <div className="mt-4 grid md:grid-cols-2 gap-4">
              <div className="rounded-2xl bg-white/[0.03] border border-white/5 p-5">
                <div className="text-xs text-muted-foreground mb-3">Weekly Progress</div>
                <div className="flex items-end gap-2 h-28">
                  {[40, 70, 35, 90, 60, 100, 75].map((h, i) => (
                    <div key={i} className="flex-1 rounded-md gradient-primary-bg opacity-90" style={{ height: `${h}%`, animation: `pulse-glow 3s ${i * 0.2}s ease-in-out infinite` }} />
                  ))}
                </div>
              </div>
              <div className="rounded-2xl bg-white/[0.03] border border-white/5 p-5">
                <div className="text-xs text-muted-foreground mb-3">AI Recommendation</div>
                <div className="flex gap-3">
                  <div className="size-9 rounded-lg gradient-primary-bg flex items-center justify-center shrink-0">
                    <Bot className="size-4 text-primary-foreground" />
                  </div>
                  <div className="text-sm">
                    Review <span className="text-cyan">Integration by Parts</span> — your accuracy dropped 18% this week. A 25-min Pomodoro should bring it back.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight">Everything you need to <span className="gradient-text">crush your exams</span></h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">A focused workspace that plans your week, keeps you accountable, and adapts as you learn.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          <Feature icon={<CalendarRange className="size-5" />} title="AI Study Planner" desc="Drop in your subjects and exam dates — get a personalized schedule in seconds." />
          <Feature icon={<CheckCircle2 className="size-5" />} title="Smart Tasks" desc="Priorities, progress bars, and calendar view. Stay on top of every deadline." />
          <Feature icon={<Bot className="size-5" />} title="AI Assistant" desc="Explain concepts, summarize chapters, generate quizzes — your tutor on demand." />
          <Feature icon={<BarChart3 className="size-5" />} title="Progress Analytics" desc="See study hours, subject mastery and weekly trends at a glance." />
          <Feature icon={<Trophy className="size-5" />} title="Gamification" desc="XP, levels, daily streaks and achievement badges keep you motivated." />
          <Feature icon={<Brain className="size-5" />} title="Focus Modes" desc="Built-in Pomodoro and focus timers with celebration on every win." />
        </div>
      </section>

      {/* Stats */}
      <section id="stats" className="max-w-7xl mx-auto px-6 pb-24">
        <div className="glass-card rounded-3xl p-10 text-center shadow-elegant">
          <h3 className="text-2xl md:text-3xl font-semibold tracking-tight">Built for the way students actually learn</h3>
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-6">
            <Stat value="93%" label="report better focus" />
            <Stat value="2.4×" label="more study consistency" />
            <Stat value="40 min" label="saved per day planning" />
            <Stat value="12-day" label="average streak" />
          </div>
          <div className="mt-10">
            <Link to="/register">
              <Button size="lg" className="gradient-primary-bg shadow-glow h-12 px-7">
                Get Started Free <ArrowRight className="size-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 py-8 flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Flame className="size-4 text-warning" /> Stay consistent.
          </div>
          <div>© 2026 StudentOS</div>
        </div>
      </footer>
    </div>
  );
}

function PreviewCard({ label, value, hint, accent }: { label: string; value: string; hint: string; accent: string }) {
  return (
    <div className={`relative overflow-hidden rounded-2xl bg-white/[0.03] border border-white/5 p-5`}>
      <div className={`absolute -top-8 -right-8 size-24 rounded-full bg-gradient-to-br ${accent} to-transparent blur-2xl`} />
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="text-2xl font-semibold mt-1.5">{value}</div>
      <div className="text-xs text-muted-foreground mt-0.5">{hint}</div>
    </div>
  );
}

function Feature({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="glass-card rounded-2xl p-6 hover:translate-y-[-2px] transition-transform shadow-elegant">
      <div className="size-10 rounded-xl gradient-primary-bg flex items-center justify-center mb-4 text-primary-foreground">{icon}</div>
      <h3 className="font-semibold">{title}</h3>
      <p className="text-sm text-muted-foreground mt-1.5">{desc}</p>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="text-3xl md:text-4xl font-semibold gradient-text">{value}</div>
      <div className="text-xs text-muted-foreground mt-1">{label}</div>
    </div>
  );
}
