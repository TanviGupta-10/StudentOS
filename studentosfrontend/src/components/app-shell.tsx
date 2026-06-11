import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  CalendarRange,
  CheckSquare,
  Sparkles,
  BarChart3,
  User,
  GraduationCap,
  Flame,
  Trophy,
  LogOut,
} from "lucide-react";
import { type ReactNode } from "react";
import { user } from "@/lib/mock";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";

const nav = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/planner", label: "Study Planner", icon: CalendarRange },
  { to: "/tasks", label: "Tasks", icon: CheckSquare },
  { to: "/assistant", label: "AI Assistant", icon: Sparkles },
  { to: "/progress", label: "Progress", icon: BarChart3 },
  { to: "/profile", label: "Profile", icon: User },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { user: authUser } = useAuth();

  const displayName = authUser?.fullName || authUser?.email?.split("@")[0] || user.name;

  async function handleLogout() {
    await supabase.auth.signOut();
    window.location.href = "/login";
  }

  return (
    <div className="min-h-screen flex w-full">
      <aside className="hidden md:flex w-64 flex-col border-r border-border bg-sidebar/60 backdrop-blur-xl">
        <div className="px-6 py-6 flex items-center gap-2">
          <div className="size-9 rounded-xl gradient-primary-bg flex items-center justify-center shadow-glow">
            <GraduationCap className="size-5 text-primary-foreground" />
          </div>
          <div>
            <div className="font-semibold tracking-tight">StudentOS</div>
            <div className="text-[11px] text-muted-foreground -mt-0.5">AI Study Companion</div>
          </div>
        </div>

        <nav className="px-3 flex-1 space-y-1">
          {nav.map((item) => {
            const active = pathname === item.to || (item.to !== "/dashboard" && pathname.startsWith(item.to));
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                  active
                    ? "gradient-primary-bg text-primary-foreground shadow-glow"
                    : "text-sidebar-foreground hover:bg-sidebar-accent"
                }`}
              >
                <Icon className="size-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="m-3 space-y-3">
          <div className="p-4 rounded-xl glass-card">
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
              <span className="flex items-center gap-1"><Trophy className="size-3.5" />Level {user.level}</span>
              <span>{user.xp}/{user.xpToNext} XP</span>
            </div>
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <div className="h-full gradient-primary-bg" style={{ width: `${(user.xp / user.xpToNext) * 100}%` }} />
            </div>
            <div className="mt-3 flex items-center gap-2 text-sm">
              <Flame className="size-4 text-warning" />
              <span className="font-semibold">{user.streak}-day streak</span>
            </div>
          </div>

          {authUser && (
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-sidebar-accent transition"
            >
              <LogOut className="size-4" />
              <span className="truncate">Sign out ({displayName})</span>
            </button>
          )}
        </div>
      </aside>

      <main className="flex-1 min-w-0">
        {/* Mobile top bar */}
        <div className="md:hidden flex items-center justify-between px-4 py-3 border-b border-border bg-sidebar/60 backdrop-blur-xl">
          <Link to="/dashboard" className="flex items-center gap-2">
            <div className="size-8 rounded-lg gradient-primary-bg flex items-center justify-center">
              <GraduationCap className="size-4 text-primary-foreground" />
            </div>
            <span className="font-semibold">StudentOS</span>
          </Link>
          <div className="flex items-center gap-1 text-xs">
            <Flame className="size-4 text-warning" /> {user.streak}
          </div>
        </div>

        <div className="p-4 md:p-8 max-w-7xl mx-auto">{children}</div>

        {/* Mobile bottom nav */}
        <nav className="md:hidden sticky bottom-0 grid grid-cols-6 gap-1 p-2 border-t border-border bg-sidebar/80 backdrop-blur-xl">
          {nav.map((item) => {
            const active = pathname === item.to || (item.to !== "/dashboard" && pathname.startsWith(item.to));
            const Icon = item.icon;
            return (
              <Link key={item.to} to={item.to} className={`flex flex-col items-center gap-0.5 py-1.5 rounded-md text-[10px] ${active ? "text-primary" : "text-muted-foreground"}`}>
                <Icon className="size-4" />
                {item.label.split(" ")[0]}
              </Link>
            );
          })}
        </nav>
      </main>
    </div>
  );
}
