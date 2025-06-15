"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Clock, User, Edit, CheckCircle, AlertCircle } from "lucide-react";
import { Toggle } from "./ui/toggle";
import { toast } from "sonner";
import { apiFetch } from "@/lib/api";

interface TicketDetailModalProps {
  ticket: {
    id: string;
    title: string;
    description: string;
    helpfulNotes: string;
    status: string;
    priority: string;
    reporter: string;
    assignedTo?: {
      _id: string;
      name: string;
    } | null;
    createdAt: string;
    updatedAt: string;
    canChangeStatus: boolean;
  };
  isOpen: boolean;
  onClose: () => void;
}

export default function TicketDetailModal({
  ticket,
  isOpen,
  onClose,
}: TicketDetailModalProps) {
  const [status, setStatus] = useState(ticket.status);
  const [isLoading, setIsLoading] = useState(false);

  const statusStyles: Record<string, string> = {
    todo: "border-yellow-500 text-yellow-400 bg-yellow-500/10",
    in_progress: "border-blue-500 text-blue-400 bg-blue-500/10",
    resolved: "border-emerald-500 text-emerald-400 bg-emerald-500/10",
    closed: "border-zinc-500 text-zinc-400 bg-zinc-500/10",
  };

  const handleToggleResolved = async (ticketId: string) => {
    try {
      setIsLoading(true);

      const res = await apiFetch(`/tickets/status/${ticketId}`, {
        method: "PUT",
        body: JSON.stringify({ status: "resolved" }),
      });

      if (!res.success) {
        toast.error("❌ Failed to update ticket status.");
        return;
      }

      toast.success("✅ Ticket marked as resolved.");

      // Optionally update local state
      setStatus((prev) =>
        prev === "open" ? "resolved" : prev === "resolved" ? "open" : prev
      );
    } catch (error) {
      toast.error("⚠️ Error updating ticket status.");
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "open":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      case "in_progress":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      case "closed":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      default:
        return "bg-zinc-500/10 text-zinc-400 border-zinc-500/20";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority?.toLowerCase()) {
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

  const getPriorityIcon = (priority: string) => {
    switch (priority?.toLowerCase()) {
      case "critical":
      case "high":
        return <AlertCircle className="h-3 w-3" />;
      default:
        return null;
    }
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

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-zinc-900 border-zinc-800 min-w-full md:min-w-5xl  lg:max-w-6xl max-h-[90vh] overflow-hidden">
        <DialogHeader className="pb-4 border-b border-zinc-800">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <DialogTitle className="text-white text-xl font-semibold leading-tight">
                <span className="text-zinc-400 font-mono text-sm">
                  #{ticket.id}
                </span>
                <br />
                {ticket.title}
              </DialogTitle>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex gap-2 flex-shrink-0">
                <Badge
                  className={`${getStatusColor(
                    status
                  )} flex items-center gap-1`}
                >
                  {status}
                </Badge>
                <Badge
                  className={`${getPriorityColor(
                    ticket.priority
                  )} flex items-center gap-1`}
                >
                  {getPriorityIcon(ticket.priority)}
                  {ticket.priority}
                </Badge>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="text-zinc-400 hover:text-white hover:bg-zinc-800"
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="flex flex-col xl:flex-row gap-8 overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* Main Content */}
          <div className="flex-1 space-y-6">
            {/* Description */}
            <div className="bg-zinc-800/30 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Edit className="h-5 w-5 text-zinc-400" />
                Description
              </h3>
              <div className="prose prose-zinc prose-invert max-w-3xl">
                <p className="text-zinc-300 leading-relaxed whitespace-pre-wrap">
                  {ticket.description}
                </p>
              </div>
            </div>

            {/* Helpful Notes */}
            <div className="bg-zinc-800/30 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-zinc-400" />
                Helpful Notes
              </h3>
              <div className="prose prose-zinc prose-invert max-w-none">
                {ticket.helpfulNotes ? (
                  <div className="text-zinc-300 leading-relaxed max-h-80 overflow-y-auto">
                    <div
                      className="whitespace-pre-wrap"
                      dangerouslySetInnerHTML={{
                        __html: ticket.helpfulNotes
                          // Convert markdown links to HTML links
                          .replace(
                            /\[([^\]]+)\]$$([^)]+)$$/g,
                            '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-blue-400 hover:text-blue-300 underline">$1</a>'
                          )
                          // Convert plain URLs to clickable links
                          .replace(
                            /(https?:\/\/[^\s]+)/g,
                            '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-blue-400 hover:text-blue-300 underline break-all">$1</a>'
                          )
                          // Convert **bold** to HTML bold
                          .replace(
                            /\*\*([^*]+)\*\*/g,
                            '<strong class="text-white font-semibold">$1</strong>'
                          )
                          // Convert `code` to HTML code
                          .replace(
                            /`([^`]+)`/g,
                            '<code class="bg-zinc-700 text-zinc-200 px-1.5 py-0.5 rounded text-sm font-mono">$1</code>'
                          )
                          // Convert bullet points
                          .replace(
                            /^\* (.+)$/gm,
                            '<div class="flex items-start gap-2 my-1"><span class="text-zinc-500 mt-1">•</span><span>$1</span></div>'
                          )
                          // Convert numbered lists
                          .replace(
                            /^(\d+)\. (.+)$/gm,
                            '<div class="flex items-start gap-2 my-1"><span class="text-zinc-500 font-mono text-sm mt-0.5">$1.</span><span>$2</span></div>'
                          ),
                      }}
                    />
                  </div>
                ) : (
                  <div className="text-zinc-500 italic">
                    No helpful notes available for this ticket.
                  </div>
                )}
              </div>
              {ticket.helpfulNotes && (
                <div className="mt-4 pt-3 border-t border-zinc-700">
                  <div className="flex items-center justify-between text-xs text-zinc-500">
                    <div className="flex items-center gap-3">
                      <span>{ticket.helpfulNotes.split(" ").length} words</span>
                      <span>•</span>
                      <span>
                        {Math.ceil(ticket.helpfulNotes.length / 250)} min read
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span>Contains links and technical references</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}

            {ticket.canChangeStatus && (
              <div className="flex flex-wrap gap-3">
                {status.toLowerCase() !== "closed" && (
                  <Button
                    variant="outline"
                    onClick={() => handleToggleResolved(ticket.id)}
                    className="border-emerald-700 text-emerald-400 hover:bg-emerald-900/20 hover:text-emerald-300"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Mark as Resolved
                  </Button>
                )}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="w-full xl:w-96 space-y-6">
            {/* Status Control */}
            <div className="bg-zinc-800/50 rounded-lg p-4 space-y-4">
              <h4 className="font-medium text-white flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-zinc-400" />
                Status
              </h4>
              <Badge
                variant="outline"
                className={` text-md ${getStatusColor(status)}}`}
              >
                {ticket.status}
              </Badge>
            </div>

            {/* Ticket Information */}
            <div className="bg-zinc-800/50 rounded-lg p-4 space-y-4">
              <h4 className="font-medium text-white flex items-center gap-2">
                <User className="h-4 w-4 text-zinc-400" />
                Details
              </h4>

              <div className="space-y-4 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-zinc-400">Assigned To</span>
                  {ticket.assignedTo ? (
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="bg-emerald-500 text-white text-xs">
                          {getInitials(ticket.assignedTo.name)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-white font-medium">
                        {ticket.assignedTo.name}
                      </span>
                    </div>
                  ) : (
                    <Badge
                      variant="outline"
                      className="border-zinc-700 text-zinc-500 bg-zinc-800/50"
                    >
                      Unassigned
                    </Badge>
                  )}
                </div>

                {/* Timestamps */}
                <div className="pt-2 border-t border-zinc-700 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-zinc-500" />
                      <span className="text-zinc-400">Created</span>
                    </div>
                    <span className="text-white text-xs font-mono">
                      {formatDate(ticket.createdAt)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-zinc-500" />
                      <span className="text-zinc-400">Updated</span>
                    </div>
                    <span className="text-white text-xs font-mono">
                      {formatDate(ticket.updatedAt)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
