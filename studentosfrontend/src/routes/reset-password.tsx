import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  GraduationCap,
  ArrowLeft,
  Mail,
  Loader2,
  CheckCircle2,
} from "lucide-react";

import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const resetSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type ResetForm = z.infer<typeof resetSchema>;

export const Route = createFileRoute("/reset-password")({
  head: () => ({
    meta: [
      { title: "Reset Password — StudentOS" },
      { name: "description", content: "Reset your StudentOS password." },
    ],
  }),
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetForm>({
    resolver: zodResolver(resetSchema),
  });

  async function onSubmit(data: ResetForm) {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
        redirectTo: `${window.location.origin}/update-password`,
      });
      if (error) {
        toast.error(error.message);
        return;
      }
      setIsSent(true);
      toast.success("Reset link sent! Check your email.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex w-full hero-bg items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2.5 mb-8">
          <div className="size-9 rounded-xl gradient-primary-bg flex items-center justify-center shadow-glow">
            <GraduationCap className="size-4 text-primary-foreground" />
          </div>
          <span className="text-lg font-semibold tracking-tight">StudentOS</span>
        </div>

        <div className="glass-card rounded-3xl p-6 md:p-8 shadow-elegant">
          {isSent ? (
            <div className="text-center space-y-4 py-4">
              <div className="size-14 rounded-full bg-success/20 flex items-center justify-center mx-auto">
                <CheckCircle2 className="size-7 text-success" />
              </div>
              <div>
                <h2 className="text-xl font-semibold tracking-tight">Check your email</h2>
                <p className="text-sm text-muted-foreground mt-2">
                  We've sent a password reset link to your email address. Click the link to set a new password.
                </p>
              </div>
              <Link to="/login">
                <Button
                  variant="outline"
                  className="mt-4 bg-white/5 border-white/10 hover:bg-white/10"
                >
                  <ArrowLeft className="size-4 mr-1.5" /> Back to Sign In
                </Button>
              </Link>
            </div>
          ) : (
            <>
              <div className="text-center mb-8">
                <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Mail className="size-5 text-primary" />
                </div>
                <h1 className="text-2xl font-semibold tracking-tight">Reset your password</h1>
                <p className="text-sm text-muted-foreground mt-1.5">
                  Enter your email and we'll send you a reset link
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-11 gradient-primary-bg text-primary-foreground font-medium shadow-glow hover:opacity-95 transition"
                >
                  {isLoading ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <>Send Reset Link</>
                  )}
                </Button>
              </form>

              <p className="text-center text-sm text-muted-foreground mt-6">
                Remember your password?{" "}
                <Link
                  to="/login"
                  className="text-primary hover:text-primary/80 font-medium transition"
                >
                  Sign in
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
