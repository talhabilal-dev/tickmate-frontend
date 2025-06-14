"use client";
import TicketDetailModal from "@/components/ticket-detail-modal";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  MessageSquare,
  Clock,
  User,
  Calendar,
  AlertCircle,
  CheckCircle,
  XCircle,
  Send,
  Ticket,
  Eye,
} from "lucide-react";
import { toast } from "sonner";
import { apiFetch } from "@/lib/api";

interface Reply {
  id: string;
  ticketId: string;
  message: string;
  author: string;
  createdAt: string;
  isInternal: boolean;
}

interface Ticket {
  _id: string;
  title: string;
  description: string;
  status: "open" | "in-progress" | "resolved" | "closed";
  priority: "low" | "medium" | "high" | "urgent";
  assignedTo: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  replies: Reply[];
  helpfulNotes: string;
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

export default function AssignedTickets() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [replies, setReplies] = useState<Reply[]>([]);
  const [replyMessage, setReplyMessage] = useState("");
  const [replyStatus, setReplyStatus] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [detailModal, setDetailModal] = useState(false);
  const [viewTicket, setViewTicket] = useState<Ticket | null>(null);

  // Mock data - replace with actual API calls
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await apiFetch("/tickets/get-assigned", {
          method: "GET",
        });
        if (res.success) {
          setTickets(res?.tickets);
        }

        if (!res.success) {
          toast.error("❌ Failed to fetch tickets. Please try again.");
        }
      } catch (error) {
        toast.error("🚨 An unexpected error occurred.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
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
        ticketId: selectedTicket._id.toString(),
        message: replyMessage,
        author: "John Doe",
        createdAt: new Date().toISOString(),
        isInternal: false,
      };

      setReplies([...replies, newReply]);

      // // Update ticket status if changed
      if (replyStatus && replyStatus !== selectedTicket.status) {
        const updatedTickets = tickets.map((ticket) =>
          ticket._id.toString() === selectedTicket._id
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
    loadReplies(ticket._id.toString());
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
          {/* Header Skeleton */}
          <div className="flex items-center justify-between">
            <div className="h-9 w-48 bg-zinc-700 rounded animate-pulse"></div>
            <div className="h-6 w-32 bg-zinc-700 rounded animate-pulse"></div>
          </div>

          {/* Ticket Cards Skeleton */}
          <div className="grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="bg-zinc-900 border-zinc-800">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2 flex-1">
                      <div className="h-6 bg-zinc-700 rounded w-3/4 animate-pulse"></div>
                      <div className="flex items-center gap-3">
                        <div className="h-4 bg-zinc-700 rounded w-32 animate-pulse"></div>
                        <div className="h-4 bg-zinc-700 rounded w-24 animate-pulse"></div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-5 w-16 bg-zinc-700 rounded animate-pulse"></div>
                      <div className="h-5 w-20 bg-zinc-700 rounded animate-pulse"></div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-2 mb-4">
                    <div className="h-4 bg-zinc-700 rounded w-full animate-pulse"></div>
                    <div className="h-4 bg-zinc-700 rounded w-2/3 animate-pulse"></div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="h-3 bg-zinc-700 rounded w-20 animate-pulse"></div>
                      <div className="h-3 bg-zinc-700 rounded w-24 animate-pulse"></div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-16 bg-zinc-700 rounded animate-pulse"></div>
                      <div className="h-8 w-16 bg-zinc-700 rounded animate-pulse"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
    );
  }

  return (
    <>
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
                key={ticket._id.toString()}
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

                            <div className="flex justify-end gap-3">
                              <Button
                                variant="outline"
                                onClick={() => setIsDialogOpen(false)}
                                className="border-zinc-700 text-zinc-800 hover:text-white hover:bg-zinc-800"
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
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-zinc-400 hover:text-white"
                      onClick={() => setViewTicket(ticket)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                  </div>{" "}
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
      {viewTicket && (
        <TicketDetailModal
          ticket={{
            id: viewTicket._id.toString(),
            title: viewTicket.title,
            description: viewTicket.description,
            helpfulNotes: viewTicket.helpfulNotes,
            status: viewTicket.status,
            priority: viewTicket.priority,
            reporter: (viewTicket as any).reporter ?? "",
            assignedTo: (viewTicket as any).assignedTo ?? null,
            createdAt: viewTicket.createdAt,
            updatedAt: (viewTicket as any).updatedAt ?? "",
            relatedSkills: (viewTicket as any).relatedSkills ?? [],
            canChangeStatus: false,
          }}
          isOpen={!!viewTicket}
          onClose={() => setViewTicket(null)}
        />
      )}
    </>
  );
}
