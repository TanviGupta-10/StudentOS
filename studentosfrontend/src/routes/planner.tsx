import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/ui-bits";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
Select,
SelectContent,
SelectItem,
SelectTrigger,
SelectValue,
} from "@/components/ui/select";
import { Sparkles } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/planner")({
head: () => ({
meta: [{ title: "Study Planner — StudentOS" }],
}),
component: Planner,
});

function Planner() {
const [generated, setGenerated] = useState(false);
const [loading, setLoading] = useState(false);

const [subjects, setSubjects] = useState("");
const [examDate, setExamDate] = useState("");
const [hours, setHours] = useState("");
const [difficulty, setDifficulty] = useState("medium");

const [aiPlan, setAiPlan] = useState("");

const generate = async () => {
try {
setLoading(true);


  const response = await fetch(
    "http://localhost:5000/api/gemini/study-plan",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        subjects,
        examDate,
        availableHours: hours,
        difficulty,
      }),
    }
  );

  const data = await response.json();

  if (data.success) {
    setAiPlan(data.studyPlan);
    setGenerated(true);

    toast.success("Study plan generated", {
      description: "Your AI study plan is ready.",
    });
  } else {
    toast.error("Failed to generate study plan");
  }
} catch (error) {
  console.error(error);
  toast.error("Server connection failed");
} finally {
  setLoading(false);
}


};

return ( <AppShell> 
          <PageHeader
     title="Study Planner"
     description="Tell us what's coming up — we'll build a plan."
   />
  <div className="grid lg:grid-cols-5 gap-6">
    <div className="lg:col-span-2 glass-card rounded-2xl p-6 shadow-elegant h-fit">
      <h3 className="font-semibold mb-5">Plan Inputs</h3>

      <div className="space-y-4">
        <div>
          <Label className="mb-1.5 block">Subjects</Label>
          <Input
            value={subjects}
            onChange={(e) => setSubjects(e.target.value)}
            placeholder="DSA, DBMS, Operating Systems"
          />
        </div>

        <div>
          <Label className="mb-1.5 block">Exam Date</Label>
          <Input
            type="date"
            value={examDate}
            onChange={(e) => setExamDate(e.target.value)}
          />
        </div>

        <div>
          <Label className="mb-1.5 block">
            Available Study Hours Per Day
          </Label>
          <Input
            type="number"
            min={1}
            max={12}
            value={hours}
            onChange={(e) => setHours(e.target.value)}
          />
        </div>

        <div>
          <Label className="mb-1.5 block">Difficulty Level</Label>

          <Select value={difficulty} onValueChange={setDifficulty}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="easy">Easy</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="hard">Hard</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button
          onClick={generate}
          disabled={loading}
          className="w-full gradient-primary-bg shadow-glow h-12 text-base"
        >
          <Sparkles className="size-4 mr-2" />
          {loading ? "Generating..." : "Generate AI Study Plan"}
        </Button>
      </div>
    </div>

    <div className="lg:col-span-3">
      {!generated && !loading && (
        <div className="glass-card rounded-2xl p-10 text-center shadow-elegant">
          <Sparkles className="size-8 mx-auto text-cyan" />
          <p className="mt-3 text-muted-foreground">
            Fill the form and generate your study plan.
          </p>
        </div>
      )}

      {loading && (
        <div className="glass-card rounded-2xl p-10 text-center shadow-elegant">
          <div className="size-12 mx-auto rounded-full gradient-primary-bg animate-pulse-glow" />
          <p className="mt-4 text-muted-foreground">
            AI is crafting your study plan...
          </p>
        </div>
      )}

      {generated && !loading && (
        <div className="glass-card rounded-2xl p-6 shadow-elegant">
          <h3 className="font-semibold mb-4">
            AI Generated Study Plan
          </h3>

          <pre className="whitespace-pre-wrap text-sm leading-7">
            {aiPlan}
          </pre>
        </div>
      )}
    </div>
  </div>
</AppShell>


);
}

export default Planner;
