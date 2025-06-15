"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardLayout from "@/components/dashboard-layout";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  MessageSquare,
  Clock,
  User,
  Calendar,
  AlertCircle,
  CheckCircle,
  XCircle,
  Send,
  Ticket,
} from "lucide-react";
import { toast } from "sonner";

interface Reply {
  id: string;
  ticketId: string;
  message: string;
  author: string;
  createdAt: string;
  isInternal: boolean;
}

interface Ticket {
  id: string;
  title: string;
  description: string;
  status: "open" | "in-progress" | "resolved" | "closed";
  priority: "low" | "medium" | "high" | "urgent";
  assignedTo: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  category: string;
}

const statusColors = {
  open: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  "in-progress": "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  resolved: "bg-green-500/10 text-green-400 border-green-500/20",
  closed: "bg-gray-500/10 text-gray-400 border-gray-500/20",
};

const priorityColors = {
  low: "bg-gray-500/10 text-gray-400 border-gray-500/20",
  medium: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  high: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  urgent: "bg-red-500/10 text-red-400 border-red-500/20",
};

const statusIcons = {
  open: AlertCircle,
  "in-progress": Clock,
  resolved: CheckCircle,
  closed: XCircle,
};

export default function MyTicketsPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [replies, setReplies] = useState<Reply[]>([]);
  const [replyMessage, setReplyMessage] = useState("");
  const [replyStatus, setReplyStatus] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Mock data - replace with actual API calls
  useEffect(() => {
    const mockTickets: Ticket[] = [
      {
        id: "1",
        title: "Login Issues with Mobile App",
        description:
          "Users are experiencing login failures on the mobile application. The error occurs after entering credentials.",
        status: "in-progress",
        priority: "high",
        assignedTo: "John Doe",
        createdBy: "Jane Smith",
        createdAt: "2024-01-15T10:30:00Z",
        updatedAt: "2024-01-15T14:20:00Z",
        category: "Technical",
      },
      {
        id: "2",
        title: "Payment Gateway Integration",
        description:
          "Need to integrate new payment gateway for international transactions.",
        status: "open",
        priority: "medium",
        assignedTo: "John Doe",
        createdBy: "Mike Johnson",
        createdAt: "2024-01-14T09:15:00Z",
        updatedAt: "2024-01-14T09:15:00Z",
        category: "Development",
      },
      {
        id: "3",
        title: "Database Performance Optimization",
        description:
          "Database queries are running slow during peak hours. Need optimization.",
        status: "resolved",
        priority: "urgent",
        assignedTo: "John Doe",
        createdBy: "Sarah Wilson",
        createdAt: "2024-01-13T16:45:00Z",
        updatedAt: "2024-01-15T11:30:00Z",
        category: "Performance",
      },
    ];

    setTickets(mockTickets);
    setIsLoading(false);
  }, []);

  const loadReplies = async (ticketId: string) => {
    // Mock replies - replace with actual API call
    const mockReplies: Reply[] = [
      {
        id: "1",
        ticketId,
        message:
          "I've started investigating this issue. Initial analysis shows it might be related to the authentication service.",
        author: "John Doe",
        createdAt: "2024-01-15T11:00:00Z",
        isInternal: false,
      },
      {
        id: "2",
        ticketId,
        message:
          "Found the root cause. The session timeout was set too low. Working on a fix.",
        author: "John Doe",
        createdAt: "2024-01-15T13:30:00Z",
        isInternal: true,
      },
    ];

    setReplies(mockReplies);
  };

  const handleReplySubmit = async () => {
    if (!selectedTicket || !replyMessage.trim()) {
      toast.error("Please enter a reply message");
      return;
    }

    setIsSubmitting(true);

    try {
      // Mock API call - replace with actual API
      const newReply: Reply = {
        id: Date.now().toString(),
        ticketId: selectedTicket.id,
        message: replyMessage,
        author: "John Doe",
        createdAt: new Date().toISOString(),
        isInternal: false,
      };

      setReplies([...replies, newReply]);

      // Update ticket status if changed
      if (replyStatus && replyStatus !== selectedTicket.status) {
        const updatedTickets = tickets.map((ticket) =>
          ticket.id === selectedTicket.id
            ? {
                ...ticket,
                status: replyStatus as Ticket["status"],
                updatedAt: new Date().toISOString(),
              }
            : ticket
        );
        setTickets(updatedTickets);
        setSelectedTicket({
          ...selectedTicket,
          status: replyStatus as Ticket["status"],
        });
      }

      setReplyMessage("");
      setReplyStatus("");
      toast.success("Reply sent successfully!");
    } catch (error) {
      toast.error("Failed to send reply. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const openReplyModal = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setReplyStatus(ticket.status);
    loadReplies(ticket.id);
    setIsDialogOpen(true);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">My Tickets</h1>
        </div>
        <div className="grid gap-2 grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="bg-zinc-900 border-zinc-800">
              <CardContent className="p-6">
                <div className="animate-pulse space-y-4">
                  <div className="h-4 bg-zinc-700 rounded w-3/4"></div>
                  <div className="h-3 bg-zinc-700 rounded w-1/2"></div>
                  <div className="h-3 bg-zinc-700 rounded w-1/4"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-white">My Tickets</h1>
          <Badge
            variant="outline"
            className="text-emerald-400 border-emerald-500/20"
          >
            {tickets.length} tickets assigned
          </Badge>
        </div>

        <div className="grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
          {tickets.map((ticket) => {
            const StatusIcon = statusIcons[ticket.status];

            return (
              <Card
                key={ticket.id}
                className="bg-zinc-900 border-zinc-800 hover:border-zinc-700 transition-colors"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <CardTitle className="text-white text-lg">
                        {ticket.title}
                      </CardTitle>
                      <div className="flex items-center gap-3 text-sm text-zinc-400">
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          Created by {ticket.createdBy}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {formatDate(ticket.createdAt)}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={priorityColors[ticket.priority]}>
                        {ticket.priority}
                      </Badge>
                      <Badge className={statusColors[ticket.status]}>
                        <StatusIcon className="h-3 w-3 mr-1" />
                        {ticket.status}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-zinc-300 text-sm mb-4 line-clamp-2">
                    {ticket.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-xs text-zinc-500">
                      <span>Category: {ticket.category}</span>
                      <span>Updated: {formatDate(ticket.updatedAt)}</span>
                    </div>
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          onClick={() => openReplyModal(ticket)}
                          className="bg-emerald-600 hover:bg-emerald-700"
                        >
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Reply
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-zinc-900 border-zinc-800 max-w-2xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle className="text-white">
                            Reply to Ticket: {selectedTicket?.title}
                          </DialogTitle>
                        </DialogHeader>

                        <div className="space-y-6">
                          {/* Ticket Details */}
                          <div className="bg-zinc-800 rounded-lg p-4">
                            <h3 className="font-medium text-white mb-2">
                              Ticket Details
                            </h3>
                            <p className="text-zinc-300 text-sm mb-3">
                              {selectedTicket?.description}
                            </p>
                            <div className="flex items-center gap-4 text-xs text-zinc-400">
                              <span>Priority: {selectedTicket?.priority}</span>
                              <span>Status: {selectedTicket?.status}</span>
                              <span>Category: {selectedTicket?.category}</span>
                            </div>
                          </div>

                          {/* Previous Replies */}
                          {replies.length > 0 && (
                            <div className="space-y-3">
                              <h3 className="font-medium text-white">
                                Previous Replies
                              </h3>
                              <div className="max-h-60 overflow-y-auto space-y-3">
                                {replies.map((reply) => (
                                  <div
                                    key={reply.id}
                                    className={`p-3 rounded-lg ${
                                      reply.isInternal
                                        ? "bg-yellow-500/10 border border-yellow-500/20"
                                        : "bg-zinc-800"
                                    }`}
                                  >
                                    <div className="flex items-center justify-between mb-2">
                                      <span className="text-sm font-medium text-white">
                                        {reply.author}
                                      </span>
                                      <div className="flex items-center gap-2">
                                        {reply.isInternal && (
                                          <Badge
                                            variant="outline"
                                            className="text-yellow-400 border-yellow-500/20 text-xs"
                                          >
                                            Internal
                                          </Badge>
                                        )}
                                        <span className="text-xs text-zinc-400">
                                          {formatDate(reply.createdAt)}
                                        </span>
                                      </div>
                                    </div>
                                    <p className="text-zinc-300 text-sm">
                                      {reply.message}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Reply Form */}
                          <div className="space-y-4">
                            <div>
                              <Label htmlFor="reply" className="text-white">
                                Your Reply
                              </Label>
                              <Textarea
                                id="reply"
                                placeholder="Enter your reply..."
                                value={replyMessage}
                                onChange={(e) =>
                                  setReplyMessage(e.target.value)
                                }
                                className="mt-2 bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-400"
                                rows={4}
                              />
                            </div>

                            <div>
                              <Label htmlFor="status" className="text-white">
                                Update Status (Optional)
                              </Label>
                              <Select
                                value={replyStatus}
                                onValueChange={setReplyStatus}
                              >
                                <SelectTrigger className="mt-2 bg-zinc-800 border-zinc-700 text-white">
                                  <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent className="bg-zinc-800 border-zinc-700">
                                  <SelectItem value="open">Open</SelectItem>
                                  <SelectItem value="in-progress">
                                    In Progress
                                  </SelectItem>
                                  <SelectItem value="resolved">
                                    Resolved
                                  </SelectItem>
                                  <SelectItem value="closed">Closed</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="flex justify-end gap-3">
                              <Button
                                variant="outline"
                                onClick={() => setIsDialogOpen(false)}
                                className="border-zinc-700 text-zinc-300 hover:bg-zinc-800"
                              >
                                Cancel
                              </Button>
                              <Button
                                onClick={handleReplySubmit}
                                disabled={isSubmitting || !replyMessage.trim()}
                                className="bg-emerald-600 hover:bg-emerald-700"
                              >
                                {isSubmitting ? (
                                  "Sending..."
                                ) : (
                                  <>
                                    <Send className="h-4 w-4 mr-2" />
                                    Send Reply
                                  </>
                                )}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {tickets.length === 0 && (
          <Card className="bg-zinc-900 border-zinc-800">
            <CardContent className="p-12 text-center">
              <Ticket className="h-12 w-12 text-zinc-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">
                No tickets assigned
              </h3>
              <p className="text-zinc-400">
                You don't have any tickets assigned to you at the moment.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
