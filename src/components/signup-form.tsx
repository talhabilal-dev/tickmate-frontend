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
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import { apiFetch } from "@/lib/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
export default function SignupForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!name.trim()) return setError("Full name is required.");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email))
      return setError("Please enter a valid email address.");

    if (password.length < 8)
      return setError("Password must be at least 8 characters.");

    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (!hasUpper || !hasLower || !hasNumber || !hasSpecial) {
      return setError(
        "Password must include uppercase, lowercase, number, and special character."
      );
    }

    try {
      setIsLoading(true);

      const res = await apiFetch("/auth/register", {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
      });

      if (!res.success) {
        return setError(res.message || "Registration failed. Try again.");
      }

      // On success
      toast.success("🎉 Registration successful!");
      setName("");
      setEmail("");
      setPassword("");
      setError(null);
      router.push("/auth#signin");
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Registration failed. Try again.");
      toast.error("❌ Registration failed. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="bg-zinc-900 border-zinc-800">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-white">Create account</CardTitle>
        <CardDescription className="text-zinc-400">
          Enter your information to create your account
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
            <Label htmlFor="signup-name" className="text-zinc-200">
              Full Name
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
              <Input
                id="signup-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className="pl-10 bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-emerald-500 focus:ring-emerald-500"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="signup-email" className="text-zinc-200">
              Email
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
              <Input
                id="signup-email"
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
            <Label htmlFor="signup-password" className="text-zinc-200">
              Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
              <Input
                id="signup-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
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
            <p className="text-xs text-zinc-500">
              Must be 8+ characters, with uppercase, lowercase, number, and
              symbol
            </p>
          </div>

          <Button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
            disabled={isLoading}
          >
            {isLoading ? "Creating account..." : "Create account"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
