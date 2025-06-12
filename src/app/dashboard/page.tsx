"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Plus,
  Ticket,
  Clock,
  CheckCircle,
  Users,
  TrendingUp,
} from "lucide-react";
import DashboardLayout from "@/components/dashboard-layout";
import TicketsTable from "@/components/tickets-table";
import StatsCard from "@/components/stats-card";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  const stats = [
    {
      title: "Total Tickets",
      value: "24",
      change: "+12%",
      icon: <Ticket className="h-4 w-4" />,
      color: "text-emerald-400",
    },
    {
      title: "In Progress",
      value: "8",
      change: "+5%",
      icon: <Clock className="h-4 w-4" />,
      color: "text-amber-400",
    },
    {
      title: "Resolved",
      value: "16",
      change: "+8%",
      icon: <CheckCircle className="h-4 w-4" />,
      color: "text-teal-400",
    },
    {
      title: "Team Members",
      value: "12",
      change: "+2",
      icon: <Users className="h-4 w-4" />,
      color: "text-violet-400",
    },
  ];

  const recentTickets = [
    {
      id: "TK-001",
      title: "Login issues with mobile app",
      status: "In Progress",
      priority: "High",
      assignee: "John Doe",
      created: "2 hours ago",
      skills: ["React Native", "Authentication"],
    },
    {
      id: "TK-002",
      title: "Database connection timeout",
      status: "Open",
      priority: "Critical",
      assignee: "Unassigned",
      created: "4 hours ago",
      skills: ["Database", "Backend"],
    },
    {
      id: "TK-003",
      title: "UI component not responsive",
      status: "Resolved",
      priority: "Medium",
      assignee: "Jane Smith",
      created: "1 day ago",
      skills: ["CSS", "Frontend"],
    },
    {
      id: "TK-004",
      title: "API rate limiting issues",
      status: "In Progress",
      priority: "High",
      assignee: "Mike Johnson",
      created: "2 days ago",
      skills: ["API", "Backend"],
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">Dashboard</h1>
            <p className="text-zinc-400">
              Welcome back! Here's what's happening with your tickets.
            </p>
          </div>
          <Button className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white border-0">
            <Plus className="h-4 w-4 mr-2" />
            Create Ticket
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatsCard key={stat.title} {...stat} delay={index * 0.1} />
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Tickets */}
          <div className="lg:col-span-2">
            <Card className="bg-zinc-900/50 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-white">Recent Tickets</CardTitle>
                <CardDescription className="text-zinc-400">
                  Latest support tickets and their status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <TicketsTable tickets={recentTickets} />
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions & Activity */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="bg-zinc-900/50 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-white">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start border-zinc-700 text-zinc-300 hover:bg-zinc-800"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Ticket
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start border-zinc-700 text-zinc-300 hover:bg-zinc-800"
                >
                  <Users className="h-4 w-4 mr-2" />
                  Manage Team
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start border-zinc-700 text-zinc-300 hover:bg-zinc-800"
                >
                  <TrendingUp className="h-4 w-4 mr-2" />
                  View Analytics
                </Button>
              </CardContent>
            </Card>

            {/* Activity Feed */}
            <Card className="bg-zinc-900/50 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-white">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm text-zinc-300">
                      Ticket TK-001 assigned to John Doe
                    </p>
                    <p className="text-xs text-zinc-500">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-amber-400 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm text-zinc-300">
                      New ticket TK-002 created
                    </p>
                    <p className="text-xs text-zinc-500">4 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-teal-400 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm text-zinc-300">
                      Ticket TK-003 resolved by Jane Smith
                    </p>
                    <p className="text-xs text-zinc-500">1 day ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
