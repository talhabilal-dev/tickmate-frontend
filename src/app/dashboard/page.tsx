"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Ticket, Clock, CheckCircle } from "lucide-react";
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
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <StatsCard key={stat.title} {...stat} delay={index * 0.1} />
          ))}
        </div>
        {/* Recent Tickets Section */}
        <div className="space-y-4">
          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-semibold text-white">Recent Tickets</h2>
            <p className="text-zinc-400 text-sm">
              A snapshot of the most recent support activity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentTickets.map((ticket) => (
              <Card key={ticket.id} className="bg-zinc-900/50 border-zinc-800">
                <CardHeader>
                  <CardTitle className="text-white">{ticket.title}</CardTitle>
                  <CardDescription className="text-zinc-400">
                    ID: {ticket.id} | {ticket.status} | {ticket.priority}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-zinc-300 mb-2">
                    Assignee: {ticket.assignee}
                  </p>
                  <p className="text-sm text-zinc-400">
                    Created: {ticket.created}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {ticket.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-xs bg-zinc-800 px-2 py-1 rounded text-white"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
