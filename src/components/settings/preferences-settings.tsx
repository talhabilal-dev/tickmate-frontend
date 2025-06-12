"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Save, Palette, Globe, Clock } from "lucide-react"

export default function PreferencesSettings() {
  const [preferences, setPreferences] = useState({
    theme: "dark",
    language: "en",
    timezone: "America/Los_Angeles",
    dateFormat: "MM/DD/YYYY",
    timeFormat: "12h",
    autoAssign: true,
    showSkillSuggestions: true,
    compactView: false,
  })

  const [isLoading, setIsLoading] = useState(false)

  const handleSave = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
    console.log("Preferences updated:", preferences)
  }

  return (
    <div className="space-y-6">
      {/* Appearance */}
      <Card className="bg-zinc-900/50 border-zinc-800">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Palette className="h-5 w-5 text-emerald-400" />
            <CardTitle className="text-white">Appearance</CardTitle>
          </div>
          <CardDescription className="text-zinc-400">Customize how the application looks and feels</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="text-zinc-200">Theme</Label>
            <Select
              value={preferences.theme}
              onValueChange={(value) => setPreferences({ ...preferences, theme: value })}
            >
              <SelectTrigger className="w-48 bg-zinc-800 border-zinc-700 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-zinc-900 border-zinc-700">
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-zinc-200">Compact View</Label>
              <p className="text-sm text-zinc-500">Use a more compact layout to show more information</p>
            </div>
            <Switch
              checked={preferences.compactView}
              onCheckedChange={(checked) => setPreferences({ ...preferences, compactView: checked })}
            />
          </div>
        </CardContent>
      </Card>

      {/* Localization */}
      <Card className="bg-zinc-900/50 border-zinc-800">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-violet-400" />
            <CardTitle className="text-white">Localization</CardTitle>
          </div>
          <CardDescription className="text-zinc-400">Set your language and regional preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-zinc-200">Language</Label>
              <Select
                value={preferences.language}
                onValueChange={(value) => setPreferences({ ...preferences, language: value })}
              >
                <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 border-zinc-700">
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
                  <SelectItem value="fr">Français</SelectItem>
                  <SelectItem value="de">Deutsch</SelectItem>
                  <SelectItem value="ja">日本語</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-zinc-200">Timezone</Label>
              <Select
                value={preferences.timezone}
                onValueChange={(value) => setPreferences({ ...preferences, timezone: value })}
              >
                <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 border-zinc-700">
                  <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                  <SelectItem value="America/Denver">Mountain Time</SelectItem>
                  <SelectItem value="America/Chicago">Central Time</SelectItem>
                  <SelectItem value="America/New_York">Eastern Time</SelectItem>
                  <SelectItem value="Europe/London">GMT</SelectItem>
                  <SelectItem value="Europe/Paris">CET</SelectItem>
                  <SelectItem value="Asia/Tokyo">JST</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-zinc-200">Date Format</Label>
              <Select
                value={preferences.dateFormat}
                onValueChange={(value) => setPreferences({ ...preferences, dateFormat: value })}
              >
                <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 border-zinc-700">
                  <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                  <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                  <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-zinc-200">Time Format</Label>
              <Select
                value={preferences.timeFormat}
                onValueChange={(value) => setPreferences({ ...preferences, timeFormat: value })}
              >
                <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 border-zinc-700">
                  <SelectItem value="12h">12 Hour</SelectItem>
                  <SelectItem value="24h">24 Hour</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Workflow */}
      <Card className="bg-zinc-900/50 border-zinc-800">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-amber-400" />
            <CardTitle className="text-white">Workflow</CardTitle>
          </div>
          <CardDescription className="text-zinc-400">Configure how the system behaves for you</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-zinc-200">Auto-assign tickets</Label>
              <p className="text-sm text-zinc-500">Automatically assign tickets that match your skills</p>
            </div>
            <Switch
              checked={preferences.autoAssign}
              onCheckedChange={(checked) => setPreferences({ ...preferences, autoAssign: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-zinc-200">Show skill suggestions</Label>
              <p className="text-sm text-zinc-500">Show suggested skills when creating tickets</p>
            </div>
            <Switch
              checked={preferences.showSkillSuggestions}
              onCheckedChange={(checked) => setPreferences({ ...preferences, showSkillSuggestions: checked })}
            />
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button
          onClick={handleSave}
          disabled={isLoading}
          className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white border-0"
        >
          <Save className="h-4 w-4 mr-2" />
          {isLoading ? "Saving..." : "Save Preferences"}
        </Button>
      </div>
    </div>
  )
}
