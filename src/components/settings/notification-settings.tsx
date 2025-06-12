"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Save, Bell, Mail } from "lucide-react"

export default function NotificationSettings() {
  const [notifications, setNotifications] = useState({
    email: {
      ticketAssigned: true,
      ticketUpdated: true,
      ticketResolved: false,
      weeklyDigest: true,
      marketingEmails: false,
    },
    push: {
      ticketAssigned: true,
      ticketUpdated: false,
      ticketResolved: false,
      mentions: true,
    },
    frequency: "immediate", // immediate, daily, weekly
  })

  const [isLoading, setIsLoading] = useState(false)

  const handleEmailToggle = (key: keyof typeof notifications.email) => {
    setNotifications({
      ...notifications,
      email: {
        ...notifications.email,
        [key]: !notifications.email[key],
      },
    })
  }

  const handlePushToggle = (key: keyof typeof notifications.push) => {
    setNotifications({
      ...notifications,
      push: {
        ...notifications.push,
        [key]: !notifications.push[key],
      },
    })
  }

  const handleSave = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
    console.log("Notifications updated:", notifications)
  }

  return (
    <div className="space-y-6">
      {/* Email Notifications */}
      <Card className="bg-zinc-900/50 border-zinc-800">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-emerald-400" />
            <CardTitle className="text-white">Email Notifications</CardTitle>
          </div>
          <CardDescription className="text-zinc-400">
            Choose what email notifications you'd like to receive
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-zinc-200">Ticket Assigned</Label>
                <p className="text-sm text-zinc-500">Get notified when a ticket is assigned to you</p>
              </div>
              <Switch
                checked={notifications.email.ticketAssigned}
                onCheckedChange={() => handleEmailToggle("ticketAssigned")}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-zinc-200">Ticket Updated</Label>
                <p className="text-sm text-zinc-500">Get notified when tickets you're involved in are updated</p>
              </div>
              <Switch
                checked={notifications.email.ticketUpdated}
                onCheckedChange={() => handleEmailToggle("ticketUpdated")}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-zinc-200">Ticket Resolved</Label>
                <p className="text-sm text-zinc-500">Get notified when tickets are resolved</p>
              </div>
              <Switch
                checked={notifications.email.ticketResolved}
                onCheckedChange={() => handleEmailToggle("ticketResolved")}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-zinc-200">Weekly Digest</Label>
                <p className="text-sm text-zinc-500">Receive a weekly summary of your activity</p>
              </div>
              <Switch
                checked={notifications.email.weeklyDigest}
                onCheckedChange={() => handleEmailToggle("weeklyDigest")}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-zinc-200">Marketing Emails</Label>
                <p className="text-sm text-zinc-500">Receive updates about new features and tips</p>
              </div>
              <Switch
                checked={notifications.email.marketingEmails}
                onCheckedChange={() => handleEmailToggle("marketingEmails")}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-zinc-200">Email Frequency</Label>
            <Select
              value={notifications.frequency}
              onValueChange={(value) => setNotifications({ ...notifications, frequency: value })}
            >
              <SelectTrigger className="w-48 bg-zinc-800 border-zinc-700 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-zinc-900 border-zinc-700">
                <SelectItem value="immediate">Immediate</SelectItem>
                <SelectItem value="daily">Daily Digest</SelectItem>
                <SelectItem value="weekly">Weekly Digest</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Push Notifications */}
      <Card className="bg-zinc-900/50 border-zinc-800">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-violet-400" />
            <CardTitle className="text-white">Push Notifications</CardTitle>
          </div>
          <CardDescription className="text-zinc-400">Manage your browser and mobile push notifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-zinc-200">Ticket Assigned</Label>
              <p className="text-sm text-zinc-500">Instant notification when assigned a ticket</p>
            </div>
            <Switch
              checked={notifications.push.ticketAssigned}
              onCheckedChange={() => handlePushToggle("ticketAssigned")}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-zinc-200">Ticket Updated</Label>
              <p className="text-sm text-zinc-500">Notification when your tickets are updated</p>
            </div>
            <Switch
              checked={notifications.push.ticketUpdated}
              onCheckedChange={() => handlePushToggle("ticketUpdated")}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-zinc-200">Ticket Resolved</Label>
              <p className="text-sm text-zinc-500">Notification when tickets are resolved</p>
            </div>
            <Switch
              checked={notifications.push.ticketResolved}
              onCheckedChange={() => handlePushToggle("ticketResolved")}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-zinc-200">Mentions</Label>
              <p className="text-sm text-zinc-500">Notification when you're mentioned in comments</p>
            </div>
            <Switch checked={notifications.push.mentions} onCheckedChange={() => handlePushToggle("mentions")} />
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
