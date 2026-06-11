import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  GraduationCap,
  Eye,
  EyeOff,
  Sparkles,
  Bot,
  BarChart3,
  CheckSquare,
  ArrowRight,
  Loader2,
} from "lucide-react";

import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const registerSchema = z
  .object({
    fullName: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterForm = z.infer<typeof registerSchema>;

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Create Account — StudentOS" },
      { name: "description", content: "Create your free StudentOS account." },
    ],
  }),
  component: RegisterPage,
});

function RegisterPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

 async function onSubmit(data: RegisterForm) {
  setIsLoading(true);

  try {
    const response = await fetch(
      "http://localhost:5000/api/auth/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.fullName,
          email: data.email,
          password: data.password,
        }),
      }
    );

    const result = await response.json();

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    toast.success("Account created successfully!");

    navigate({
      to: "/login",
    });
  } catch (error) {
    console.error(error);

    toast.error("Server connection failed");
  } finally {
    setIsLoading(false);
  }
}

  async function handleGoogleSignIn() {
    setIsGoogleLoading(true);
    try {
      const result = await lovable.auth.signInWithOAuth("google", {
        redirect_uri: window.location.origin,
      });
      if (result.error) {
        toast.error(result.error.message || "Google sign-in failed");
        return;
      }
      if (result.redirected) {
        return;
      }
      toast.success("Welcome!");
      navigate({ to: "/dashboard" });
    } catch (e) {
      toast.error("Google sign-in failed. Please try again.");
    } finally {
      setIsGoogleLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex w-full hero-bg">
      {/* Welcome Section - Left side */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-cyan/5" />
        <div className="relative z-10">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="size-10 rounded-xl gradient-primary-bg flex items-center justify-center shadow-glow">
              <GraduationCap className="size-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold tracking-tight">StudentOS</span>
          </Link>
        </div>

        <div className="relative z-10 space-y-8">
          <div>
            <h2 className="text-4xl font-semibold tracking-tight leading-tight">
              Your <span className="gradient-text">AI-Powered</span><br />Study Companion
            </h2>
            <p className="mt-4 text-muted-foreground text-lg max-w-md">
              Join thousands of students who study smarter with AI.
            </p>
          </div>

          <div className="space-y-4">
            <Benefit
              icon={<Sparkles className="size-5" />}
              title="AI Study Planner"
              desc="Personalized schedules tailored to your exam dates and learning pace."
            />
            <Benefit
              icon={<Bot className="size-5" />}
              title="AI Tutor Assistant"
              desc="Get instant explanations, summaries, and quiz generation."
            />
            <Benefit
              icon={<BarChart3 className="size-5" />}
              title="Progress Tracking"
              desc="Visual analytics and insights to monitor your academic growth."
            />
            <Benefit
              icon={<CheckSquare className="size-5" />}
              title="Smart Task Management"
              desc="Prioritized tasks with deadlines that keep you on track."
            />
          </div>
        </div>

        <div className="relative z-10 text-sm text-muted-foreground">
          © 2026 StudentOS. All rights reserved.
        </div>
      </div>

      {/* Form Section - Right side */}
      <div className="flex-1 flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center justify-center gap-2.5 mb-8">
            <div className="size-9 rounded-xl gradient-primary-bg flex items-center justify-center shadow-glow">
              <GraduationCap className="size-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-semibold tracking-tight">StudentOS</span>
          </div>

          <div className="glass-card rounded-3xl p-6 md:p-8 shadow-elegant">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-semibold tracking-tight">Create your account</h1>
              <p className="text-sm text-muted-foreground mt-1.5">
                Start your journey to smarter studying
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-sm font-medium">
                  Full Name
                </Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder={
                      JSON.parse(
                        localStorage.getItem("user") || "{}"
                        ).name || "Student"
                  }
                  className="h-11 bg-white/5 border-white/10 focus:border-primary/50 focus:ring-primary/20"
                  {...register("fullName")}
                />
                {errors.fullName && (
                  <p className="text-xs text-destructive">{errors.fullName.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@university.edu"
                  className="h-11 bg-white/5 border-white/10 focus:border-primary/50 focus:ring-primary/20"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-xs text-destructive">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    className="h-11 bg-white/5 border-white/10 focus:border-primary/50 focus:ring-primary/20 pr-10"
                    {...register("password")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-xs text-destructive">{errors.password.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-medium">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    className="h-11 bg-white/5 border-white/10 focus:border-primary/50 focus:ring-primary/20 pr-10"
                    {...register("confirmPassword")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition"
                    tabIndex={-1}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="size-4" />
                    ) : (
                      <Eye className="size-4" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-xs text-destructive">{errors.confirmPassword.message}</p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 gradient-primary-bg text-primary-foreground font-medium shadow-glow hover:opacity-95 transition"
              >
                {isLoading ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <>
                    Create Account <ArrowRight className="size-4 ml-1.5" />
                  </>
                )}
              </Button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-3 bg-card text-muted-foreground">or continue with</span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              disabled={isGoogleLoading}
              onClick={handleGoogleSignIn}
              className="w-full h-11 bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 transition"
            >
              {isGoogleLoading ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <>
                  <svg className="size-4 mr-2" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  Continue with Google
                </>
              )}
            </Button>

            <p className="text-center text-sm text-muted-foreground mt-6">
              Already have an account?{" "}
              <Link to="/login" className="text-primary hover:text-primary/80 font-medium transition">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Benefit({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex items-start gap-3.5">
      <div className="size-9 rounded-lg gradient-primary-bg flex items-center justify-center shrink-0 shadow-glow">
        <div className="text-primary-foreground">{icon}</div>
      </div>
      <div>
        <div className="font-medium text-sm">{title}</div>
        <div className="text-xs text-muted-foreground mt-0.5">{desc}</div>
      </div>
    </div>
  );
}
