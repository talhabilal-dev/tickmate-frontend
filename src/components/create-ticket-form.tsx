"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"

interface CreateTicketFormProps {
  onClose: () => void
}

export default function CreateTicketForm({ onClose }: CreateTicketFormProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [priority, setPriority] = useState("")
  const [category, setCategory] = useState("")
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const availableSkills = [
    "React",
    "Node.js",
    "Python",
    "JavaScript",
    "TypeScript",
    "CSS",
    "HTML",
    "Database",
    "API",
    "Backend",
    "Frontend",
    "Mobile",
    "iOS",
    "Android",
    "Authentication",
    "Performance",
    "Security",
    "DevOps",
    "AWS",
    "Docker",
  ]

  const handleSkillToggle = (skill: string) => {
    setSelectedSkills((prev) => (prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    console.log({
      title,
      description,
      priority,
      category,
      skills: selectedSkills,
    })

    setIsSubmitting(false)
    onClose()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title" className="text-zinc-200">
          Title *
        </Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Brief description of the issue"
          className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-emerald-500"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description" className="text-zinc-200">
          Description *
        </Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Detailed description of the issue, steps to reproduce, expected behavior, etc."
          rows={4}
          className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-emerald-500"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="priority" className="text-zinc-200">
            Priority *
          </Label>
          <Select value={priority} onValueChange={setPriority} required>
            <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
              <SelectValue placeholder="Select priority" />
            </SelectTrigger>
            <SelectContent className="bg-zinc-900 border-zinc-700">
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="category" className="text-zinc-200">
            Category *
          </Label>
          <Select value={category} onValueChange={setCategory} required>
            <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent className="bg-zinc-900 border-zinc-700">
              <SelectItem value="frontend">Frontend</SelectItem>
              <SelectItem value="backend">Backend</SelectItem>
              <SelectItem value="mobile">Mobile App</SelectItem>
              <SelectItem value="database">Database</SelectItem>
              <SelectItem value="integration">Integration</SelectItem>
              <SelectItem value="performance">Performance</SelectItem>
              <SelectItem value="security">Security</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-zinc-200">Related Skills</Label>
        <p className="text-sm text-zinc-500 mb-3">Select skills that might be relevant to resolving this ticket</p>
        <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
          {availableSkills.map((skill) => (
            <Badge
              key={skill}
              variant={selectedSkills.includes(skill) ? "default" : "outline"}
              className={`cursor-pointer transition-colors ${
                selectedSkills.includes(skill)
                  ? "bg-emerald-500 text-white hover:bg-emerald-600"
                  : "border-zinc-700 text-zinc-400 hover:border-zinc-600 hover:text-zinc-300"
              }`}
              onClick={() => handleSkillToggle(skill)}
            >
              {skill}
              {selectedSkills.includes(skill) && <X className="h-3 w-3 ml-1" />}
            </Badge>
          ))}
        </div>
        {selectedSkills.length > 0 && (
          <div className="mt-2">
            <p className="text-sm text-zinc-500 mb-2">Selected skills:</p>
            <div className="flex flex-wrap gap-1">
              {selectedSkills.map((skill) => (
                <Badge key={skill} className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          className="border-zinc-700 text-zinc-300 hover:bg-zinc-800"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white border-0"
        >
          {isSubmitting ? "Creating..." : "Create Ticket"}
        </Button>
      </div>
    </form>
  )
}
