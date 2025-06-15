"use client"

import { useState, useMemo, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Skeleton } from "@/components/ui/skeleton"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Eye, Edit, Trash2, Users, Ticket, CheckCircle, Clock, Search, UserCheck, LogOut, User } from "lucide-react"

// Types
type UserRole = "admin" | "moderator" | "user"
type TicketStatus = "open" | "in_progress" | "completed" | "closed"
type TicketPriority = "low" | "medium" | "high" | "urgent"

interface UserType {
  id: string
  name: string
  email: string
  role: UserRole
  skills: string[]
  createdAt: string
  lastLogin: string
  isActive: boolean
}

interface TicketType {
  id: string
  title: string
  description: string
  status: TicketStatus
  priority: TicketPriority
  category: string
  deadline: string
  createdBy: string
  assignedTo: string
  helpfulNotes: string
  relatedSkills: string[]
  reply: string
  createdAt: string
  updatedAt: string
}

// Mock Data
const initialUsers: UserType[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "admin",
    skills: ["React", "Node.js", "TypeScript"],
    createdAt: "2023-12-01T10:00:00Z",
    lastLogin: "2024-01-15T14:30:00Z",
    isActive: true,
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "moderator",
    skills: ["Python", "Django", "PostgreSQL"],
    createdAt: "2023-12-05T09:15:00Z",
    lastLogin: "2024-01-14T16:45:00Z",
    isActive: true,
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike@example.com",
    role: "user",
    skills: ["JavaScript", "Vue.js", "CSS"],
    createdAt: "2023-12-10T11:30:00Z",
    lastLogin: "2024-01-13T09:20:00Z",
    isActive: true,
  },
  {
    id: "4",
    name: "Sarah Wilson",
    email: "sarah@example.com",
    role: "user",
    skills: ["Java", "Spring Boot", "MySQL"],
    createdAt: "2023-12-15T13:45:00Z",
    lastLogin: "2024-01-12T11:10:00Z",
    isActive: false,
  },
  {
    id: "5",
    name: "David Brown",
    email: "david@example.com",
    role: "moderator",
    skills: ["Go", "Docker", "Kubernetes"],
    createdAt: "2023-12-20T15:20:00Z",
    lastLogin: "2024-01-15T08:30:00Z",
    isActive: true,
  },
]

// Current logged in user (mock)
const currentUser = {
  id: "1",
  name: "John Doe",
  email: "john@example.com",
  role: "admin" as UserRole,
  initials: "JD",
}

const initialTickets: TicketType[] = [
  {
    id: "1",
    title: "Login page not responsive on mobile",
    description:
      "The login page layout breaks on mobile devices. The form elements are not properly aligned and the submit button is cut off.",
    status: "in_progress",
    priority: "high",
    category: "Bug",
    deadline: "2024-01-15",
    createdBy: "3",
    assignedTo: "1",
    helpfulNotes: "Check CSS media queries and test on various screen sizes",
    relatedSkills: ["CSS", "Responsive Design", "Mobile Development"],
    reply: "Working on fixing the CSS grid layout. Should be resolved by tomorrow.",
    createdAt: "2024-01-10T10:30:00Z",
    updatedAt: "2024-01-12T14:20:00Z",
  },
  {
    id: "2",
    title: "Add dark mode toggle",
    description:
      "Users have requested a dark mode option for better accessibility and user experience during night time usage.",
    status: "open",
    priority: "medium",
    category: "Feature Request",
    deadline: "2024-01-20",
    createdBy: "4",
    assignedTo: "2",
    helpfulNotes: "Consider using CSS variables for theme switching",
    relatedSkills: ["CSS", "JavaScript", "UI/UX"],
    reply: "",
    createdAt: "2024-01-11T09:15:00Z",
    updatedAt: "2024-01-11T09:15:00Z",
  },
  {
    id: "3",
    title: "Database connection timeout",
    description:
      "Users are experiencing timeout errors when trying to access the dashboard. The database connection seems to be dropping after 30 seconds of inactivity.",
    status: "completed",
    priority: "urgent",
    category: "Bug",
    deadline: "2024-01-12",
    createdBy: "1",
    assignedTo: "5",
    helpfulNotes: "Check connection pool settings and timeout configurations",
    relatedSkills: ["Database", "Backend", "Performance"],
    reply: "Fixed by increasing connection pool size and adjusting timeout settings.",
    createdAt: "2024-01-09T16:45:00Z",
    updatedAt: "2024-01-12T11:30:00Z",
  },
  {
    id: "4",
    title: "Implement user role management",
    description: "Need to add functionality for admins to manage user roles and permissions within the system.",
    status: "in_progress",
    priority: "medium",
    category: "Feature Request",
    deadline: "2024-01-25",
    createdBy: "1",
    assignedTo: "2",
    helpfulNotes: "Follow RBAC principles and ensure proper authorization checks",
    relatedSkills: ["Authentication", "Authorization", "Backend"],
    reply: "Currently working on the role assignment interface.",
    createdAt: "2024-01-08T13:20:00Z",
    updatedAt: "2024-01-13T10:15:00Z",
  },
  {
    id: "5",
    title: "Export data to CSV functionality",
    description:
      "Users need the ability to export their data in CSV format for external analysis and reporting purposes.",
    status: "completed",
    priority: "low",
    category: "Feature Request",
    deadline: "2024-01-18",
    createdBy: "3",
    assignedTo: "4",
    helpfulNotes: "Ensure proper data formatting and handle large datasets efficiently",
    relatedSkills: ["Data Processing", "File Handling", "Frontend"],
    reply: "CSV export feature has been implemented and tested successfully.",
    createdAt: "2024-01-07T11:00:00Z",
    updatedAt: "2024-01-14T15:45:00Z",
  },
]

