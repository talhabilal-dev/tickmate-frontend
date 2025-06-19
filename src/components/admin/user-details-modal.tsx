import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { formatDate, formatDateTime } from "@/lib/dateTimeFormatter";
import { UserType } from "@/types";
import { roleColors } from "@/lib/colors";

interface UserDialogProps {
  selectedUser: UserType | null;
  onClose: () => void;
}

export default function UserDialog({ selectedUser, onClose }: UserDialogProps) {
  return (
    <Dialog open={!!selectedUser} onOpenChange={onClose}>
      <DialogContent className="bg-zinc-900 border-zinc-800 text-zinc-100 max-w-2xl">
        {/* Close (X) button */}
        <DialogClose asChild>
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-zinc-400 hover:text-zinc-100 transition"
          >
            <X className="h-5 w-5" />
          </button>
        </DialogClose>

        <DialogHeader>
          <DialogTitle className="text-emerald-400 text-xl">
            {selectedUser?.name}
          </DialogTitle>
        </DialogHeader>

        {selectedUser && (
          <div className="space-y-6">
            <div className="flex flex-wrap gap-4">
              <Badge className={`${roleColors[selectedUser.role]} capitalize`}>
                {selectedUser.role}
              </Badge>
              <Badge
                className={
                  selectedUser.isActive
                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                    : "bg-red-500/10 text-red-400 border-red-500/20"
                }
              >
                {selectedUser.isActive ? "Active" : "Inactive"}
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <InfoBlock label="Email" value={selectedUser.email} />
              <InfoBlock label="Role" value={selectedUser.role} capitalize />
              <InfoBlock
                label="Created"
                value={formatDate(selectedUser.createdAt)}
              />
              <InfoBlock
                label="Last Login"
                value={formatDateTime(selectedUser.loginTime)}
              />
            </div>

            <div>
              <h4 className="text-emerald-400 font-semibold mb-2">Skills</h4>
              <div className="flex flex-wrap gap-2">
                {selectedUser.skills.map((skill, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="border-emerald-500/30 text-emerald-300"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

function InfoBlock({
  label,
  value,
  capitalize = false,
}: {
  label: string;
  value: string;
  capitalize?: boolean;
}) {
  return (
    <div>
      <span className="text-zinc-400">{label}:</span>
      <p
        className={`text-zinc-100 font-medium ${
          capitalize ? "capitalize" : ""
        }`}
      >
        {value}
      </p>
    </div>
  );
}
