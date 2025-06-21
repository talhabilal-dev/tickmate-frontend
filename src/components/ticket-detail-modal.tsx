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
  Clock,
  User,
  Edit,
  CheckCircle,
  AlertCircle,
  Trash2,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { apiFetch } from "@/lib/api";
import { formatDateTime } from "@/lib/dateTimeFormatter";
import { TicketDetailModalProps } from "@/types";

export default function TicketDetailModal({
  ticket,
  isOpen,
  canChangeStatus,
  onClose,
}: TicketDetailModalProps) {
  const [deleteTicketId, setDeleteTicketId] = useState<string | null>(null);
  const [status, setStatus] = useState(ticket.status);
  const [isLoading, setIsLoading] = useState(false);

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
        prev === "todo" ? "completed" : prev === "completed" ? "todo" : prev
      );
    } catch (error) {
      toast.error("⚠️ Error updating ticket status.");
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "todo":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      case "in_progress":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      case "completed":
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
                  #{ticket._id.toString()}
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

            {canChangeStatus && (
              <div className="flex flex-wrap gap-3">
                {status.toLowerCase() !== "completed" && (
                  <Button
                    variant="outline"
                    onClick={() => handleToggleResolved(ticket._id)}
                    className="border-emerald-700 text-emerald-800 hover:bg-emerald-900/20 hover:text-emerald-300"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Mark as Resolved
                  </Button>
                )}
                <Button
                  variant="destructive"
                  size="default"
                  onClick={() => setDeleteTicketId(ticket._id.toString())}
                  className="p-0 text-red-100 hover:bg-red-500/10 hover:text-red-300"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            )}

            <AlertDialog
              open={!!deleteTicketId}
              onOpenChange={() => setDeleteTicketId(null)}
            >
              <AlertDialogContent className="bg-zinc-900 border-zinc-800 text-zinc-100">
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-red-400">
                    Delete Ticket
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-zinc-300">
                    Are you sure you want to delete this ticket? This action
                    cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel
                    onClick={() => setDeleteTicketId(null)}
                    className="border-zinc-600 text-zinc-800 hover:text-white hover:bg-zinc-800"
                  >
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() =>
                      deleteTicketId && handleDeleteTicket(deleteTicketId)
                    }
                    className="bg-red-600 hover:bg-red-700 text-white"
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
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
                <div className="flex items-center justify-between">
                  <span className="text-zinc-400"> Created By</span>

                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="bg-emerald-500 text-white text-xs">
                        {getInitials(ticket?.createdBy?.name)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-white font-medium">
                      {ticket?.createdBy?.name}
                    </span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="text-zinc-400">Related Skills</span>
                  {ticket.relatedSkills.map((skill: string, index: number) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className={getPriorityColor(skill) + " text-sm"}
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>

                {/* Timestamps */}
                <div className="pt-2 border-t border-zinc-700 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-zinc-500" />
                      <span className="text-zinc-400">Created</span>
                    </div>
                    <span className="text-white text-xs font-mono">
                      {formatDateTime(ticket.createdAt)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-zinc-500" />
                      <span className="text-zinc-400">Updated</span>
                    </div>
                    <span className="text-white text-xs font-mono">
                      {formatDateTime(ticket.updatedAt)}
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
