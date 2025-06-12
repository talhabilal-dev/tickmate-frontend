"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Zap, Key, CheckCircle, AlertCircle, ExternalLink } from "lucide-react"

export default function IntegrationsSettings() {
  const [geminiApiKey, setGeminiApiKey] = useState("")
  const [geminiEnabled, setGeminiEnabled] = useState(true)
  const [webhookUrl, setWebhookUrl] = useState("")
  const [webhookEnabled, setWebhookEnabled] = useState(false)

  const integrations = [
    {
      name: "Gemini AI",
      description: "AI-powered ticket analysis and skill matching",
      status: "connected",
      icon: <Zap className="h-5 w-5 text-emerald-400" />,
      lastSync: "2 minutes ago",
    },
    {
      name: "Slack",
      description: "Send notifications to Slack channels",
      status: "disconnected",
      icon: <div className="h-5 w-5 bg-violet-500 rounded text-white text-xs flex items-center justify-center">S</div>,
      lastSync: "Never",
    },
    {
      name: "GitHub",
      description: "Link tickets to GitHub issues and pull requests",
      status: "connected",
      icon: <div className="h-5 w-5 bg-zinc-800 rounded text-white text-xs flex items-center justify-center">G</div>,
      lastSync: "1 hour ago",
    },
    {
      name: "Jira",
      description: "Sync tickets with Jira issues",
      status: "disconnected",
      icon: <div className="h-5 w-5 bg-blue-500 rounded text-white text-xs flex items-center justify-center">J</div>,
      lastSync: "Never",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "connected":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
      case "disconnected":
        return "bg-zinc-500/10 text-zinc-400 border-zinc-500/20"
      case "error":
        return "bg-red-500/10 text-red-400 border-red-500/20"
      default:
        return "bg-zinc-500/10 text-zinc-400 border-zinc-500/20"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "connected":
        return <CheckCircle className="h-4 w-4 text-emerald-400" />
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-400" />
      default:
        return <AlertCircle className="h-4 w-4 text-zinc-400" />
    }
  }

  return (
    <div className="space-y-6">
      {/* AI Configuration */}
      <Card className="bg-zinc-900/50 border-zinc-800">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-emerald-400" />
            <CardTitle className="text-white">AI Configuration</CardTitle>
          </div>
          <CardDescription className="text-zinc-400">
            Configure AI settings for ticket analysis and assignment
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-zinc-200">Enable AI Processing</Label>
              <p className="text-sm text-zinc-500">Use Gemini AI to analyze tickets and suggest assignments</p>
            </div>
            <Switch checked={geminiEnabled} onCheckedChange={setGeminiEnabled} />
          </div>

          {geminiEnabled && (
            <div className="space-y-4 p-4 bg-zinc-800/50 rounded-lg">
              <div className="space-y-2">
                <Label htmlFor="geminiApiKey" className="text-zinc-200">
                  Gemini API Key
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="geminiApiKey"
                    type="password"
                    value={geminiApiKey}
                    onChange={(e) => setGeminiApiKey(e.target.value)}
                    placeholder="Enter your Gemini API key"
                    className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-emerald-500"
                  />
                  <Button variant="outline" className="border-zinc-700 text-zinc-300 hover:bg-zinc-800">
                    Test
                  </Button>
                </div>
                <p className="text-xs text-zinc-500">
                  Get your API key from{" "}
                  <a href="#" className="text-emerald-400 hover:text-emerald-300">
                    Google AI Studio
                  </a>
                </p>
              </div>

              <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <CheckCircle className="h-4 w-4 text-emerald-400" />
                  <span className="text-sm font-medium text-emerald-400">API Connected</span>
                </div>
                <p className="text-sm text-zinc-300">Gemini AI is successfully connected and processing tickets.</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Webhooks */}
      <Card className="bg-zinc-900/50 border-zinc-800">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Key className="h-5 w-5 text-violet-400" />
            <CardTitle className="text-white">Webhooks</CardTitle>
          </div>
          <CardDescription className="text-zinc-400">
            Configure webhooks to receive real-time notifications
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-zinc-200">Enable Webhooks</Label>
              <p className="text-sm text-zinc-500">Send HTTP requests when tickets are created or updated</p>
            </div>
            <Switch checked={webhookEnabled} onCheckedChange={setWebhookEnabled} />
          </div>

          {webhookEnabled && (
            <div className="space-y-4 p-4 bg-zinc-800/50 rounded-lg">
              <div className="space-y-2">
                <Label htmlFor="webhookUrl" className="text-zinc-200">
                  Webhook URL
                </Label>
                <Input
                  id="webhookUrl"
                  type="url"
                  value={webhookUrl}
                  onChange={(e) => setWebhookUrl(e.target.value)}
                  placeholder="https://your-app.com/webhook"
                  className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-emerald-500"
                />
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="border-zinc-700 text-zinc-300 hover:bg-zinc-800">
                  Test Webhook
                </Button>
                <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white">
                  Save Webhook
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Available Integrations */}
      <Card className="bg-zinc-900/50 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-white">Available Integrations</CardTitle>
          <CardDescription className="text-zinc-400">
            Connect with external services to enhance your workflow
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {integrations.map((integration, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-zinc-800/50 rounded-lg">
              <div className="flex items-center gap-4">
                {integration.icon}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-white">{integration.name}</h4>
                    <Badge className={getStatusColor(integration.status)}>
                      {getStatusIcon(integration.status)}
                      <span className="ml-1 capitalize">{integration.status}</span>
                    </Badge>
                  </div>
                  <p className="text-sm text-zinc-400">{integration.description}</p>
                  <p className="text-xs text-zinc-500 mt-1">Last sync: {integration.lastSync}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {integration.status === "connected" ? (
                  <>
                    <Button variant="outline" size="sm" className="border-zinc-700 text-zinc-300 hover:bg-zinc-800">
                      Configure
                    </Button>
                    <Button variant="outline" size="sm" className="border-red-500/20 text-red-400 hover:bg-red-500/10">
                      Disconnect
                    </Button>
                  </>
                ) : (
                  <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white">
                    Connect
                  </Button>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* API Keys */}
      <Card className="bg-zinc-900/50 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-white">API Keys</CardTitle>
          <CardDescription className="text-zinc-400">Manage API keys for external integrations</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-zinc-800/50 rounded-lg">
            <div>
              <h4 className="font-medium text-white">Personal Access Token</h4>
              <p className="text-sm text-zinc-400">Use this token to access the TicketMatch API</p>
              <p className="text-xs text-zinc-500 mt-1">Created on Jan 15, 2024</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="border-zinc-700 text-zinc-300 hover:bg-zinc-800">
                <ExternalLink className="h-4 w-4 mr-1" />
                View Docs
              </Button>
              <Button variant="outline" size="sm" className="border-zinc-700 text-zinc-300 hover:bg-zinc-800">
                Regenerate
              </Button>
            </div>
          </div>

          <Button variant="outline" className="border-zinc-700 text-zinc-300 hover:bg-zinc-800">
            <Key className="h-4 w-4 mr-2" />
            Generate New Token
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
