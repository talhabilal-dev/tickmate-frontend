"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, X, Star, Save } from "lucide-react"

interface Skill {
  name: string
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert"
  category: string
}

export default function SkillsSettings() {
  const [skills, setSkills] = useState<Skill[]>([
    { name: "React", level: "Expert", category: "Frontend" },
    { name: "Node.js", level: "Advanced", category: "Backend" },
    { name: "TypeScript", level: "Advanced", category: "Programming" },
    { name: "Python", level: "Intermediate", category: "Programming" },
    { name: "AWS", level: "Intermediate", category: "Cloud" },
    { name: "Docker", level: "Advanced", category: "DevOps" },
  ])

  const [newSkill, setNewSkill] = useState({
    name: "",
    level: "Beginner" as const,
    category: "",
  })

  const [isLoading, setIsLoading] = useState(false)

  const categories = ["Frontend", "Backend", "Programming", "Database", "Cloud", "DevOps", "Mobile", "Design", "Other"]

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
  ]

  const addSkill = () => {
    if (newSkill.name && newSkill.category) {
      setSkills([...skills, newSkill])
      setNewSkill({ name: "", level: "Beginner", category: "" })
    }
  }

  const removeSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index))
  }

  const updateSkillLevel = (index: number, level: Skill["level"]) => {
    const updatedSkills = [...skills]
    updatedSkills[index].level = level
    setSkills(updatedSkills)
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20"
      case "Intermediate":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20"
      case "Advanced":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
      case "Expert":
        return "bg-violet-500/10 text-violet-400 border-violet-500/20"
      default:
        return "bg-zinc-500/10 text-zinc-400 border-zinc-500/20"
    }
  }

  const getLevelStars = (level: string) => {
    const stars = {
      Beginner: 1,
      Intermediate: 2,
      Advanced: 3,
      Expert: 4,
    }
    return stars[level as keyof typeof stars] || 1
  }

  const handleSave = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
    console.log("Skills updated:", skills)
  }

  return (
    <div className="space-y-6">
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
                  value={newSkill.name}
                  onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                  placeholder="e.g., React, Python"
                  className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-emerald-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="skillLevel" className="text-zinc-200">
                  Level
                </Label>
                <Select
                  value={newSkill.level}
                  onValueChange={(value: any) => setNewSkill({ ...newSkill, level: value })}
                >
                  <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-900 border-zinc-700">
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Advanced">Advanced</SelectItem>
                    <SelectItem value="Expert">Expert</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="skillCategory" className="text-zinc-200">
                  Category
                </Label>
                <Select
                  value={newSkill.category}
                  onValueChange={(value) => setNewSkill({ ...newSkill, category: value })}
                >
                  <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-900 border-zinc-700">
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <Button
                  onClick={addSkill}
                  disabled={!newSkill.name || !newSkill.category}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Skill
                </Button>
              </div>
            </div>

            {/* Skill Suggestions */}
            <div>
              <Label className="text-zinc-200 mb-2 block">Popular Skills</Label>
              <div className="flex flex-wrap gap-2">
                {skillSuggestions
                  .filter((suggestion) => !skills.some((skill) => skill.name === suggestion))
                  .slice(0, 10)
                  .map((suggestion) => (
                    <Badge
                      key={suggestion}
                      variant="outline"
                      className="cursor-pointer border-zinc-700 text-zinc-400 hover:border-emerald-500 hover:text-emerald-400"
                      onClick={() => setNewSkill({ ...newSkill, name: suggestion })}
                    >
                      {suggestion}
                    </Badge>
                  ))}
              </div>
            </div>
          </div>

          {/* Current Skills */}
          <div>
            <h3 className="text-lg font-medium text-white mb-4">Your Skills ({skills.length})</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {skills.map((skill, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-zinc-800/50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-medium text-white">{skill.name}</h4>
                      <Badge variant="outline" className="border-zinc-700 text-zinc-400 text-xs">
                        {skill.category}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[...Array(4)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${
                              i < getLevelStars(skill.level) ? "text-emerald-400 fill-current" : "text-zinc-600"
                            }`}
                          />
                        ))}
                      </div>
                      <Select value={skill.level} onValueChange={(value: any) => updateSkillLevel(index, value)}>
                        <SelectTrigger className="w-32 h-7 bg-zinc-800 border-zinc-700 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-zinc-900 border-zinc-700">
                          <SelectItem value="Beginner">Beginner</SelectItem>
                          <SelectItem value="Intermediate">Intermediate</SelectItem>
                          <SelectItem value="Advanced">Advanced</SelectItem>
                          <SelectItem value="Expert">Expert</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
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
  )
}
