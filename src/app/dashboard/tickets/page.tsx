"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Search, Eye } from "lucide-react";
import DashboardLayout from "@/components/dashboard-layout";
import CreateTicketForm from "@/components/create-ticket-form";
import TicketDetailModal from "@/components/ticket-detail-modal";
import { motion } from "framer-motion";
import { apiFetch } from "@/lib/api";
import { Badge } from "@/components/ui/badge";

type Ticket = {
  _id: string;
  title: string;
  description: string;
  status: string;
  createdAt: string;
  // add other fields as needed
};

export default function TicketsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [createTicketOpen, setCreateTicketOpen] = useState(false);
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    const fetchTickets = async () => {
      const response = await apiFetch("/tickets");
      if (response.success) {
        setTickets(response.tickets);
      }
    };
    fetchTickets();
  }, []);

  const filteredTickets = tickets.filter((ticket) =>
    [ticket.title, ticket.description, ticket._id]
      .join(" ")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "open":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      case "in_progress":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      case "resolved":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      default:
        return "bg-zinc-500/10 text-zinc-400 border-zinc-500/20";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return "1 day ago";
    return `${Math.floor(diffInHours / 24)} days ago`;
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-white">Tickets</h1>
            <p className="text-zinc-400">Track support issues</p>
          </div>
          <Dialog open={createTicketOpen} onOpenChange={setCreateTicketOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Create Ticket
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-zinc-900 border-zinc-800 max-w-2xl">
              <DialogHeader>
                <DialogTitle className="text-white">Create Ticket</DialogTitle>
                <DialogDescription className="text-zinc-400">
                  Fill the form to create a new support ticket
                </DialogDescription>
              </DialogHeader>
              <CreateTicketForm onClose={() => setCreateTicketOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-500" />
          <Input
            placeholder="Search tickets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-500"
          />
        </div>

        {/* Count */}
        <div className="text-sm text-zinc-400">
          Showing {filteredTickets.length} of {tickets.length} tickets
        </div>

        {/* Ticket List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredTickets.map((ticket, index) => (
            <motion.div
              key={ticket._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-6 hover:border-zinc-700"
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex gap-2 mb-2">
                    <Badge className={getStatusColor(ticket.status)}>{ticket.status}</Badge>
                    <span className="text-xs text-zinc-500">{ticket._id}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-1">{ticket.title}</h3>
                  <p className="text-sm text-zinc-400 line-clamp-2">{ticket.description}</p>
                  <div className="text-xs text-zinc-500 mt-2">
                    Created: {formatDate(ticket.createdAt)}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-zinc-400 hover:text-white"
                  onClick={() => setSelectedTicket(ticket)}
                >
                  <Eye className="h-4 w-4 mr-1" />
                  View
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredTickets.length === 0 && (
          <div className="text-center py-12 text-zinc-500">No tickets found.</div>
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
