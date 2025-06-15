"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Ticket, Clock, CheckCircle } from "lucide-react";
import StatsCard from "@/components/stats-card";
import { apiFetch } from "@/lib/api";
import { calculateChange } from "@/lib/percentage";

type TicketType = {
  _id: string;
  title: string;
  status: string;
  priority: string;
  assignedTo?: { name: string };
  createdAt?: string;
  relatedSkills?: string[];
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default function Dashboard() {
  const [ticketSummary, setTicketSummary] = useState<any>(null);
  const [previousTicketSummary, setPreviousTicketSummary] = useState<any>(null);
  const [tickets, setTickets] = useState<TicketType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await apiFetch("/tickets/tickets-summary", {
          method: "GET",
        });
        if (response.success) {
          setTicketSummary(response.summary);
          setPreviousTicketSummary(response.previousSummary);
          setTickets(response.tickets);
        } else {
          setError(response.message || "Failed to load data.");
        }
      } catch (err: any) {
        setError("Something went wrong while fetching tickets.");
      } finally {
        setLoading(false);
      }
    };
    fetchTickets();
  }, []);

  const stats =
    ticketSummary && previousTicketSummary
      ? [
          {
            title: "Total Tickets",
            value: ticketSummary.totalTickets.toString(),
            change: calculateChange(
              ticketSummary.totalTickets,
              previousTicketSummary.totalTickets
            ),
            icon: <Ticket className="h-4 w-4" />,
            color: "text-emerald-400",
          },
          {
            title: "In Progress",
            value: ticketSummary.inProgress.toString(),
            change: calculateChange(
              ticketSummary.inProgress,
              previousTicketSummary.inProgress
            ),
            icon: <Clock className="h-4 w-4" />,
            color: "text-amber-400",
          },
          {
            title: "Resolved",
            value: ticketSummary.completed.toString(),
            change: calculateChange(
              ticketSummary.completed,
              previousTicketSummary.completed
            ),
            icon: <CheckCircle className="h-4 w-4" />,
            color: "text-teal-400",
          },
        ]
      : [];

  return (
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

        {/* Loading & Error States */}
        {loading && <p className="text-zinc-400">Loading dashboard...</p>}
        {error && <p className="text-red-500 font-medium">{error}</p>}

        {!loading && !error && (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {stats.map((stat, index) => (
                <StatsCard key={stat.title} {...stat} delay={index * 0.1} />
              ))}
            </div>

            {/* Recent Tickets Section */}
            <div className="space-y-4">
              <div className="flex flex-col gap-1">
                <h2 className="text-xl font-semibold text-white">
                  Recent Tickets
                </h2>
                <p className="text-zinc-400 text-sm">
                  A snapshot of your most recent support activity.
                </p>
              </div>

              {tickets.length === 0 ? (
                <p className="text-zinc-500 italic">No tickets found.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {tickets.map((ticket) => (
                    <Card
                      key={ticket._id}
                      className="bg-zinc-900/50 border-zinc-800"
                    >
                      <CardHeader>
                        <CardTitle className="text-white">
                          {ticket.title}
                        </CardTitle>
                        <CardDescription className="text-zinc-400">
                          {ticket.status} | {ticket.priority}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-zinc-300 mb-2">
                          Assignee: {ticket.assignedTo?.name || "Unassigned"}
                        </p>
                        <p className="text-sm text-zinc-400">
                          Created:{" "}
                          {ticket.createdAt
                            ? formatDate(ticket.createdAt)
                            : "Unknown"}
                        </p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {ticket.relatedSkills?.map((skill) => (
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
              )}
            </div>
          </>
        )}
      </div>
  );
}
