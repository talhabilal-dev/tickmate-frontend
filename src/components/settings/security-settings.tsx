"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Key, Eye, EyeOff } from "lucide-react";
import { apiFetch } from "@/lib/api";

export default function SecuritySettings() {
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handlePasswordChange = async () => {
    if (passwords.new !== passwords.confirm) {
      toast.error("❌ New password and confirm password do not match.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await apiFetch("/auth/update-password", {
        method: "PUT",
        body: JSON.stringify({
          oldPassword: passwords.current,
          newPassword: passwords.new,
        }),
      });

      if (!res.success) {
        throw new Error(res.message || "❌ Failed to change password.");
      }

      toast.success("✅ Password changed successfully!");
      setPasswords({ current: "", new: "", confirm: "" });
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "❌ Something went wrong. Please try again.";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = (field: keyof typeof showPasswords) => {
    setShowPasswords({ ...showPasswords, [field]: !showPasswords[field] });
  };

  return (
    <div className="space-y-6">
      {/* Password Change */}
      <Card className="bg-zinc-900/50 border-zinc-800">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Key className="h-5 w-5 text-emerald-400" />
            <CardTitle className="text-white">Change Password</CardTitle>
          </div>
          <CardDescription className="text-zinc-400">
            Update your password to keep your account secure
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="currentPassword" className="text-zinc-200">
              Current Password
            </Label>
            <div className="relative">
              <Input
                id="currentPassword"
                type={showPasswords.current ? "text" : "password"}
                value={passwords.current}
                onChange={(e) =>
                  setPasswords({ ...passwords, current: e.target.value })
                }
                className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-emerald-500 pr-10"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("current")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
              >
                {showPasswords.current ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="newPassword" className="text-zinc-200">
              New Password
            </Label>
            <div className="relative">
              <Input
                id="newPassword"
                type={showPasswords.new ? "text" : "password"}
                value={passwords.new}
                onChange={(e) =>
                  setPasswords({ ...passwords, new: e.target.value })
                }
                className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-emerald-500 pr-10"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("new")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
              >
                {showPasswords.new ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-zinc-200">
              Confirm New Password
            </Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showPasswords.confirm ? "text" : "password"}
                value={passwords.confirm}
                onChange={(e) =>
                  setPasswords({ ...passwords, confirm: e.target.value })
                }
                className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-emerald-500 pr-10"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("confirm")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
              >
                {showPasswords.confirm ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          <Button
            onClick={handlePasswordChange}
            disabled={
              isLoading ||
              !passwords.current ||
              !passwords.new ||
              !passwords.confirm
            }
            className="bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            {isLoading ? "Updating..." : "Update Password"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
