"use client";
import { useState, useMemo, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import UserEditDialog from "@/components/admin/user-edit-modal";
import UserDialog from "@/components/admin/user-details-modal";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";
import TicketDetailModal from "@/components/ticket-detail-modal";
import {
  Eye,
  Edit,
  Trash2,
  Users,
  Ticket,
  CheckCircle,
  Clock,
  Search,
} from "lucide-react";
import { toast } from "sonner";
import { apiFetch } from "@/lib/api";
import {
  StatCardSkeleton,
  TableSkeleton,
  FiltersSkeleton,
} from "@/components/skeletons/admin-dashboard/skeleton";

import { UserType, TicketType } from "@/types";
import { formatDate, formatDateTime } from "@/lib/dateTimeFormatter";
import { statusColors, priorityColors, roleColors } from "@/lib/colors";
import StatsCard from "@/components/stats-card";
import DeleteDialog from "@/components/delete-modal";
import EditTicketDialog from "@/components/edit-ticket-modal";
import { UserMenu } from "@/components/profile-modal";

export default function Dashboard() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState<UserType[]>([]);
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalTickets, setTotalTickets] = useState(0);
  const [inProgressTickets, setInProgressTickets] = useState(0);
  const [completedTickets, setCompletedTickets] = useState(0);
  const [activeUsers, setActiveUsers] = useState(0);
  const [tickets, setTickets] = useState<TicketType[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<TicketType | null>(null);
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const [editingTicket, setEditingTicket] = useState<TicketType | null>(null);
  const [editingUser, setEditingUser] = useState<UserType | null>(null);
  const [deleteTicketId, setDeleteTicketId] = useState<string | null>(null);
  const [deleteUserId, setDeleteUserId] = useState<string | null>(null);
  const [ticketSearchTerm, setTicketSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [isUserSaving, setIsUserSaving] = useState(false);
  const [userSearchTerm, setUserSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [activeFilter, setActiveFilter] = useState<string>("all");

  // Simulate data loading
  useEffect(() => {
    const loadData = async () => {
      const res = await apiFetch("/admin/dashboard", {
        method: "GET",
      });

      if (!res.success) {
        toast.error("❌ Failed to fetch tickets. Please try again.");
        return;
      }
      if (res.success) {
        setUsers(res.users);
        setTickets(res.tickets);
        setTotalUsers(res.stats.totalUsers);
        setCurrentUser(res.adminProfile);
        setTotalTickets(res.stats.totalTickets);
        setInProgressTickets(res.stats.inProgressTickets);
        setCompletedTickets(res.stats.completedTickets);
        setActiveUsers(res.stats.activeUsers);
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const filteredTickets = useMemo(() => {
    if (isLoading) return [];
    return tickets.filter((ticket) => {
      const matchesSearch =
        ticket.title.toLowerCase().includes(ticketSearchTerm.toLowerCase()) ||
        ticket.description
          .toLowerCase()
          .includes(ticketSearchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || ticket.status === statusFilter;
      const matchesPriority =
        priorityFilter === "all" || ticket.priority === priorityFilter;

      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [tickets, ticketSearchTerm, statusFilter, priorityFilter, isLoading]);

  const filteredUsers = useMemo(() => {
    if (isLoading) return [];
    return users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(userSearchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(userSearchTerm.toLowerCase());
      const matchesRole = roleFilter === "all" || user.role === roleFilter;
      const matchesActive =
        activeFilter === "all" ||
        (activeFilter === "active" && user.isActive) ||
        (activeFilter === "inactive" && !user.isActive);

      return matchesSearch && matchesRole && matchesActive;
    });
  }, [users, userSearchTerm, roleFilter, activeFilter, isLoading]);

  const stats = {
    totalUsers: totalUsers,
    activeUsers: activeUsers,
    totalTickets: totalTickets,
    completedTickets: completedTickets,
    inProgressTickets: inProgressTickets,
  };

  const statItems = [
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: <Users className="h-5 w-5 text-emerald-400" />,
      color: "text-emerald-400",
    },
    {
      title: "Active Users",
      value: stats.activeUsers,
      icon: <Users className="h-5 w-5 text-blue-400" />,
      color: "text-blue-400",
    },
    {
      title: "Total Tickets",
      value: stats.totalTickets,
      icon: <Ticket className="h-5 w-5 text-purple-400" />,
      color: "text-purple-400",
    },
    {
      title: "Resolved",
      value: stats.completedTickets,
      icon: <CheckCircle className="h-5 w-5 text-emerald-400" />,
      color: "text-emerald-400",
    },
    {
      title: "In Progress",
      value: stats.inProgressTickets,
      icon: <Clock className="h-5 w-5 text-yellow-400" />,
      color: "text-yellow-400",
    },
  ];

  // Ticket functions
  const handleEditTicket = (ticket: TicketType) => {
    setEditingTicket({ ...ticket });
  };

  const handleSaveTicketEdit = () => {
    if (!editingTicket) return;

    const updatedTicket = {
      ...editingTicket,
      updatedAt: new Date().toISOString(),
    };

    setTickets((prev) =>
      prev.map((ticket) =>
        ticket._id.toString() === editingTicket._id.toString()
          ? updatedTicket
          : ticket
      )
    );
    setEditingTicket(null);

    if (typeof window !== "undefined") {
      alert("Ticket updated successfully!");
    }
  };

  const handleDeleteTicket = async (ticketId: string) => {
    try {
      const res = await apiFetch("/tickets/delete-ticket", {
        method: "DELETE",
        body: JSON.stringify({ ticketId }),
      });

      if (!res.success) {
        toast.error("❌ Failed to delete ticket.");
        throw new Error(`Failed to delete ticket: ${res.status}`);
      }

      if (res.success) {
        toast.success("🗑️ Ticket deleted successfully!");
        setDeleteTicketId(null);
      }

      // Optionally refetch tickets or update UI
    } catch (error) {
      toast.error("❌ Failed to delete ticket.");
      console.error("Error deleting ticket:", error);
    }
  };

  const handleTicketInputChange = (field: keyof TicketType, value: string) => {
    if (!editingTicket) return;
    setEditingTicket((prev) => (prev ? { ...prev, [field]: value } : null));
  };

  const handleTicketSkillsChange = (skillsString: string) => {
    if (!editingTicket) return;
    const skillsArray = skillsString
      .split(",")
      .map((skill) => skill.trim())
      .filter((skill) => skill.length > 0);
    setEditingTicket((prev) =>
      prev ? { ...prev, relatedSkills: skillsArray } : null
    );
  };

  // User functions
  const handleEditUser = (user: UserType) => {
    setEditingUser({ ...user });
  };

  const handleSaveUserEdit = async () => {
    if (!editingUser) return;
    setIsUserSaving(true);

    try {
      const response = await apiFetch(`/admin/update-user`, {
        method: "PUT",
        body: JSON.stringify(editingUser),
      });

      if (!response.success) {
        toast.error("❌ Failed to update user. Please try again.");
        return;
      }

      toast.success("✅ User updated successfully!");

      const updatedUser = response.user;

      setUsers((prev) =>
        prev.map((user) =>
          user._id.toString() === editingUser._id.toString()
            ? updatedUser
            : user
        )
      );

      setEditingUser(null);
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Something went wrong while updating the user.");
    } finally {
      setIsUserSaving(false);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      const res = await apiFetch("/admin/delete-user", {
        method: "DELETE",
        body: JSON.stringify({ userId }),
      });

      if (!res.success) {
        toast.error(res.message || "❌ Could not delete user.");
        throw new Error(res.message || "Failed to delete user.");
      }

      // Only update UI after confirmed success
      setUsers((prev) => prev.filter((user) => user._id.toString() !== userId));
      setDeleteUserId(null);
      toast.success("🗑️ User deleted successfully!");
    } catch (err: any) {
      console.error("Error deleting user:", err);
      toast.error(err.message || "❌ Could not delete user.");
    }
  };

  const handleUserInputChange = (
    field: keyof UserType,
    value: string | boolean
  ) => {
    if (!editingUser) return;
    setEditingUser((prev) => (prev ? { ...prev, [field]: value } : null));
  };

  const handleUserSkillsChange = (skillsString: string) => {
    if (!editingUser) return;
    const skillsArray = skillsString
      .split(",")
      .map((skill) => skill.trim())
      .filter((skill) => skill.length > 0);
    setEditingUser((prev) => (prev ? { ...prev, skills: skillsArray } : null));
  };

  const handleLogout = async () => {
    try {
      const res = await apiFetch("/auth/logout", {
        method: "POST",
      });

      if (res.success) {
        toast.success("✅ Signed out successfully!");
        router.push("/auth");
      }

      if (!res.success) {
        toast.error("❌ Failed to sign out. Please try again.");
      }
    } catch (error) {
      console.error("Failed to sign out:", error);
      toast.error("❌ Failed to sign out. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="container mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-emerald-400">
              Admin Dashboard
            </h1>
            <p className="text-zinc-400 mt-1">
              Manage tickets, users and monitor system performance
            </p>
          </div>

          {/* Profile Dropdown */}
          <UserMenu
            currentUser={currentUser}
            users={users}
            onLogout={handleLogout}
            onViewProfile={(user) => {
              if (!user) {
                setSelectedUser(null);
                return;
              }
              const found = users.find(
                (u) => u._id.toString() === user._id.toString()
              );
              setSelectedUser(found ?? null);
            }}
          />
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
              {statItems.map((item, i) => (
                <StatsCard key={i} delay={i * 0.1} {...item} variant="admin" />
              ))}
            </>
          )}
        </div>

        {/* Tabs */}
        <Tabs defaultValue="tickets" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 bg-zinc-900 border-zinc-800">
            <TabsTrigger
              value="tickets"
              className="data-[state=active]:bg-emerald-600 text-white data-[state=active]:text-zinc-900"
            >
              Support Tickets
            </TabsTrigger>
            <TabsTrigger
              value="users"
              className="data-[state=active]:bg-emerald-600 text-white data-[state=active]:text-zinc-900"
            >
              User Management
            </TabsTrigger>
          </TabsList>

          {/* Tickets Tab */}
          <TabsContent value="tickets">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-emerald-400">
                  Support Tickets
                </CardTitle>
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
                      <Select
                        value={statusFilter}
                        onValueChange={setStatusFilter}
                      >
                        <SelectTrigger className="w-full sm:w-[180px] bg-zinc-800 border-zinc-700 text-zinc-100">
                          <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        <SelectContent className="bg-zinc-800 border-zinc-700 text-white">
                          <SelectItem value="all">All Status</SelectItem>
                          <SelectItem value="open">Open</SelectItem>
                          <SelectItem value="in_progress">
                            In Progress
                          </SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="closed">Closed</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select
                        value={priorityFilter}
                        onValueChange={setPriorityFilter}
                      >
                        <SelectTrigger className="w-full sm:w-[180px] bg-zinc-800 border-zinc-700 text-zinc-100">
                          <SelectValue placeholder="Filter by priority" />
                        </SelectTrigger>
                        <SelectContent className="bg-zinc-800 border-zinc-700 text-white">
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
                            <TableHead className="text-zinc-300">
                              Title
                            </TableHead>
                            <TableHead className="text-zinc-300">
                              Status
                            </TableHead>
                            <TableHead className="text-zinc-300">
                              Priority
                            </TableHead>
                            <TableHead className="text-zinc-300">
                              Category
                            </TableHead>
                            <TableHead className="text-zinc-300">
                              Deadline
                            </TableHead>
                            <TableHead className="text-zinc-300">
                              Created By
                            </TableHead>
                            <TableHead className="text-zinc-300">
                              Assigned To
                            </TableHead>
                            <TableHead className="text-zinc-300">
                              Actions
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredTickets.map((ticket) => {
                            return (
                              <TableRow
                                key={ticket._id.toString()}
                                className="border-zinc-800 hover:bg-zinc-800/30"
                              >
                                <TableCell className="font-medium text-zinc-100 max-w-xs">
                                  <div className="truncate">{ticket.title}</div>
                                </TableCell>
                                <TableCell>
                                  <Badge
                                    className={`${
                                      statusColors[ticket.status]
                                    } capitalize`}
                                  >
                                    {ticket.status.replace("_", " ")}
                                  </Badge>
                                </TableCell>
                                <TableCell>
                                  <Badge
                                    className={`${
                                      priorityColors[ticket.priority]
                                    } capitalize`}
                                  >
                                    {ticket.priority}
                                  </Badge>
                                </TableCell>
                                <TableCell className="text-zinc-300">
                                  {ticket.category}
                                </TableCell>
                                <TableCell className="text-zinc-300">
                                  {formatDate(ticket.deadline)}
                                </TableCell>
                                <TableCell className="text-zinc-300">
                                  {ticket.createdBy?.name}
                                </TableCell>
                                <TableCell className="text-zinc-300">
                                  {ticket.assignedTo?.name}
                                </TableCell>
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
                                      onClick={() =>
                                        setDeleteTicketId(ticket._id.toString())
                                      }
                                      className="h-8 w-8 p-0 text-red-400 hover:bg-red-500/10 hover:text-red-300"
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </TableCell>
                              </TableRow>
                            );
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
                <CardTitle className="text-emerald-400">
                  User Management
                </CardTitle>
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
                        <SelectContent className="bg-zinc-800 border-zinc-700 text-white">
                          <SelectItem value="all">All Roles</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="moderator">Moderator</SelectItem>
                          <SelectItem value="user">User</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select
                        value={activeFilter}
                        onValueChange={setActiveFilter}
                      >
                        <SelectTrigger className="w-full sm:w-[180px] bg-zinc-800 border-zinc-700 text-zinc-100">
                          <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        <SelectContent className="bg-zinc-800 border-zinc-700 text-white">
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
                            <TableHead className="text-zinc-300">
                              Name
                            </TableHead>
                            <TableHead className="text-zinc-300">
                              Email
                            </TableHead>
                            <TableHead className="text-zinc-300">
                              Role
                            </TableHead>
                            <TableHead className="text-zinc-300">
                              Status
                            </TableHead>
                            <TableHead className="text-zinc-300">
                              Skills
                            </TableHead>
                            <TableHead className="text-zinc-300">
                              Last Login
                            </TableHead>
                            <TableHead className="text-zinc-300">
                              Created
                            </TableHead>
                            <TableHead className="text-zinc-300">
                              Actions
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredUsers.map((user) => (
                            <TableRow
                              key={user._id.toString()}
                              className="border-zinc-800 hover:bg-zinc-800/30"
                            >
                              <TableCell className="font-medium text-zinc-100">
                                {user.name}
                              </TableCell>
                              <TableCell className="text-zinc-300">
                                {user.email}
                              </TableCell>
                              <TableCell>
                                <Badge
                                  className={`${
                                    roleColors[user.role]
                                  } capitalize`}
                                >
                                  {user.role}
                                </Badge>
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
                                  {user.skills
                                    .slice(0, 2)
                                    .map((skill, index) => (
                                      <Badge
                                        key={index}
                                        variant="outline"
                                        className="border-zinc-600 text-zinc-400 text-xs"
                                      >
                                        {skill}
                                      </Badge>
                                    ))}
                                  {user.skills.length > 2 && (
                                    <Badge
                                      variant="outline"
                                      className="border-zinc-600 text-zinc-400 text-xs"
                                    >
                                      +{user.skills.length - 2}
                                    </Badge>
                                  )}
                                </div>
                              </TableCell>
                              <TableCell className="text-zinc-300">
                                {formatDateTime(user.loginTime)}
                              </TableCell>
                              <TableCell className="text-zinc-300">
                                {formatDate(user.createdAt)}
                              </TableCell>
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
                                    onClick={() =>
                                      setDeleteUserId(user._id.toString())
                                    }
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
        {selectedTicket && (
          <TicketDetailModal
            ticket={{
              _id: selectedTicket._id.toString(),
              title: selectedTicket.title,
              description: selectedTicket.description,
              helpfulNotes: selectedTicket.helpfulNotes,
              status: selectedTicket.status,
              priority: selectedTicket.priority,
              assignedTo: (selectedTicket as any).assignedTo ?? null,
              createdAt: selectedTicket.createdAt,
              relatedSkills: (selectedTicket as any).relatedSkills ?? [],
              updatedAt: (selectedTicket as any).updatedAt ?? "",
              category: (selectedTicket as any).category ?? "",
              deadline: (selectedTicket as any).deadline ?? "",
              createdBy: (selectedTicket as any).createdBy ?? null,
              replies: (selectedTicket as any).replies ?? [],
            }}
            canChangeStatus={false}
            isOpen={!!selectedTicket}
            onClose={() => setSelectedTicket(null)}
          />
        )}

        {/* User Details Modal */}
        <UserDialog
          selectedUser={selectedUser}
          onClose={() => setSelectedUser(null)}
        />

        {/* Edit Ticket Modal */}
        <EditTicketDialog
          open={!!editingTicket}
          ticket={editingTicket}
          users={users}
          onClose={() => setEditingTicket(null)}
          onSave={handleSaveTicketEdit}
          onInputChange={handleTicketInputChange}
          onSkillsChange={handleTicketSkillsChange}
        />

        {/* Edit User Modal */}
        <UserEditDialog
          editingUser={editingUser}
          isSaving={isUserSaving}
          onClose={() => setEditingUser(null)}
          onChange={handleUserInputChange}
          onSkillsChange={handleUserSkillsChange}
          onSave={handleSaveUserEdit}
        />

        {/* Delete Ticket Confirmation Dialog */}

        <DeleteDialog
          open={!!deleteTicketId}
          onClose={() => setDeleteTicketId(null)}
          onConfirm={() => deleteTicketId && handleDeleteTicket(deleteTicketId)}
        />

        {/* Delete User Confirmation Dialog */}

        <DeleteDialog
          open={!!deleteUserId}
          onClose={() => setDeleteUserId(null)}
          onConfirm={() => deleteUserId && handleDeleteUser(deleteUserId)}
        />
      </div>
    </div>
  );
}
