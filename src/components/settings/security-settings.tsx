"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Shield, Key, Smartphone, Eye, EyeOff, AlertTriangle } from "lucide-react"

export default function SecuritySettings() {
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  })
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  })
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const sessions = [
    {
      id: 1,
      device: "MacBook Pro",
      location: "San Francisco, CA",
      lastActive: "Active now",
      current: true,
    },
    {
      id: 2,
      device: "iPhone 14",
      location: "San Francisco, CA",
      lastActive: "2 hours ago",
      current: false,
    },
    {
      id: 3,
      device: "Chrome on Windows",
      location: "New York, NY",
      lastActive: "3 days ago",
      current: false,
    },
  ]

  const handlePasswordChange = async () => {
    if (passwords.new !== passwords.confirm) {
      alert("New passwords don't match")
      return
    }
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
    setPasswords({ current: "", new: "", confirm: "" })
    console.log("Password changed")
  }

  const togglePasswordVisibility = (field: keyof typeof showPasswords) => {
    setShowPasswords({ ...showPasswords, [field]: !showPasswords[field] })
  }

  return (
    <div className="space-y-6">
      {/* Password Change */}
      <Card className="bg-zinc-900/50 border-zinc-800">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Key className="h-5 w-5 text-emerald-400" />
            <CardTitle className="text-white">Change Password</CardTitle>
          </div>
          <CardDescription className="text-zinc-400">Update your password to keep your account secure</CardDescription>
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
                onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-emerald-500 pr-10"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("current")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
              >
                {showPasswords.current ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
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
                onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-emerald-500 pr-10"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("new")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
              >
                {showPasswords.new ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
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
                onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-emerald-500 pr-10"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("confirm")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
              >
                {showPasswords.confirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <Button
            onClick={handlePasswordChange}
            disabled={isLoading || !passwords.current || !passwords.new || !passwords.confirm}
            className="bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            {isLoading ? "Updating..." : "Update Password"}
          </Button>
        </CardContent>
      </Card>

      {/* Two-Factor Authentication */}
      <Card className="bg-zinc-900/50 border-zinc-800">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Smartphone className="h-5 w-5 text-violet-400" />
            <CardTitle className="text-white">Two-Factor Authentication</CardTitle>
          </div>
          <CardDescription className="text-zinc-400">Add an extra layer of security to your account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-zinc-200">Enable 2FA</Label>
              <p className="text-sm text-zinc-500">Use an authenticator app to secure your account</p>
            </div>
            <Switch checked={twoFactorEnabled} onCheckedChange={setTwoFactorEnabled} />
          </div>

          {twoFactorEnabled && (
            <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-4 w-4 text-emerald-400" />
                <span className="text-sm font-medium text-emerald-400">2FA Enabled</span>
              </div>
              <p className="text-sm text-zinc-300">
                Your account is protected with two-factor authentication. Use your authenticator app to generate codes
                when signing in.
              </p>
              <Button variant="outline" size="sm" className="mt-3 border-emerald-500/20 text-emerald-400">
                View Recovery Codes
              </Button>
            </div>
          )}

          {!twoFactorEnabled && (
            <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-amber-400" />
                <span className="text-sm font-medium text-amber-400">2FA Disabled</span>
              </div>
              <p className="text-sm text-zinc-300">
                Your account is not protected with two-factor authentication. Enable 2FA to add an extra layer of
                security.
              </p>
              <Button size="sm" className="mt-3 bg-emerald-600 hover:bg-emerald-700 text-white">
                Setup 2FA
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Active Sessions */}
      <Card className="bg-zinc-900/50 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-white">Active Sessions</CardTitle>
          <CardDescription className="text-zinc-400">Manage your active sessions across devices</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {sessions.map((session) => (
            <div key={session.id} className="flex items-center justify-between p-4 bg-zinc-800/50 rounded-lg">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-medium text-white">{session.device}</h4>
                  {session.current && (
                    <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">Current</Badge>
                  )}
                </div>
                <p className="text-sm text-zinc-400">{session.location}</p>
                <p className="text-xs text-zinc-500">{session.lastActive}</p>
              </div>
              {!session.current && (
                <Button variant="outline" size="sm" className="border-red-500/20 text-red-400 hover:bg-red-500/10">
                  Revoke
                </Button>
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
