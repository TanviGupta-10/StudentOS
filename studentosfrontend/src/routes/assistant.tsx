import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/ui-bits";
import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect } from "react";
import { Bot, Send, Sparkles, BookOpen, FileText, ListChecks, CalendarRange, User } from "lucide-react";

export const Route = createFileRoute("/assistant")({
  head: () => ({ meta: [{ title: "AI Assistant — StudentOS" }] }),
  component: Assistant,
});

type Msg = { role: "user" | "ai"; text: string };

const quickPrompts = [
  { icon: BookOpen, label: "Explain a concept", prompt: "Explain integration by parts with an example." },
  { icon: FileText, label: "Summarize a chapter", prompt: "Summarize Chapter 7 on Thermodynamics in 5 bullet points." },
  { icon: ListChecks, label: "Generate a quiz", prompt: "Generate a 5-question quiz on organic chemistry reactions." },
  { icon: CalendarRange, label: "Plan my week", prompt: "Build me a 7-day study plan for my upcoming math exam." },
];

const sampleReplies: Record<string, string> = {
  default: "Great question! Here's a clear breakdown:\n\n1. **Identify** the core idea first.\n2. **Apply** it to a small example.\n3. **Practice** with 3 quick problems.\n\nWant me to generate practice problems on this topic?",
};

function Assistant() {
  const [messages, setMessages] = useState<Msg[]>([
    { role: "ai", text: "Hey! I'm your AI study companion. Ask me to explain a concept, make notes, generate a quiz, or plan your week." },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, typing]);

  const send = async (text?: string) => {
  const content = (text ?? input).trim();

  if (!content) return;

  setMessages((m) => [
    ...m,
    { role: "user", text: content },
  ]);

  setInput("");
  setTyping(true);

  try {
    const response = await fetch(
      "http://localhost:5000/api/assistant/ask",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: content,
        }),
      }
    );

    const data = await response.json();

    setMessages((m) => [
      ...m,
      {
        role: "ai",
        text: data.reply,
      },
    ]);
  } catch (error) {
    setMessages((m) => [
      ...m,
      {
        role: "ai",
        text: "Sorry, I couldn't connect to the AI server.",
      },
    ]);
  }

  setTyping(false);
};

  return (
    <AppShell>
      <PageHeader title="AI Assistant" description="Your personal tutor — ready 24/7." />

      <div className="grid lg:grid-cols-4 gap-5">
        <div className="lg:col-span-1 space-y-3">
          <div className="text-xs uppercase tracking-wider text-muted-foreground">Quick prompts</div>
          {quickPrompts.map((q) => (
            <button key={q.label} onClick={() => send(q.prompt)} className="w-full glass-card rounded-xl p-4 text-left hover:translate-y-[-1px] transition shadow-elegant">
              <q.icon className="size-4 text-cyan" />
              <div className="font-medium text-sm mt-2">{q.label}</div>
              <div className="text-xs text-muted-foreground mt-1 line-clamp-2">{q.prompt}</div>
            </button>
          ))}
        </div>

        <div className="lg:col-span-3 glass-card rounded-2xl shadow-elegant flex flex-col h-[70vh]">
          <div className="px-5 py-4 border-b border-border flex items-center gap-2">
            <div className="size-8 rounded-lg gradient-primary-bg flex items-center justify-center"><Bot className="size-4 text-primary-foreground" /></div>
            <div>
              <div className="font-semibold text-sm">StudentOS AI</div>
              <div className="text-xs text-success flex items-center gap-1"><span className="size-1.5 rounded-full bg-success" />Online</div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-6 space-y-4">
            {messages.map((m, i) => (
              <div key={i} className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
                <div className={`size-8 rounded-lg flex items-center justify-center shrink-0 ${m.role === "ai" ? "gradient-primary-bg" : "bg-white/10"}`}>
                  {m.role === "ai" ? <Bot className="size-4 text-primary-foreground" /> : <User className="size-4" />}
                </div>
                <div className={`max-w-[78%] rounded-2xl px-4 py-3 text-sm whitespace-pre-wrap ${m.role === "user" ? "gradient-primary-bg text-primary-foreground" : "bg-white/[0.04] border border-white/5"}`}>
                  {m.text}
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex gap-3">
                <div className="size-8 rounded-lg gradient-primary-bg flex items-center justify-center"><Sparkles className="size-4 text-primary-foreground animate-pulse" /></div>
                <div className="bg-white/[0.04] border border-white/5 rounded-2xl px-4 py-3 text-sm flex gap-1">
                  <span className="size-2 rounded-full bg-muted-foreground animate-pulse" />
                  <span className="size-2 rounded-full bg-muted-foreground animate-pulse" style={{ animationDelay: "0.15s" }} />
                  <span className="size-2 rounded-full bg-muted-foreground animate-pulse" style={{ animationDelay: "0.3s" }} />
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          <div className="p-4 border-t border-border flex gap-2">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && send()}
              placeholder="Ask anything about your studies..."
              className="flex-1 bg-input border border-border rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary"
            />
            <Button onClick={() => send()} className="gradient-primary-bg shadow-glow h-auto px-4"><Send className="size-4" /></Button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
