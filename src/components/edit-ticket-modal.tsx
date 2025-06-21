"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import { TicketType as Ticket, TicketPriority, TicketStatus } from "@/types"; // Adjust to your actual types
import { formatDate, formatDateForInput } from "@/lib/dateTimeFormatter";

interface UserOption {
  _id: string;
  name: string;
}

interface EditTicketDialogProps {
  open: boolean;
  ticket: Ticket | null;
  users: UserOption[];
  onClose: () => void;
  onSave: () => void;
  onInputChange: (field: keyof Ticket, value: any) => void;
  onSkillsChange: (value: string) => void;
}

export default function EditTicketDialog({
  open,
  ticket,
  users,
  onClose,
  onSave,
  onInputChange,
  onSkillsChange,
}: EditTicketDialogProps) {
  if (!ticket) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-zinc-900 border-zinc-800 text-zinc-100 w-full md:min-w-3xl lg:min-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-emerald-400 text-xl">
            Edit Ticket
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <Label htmlFor="title" className="text-zinc-300 pb-3">
                Title
              </Label>
              <Input
                id="title"
                value={ticket.title}
                onChange={(e) => onInputChange("title", e.target.value)}
                className="bg-zinc-800 border-zinc-700 text-zinc-100"
              />
            </div>

            <div>
              <Label htmlFor="description" className="text-zinc-300 pb-3">
                Description
              </Label>
              <Textarea
                id="description"
                value={ticket.description}
                onChange={(e) => onInputChange("description", e.target.value)}
                className="bg-zinc-800 border-zinc-700 text-zinc-100 min-h-[100px]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="status" className="text-zinc-300 pb-3">
                  Status
                </Label>
                <Select
                  value={ticket.status}
                  onValueChange={(value: TicketStatus) =>
                    onInputChange("status", value)
                  }
                >
                  <SelectTrigger className="bg-zinc-800 border-zinc-700 text-zinc-100">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-800 text-white border-zinc-700">
                    <SelectItem value="todo">Open</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="priority" className="text-zinc-300 pb-3">
                  Priority
                </Label>
                <Select
                  value={ticket.priority}
                  onValueChange={(value: TicketPriority) =>
                    onInputChange("priority", value)
                  }
                >
                  <SelectTrigger className="bg-zinc-800 border-zinc-700 text-zinc-100">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-800 text-white border-zinc-700">
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
                <Label htmlFor="category" className="text-zinc-300 pb-3">
                  Category
                </Label>
                <Input
                  id="category"
                  value={ticket.category}
                  onChange={(e) => onInputChange("category", e.target.value)}
                  className="bg-zinc-800 border-zinc-700 text-zinc-100"
                />
              </div>

              <div>
                <Label htmlFor="deadline" className="text-zinc-300 pb-3">
                  Deadline
                </Label>
                <Input
                  id="deadline"
                  type="date"
                  value={formatDateForInput(ticket.deadline)}
                  onChange={(e) => onInputChange("deadline", e.target.value)}
                  className="bg-zinc-800 border-zinc-700 text-zinc-100"
                />
              </div>

              <div>
                <Label htmlFor="assignedTo" className="text-zinc-300 pb-3">
                  Assigned To
                </Label>
                <Select
                  value={ticket.assignedTo._id}
                  onValueChange={(value) => onInputChange("assignedTo", value)}
                >
                  <SelectTrigger className="bg-zinc-800 border-zinc-100 text-zinc-100 min-w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-800 border-zinc-700 text-white">
                    {users.map((user) => (
                      <SelectItem key={user._id} value={user._id}>
                        {user.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="helpfulNotes" className="text-zinc-300 pb-3">
                Helpful Notes
              </Label>
              <Textarea
                id="helpfulNotes"
                value={ticket.helpfulNotes}
                onChange={(e) => onInputChange("helpfulNotes", e.target.value)}
                className="bg-zinc-800 border-zinc-700 text-zinc-100"
              />
            </div>

            <div>
              <Label htmlFor="relatedSkills" className="text-zinc-300 pb-3">
                Related Skills
              </Label>
              <Input
                id="relatedSkills"
                value={ticket.relatedSkills.join(", ")}
                onChange={(e) => onSkillsChange(e.target.value)}
                className="bg-zinc-800 border-zinc-700 text-zinc-100"
                placeholder="React, Node.js, TypeScript"
              />
            </div>
          </div>
        </div>

        <DialogFooter className="mt-4">
          <Button
            variant="outline"
            onClick={onClose}
            className="border-zinc-600 text-zinc-800 hover:text-white hover:bg-zinc-800"
          >
            Cancel
          </Button>
          <Button
            onClick={onSave}
            className="bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
