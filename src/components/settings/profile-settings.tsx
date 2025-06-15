"use client";

import { useState, useEffect } from "react";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Save } from "lucide-react";
import { apiFetch } from "@/lib/api";
import { toast } from "sonner";

type UserProfile = {
  name: string;
  email: string;
};

export default function ProfileSettings() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res: { user?: UserProfile } = await apiFetch("/auth/user", {
          method: "GET",
        });
        console.log(res)
        if (res?.user) {
          setProfile(res.user);
        }
      } catch (error) {
        console.error("Failed to fetch user profile", error);
      }
    };
    fetchUser();
  }, []);

  const handleSave = async () => {
    if (!profile) return;

    setIsLoading(true);
    try {
      const res = await apiFetch("/auth/update", {
        method: "PUT",
        body: JSON.stringify({
          name: profile.name,
          email: profile.email,
        }),
      });

      if (res.success) {
        toast.success("✅ Profile updated successfully!");
      }

      if (!res.success) {
        toast.error("❌ Failed to update profile. Please try again.");
      }
    } finally {
      // Always reset the loading state
      setIsLoading(false);
    }
  };

  if (!profile) {
    return <div className="text-white">Loading profile...</div>;
  }

  return (
    <div className="space-y-6">
      <Card className="bg-zinc-900/50 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-white">Profile Information</CardTitle>
          <CardDescription className="text-zinc-400">
            Update your personal information and profile details
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Avatar */}
          <div className="flex items-center gap-6">
            <Avatar className="h-20 w-20">
              <AvatarFallback className="bg-emerald-500 text-white text-lg">
                {profile.name[0] ?? ""}
                {profile.name[1] ?? ""}
              </AvatarFallback>
            </Avatar>
          </div>

          {/* Name and Email */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-zinc-200">
                Full Name
              </Label>
              <Input
                id="fullName"
                value={profile.name}
                onChange={(e) =>
                  setProfile({ ...profile, name: e.target.value })
                }
                className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-emerald-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-zinc-200">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                value={profile.email}
                onChange={(e) =>
                  setProfile({ ...profile, email: e.target.value })
                }
                className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button
              onClick={handleSave}
              disabled={isLoading}
              className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white border-0"
            >
              <Save className="h-4 w-4 mr-2" />
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
