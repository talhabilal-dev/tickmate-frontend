import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { UserType, UserRole } from "@/types";

interface UserEditDialogProps {
  editingUser: UserType | null;
  isSaving: boolean;
  onClose: () => void;
  onChange: (field: keyof UserType, value: any) => void;
  onSkillsChange: (skillsString: string) => void;
  onSave: () => void;
}

export default function UserEditDialog({
  editingUser,
  isSaving,
  onClose,
  onChange,
  onSkillsChange,
  onSave,
}: UserEditDialogProps) {
  return (
    <Dialog open={!!editingUser} onOpenChange={onClose}>
      <DialogContent className="bg-zinc-900 border-zinc-800 text-zinc-100 max-w-2xl">
        {/* Top-right cancel button */}
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
            Edit User
          </DialogTitle>
        </DialogHeader>

        {editingUser && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <FormField label="Name" id="userName">
                <Input
                  id="userName"
                  value={editingUser.name}
                  onChange={(e) => onChange("name", e.target.value)}
                  className="bg-zinc-800 border-zinc-700 text-zinc-100"
                />
              </FormField>

              <FormField label="Email" id="userEmail">
                <Input
                  id="userEmail"
                  type="email"
                  value={editingUser.email}
                  onChange={(e) => onChange("email", e.target.value)}
                  className="bg-zinc-800 border-zinc-700 text-zinc-100"
                />
              </FormField>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField label="Role" id="userRole">
                  <Select
                    value={editingUser.role}
                    onValueChange={(value: UserRole) => onChange("role", value)}
                  >
                    <SelectTrigger className="bg-zinc-800 border-zinc-700 text-zinc-100">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-800 border-zinc-700 text-white">
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="moderator">Moderator</SelectItem>
                      <SelectItem value="user">User</SelectItem>
                    </SelectContent>
                  </Select>
                </FormField>

                <FormField label="Status" id="userStatus">
                  <Select
                    value={editingUser.isActive ? "active" : "inactive"}
                    onValueChange={(value) =>
                      onChange("isActive", value === "active")
                    }
                  >
                    <SelectTrigger className="bg-zinc-800 border-zinc-700 text-zinc-100">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-800 border-zinc-700 text-white">
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </FormField>
              </div>

              <FormField label="Skills (comma-separated)" id="userSkills">
                <Input
                  id="userSkills"
                  value={editingUser.skills.join(", ")}
                  onChange={(e) => onSkillsChange(e.target.value)}
                  className="bg-zinc-800 border-zinc-700 text-zinc-100"
                  placeholder="React, Node.js, TypeScript"
                />
              </FormField>
            </div>
          </div>
        )}

        <DialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
            className="border-zinc-600 text-zinc-800 hover:text-white hover:bg-zinc-800"
          >
            Cancel
          </Button>
          <Button
            onClick={onSave}
            disabled={isSaving}
            className="bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-2"
          >
            {isSaving && (
              <svg
                className="animate-spin h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                />
              </svg>
            )}
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function FormField({
  label,
  id,
  children,
}: {
  label: string;
  id: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <Label htmlFor={id} className="text-zinc-300 pb-2 block">
        {label}
      </Label>
      {children}
    </div>
  );
}
