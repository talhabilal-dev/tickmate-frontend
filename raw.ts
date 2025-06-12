"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Search, Eye, Edit, UserPlus } from "lucide-react";
import DashboardLayout from "@/components/dashboard-layout";
import CreateTicketForm from "@/components/create-ticket-form";
import TicketDetailModal from "@/components/ticket-detail-modal";
import { motion } from "framer-motion";
import { apiFetch } from "@/lib/api";

export default function TicketsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [assigneeFilter, setAssigneeFilter] = useState("all");
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [createTicketOpen, setCreateTicketOpen] = useState(false);
  

  const tickets = [
    {
      id: "TK-001",
      title: "Login issues with mobile app",
      description:
        "Users are experiencing login failures on iOS devices. The app crashes when attempting to authenticate with biometric login.",
      status: "In Progress",
      priority: "High",
      assignee: "John Doe",
      assigneeAvatar: "/placeholder.svg?height=32&width=32",
      created: "2024-01-15T10:30:00Z",
      updated: "2024-01-15T14:20:00Z",
      skills: ["React Native", "Authentication", "iOS"],
      reporter: "Sarah Wilson",
      category: "Mobile App",
    },
    {
      id: "TK-002",
      title: "Database connection timeout",
      description:
        "Production database is experiencing intermittent connection timeouts during peak hours. This affects user data retrieval and causes 500 errors.",
      status: "Open",
      priority: "Critical",
      assignee: "Unassigned",
      assigneeAvatar: null,
      created: "2024-01-15T08:15:00Z",
      updated: "2024-01-15T08:15:00Z",
      skills: ["Database", "Backend", "Performance"],
      reporter: "Mike Chen",
      category: "Backend",
    },
    {
      id: "TK-003",
      title: "UI component not responsive",
      description:
        "The dashboard sidebar doesn't collapse properly on tablet devices. Layout breaks on screen sizes between 768px and 1024px.",
      status: "Resolved",
      priority: "Medium",
      assignee: "Jane Smith",
      assigneeAvatar: "/placeholder.svg?height=32&width=32",
      created: "2024-01-14T16:45:00Z",
      updated: "2024-01-15T09:30:00Z",
      skills: ["CSS", "Frontend", "Responsive Design"],
      reporter: "Alex Johnson",
      category: "Frontend",
    },
    {
      id: "TK-004",
      title: "API rate limiting issues",
      description:
        "Third-party API integration is hitting rate limits during data synchronization. Need to implement proper throttling and retry logic.",
      status: "In Progress",
      priority: "High",
      assignee: "Mike Johnson",
      assigneeAvatar: "/placeholder.svg?height=32&width=32",
      created: "2024-01-13T11:20:00Z",
      updated: "2024-01-15T13:45:00Z",
      skills: ["API", "Backend", "Integration"],
      reporter: "Lisa Brown",
      category: "Integration",
    },
    {
      id: "TK-005",
      title: "Email notifications not sending",
      description:
        "Users are not receiving email notifications for password resets and account verification. SMTP configuration needs review.",
      status: "Open",
      priority: "Medium",
      assignee: "Unassigned",
      assigneeAvatar: null,
      created: "2024-01-15T07:30:00Z",
      updated: "2024-01-15T07:30:00Z",
      skills: ["Email", "Backend", "SMTP"],
      reporter: "David Kim",
      category: "Backend",
    },
    {
      id: "TK-006",
      title: "Performance issues on dashboard",
      description:
        "Dashboard loads slowly with large datasets. Need to optimize queries and implement pagination for better performance.",
      status: "Open",
      priority: "Low",
      assignee: "Unassigned",
      assigneeAvatar: null,
      created: "2024-01-12T14:15:00Z",
      updated: "2024-01-12T14:15:00Z",
      skills: ["Performance", "Frontend", "Database"],
      reporter: "Emma Davis",
      category: "Performance",
    },
  ];

    useEffect(() => {
    const fetchTickets = async () => {
      const realTickets = await apiFetch("/tickets");
      console.log(realTickets);
    };

    fetchTickets();
  }, []);

  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch =
      ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ||
      ticket.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesPriority =
      priorityFilter === "all" ||
      ticket.priority.toLowerCase() === priorityFilter.toLowerCase();
    const matchesAssignee =
      assigneeFilter === "all" ||
      (assigneeFilter === "unassigned" && ticket.assignee === "Unassigned") ||
      (assigneeFilter === "assigned" && ticket.assignee !== "Unassigned");

    return matchesSearch && matchesStatus && matchesPriority && matchesAssignee;
  });



  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "open":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      case "in progress":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      case "resolved":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      default:
        return "bg-zinc-500/10 text-zinc-400 border-zinc-500/20";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "critical":
        return "bg-red-500/10 text-red-400 border-red-500/20";
      case "high":
        return "bg-orange-500/10 text-orange-400 border-orange-500/20";
      case "medium":
        return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
      case "low":
        return "bg-green-500/10 text-green-400 border-green-500/20";
      default:
        return "bg-zinc-500/10 text-zinc-400 border-zinc-500/20";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return "1 day ago";
    return `${Math.floor(diffInHours / 24)} days ago`;
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">Tickets</h1>
            <p className="text-zinc-400">
              Manage and track all support tickets
            </p>
          </div>
          <Dialog open={createTicketOpen} onOpenChange={setCreateTicketOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white border-0">
                <Plus className="h-4 w-4 mr-2" />
                Create Ticket
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-zinc-900 border-zinc-800 max-w-2xl">
              <DialogHeader>
                <DialogTitle className="text-white">
                  Create New Ticket
                </DialogTitle>
                <DialogDescription className="text-zinc-400">
                  Fill out the form below to create a new support ticket
                </DialogDescription>
              </DialogHeader>
              <CreateTicketForm onClose={() => setCreateTicketOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-500" />
            <Input
              placeholder="Search tickets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-emerald-500"
            />
          </div>
          <div className="flex gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-32 bg-zinc-900 border-zinc-700 text-white">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-900 border-zinc-700">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="in progress">In Progress</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>

            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-32 bg-zinc-900 border-zinc-700 text-white">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-900 border-zinc-700">
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>

            <Select value={assigneeFilter} onValueChange={setAssigneeFilter}>
              <SelectTrigger className="w-36 bg-zinc-900 border-zinc-700 text-white">
                <SelectValue placeholder="Assignee" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-900 border-zinc-700">
                <SelectItem value="all">All Tickets</SelectItem>
                <SelectItem value="assigned">Assigned</SelectItem>
                <SelectItem value="unassigned">Unassigned</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results count */}
        <div className="text-sm text-zinc-400">
          Showing {filteredTickets.length} of {tickets.length} tickets
        </div>

        {/* Tickets List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredTickets.map((ticket, index) => (
            <motion.div
              key={ticket.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-6 hover:border-zinc-700 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-sm font-mono text-zinc-400">
                      {ticket.id}
                    </span>
                    <Badge className={getStatusColor(ticket.status)}>
                      {ticket.status}
                    </Badge>
                    <Badge className={getPriorityColor(ticket.priority)}>
                      {ticket.priority}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="border-zinc-700 text-zinc-400"
                    >
                      {ticket.category}
                    </Badge>
                  </div>

                  <h3 className="text-lg font-semibold text-white mb-2">
                    {ticket.title}
                  </h3>
                  <p className="text-zinc-400 text-sm mb-4 line-clamp-2">
                    {ticket.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6 text-xs text-zinc-500">
                      <span>Reporter: {ticket.reporter}</span>
                      <span>Created: {formatDate(ticket.created)}</span>
                      <span>Updated: {formatDate(ticket.updated)}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {ticket.assignee !== "Unassigned" ? (
                        <div className="flex items-center gap-2 text-sm text-zinc-400">
                          <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center text-white text-xs">
                            {ticket.assignee
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </div>
                          <span>{ticket.assignee}</span>
                        </div>
                      ) : (
                        <Badge
                          variant="outline"
                          className="border-zinc-700 text-zinc-500"
                        >
                          Unassigned
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex gap-1">
                      {ticket.skills.map((skill) => (
                        <Badge
                          key={skill}
                          variant="outline"
                          className="text-xs border-zinc-700 text-zinc-400"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedTicket(ticket)}
                        className="text-zinc-400 hover:text-white"
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-zinc-400 hover:text-white"
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      {ticket.assignee === "Unassigned" && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-zinc-400 hover:text-white"
                        >
                          <UserPlus className="h-4 w-4 mr-1" />
                          Assign
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredTickets.length === 0 && (
          <div className="text-center py-12">
            <div className="text-zinc-500 mb-2">No tickets found</div>
            <div className="text-sm text-zinc-600">
              Try adjusting your search or filter criteria
            </div>
          </div>
        )}
      </div>

      {/* Ticket Detail Modal */}
      {selectedTicket && (
        <TicketDetailModal
          ticket={selectedTicket}
          isOpen={!!selectedTicket}
          onClose={() => setSelectedTicket(null)}
        />
      )}
    </DashboardLayout>
  );
}
