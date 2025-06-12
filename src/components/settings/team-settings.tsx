"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UserPlus, Mail, MoreHorizontal, Crown, Shield } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function TeamSettings() {
  const [inviteEmail, setInviteEmail] = useState("")
  const [inviteRole, setInviteRole] = useState("member")

  const teamMembers = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "admin",
      avatar: "/placeholder.svg?height=40&width=40",
      skills: ["React", "Node.js", "TypeScript"],
      joinedAt: "2023-01-15",
      lastActive: "2 hours ago",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      role: "member",
      avatar: "/placeholder.svg?height=40&width=40",
      skills: ["Python", "Django", "PostgreSQL"],
      joinedAt: "2023-02-20",
      lastActive: "1 day ago",
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike@example.com",
      role: "member",
      avatar: "/placeholder.svg?height=40&width=40",
      skills: ["JavaScript", "Vue.js", "MongoDB"],
      joinedAt: "2023-03-10",
      lastActive: "3 hours ago",
    },
  ]

  const pendingInvites = [
    {
      id: 1,
      email: "sarah@example.com",
      role: "member",
      invitedAt: "2024-01-10",
      invitedBy: "John Doe",
    },
    {
      id: 2,
      email: "alex@example.com",
      role: "admin",
      invitedAt: "2024-01-12",
      invitedBy: "John Doe",
    },
  ]

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-violet-500/10 text-violet-400 border-violet-500/20"
      case "member":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
      default:
        return "bg-zinc-500/10 text-zinc-400 border-zinc-500/20"
    }
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "admin":
        return <Crown className="h-3 w-3" />
      case "member":
        return <Shield className="h-3 w-3" />
      default:
        return null
    }
  }

  const handleInvite = () => {
    if (inviteEmail) {
      console.log("Inviting:", inviteEmail, "as", inviteRole)
      setInviteEmail("")
      setInviteRole("member")
    }
  }

  return (
    <div className="space-y-6">
      {/* Invite Member */}
      <Card className="bg-zinc-900/50 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-white">Invite Team Member</CardTitle>
          <CardDescription className="text-zinc-400">Add new members to your team</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1 space-y-2">
              <Label htmlFor="inviteEmail" className="text-zinc-200">
                Email Address
              </Label>
              <Input
                id="inviteEmail"
                type="email"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                placeholder="colleague@example.com"
                className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-emerald-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="inviteRole" className="text-zinc-200">
                Role
              </Label>
              <Select value={inviteRole} onValueChange={setInviteRole}>
                <SelectTrigger className="w-32 bg-zinc-800 border-zinc-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 border-zinc-700">
                  <SelectItem value="member">Member</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button
                onClick={handleInvite}
                disabled={!inviteEmail}
                className="bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Invite
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pending Invites */}
      {pendingInvites.length > 0 && (
        <Card className="bg-zinc-900/50 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-white">Pending Invites ({pendingInvites.length})</CardTitle>
            <CardDescription className="text-zinc-400">Invitations waiting for acceptance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {pendingInvites.map((invite) => (
              <div key={invite.id} className="flex items-center justify-between p-3 bg-zinc-800/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-zinc-700 rounded-full flex items-center justify-center">
                    <Mail className="h-4 w-4 text-zinc-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{invite.email}</p>
                    <p className="text-xs text-zinc-500">
                      Invited by {invite.invitedBy} • {invite.invitedAt}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getRoleColor(invite.role)}>
                    {getRoleIcon(invite.role)}
                    <span className="ml-1">{invite.role}</span>
                  </Badge>
                  <Button variant="outline" size="sm" className="border-red-500/20 text-red-400 hover:bg-red-500/10">
                    Cancel
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Team Members */}
      <Card className="bg-zinc-900/50 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-white">Team Members ({teamMembers.length})</CardTitle>
          <CardDescription className="text-zinc-400">Manage your team members and their roles</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {teamMembers.map((member) => (
            <div key={member.id} className="flex items-center justify-between p-4 bg-zinc-800/50 rounded-lg">
              <div className="flex items-center gap-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                  <AvatarFallback className="bg-emerald-500 text-white">
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-white">{member.name}</h4>
                    <Badge className={getRoleColor(member.role)}>
                      {getRoleIcon(member.role)}
                      <span className="ml-1">{member.role}</span>
                    </Badge>
                  </div>
                  <p className="text-sm text-zinc-400">{member.email}</p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-zinc-500">
                    <span>Joined {member.joinedAt}</span>
                    <span>Last active {member.lastActive}</span>
                  </div>
                  <div className="flex gap-1 mt-2">
                    {member.skills.slice(0, 3).map((skill) => (
                      <Badge key={skill} variant="outline" className="text-xs border-zinc-700 text-zinc-400">
                        {skill}
                      </Badge>
                    ))}
                    {member.skills.length > 3 && (
                      <Badge variant="outline" className="text-xs border-zinc-700 text-zinc-400">
                        +{member.skills.length - 3}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-zinc-900 border-zinc-800" align="end">
                  <DropdownMenuItem className="text-zinc-300 hover:bg-zinc-800 hover:text-white">
                    View Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-zinc-300 hover:bg-zinc-800 hover:text-white">
                    Change Role
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-red-400 hover:bg-red-500/10 hover:text-red-300">
                    Remove Member
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
