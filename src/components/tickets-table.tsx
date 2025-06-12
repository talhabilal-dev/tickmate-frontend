"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Eye } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Ticket {
  id: string
  title: string
  status: string
  priority: string
  assignee: string
  created: string
  skills: string[]
}

interface TicketsTableProps {
  tickets: Ticket[]
}

export default function TicketsTable({ tickets }: TicketsTableProps) {
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

  return (
    <div className="space-y-4">
      {tickets.map((ticket) => (
        <div
          key={ticket.id}
          className="flex items-center justify-between p-4 rounded-lg border border-zinc-800 hover:border-zinc-700 transition-colors"
        >
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-sm font-mono text-zinc-400">{ticket.id}</span>
              <Badge className={getStatusColor(ticket.status)}>{ticket.status}</Badge>
              <Badge className={getPriorityColor(ticket.priority)}>{ticket.priority}</Badge>
            </div>
            <h4 className="text-sm font-medium text-white truncate">{ticket.title}</h4>
            <div className="flex items-center gap-4 mt-2 text-xs text-zinc-500">
              <span>Assignee: {ticket.assignee}</span>
              <span>Created: {ticket.created}</span>
            </div>
            <div className="flex gap-1 mt-2">
              {ticket.skills.map((skill) => (
                <Badge key={skill} variant="outline" className="text-xs border-zinc-700 text-zinc-400">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-white">
              <Eye className="h-4 w-4" />
            </Button>
            {/* <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-white">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-zinc-900 border-zinc-800" align="end">
                <DropdownMenuItem className="text-zinc-300 hover:bg-zinc-800 hover:text-white">
                  View Details
                </DropdownMenuItem>
                <DropdownMenuItem className="text-zinc-300 hover:bg-zinc-800 hover:text-white">
                  Edit Ticket
                </DropdownMenuItem>
                <DropdownMenuItem className="text-zinc-300 hover:bg-zinc-800 hover:text-white">
                  Reassign
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu> */}
          </div>
        </div>
      ))}
    </div>
  )
}
