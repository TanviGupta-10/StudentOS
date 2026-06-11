import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { PageHeader, StatCard } from "@/components/ui-bits";
import { subjectHours, subjects, user, weeklyProgress } from "@/lib/mock";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, RadialBar, RadialBarChart, PolarAngleAxis } from "recharts";
import { Clock, Flame, Target, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/progress")({
  head: () => ({ meta: [{ title: "Progress — StudentOS" }] }),
  component: Progress,
});

function Progress() {
  const goalPct = 78;
  return (
    <AppShell>
      <PageHeader title="Progress" description="Your study analytics, at a glance." />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total hours" value={user.totalHours} hint="+12 this week" icon={<Clock className="size-5 text-cyan" />} accent="cyan" />
        <StatCard label="Streak" value={`${user.streak} 🔥`} hint="Best: 18 days" icon={<Flame className="size-5 text-warning" />} accent="warning" />
        <StatCard label="Goals hit" value={`${goalPct}%`} hint="This month" icon={<Target className="size-5 text-primary" />} accent="purple" />
        <StatCard label="Weekly avg" value="4.1h" hint="↑ 0.6h vs last" icon={<TrendingUp className="size-5 text-success" />} accent="success" />
      </div>

      <div className="grid lg:grid-cols-3 gap-5 mt-6">
        <div className="lg:col-span-2 glass-card rounded-2xl p-6 shadow-elegant">
          <h3 className="font-semibold mb-1">Study hours trend</h3>
          <p className="text-xs text-muted-foreground mb-4">Last 7 days</p>
          <div className="h-64">
            <ResponsiveContainer>
              <AreaChart data={weeklyProgress}>
                <defs>
                  <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.56 0.24 290)" stopOpacity={0.7} />
                    <stop offset="100%" stopColor="oklch(0.72 0.15 210)" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <XAxis dataKey="day" stroke="rgba(255,255,255,0.5)" fontSize={12} />
                <YAxis stroke="rgba(255,255,255,0.5)" fontSize={12} />
                <Tooltip contentStyle={{ background: "rgba(20,20,40,0.95)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12 }} />
                <Area type="monotone" dataKey="hours" stroke="oklch(0.56 0.24 290)" strokeWidth={2} fill="url(#areaGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-6 shadow-elegant">
          <h3 className="font-semibold mb-1">Goal completion</h3>
          <p className="text-xs text-muted-foreground mb-4">This month</p>
          <div className="h-64">
            <ResponsiveContainer>
              <RadialBarChart innerRadius="70%" outerRadius="100%" data={[{ name: "goal", value: goalPct, fill: "url(#radGrad)" }]} startAngle={90} endAngle={-270}>
                <defs>
                  <linearGradient id="radGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="oklch(0.56 0.24 290)" />
                    <stop offset="100%" stopColor="oklch(0.72 0.15 210)" />
                  </linearGradient>
                </defs>
                <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                <RadialBar dataKey="value" background={{ fill: "rgba(255,255,255,0.05)" }} cornerRadius={20} />
                <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="fill-foreground text-3xl font-bold">{goalPct}%</text>
              </RadialBarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-5 mt-6">
        <div className="lg:col-span-2 glass-card rounded-2xl p-6 shadow-elegant">
          <h3 className="font-semibold mb-4">Subject-wise progress</h3>
          <ul className="space-y-4">
            {subjects.map(s => (
              <li key={s.name}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="font-medium">{s.name}</span>
                  <span className="text-muted-foreground">{s.progress}%</span>
                </div>
                <div className="h-2.5 rounded-full bg-muted overflow-hidden">
                  <div className="h-full gradient-primary-bg" style={{ width: `${s.progress}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="glass-card rounded-2xl p-6 shadow-elegant">
          <h3 className="font-semibold mb-4">Hours by subject</h3>
          <ul className="space-y-3">
            {subjectHours.map(s => (
              <li key={s.subject} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/5">
                <span className="text-sm">{s.subject}</span>
                <span className="text-sm font-semibold gradient-text">{s.hours}h</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </AppShell>
  );
}
