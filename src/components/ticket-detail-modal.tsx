"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Clock, User, MessageSquare, Edit, UserPlus, CheckCircle } from "lucide-react"

interface TicketDetailModalProps {
  ticket: any
  isOpen: boolean
  onClose: () => void
}

export default function TicketDetailModal({ ticket, isOpen, onClose }: TicketDetailModalProps) {
  const [newComment, setNewComment] = useState("")
  const [status, setStatus] = useState(ticket.status)

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "open":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20"
      case "in progress":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20"
      case "resolved":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
      default:
        return "bg-zinc-500/10 text-zinc-400 border-zinc-500/20"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "critical":
        return "bg-red-500/10 text-red-400 border-red-500/20"
      case "high":
        return "bg-orange-500/10 text-orange-400 border-orange-500/20"
      case "medium":
        return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
      case "low":
        return "bg-green-500/10 text-green-400 border-green-500/20"
      default:
        return "bg-zinc-500/10 text-zinc-400 border-zinc-500/20"
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString()
  }

  const comments = [
    {
      id: 1,
      author: "System",
      content: "Ticket created and assigned to AI processing queue",
      timestamp: ticket.created,
      isSystem: true,
    },
    {
      id: 2,
      author: "AI Agent",
      content:
        "Analyzed ticket content. Identified skills: React Native, Authentication, iOS. Recommended assignment to mobile development team.",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      isSystem: true,
    },
    {
      id: 3,
      author: ticket.assignee,
      content: "I'll look into this issue. Checking the authentication flow on iOS devices first.",
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
      isSystem: false,
    },
  ]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-zinc-900 border-zinc-800 max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-white text-xl">
              {ticket.id}: {ticket.title}
            </DialogTitle>
            <div className="flex gap-2">
              <Badge className={getStatusColor(status)}>{status}</Badge>
              <Badge className={getPriorityColor(ticket.priority)}>{ticket.priority}</Badge>
            </div>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Description</h3>
              <p className="text-zinc-300 leading-relaxed">{ticket.description}</p>
            </div>

            {/* Skills */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Required Skills</h3>
              <div className="flex flex-wrap gap-2">
                {ticket.skills.map((skill: string) => (
                  <Badge key={skill} variant="outline" className="border-zinc-700 text-zinc-400">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Comments */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Activity & Comments</h3>
              <div className="space-y-4">
                {comments.map((comment) => (
                  <div key={comment.id} className="flex gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className={comment.isSystem ? "bg-violet-500" : "bg-emerald-500"}>
                        {comment.isSystem
                          ? "AI"
                          : comment.author
                              .split(" ")
                              .map((n : any) => n[0])
                              .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium text-white">{comment.author}</span>
                        <span className="text-xs text-zinc-500">{formatDate(comment.timestamp)}</span>
                      </div>
                      <p className="text-sm text-zinc-300">{comment.content}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Comment */}
              <div className="mt-6 space-y-3">
                <Textarea
                  placeholder="Add a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-emerald-500"
                  rows={3}
                />
                <Button
                  size="sm"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white"
                  disabled={!newComment.trim()}
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Add Comment
                </Button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Status & Actions */}
            <div className="bg-zinc-800/50 rounded-lg p-4 space-y-4">
              <div>
                <label className="text-sm font-medium text-zinc-300 mb-2 block">Status</label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-900 border-zinc-700">
                    <SelectItem value="Open">Open</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Resolved">Resolved</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-2">
                <Button variant="outline" size="sm" className="border-zinc-700 text-zinc-300 hover:bg-zinc-800">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Ticket
                </Button>
                {ticket.assignee === "Unassigned" && (
                  <Button variant="outline" size="sm" className="border-zinc-700 text-zinc-300 hover:bg-zinc-800">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Assign to Me
                  </Button>
                )}
                <Button variant="outline" size="sm" className="border-zinc-700 text-zinc-300 hover:bg-zinc-800">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Mark as Resolved
                </Button>
              </div>
            </div>

            {/* Ticket Info */}
            <div className="bg-zinc-800/50 rounded-lg p-4 space-y-4">
              <h4 className="font-medium text-white">Ticket Information</h4>

              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-zinc-500" />
                  <span className="text-zinc-400">Reporter:</span>
                  <span className="text-white">{ticket.reporter}</span>
                </div>

                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-zinc-500" />
                  <span className="text-zinc-400">Assignee:</span>
                  {ticket.assignee !== "Unassigned" ? (
                    <div className="flex items-center gap-2">
                      <Avatar className="h-5 w-5">
                        <AvatarFallback className="bg-emerald-500 text-xs">
                          {ticket.assignee
                            .split(" ")
                            .map((n: string) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-white">{ticket.assignee}</span>
                    </div>
                  ) : (
                    <Badge variant="outline" className="border-zinc-700 text-zinc-500">
                      Unassigned
                    </Badge>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-zinc-500" />
                  <span className="text-zinc-400">Created:</span>
                  <span className="text-white">{formatDate(ticket.created)}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-zinc-500" />
                  <span className="text-zinc-400">Updated:</span>
                  <span className="text-white">{formatDate(ticket.updated)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
