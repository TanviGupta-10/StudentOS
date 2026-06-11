import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  GraduationCap,
  ArrowLeft,
  Lock,
  Loader2,
  CheckCircle2,
} from "lucide-react";

import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const updateSchema = z
  .object({
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type UpdateForm = z.infer<typeof updateSchema>;

export const Route = createFileRoute("/update-password")({
  head: () => ({
    meta: [
      { title: "Update Password — StudentOS" },
      { name: "description", content: "Set a new password for your StudentOS account." },
    ],
  }),
  component: UpdatePasswordPage,
});

function UpdatePasswordPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [isRecovery, setIsRecovery] = useState(false);

  useEffect(() => {
    // Check if this is a recovery flow
    const hash = window.location.hash;
    if (hash.includes("type=recovery")) {
      setIsRecovery(true);
    } else {
      // Not a valid recovery link
      toast.error("Invalid or expired password reset link.");
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateForm>({
    resolver: zodResolver(updateSchema),
  });

  async function onSubmit(data: UpdateForm) {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: data.password,
      });
      if (error) {
        toast.error(error.message);
        return;
      }
      setIsUpdated(true);
      toast.success("Password updated successfully!");
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
          {isUpdated ? (
            <div className="text-center space-y-4 py-4">
              <div className="size-14 rounded-full bg-success/20 flex items-center justify-center mx-auto">
                <CheckCircle2 className="size-7 text-success" />
              </div>
              <div>
                <h2 className="text-xl font-semibold tracking-tight">Password updated!</h2>
                <p className="text-sm text-muted-foreground mt-2">
                  Your password has been reset successfully. You can now sign in with your new password.
                </p>
              </div>
              <Link to="/login">
                <Button className="mt-4 gradient-primary-bg text-primary-foreground shadow-glow">
                  Sign In
                </Button>
              </Link>
            </div>
          ) : (
            <>
              <div className="text-center mb-8">
                <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Lock className="size-5 text-primary" />
                </div>
                <h1 className="text-2xl font-semibold tracking-tight">Set new password</h1>
                <p className="text-sm text-muted-foreground mt-1.5">
                  Enter a new password for your account
                </p>
              </div>

              {isRecovery ? (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium">
                      New Password
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Create a new password"
                      className="h-11 bg-white/5 border-white/10 focus:border-primary/50 focus:ring-primary/20"
                      {...register("password")}
                    />
                    {errors.password && (
                      <p className="text-xs text-destructive">{errors.password.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-sm font-medium">
                      Confirm Password
                    </Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirm your new password"
                      className="h-11 bg-white/5 border-white/10 focus:border-primary/50 focus:ring-primary/20"
                      {...register("confirmPassword")}
                    />
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
                      <>Update Password</>
                    )}
                  </Button>
                </form>
              ) : (
                <div className="text-center py-4">
                  <p className="text-sm text-muted-foreground">
                    This link appears to be invalid or expired.
                  </p>
                </div>
              )}

              <p className="text-center text-sm text-muted-foreground mt-6">
                <Link
                  to="/login"
                  className="text-primary hover:text-primary/80 font-medium transition inline-flex items-center gap-1"
                >
                  <ArrowLeft className="size-3.5" /> Back to Sign In
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
