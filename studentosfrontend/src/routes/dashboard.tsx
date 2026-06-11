import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { PageHeader, StatCard } from "@/components/ui-bits";
import { aiRecommendations, motivationalQuotes, todaysTasks, upcomingExams, user, weeklyProgress } from "@/lib/mock";
import { Clock, Flame, Target, CheckSquare, Bot, Quote, CalendarClock, ArrowRight } from "lucide-react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — StudentOS" }] }),
  component: Dashboard,
});

function Dashboard() {
  const currentUser: any = JSON.parse(
  localStorage.getItem("user") || "{}"
  );
  const quote = motivationalQuotes[0];
  const goalHours = 4;
  const doneHours = 2.3;
  const tasksDone = todaysTasks.filter(t => t.done).length;

  return (
    <AppShell>
      <PageHeader
        title={`Good evening, ${currentUser?.name?.split(" ")[0] || "Student"} 👋`}
        description="Here's your study snapshot for today."
        action={
          <Link to="/planner">
            <Button className="gradient-primary-bg shadow-glow">Plan today <ArrowRight className="size-4 ml-1" /></Button>
          </Link>
        }
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Today's goal" value={`${doneHours} / ${goalHours}h`} hint={`${Math.round((doneHours/goalHours)*100)}% complete`} icon={<Target className="size-5 text-primary" />} accent="purple" />
        <StatCard label="Study streak" value={`${user.streak} days`} hint="Personal best!" icon={<Flame className="size-5 text-warning" />} accent="warning" />
        <StatCard label="Tasks today" value={`${tasksDone} / ${todaysTasks.filter(t => t.due === "Today").length}`} hint="Keep going" icon={<CheckSquare className="size-5 text-success" />} accent="success" />
        <StatCard label="Total hours" value={user.totalHours} hint="This semester" icon={<Clock className="size-5 text-cyan" />} accent="cyan" />
      </div>

      <div className="grid lg:grid-cols-3 gap-5 mt-6">
        {/* Weekly chart */}
        <div className="lg:col-span-2 glass-card rounded-2xl p-6 shadow-elegant">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold">Weekly progress</h3>
              <p className="text-xs text-muted-foreground">Study hours vs. your daily goal</p>
            </div>
            <span className="text-xs text-muted-foreground">Last 7 days</span>
          </div>
          <div className="h-64">
            <ResponsiveContainer>
              <BarChart data={weeklyProgress}>
                <defs>
                  <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.56 0.24 290)" />
                    <stop offset="100%" stopColor="oklch(0.72 0.15 210)" />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <XAxis dataKey="day" stroke="rgba(255,255,255,0.5)" fontSize={12} />
                <YAxis stroke="rgba(255,255,255,0.5)" fontSize={12} />
                <Tooltip contentStyle={{ background: "rgba(20,20,40,0.95)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12 }} />
                <Bar dataKey="hours" fill="url(#barGrad)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Motivational quote */}
        <div className="glass-card rounded-2xl p-6 shadow-elegant relative overflow-hidden">
          <div className="absolute -top-10 -right-10 size-40 rounded-full gradient-primary-bg opacity-30 blur-3xl" />
          <Quote className="size-6 text-cyan" />
          <p className="mt-4 text-lg leading-relaxed font-medium">"{quote.quote}"</p>
          <p className="mt-3 text-sm text-muted-foreground">— {quote.author}</p>
          <div className="mt-6 p-3 rounded-xl bg-white/[0.03] border border-white/5 text-xs text-muted-foreground">
            Tip: A 5-minute warm-up beats a 30-minute delay.
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-5 mt-6">
        {/* Upcoming exams */}
        <div className="glass-card rounded-2xl p-6 shadow-elegant">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold flex items-center gap-2"><CalendarClock className="size-4 text-primary" /> Upcoming exams</h3>
          </div>
          <ul className="space-y-3">
            {upcomingExams.map(e => (
              <li key={e.subject} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/5">
                <div>
                  <div className="font-medium text-sm">{e.subject}</div>
                  <div className="text-xs text-muted-foreground">{e.date} • {e.difficulty}</div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-semibold gradient-text">{e.daysLeft}d</div>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-wider">left</div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Tasks due today */}
        <div className="glass-card rounded-2xl p-6 shadow-elegant">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold flex items-center gap-2"><CheckSquare className="size-4 text-success" /> Tasks due today</h3>
            <Link to="/tasks" className="text-xs text-cyan hover:underline">View all</Link>
          </div>
          <ul className="space-y-2">
            {todaysTasks.filter(t => t.due === "Today").map(t => (
              <li key={t.id} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/5">
                <div className={`size-2 rounded-full ${t.priority === "high" ? "bg-destructive" : t.priority === "medium" ? "bg-warning" : "bg-success"}`} />
                <div className="flex-1 min-w-0">
                  <div className={`text-sm truncate ${t.done ? "line-through text-muted-foreground" : ""}`}>{t.title}</div>
                  <div className="text-xs text-muted-foreground">{t.subject}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* AI recommendations */}
        <div className="glass-card rounded-2xl p-6 shadow-elegant">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold flex items-center gap-2"><Bot className="size-4 text-cyan" /> AI recommendations</h3>
          </div>
          <ul className="space-y-3">
            {aiRecommendations.map((r, i) => (
              <li key={i} className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                <div className="text-sm font-medium">{r.title}</div>
                <div className="text-xs text-muted-foreground mt-1">{r.reason}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </AppShell>
  );
}
