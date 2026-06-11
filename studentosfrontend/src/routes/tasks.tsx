import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/ui-bits";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { todaysTasks } from "@/lib/mock";
import { useState } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";

type Task = typeof todaysTasks[number];
type Priority = "high" | "medium" | "low";

export const Route = createFileRoute("/tasks")({
  head: () => ({ meta: [{ title: "Tasks — StudentOS" }] }),
  component: Tasks,
});

function Tasks() {
  const [tasks, setTasks] = useState<Task[]>(todaysTasks);
  const [newTitle, setNewTitle] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");

  const toggle = (id: string) => {
    setTasks(t => t.map(x => x.id === id ? { ...x, done: !x.done } : x));
    const task = tasks.find(t => t.id === id);
    if (task && !task.done) toast.success("Task complete! +25 XP 🎉");
  };

  const add = () => {
    if (!newTitle.trim()) return;
    setTasks([{ id: Date.now().toString(), title: newTitle, subject: "General", priority, done: false, due: "Today" }, ...tasks]);
    setNewTitle("");
    toast.success("Task added");
  };

  const done = tasks.filter(t => t.done).length;
  const pct = Math.round((done / tasks.length) * 100);

  return (
    <AppShell>
      <PageHeader title="Tasks" description={`${done} of ${tasks.length} done • ${pct}% complete`} />

      <div className="glass-card rounded-2xl p-6 shadow-elegant mb-6">
        <div className="flex flex-col md:flex-row gap-3">
          <Input value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="Add a task..." onKeyDown={e => e.key === "Enter" && add()} />
          <select value={priority} onChange={e => setPriority(e.target.value as Priority)} className="rounded-md bg-input border border-border px-3 text-sm">
            <option value="high">High priority</option>
            <option value="medium">Medium priority</option>
            <option value="low">Low priority</option>
          </select>
          <Button onClick={add} className="gradient-primary-bg shadow-glow"><Plus className="size-4 mr-1" />Add</Button>
        </div>
        <div className="mt-5">
          <div className="h-2 rounded-full bg-muted overflow-hidden">
            <div className="h-full gradient-primary-bg transition-all" style={{ width: `${pct}%` }} />
          </div>
        </div>
      </div>

      <Tabs defaultValue="list">
        <TabsList>
          <TabsTrigger value="list">List</TabsTrigger>
          <TabsTrigger value="board">Board</TabsTrigger>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="mt-4">
          <div className="glass-card rounded-2xl p-4 shadow-elegant">
            <ul className="divide-y divide-border">
              {tasks.map(t => (
                <li key={t.id} className="flex items-center gap-4 py-3 px-2">
                  <Checkbox checked={t.done} onCheckedChange={() => toggle(t.id)} />
                  <div className="flex-1 min-w-0">
                    <div className={`text-sm ${t.done ? "line-through text-muted-foreground" : ""}`}>{t.title}</div>
                    <div className="text-xs text-muted-foreground">{t.subject} • Due {t.due}</div>
                  </div>
                  <span className={`text-[10px] uppercase px-2 py-1 rounded-md ${t.priority === "high" ? "bg-destructive/20 text-destructive" : t.priority === "medium" ? "bg-warning/20 text-warning" : "bg-success/20 text-success"}`}>{t.priority}</span>
                </li>
              ))}
            </ul>
          </div>
        </TabsContent>

        <TabsContent value="board" className="mt-4">
          <div className="grid md:grid-cols-3 gap-4">
            {(["high", "medium", "low"] as const).map(p => (
              <div key={p} className="glass-card rounded-2xl p-4 shadow-elegant">
                <div className="font-semibold capitalize mb-3 flex items-center gap-2">
                  <span className={`size-2 rounded-full ${p === "high" ? "bg-destructive" : p === "medium" ? "bg-warning" : "bg-success"}`} />
                  {p} priority
                </div>
                <ul className="space-y-2">
                  {tasks.filter(t => t.priority === p).map(t => (
                    <li key={t.id} className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                      <div className={`text-sm ${t.done ? "line-through text-muted-foreground" : ""}`}>{t.title}</div>
                      <div className="text-xs text-muted-foreground mt-1">{t.subject}</div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="calendar" className="mt-4">
          <div className="glass-card rounded-2xl p-6 shadow-elegant">
            <div className="grid grid-cols-7 gap-2 text-xs text-center text-muted-foreground mb-2">
              {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map(d => <div key={d}>{d}</div>)}
            </div>
            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: 28 }).map((_, i) => {
                const day = i + 1;
                const hasTask = [3, 8, 10, 15, 18, 22].includes(day);
                const isToday = day === 10;
                return (
                  <div key={i} className={`aspect-square rounded-xl p-2 border ${isToday ? "border-primary gradient-primary-bg text-primary-foreground" : "border-white/5 bg-white/[0.03]"}`}>
                    <div className="text-xs font-medium">{day}</div>
                    {hasTask && !isToday && <div className="mt-1 size-1.5 rounded-full bg-cyan" />}
                  </div>
                );
              })}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </AppShell>
  );
}
