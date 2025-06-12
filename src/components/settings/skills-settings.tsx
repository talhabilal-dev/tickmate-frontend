"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plus, X, Star, Save } from "lucide-react";
import { apiFetch } from "@/lib/api";
import { toast } from "sonner";
import { useEffect } from "react";

type Skill = {
  skills?: string[];
};

export default function SkillsSettings() {
  const [skills, setSkills] = useState<string[]>([]);

  const [newSkill, setNewSkill] = useState<{ name: string } | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await apiFetch("/auth/user");
      if (res?.user?.skills) {
        setSkills(res.user?.skills);
      }
    };
    fetchUser();
  }, []);

  const skillSuggestions = [
    "JavaScript",
    "Python",
    "Java",
    "C++",
    "React",
    "Vue.js",
    "Angular",
    "Node.js",
    "Express",
    "Django",
    "Flask",
    "MongoDB",
    "PostgreSQL",
    "MySQL",
    "Redis",
    "AWS",
    "Azure",
    "GCP",
    "Docker",
    "Kubernetes",
    "Git",
    "CI/CD",
    "GraphQL",
    "REST API",
    "Microservices",
  ];

  const addSkill = () => {
    if (newSkill) {
      setSkills([...skills, newSkill.name]);
      setNewSkill(null);
    }
  };

  const removeSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);
      const res = await apiFetch("/auth/update-skills", {
        method: "PUT",
        body: JSON.stringify({
          skills,
        }),
      });

      if (res.success) {
        toast.success("✅ Skills updated successfully!");
      }

      if (!res.success) {
        toast.error("❌ Failed to update skills. Please try again.");
      }
    } catch (error) {
      toast.error("🚨 An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {}
      <Card className="bg-zinc-900/50 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-white">Skills Management</CardTitle>
          <CardDescription className="text-zinc-400">
            Manage your skills to help our AI assign relevant tickets to you
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Add New Skill */}
          <div className="space-y-4 p-4 bg-zinc-800/50 rounded-lg">
            <h3 className="text-lg font-medium text-white">Add New Skill</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="skillName" className="text-zinc-200">
                  Skill Name
                </Label>
                <Input
                  id="skillName"
                  value={newSkill?.name ?? ""}
                  onChange={(e) =>
                    setNewSkill({
                      ...(newSkill ?? { name: "" }),
                      name: e.target.value,
                    })
                  }
                  placeholder="e.g., React, Python"
                  className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-emerald-500"
                />
              </div>
              <div className="flex items-end">
                <Button
                  onClick={addSkill}
                  disabled={!newSkill?.name}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Skill
                </Button>
              </div>
            </div>
            <div>
              <Label className="text-zinc-200 mb-2 block">Popular Skills</Label>
              <div className="flex flex-wrap gap-2">
                {skillSuggestions
                  .filter(
                    (suggestion) =>
                      !skills.some((skill) => skill === suggestion)
                  )
                  .slice(0, 10)
                  .map((suggestion) => (
                    <Badge
                      key={suggestion}
                      variant="outline"
                      className="cursor-pointer border-zinc-700 text-zinc-400 hover:border-emerald-500 hover:text-emerald-400"
                      onClick={() =>
                        setNewSkill({
                          ...(newSkill ?? { name: "" }),
                          name: suggestion,
                        })
                      }
                    >
                      {suggestion}
                    </Badge>
                  ))}
              </div>
            </div>
          </div>

          {/* Current Skills */}
          <div>
            <h3 className="text-lg font-medium text-white mb-4">
              Your Skills ({skills.length})
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-3xl">
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-zinc-800/50 rounded-lg"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium text-white">{skill}</h4>
                    </div>
                    <div className="flex items-center gap-2"></div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeSkill(index)}
                    className="text-zinc-500 hover:text-red-400 hover:bg-red-500/10"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              onClick={handleSave}
              disabled={isLoading}
              className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white border-0"
            >
              <Save className="h-4 w-4 mr-2" />
              {isLoading ? "Saving..." : "Save Skills"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
