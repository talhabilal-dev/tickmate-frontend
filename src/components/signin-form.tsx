"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { apiFetch } from "@/lib/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function SigninForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // ✅ Email validation (RFC-ish)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    // ✅ Password strength validation
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (!hasUpper || !hasLower || !hasNumber || !hasSpecial) {
      setError(
        "Password must include uppercase, lowercase, number, and special character."
      );
      return;
    }

    try {
      setIsLoading(true);

      const res = await apiFetch("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      if (res.success) {
        toast.success("Login successful!");
        router.push("/dashboard");
      }

      if (!res.success) {
        setError(res.message);
      }
    } catch (err: any) {
      setError("Something went wrong while signing in. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="bg-zinc-900 border-zinc-800">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-white">Sign in</CardTitle>
        <CardDescription className="text-zinc-400">
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="text-sm text-red-200 bg-red-900 border border-red-700 rounded p-2">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="signin-email" className="text-zinc-200">
              Email
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
              <Input
                id="signin-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="pl-10 bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-emerald-500 focus:ring-emerald-500"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="signin-password" className="text-zinc-200">
              Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
              <Input
                id="signin-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="pl-10 pr-10 bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-emerald-500 focus:ring-emerald-500"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-zinc-500 hover:text-zinc-300"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </Button>
        </form>

        <div className="mt-6 pt-6 border-t border-zinc-800">
          <p className="text-sm text-zinc-400 mb-3">Test Credentials:</p>
          <div className="space-y-3">
            <div className="bg-zinc-800/50 border border-zinc-700 rounded-lg p-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                {" "}
                <p className="text-xs text-zinc-500 mb-1">Admin Account</p>
                <p className="text-sm text-zinc-300 font-mono">
                  admin@mail.com
                </p>
                <p className="text-sm text-zinc-300 font-mono">Admin1234@</p>
              </div>
              <div>
                <p className="text-xs text-zinc-500 mb-1">User Account</p>
                <p className="text-sm text-zinc-300 font-mono">test@mail.com</p>
                <p className="text-sm text-zinc-300 font-mono">Test1234@</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