const statusColors = {
  open: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  in_progress: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  completed: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  closed: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20",
}

const priorityColors = {
  low: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20",
  medium: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  high: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  urgent: "bg-red-500/10 text-red-400 border-red-500/20",
}

const roleColors = {
  admin: "bg-red-500/10 text-red-400 border-red-500/20",
  moderator: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  user: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20",
}

// Skeleton Components
const StatCardSkeleton = () => (
  <Card className="bg-zinc-900 border-zinc-800">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <Skeleton className="h-4 w-20 bg-zinc-800" />
      <Skeleton className="h-4 w-4 bg-zinc-800" />
    </CardHeader>
    <CardContent>
      <Skeleton className="h-8 w-12 bg-zinc-800 mb-1" />
      <Skeleton className="h-3 w-24 bg-zinc-800" />
    </CardContent>
  </Card>
)

const TableSkeleton = ({ rows = 5 }: { rows?: number }) => (
  <div className="rounded-md border border-zinc-800 overflow-hidden">
    <Table>
      <TableHeader>
        <TableRow className="border-zinc-800">
          {Array.from({ length: 8 }).map((_, i) => (
            <TableHead key={i}>
              <Skeleton className="h-4 w-20 bg-zinc-800" />
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: rows }).map((_, i) => (
          <TableRow key={i} className="border-zinc-800">
            {Array.from({ length: 8 }).map((_, j) => (
              <TableCell key={j}>
                <Skeleton className="h-4 w-full bg-zinc-800" />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
)

const FiltersSkeleton = () => (
  <div className="flex flex-col sm:flex-row gap-4">
    <div className="relative flex-1">
      <Skeleton className="h-10 w-full bg-zinc-800" />
    </div>
    <Skeleton className="h-10 w-full sm:w-[180px] bg-zinc-800" />
    <Skeleton className="h-10 w-full sm:w-[180px] bg-zinc-800" />
  </div>
)

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true)
  const [users, setUsers] = useState<UserType[]>([])
  const [tickets, setTickets] = useState<TicketType[]>([])
  const [selectedTicket, setSelectedTicket] = useState<TicketType | null>(null)
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null)
  const [editingTicket, setEditingTicket] = useState<TicketType | null>(null)
  const [editingUser, setEditingUser] = useState<UserType | null>(null)
  const [deleteTicketId, setDeleteTicketId] = useState<string | null>(null)
  const [deleteUserId, setDeleteUserId] = useState<string | null>(null)

  // Ticket filters
  const [ticketSearchTerm, setTicketSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [priorityFilter, setPriorityFilter] = useState<string>("all")

  // User filters
  const [userSearchTerm, setUserSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState<string>("all")
  const [activeFilter, setActiveFilter] = useState<string>("all")

  // Simulate data loading
  useEffect(() => {
    const loadData = async () => {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setUsers(initialUsers)
      setTickets(initialTickets)
      setIsLoading(false)
    }

    loadData()
  }, [])

  const getUserById = (id: string) => users.find((user) => user.id === id)

  const filteredTickets = useMemo(() => {
    if (isLoading) return []
    return tickets.filter((ticket) => {
      const matchesSearch =
        ticket.title.toLowerCase().includes(ticketSearchTerm.toLowerCase()) ||
        ticket.description.toLowerCase().includes(ticketSearchTerm.toLowerCase())
      const matchesStatus = statusFilter === "all" || ticket.status === statusFilter
      const matchesPriority = priorityFilter === "all" || ticket.priority === priorityFilter

      return matchesSearch && matchesStatus && matchesPriority
    })
  }, [tickets, ticketSearchTerm, statusFilter, priorityFilter, isLoading])

  const filteredUsers = useMemo(() => {
    if (isLoading) return []
    return users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(userSearchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(userSearchTerm.toLowerCase())
      const matchesRole = roleFilter === "all" || user.role === roleFilter
      const matchesActive =
        activeFilter === "all" ||
        (activeFilter === "active" && user.isActive) ||
        (activeFilter === "inactive" && !user.isActive)

      return matchesSearch && matchesRole && matchesActive
    })
  }, [users, userSearchTerm, roleFilter, activeFilter, isLoading])

  const stats = {
    totalUsers: users.length,
    activeUsers: users.filter((u) => u.isActive).length,
    totalTickets: tickets.length,
    completedTickets: tickets.filter((t) => t.status === "completed").length,
    inProgressTickets: tickets.filter((t) => t.status === "in_progress").length,
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  // Ticket functions
  const handleEditTicket = (ticket: TicketType) => {
    setEditingTicket({ ...ticket })
  }

  const handleSaveTicketEdit = () => {
    if (!editingTicket) return

    const updatedTicket = {
      ...editingTicket,
      updatedAt: new Date().toISOString(),
    }

    setTickets((prev) => prev.map((ticket) => (ticket.id === editingTicket.id ? updatedTicket : ticket)))
    setEditingTicket(null)

    if (typeof window !== "undefined") {
      alert("Ticket updated successfully!")
    }
  }

  const handleDeleteTicket = (ticketId: string) => {
    setTickets((prev) => prev.filter((ticket) => ticket.id !== ticketId))
    setDeleteTicketId(null)

    if (typeof window !== "undefined") {
      alert("Ticket deleted successfully!")
    }
  }

  const handleTicketInputChange = (field: keyof TicketType, value: string) => {
    if (!editingTicket) return
    setEditingTicket((prev) => (prev ? { ...prev, [field]: value } : null))
  }

  const handleTicketSkillsChange = (skillsString: string) => {
    if (!editingTicket) return
    const skillsArray = skillsString
      .split(",")
      .map((skill) => skill.trim())
      .filter((skill) => skill.length > 0)
    setEditingTicket((prev) => (prev ? { ...prev, relatedSkills: skillsArray } : null))
  }

  // User functions
  const handleEditUser = (user: UserType) => {
    setEditingUser({ ...user })
  }

  const handleSaveUserEdit = () => {
    if (!editingUser) return

    setUsers((prev) => prev.map((user) => (user.id === editingUser.id ? editingUser : user)))
    setEditingUser(null)

    if (typeof window !== "undefined") {
      alert("User updated successfully!")
    }
  }

  const handleDeleteUser = (userId: string) => {
    setUsers((prev) => prev.filter((user) => user.id !== userId))
    setDeleteUserId(null)

    if (typeof window !== "undefined") {
      alert("User deleted successfully!")
    }
  }

  const handleUserInputChange = (field: keyof UserType, value: string | boolean) => {
    if (!editingUser) return
    setEditingUser((prev) => (prev ? { ...prev, [field]: value } : null))
  }

  const handleUserSkillsChange = (skillsString: string) => {
    if (!editingUser) return
    const skillsArray = skillsString
      .split(",")
      .map((skill) => skill.trim())
      .filter((skill) => skill.length > 0)
    setEditingUser((prev) => (prev ? { ...prev, skills: skillsArray } : null))
  }

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      const confirmed = confirm("Are you sure you want to logout?")
      if (confirmed) {
        alert("Logged out successfully!")
        // In a real app, you would redirect to login page or clear auth tokens
      }
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="container mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-emerald-400">Admin Dashboard</h1>
            <p className="text-zinc-400 mt-1">Manage tickets, users and monitor system performance</p>
          </div>

          {/* Profile Dropdown */}
          {isLoading ? (
            <Skeleton className="h-10 w-10 rounded-full bg-zinc-800" />
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full hover:bg-zinc-800">
                  <Avatar className="h-10 w-10 border-2 border-emerald-500/20">
                    <AvatarFallback className="bg-emerald-500/10 text-emerald-400 font-semibold">
                      {currentUser.initials}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-zinc-900 border-zinc-800" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none text-zinc-100">{currentUser.name}</p>
                    <p className="text-xs leading-none text-zinc-400">{currentUser.email}</p>
                    <div className="pt-1">
                      <Badge className={`${roleColors[currentUser.role]} capitalize text-xs`}>{currentUser.role}</Badge>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-zinc-800" />
                <DropdownMenuItem
                  className="text-zinc-300 hover:bg-zinc-800 hover:text-zinc-100 cursor-pointer"
                  onClick={() => setSelectedUser(users.find((u) => u.id === currentUser.id) || null)}
                >
                  <User className="mr-2 h-4 w-4" />
                  <span>View Profile</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-zinc-800" />
                <DropdownMenuItem
                  className="text-red-400 hover:bg-red-500/10 hover:text-red-300 cursor-pointer"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {isLoading ? (
            <>
              <StatCardSkeleton />
              <StatCardSkeleton />
              <StatCardSkeleton />
              <StatCardSkeleton />
              <StatCardSkeleton />
            </>
          ) : (
            <>
              <Card className="bg-zinc-900 border-zinc-800">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-zinc-400">Total Users</CardTitle>
                  <Users className="h-4 w-4 text-emerald-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-emerald-400">{stats.totalUsers}</div>
                  <p className="text-xs text-zinc-500 mt-1">Registered users</p>
                </CardContent>
              </Card>

              <Card className="bg-zinc-900 border-zinc-800">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-zinc-400">Active Users</CardTitle>
                  <UserCheck className="h-4 w-4 text-blue-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-400">{stats.activeUsers}</div>
                  <p className="text-xs text-zinc-500 mt-1">Currently active</p>
                </CardContent>
              </Card>

              <Card className="bg-zinc-900 border-zinc-800">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-zinc-400">Total Tickets</CardTitle>
                  <Ticket className="h-4 w-4 text-purple-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-purple-400">{stats.totalTickets}</div>
                  <p className="text-xs text-zinc-500 mt-1">All support tickets</p>
                </CardContent>
              </Card>

              <Card className="bg-zinc-900 border-zinc-800">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-zinc-400">Resolved</CardTitle>
                  <CheckCircle className="h-4 w-4 text-emerald-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-emerald-400">{stats.completedTickets}</div>
                  <p className="text-xs text-zinc-500 mt-1">Completed tickets</p>
                </CardContent>
              </Card>

              <Card className="bg-zinc-900 border-zinc-800">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-zinc-400">In Progress</CardTitle>
                  <Clock className="h-4 w-4 text-yellow-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-yellow-400">{stats.inProgressTickets}</div>
                  <p className="text-xs text-zinc-500 mt-1">Active tickets</p>
                </CardContent>
              </Card>
            </>
          )}
        </div>

        {/* Tabs */}
        <Tabs defaultValue="tickets" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 bg-zinc-900 border-zinc-800">
            <TabsTrigger value="tickets" className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white">
              Support Tickets
            </TabsTrigger>
            <TabsTrigger value="users" className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white">
              User Management
            </TabsTrigger>
          </TabsList>

          {/* Tickets Tab */}
          <TabsContent value="tickets">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-emerald-400">Support Tickets</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {isLoading ? (
                  <>
                    <FiltersSkeleton />
                    <TableSkeleton rows={5} />
                  </>
                ) : (
                  <>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-400" />
                        <Input
                          placeholder="Search tickets..."
                          value={ticketSearchTerm}
                          onChange={(e) => setTicketSearchTerm(e.target.value)}
                          className="pl-10 bg-zinc-800 border-zinc-700 text-zinc-100 placeholder-zinc-400"
                        />
                      </div>
                      <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-full sm:w-[180px] bg-zinc-800 border-zinc-700 text-zinc-100">
                          <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        <SelectContent className="bg-zinc-800 border-zinc-700">
                          <SelectItem value="all">All Status</SelectItem>
                          <SelectItem value="open">Open</SelectItem>
                          <SelectItem value="in_progress">In Progress</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="closed">Closed</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                        <SelectTrigger className="w-full sm:w-[180px] bg-zinc-800 border-zinc-700 text-zinc-100">
                          <SelectValue placeholder="Filter by priority" />
                        </SelectTrigger>
                        <SelectContent className="bg-zinc-800 border-zinc-700">
                          <SelectItem value="all">All Priority</SelectItem>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="urgent">Urgent</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Tickets Table */}
                    <div className="rounded-md border border-zinc-800 overflow-hidden">
                      <Table>
                        <TableHeader>
                          <TableRow className="border-zinc-800 hover:bg-zinc-800/50">
                            <TableHead className="text-zinc-300">Title</TableHead>
                            <TableHead className="text-zinc-300">Status</TableHead>
                            <TableHead className="text-zinc-300">Priority</TableHead>
                            <TableHead className="text-zinc-300">Category</TableHead>
                            <TableHead className="text-zinc-300">Deadline</TableHead>
                            <TableHead className="text-zinc-300">Created By</TableHead>
                            <TableHead className="text-zinc-300">Assigned To</TableHead>
                            <TableHead className="text-zinc-300">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredTickets.map((ticket) => {
                            const createdBy = getUserById(ticket.createdBy)
                            const assignedTo = getUserById(ticket.assignedTo)

                            return (
                              <TableRow key={ticket.id} className="border-zinc-800 hover:bg-zinc-800/30">
                                <TableCell className="font-medium text-zinc-100 max-w-xs">
                                  <div className="truncate">{ticket.title}</div>
                                </TableCell>
                                <TableCell>
                                  <Badge className={`${statusColors[ticket.status]} capitalize`}>
                                    {ticket.status.replace("_", " ")}
                                  </Badge>
                                </TableCell>
                                <TableCell>
                                  <Badge className={`${priorityColors[ticket.priority]} capitalize`}>
                                    {ticket.priority}
                                  </Badge>
                                </TableCell>
                                <TableCell className="text-zinc-300">{ticket.category}</TableCell>
                                <TableCell className="text-zinc-300">{formatDate(ticket.deadline)}</TableCell>
                                <TableCell className="text-zinc-300">{createdBy?.name}</TableCell>
                                <TableCell className="text-zinc-300">{assignedTo?.name}</TableCell>
                                <TableCell>
                                  <div className="flex items-center gap-2">
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => setSelectedTicket(ticket)}
                                      className="h-8 w-8 p-0 text-emerald-400 hover:bg-emerald-500/10 hover:text-emerald-300"
                                    >
                                      <Eye className="h-4 w-4" />
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => handleEditTicket(ticket)}
                                      className="h-8 w-8 p-0 text-blue-400 hover:bg-blue-500/10 hover:text-blue-300"
                                    >
                                      <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => setDeleteTicketId(ticket.id)}
                                      className="h-8 w-8 p-0 text-red-400 hover:bg-red-500/10 hover:text-red-300"
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </TableCell>
                              </TableRow>
                            )
                          })}
                        </TableBody>
                      </Table>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-emerald-400">User Management</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {isLoading ? (
                  <>
                    <FiltersSkeleton />
                    <TableSkeleton rows={5} />
                  </>
                ) : (
                  <>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-400" />
                        <Input
                          placeholder="Search users..."
                          value={userSearchTerm}
                          onChange={(e) => setUserSearchTerm(e.target.value)}
                          className="pl-10 bg-zinc-800 border-zinc-700 text-zinc-100 placeholder-zinc-400"
                        />
                      </div>
                      <Select value={roleFilter} onValueChange={setRoleFilter}>
                        <SelectTrigger className="w-full sm:w-[180px] bg-zinc-800 border-zinc-700 text-zinc-100">
                          <SelectValue placeholder="Filter by role" />
                        </SelectTrigger>
                        <SelectContent className="bg-zinc-800 border-zinc-700">
                          <SelectItem value="all">All Roles</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="moderator">Moderator</SelectItem>
                          <SelectItem value="user">User</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select value={activeFilter} onValueChange={setActiveFilter}>
                        <SelectTrigger className="w-full sm:w-[180px] bg-zinc-800 border-zinc-700 text-zinc-100">
                          <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        <SelectContent className="bg-zinc-800 border-zinc-700">
                          <SelectItem value="all">All Users</SelectItem>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Users Table */}
                    <div className="rounded-md border border-zinc-800 overflow-hidden">
                      <Table>
                        <TableHeader>
                          <TableRow className="border-zinc-800 hover:bg-zinc-800/50">
                            <TableHead className="text-zinc-300">Name</TableHead>
                            <TableHead className="text-zinc-300">Email</TableHead>
                            <TableHead className="text-zinc-300">Role</TableHead>
                            <TableHead className="text-zinc-300">Status</TableHead>
                            <TableHead className="text-zinc-300">Skills</TableHead>
                            <TableHead className="text-zinc-300">Last Login</TableHead>
                            <TableHead className="text-zinc-300">Created</TableHead>
                            <TableHead className="text-zinc-300">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredUsers.map((user) => (
                            <TableRow key={user.id} className="border-zinc-800 hover:bg-zinc-800/30">
                              <TableCell className="font-medium text-zinc-100">{user.name}</TableCell>
                              <TableCell className="text-zinc-300">{user.email}</TableCell>
                              <TableCell>
                                <Badge className={`${roleColors[user.role]} capitalize`}>{user.role}</Badge>
                              </TableCell>
                              <TableCell>
                                <Badge
                                  className={
                                    user.isActive
                                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                                      : "bg-red-500/10 text-red-400 border-red-500/20"
                                  }
                                >
                                  {user.isActive ? "Active" : "Inactive"}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-zinc-300 max-w-xs">
                                <div className="flex flex-wrap gap-1">
                                  {user.skills.slice(0, 2).map((skill, index) => (
                                    <Badge
                                      key={index}
                                      variant="outline"
                                      className="border-zinc-600 text-zinc-400 text-xs"
                                    >
                                      {skill}
                                    </Badge>
                                  ))}
                                  {user.skills.length > 2 && (
                                    <Badge variant="outline" className="border-zinc-600 text-zinc-400 text-xs">
                                      +{user.skills.length - 2}
                                    </Badge>
                                  )}
                                </div>
                              </TableCell>
                              <TableCell className="text-zinc-300">{formatDateTime(user.lastLogin)}</TableCell>
                              <TableCell className="text-zinc-300">{formatDate(user.createdAt)}</TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setSelectedUser(user)}
                                    className="h-8 w-8 p-0 text-emerald-400 hover:bg-emerald-500/10 hover:text-emerald-300"
                                  >
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleEditUser(user)}
                                    className="h-8 w-8 p-0 text-blue-400 hover:bg-blue-500/10 hover:text-blue-300"
                                  >
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setDeleteUserId(user.id)}
                                    className="h-8 w-8 p-0 text-red-400 hover:bg-red-500/10 hover:text-red-300"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Ticket Details Modal */}
        <Dialog open={!!selectedTicket} onOpenChange={() => setSelectedTicket(null)}>
          <DialogContent className="bg-zinc-900 border-zinc-800 text-zinc-100 max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-emerald-400 text-xl">{selectedTicket?.title}</DialogTitle>
            </DialogHeader>

            {selectedTicket && (
              <div className="space-y-6">
                <div className="flex flex-wrap gap-4">
                  <Badge className={`${statusColors[selectedTicket.status]} capitalize`}>
                    {selectedTicket.status.replace("_", " ")}
                  </Badge>
                  <Badge className={`${priorityColors[selectedTicket.priority]} capitalize`}>
                    {selectedTicket.priority}
                  </Badge>
                  <Badge variant="outline" className="border-zinc-600 text-zinc-300">
                    {selectedTicket.category}
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-zinc-400">Created By:</span>
                    <p className="text-zinc-100 font-medium">{getUserById(selectedTicket.createdBy)?.name}</p>
                  </div>
                  <div>
                    <span className="text-zinc-400">Assigned To:</span>
                    <p className="text-zinc-100 font-medium">{getUserById(selectedTicket.assignedTo)?.name}</p>
                  </div>
                  <div>
                    <span className="text-zinc-400">Deadline:</span>
                    <p className="text-zinc-100 font-medium">{formatDate(selectedTicket.deadline)}</p>
                  </div>
                  <div>
                    <span className="text-zinc-400">Created:</span>
                    <p className="text-zinc-100 font-medium">{formatDate(selectedTicket.createdAt)}</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-emerald-400 font-semibold mb-2">Description</h4>
                  <p className="text-zinc-300 leading-relaxed">{selectedTicket.description}</p>
                </div>

                {selectedTicket.helpfulNotes && (
                  <div>
                    <h4 className="text-emerald-400 font-semibold mb-2">Helpful Notes</h4>
                    <p className="text-zinc-300 leading-relaxed">{selectedTicket.helpfulNotes}</p>
                  </div>
                )}

                <div>
                  <h4 className="text-emerald-400 font-semibold mb-2">Related Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedTicket.relatedSkills.map((skill, index) => (
                      <Badge key={index} variant="outline" className="border-emerald-500/30 text-emerald-300">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {selectedTicket.reply && (
                  <div>
                    <h4 className="text-emerald-400 font-semibold mb-2">Latest Reply</h4>
                    <div className="bg-zinc-800 p-4 rounded-lg border border-zinc-700">
                      <p className="text-zinc-300 leading-relaxed">{selectedTicket.reply}</p>
                      <p className="text-zinc-500 text-sm mt-2">Updated: {formatDate(selectedTicket.updatedAt)}</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* User Details Modal */}
        <Dialog open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
          <DialogContent className="bg-zinc-900 border-zinc-800 text-zinc-100 max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-emerald-400 text-xl">{selectedUser?.name}</DialogTitle>
            </DialogHeader>

            {selectedUser && (
              <div className="space-y-6">
                <div className="flex flex-wrap gap-4">
                  <Badge className={`${roleColors[selectedUser.role]} capitalize`}>{selectedUser.role}</Badge>
                  <Badge
                    className={
                      selectedUser.isActive
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                        : "bg-red-500/10 text-red-400 border-red-500/20"
                    }
                  >
                    {selectedUser.isActive ? "Active" : "Inactive"}
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-zinc-400">Email:</span>
                    <p className="text-zinc-100 font-medium">{selectedUser.email}</p>
                  </div>
                  <div>
                    <span className="text-zinc-400">Role:</span>
                    <p className="text-zinc-100 font-medium capitalize">{selectedUser.role}</p>
                  </div>
                  <div>
                    <span className="text-zinc-400">Created:</span>
                    <p className="text-zinc-100 font-medium">{formatDate(selectedUser.createdAt)}</p>
                  </div>
                  <div>
                    <span className="text-zinc-400">Last Login:</span>
                    <p className="text-zinc-100 font-medium">{formatDateTime(selectedUser.lastLogin)}</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-emerald-400 font-semibold mb-2">Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedUser.skills.map((skill, index) => (
                      <Badge key={index} variant="outline" className="border-emerald-500/30 text-emerald-300">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Edit Ticket Modal */}
        <Dialog open={!!editingTicket} onOpenChange={() => setEditingTicket(null)}>
          <DialogContent className="bg-zinc-900 border-zinc-800 text-zinc-100 max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-emerald-400 text-xl">Edit Ticket</DialogTitle>
            </DialogHeader>

            {editingTicket && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <Label htmlFor="title" className="text-zinc-300">
                      Title
                    </Label>
                    <Input
                      id="title"
                      value={editingTicket.title}
                      onChange={(e) => handleTicketInputChange("title", e.target.value)}
                      className="bg-zinc-800 border-zinc-700 text-zinc-100"
                    />
                  </div>

                  <div>
                    <Label htmlFor="description" className="text-zinc-300">
                      Description
                    </Label>
                    <Textarea
                      id="description"
                      value={editingTicket.description}
                      onChange={(e) => handleTicketInputChange("description", e.target.value)}
                      className="bg-zinc-800 border-zinc-700 text-zinc-100 min-h-[100px]"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="status" className="text-zinc-300">
                        Status
                      </Label>
                      <Select
                        value={editingTicket.status}
                        onValueChange={(value: TicketStatus) => handleTicketInputChange("status", value)}
                      >
                        <SelectTrigger className="bg-zinc-800 border-zinc-700 text-zinc-100">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-zinc-800 border-zinc-700">
                          <SelectItem value="open">Open</SelectItem>
                          <SelectItem value="in_progress">In Progress</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="closed">Closed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="priority" className="text-zinc-300">
                        Priority
                      </Label>
                      <Select
                        value={editingTicket.priority}
                        onValueChange={(value: TicketPriority) => handleTicketInputChange("priority", value)}
                      >
                        <SelectTrigger className="bg-zinc-800 border-zinc-700 text-zinc-100">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-zinc-800 border-zinc-700">
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="urgent">Urgent</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="category" className="text-zinc-300">
                        Category
                      </Label>
                      <Input
                        id="category"
                        value={editingTicket.category}
                        onChange={(e) => handleTicketInputChange("category", e.target.value)}
                        className="bg-zinc-800 border-zinc-700 text-zinc-100"
                      />
                    </div>

                    <div>
                      <Label htmlFor="deadline" className="text-zinc-300">
                        Deadline
                      </Label>
                      <Input
                        id="deadline"
                        type="date"
                        value={editingTicket.deadline}
                        onChange={(e) => handleTicketInputChange("deadline", e.target.value)}
                        className="bg-zinc-800 border-zinc-700 text-zinc-100"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="assignedTo" className="text-zinc-300">
                      Assigned To
                    </Label>
                    <Select
                      value={editingTicket.assignedTo}
                      onValueChange={(value) => handleTicketInputChange("assignedTo", value)}
                    >
                      <SelectTrigger className="bg-zinc-800 border-zinc-700 text-zinc-100">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-zinc-800 border-zinc-700">
                        {users.map((user) => (
                          <SelectItem key={user.id} value={user.id}>
                            {user.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="helpfulNotes" className="text-zinc-300">
                      Helpful Notes
                    </Label>
                    <Textarea
                      id="helpfulNotes"
                      value={editingTicket.helpfulNotes}
                      onChange={(e) => handleTicketInputChange("helpfulNotes", e.target.value)}
                      className="bg-zinc-800 border-zinc-700 text-zinc-100"
                    />
                  </div>

                  <div>
                    <Label htmlFor="relatedSkills" className="text-zinc-300">
                      Related Skills (comma-separated)
                    </Label>
                    <Input
                      id="relatedSkills"
                      value={editingTicket.relatedSkills.join(", ")}
                      onChange={(e) => handleTicketSkillsChange(e.target.value)}
                      className="bg-zinc-800 border-zinc-700 text-zinc-100"
                      placeholder="React, Node.js, TypeScript"
                    />
                  </div>

                  <div>
                    <Label htmlFor="reply" className="text-zinc-300">
                      Reply
                    </Label>
                    <Textarea
                      id="reply"
                      value={editingTicket.reply}
                      onChange={(e) => handleTicketInputChange("reply", e.target.value)}
                      className="bg-zinc-800 border-zinc-700 text-zinc-100"
                    />
                  </div>
                </div>
              </div>
            )}

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setEditingTicket(null)}
                className="border-zinc-600 text-zinc-300 hover:bg-zinc-800"
              >
                Cancel
              </Button>
              <Button onClick={handleSaveTicketEdit} className="bg-emerald-600 hover:bg-emerald-700 text-white">
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit User Modal */}
        <Dialog open={!!editingUser} onOpenChange={() => setEditingUser(null)}>
          <DialogContent className="bg-zinc-900 border-zinc-800 text-zinc-100 max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-emerald-400 text-xl">Edit User</DialogTitle>
            </DialogHeader>

            {editingUser && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <Label htmlFor="userName" className="text-zinc-300">
                      Name
                    </Label>
                    <Input
                      id="userName"
                      value={editingUser.name}
                      onChange={(e) => handleUserInputChange("name", e.target.value)}
                      className="bg-zinc-800 border-zinc-700 text-zinc-100"
                    />
                  </div>

                  <div>
                    <Label htmlFor="userEmail" className="text-zinc-300">
                      Email
                    </Label>
                    <Input
                      id="userEmail"
                      type="email"
                      value={editingUser.email}
                      onChange={(e) => handleUserInputChange("email", e.target.value)}
                      className="bg-zinc-800 border-zinc-700 text-zinc-100"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="userRole" className="text-zinc-300">
                        Role
                      </Label>
                      <Select
                        value={editingUser.role}
                        onValueChange={(value: UserRole) => handleUserInputChange("role", value)}
                      >
                        <SelectTrigger className="bg-zinc-800 border-zinc-700 text-zinc-100">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-zinc-800 border-zinc-700">
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="moderator">Moderator</SelectItem>
                          <SelectItem value="user">User</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="userStatus" className="text-zinc-300">
                        Status
                      </Label>
                      <Select
                        value={editingUser.isActive ? "active" : "inactive"}
                        onValueChange={(value) => handleUserInputChange("isActive", value === "active")}
                      >
                        <SelectTrigger className="bg-zinc-800 border-zinc-700 text-zinc-100">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-zinc-800 border-zinc-700">
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="userSkills" className="text-zinc-300">
                      Skills (comma-separated)
                    </Label>
                    <Input
                      id="userSkills"
                      value={editingUser.skills.join(", ")}
                      onChange={(e) => handleUserSkillsChange(e.target.value)}
                      className="bg-zinc-800 border-zinc-700 text-zinc-100"
                      placeholder="React, Node.js, TypeScript"
                    />
                  </div>
                </div>
              </div>
            )}

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setEditingUser(null)}
                className="border-zinc-600 text-zinc-300 hover:bg-zinc-800"
              >
                Cancel
              </Button>
              <Button onClick={handleSaveUserEdit} className="bg-emerald-600 hover:bg-emerald-700 text-white">
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Ticket Confirmation Dialog */}
        <AlertDialog open={!!deleteTicketId} onOpenChange={() => setDeleteTicketId(null)}>
          <AlertDialogContent className="bg-zinc-900 border-zinc-800 text-zinc-100">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-red-400">Delete Ticket</AlertDialogTitle>
              <AlertDialogDescription className="text-zinc-300">
                Are you sure you want to delete this ticket? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel
                onClick={() => setDeleteTicketId(null)}
                className="border-zinc-600 text-zinc-300 hover:bg-zinc-800"
              >
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={() => deleteTicketId && handleDeleteTicket(deleteTicketId)}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Delete User Confirmation Dialog */}
        <AlertDialog open={!!deleteUserId} onOpenChange={() => setDeleteUserId(null)}>
          <AlertDialogContent className="bg-zinc-900 border-zinc-800 text-zinc-100">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-red-400">Delete User</AlertDialogTitle>
              <AlertDialogDescription className="text-zinc-300">
                Are you sure you want to delete this user? This action cannot be undone and will affect all related
                tickets.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel
                onClick={() => setDeleteUserId(null)}
                className="border-zinc-600 text-zinc-300 hover:bg-zinc-800"
              >
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={() => deleteUserId && handleDeleteUser(deleteUserId)}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  )
}
