import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function PageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8 animate-fade-up">
      <div>
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">{title}</h1>
        {description && <p className="text-muted-foreground mt-1.5">{description}</p>}
      </div>
      {action}
    </div>
  );
}

export function StatCard({
  label,
  value,
  hint,
  icon,
  accent = "purple",
  className,
}: {
  label: string;
  value: ReactNode;
  hint?: string;
  icon?: ReactNode;
  accent?: "purple" | "cyan" | "success" | "warning";
  className?: string;
}) {
  const accents: Record<string, string> = {
    purple: "from-primary/30 to-transparent",
    cyan: "from-cyan/30 to-transparent",
    success: "from-success/30 to-transparent",
    warning: "from-warning/30 to-transparent",
  };
  return (
    <div className={cn("glass-card rounded-2xl p-5 relative overflow-hidden shadow-elegant", className)}>
      <div className={cn("absolute -top-10 -right-10 size-32 rounded-full bg-gradient-to-br opacity-60 blur-2xl", accents[accent])} />
      <div className="flex items-start justify-between relative">
        <div>
          <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
          <div className="text-3xl font-semibold mt-2">{value}</div>
          {hint && <div className="text-xs text-muted-foreground mt-1">{hint}</div>}
        </div>
        {icon && <div className="size-10 rounded-xl bg-white/5 flex items-center justify-center">{icon}</div>}
      </div>
    </div>
  );
}
