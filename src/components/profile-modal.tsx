"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LogOut, User } from "lucide-react";
import { UserType } from "@/types";
import { roleColors } from "@/lib/colors";

interface UserMenuProps {
  currentUser: UserType | null;
  users: UserType[];
  onLogout: () => void;
  onViewProfile: (user: UserType | null) => void;
}

export function UserMenu({
  currentUser,
  users,
  onLogout,
  onViewProfile,
}: UserMenuProps) {
  if (!currentUser) return null;

  const currentUserData = users.find(
    (u) => u._id.toString() === currentUser._id.toString()
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-10 w-10 rounded-full hover:bg-zinc-800"
        >
          <Avatar className="h-10 w-10 border-2 border-emerald-500/20">
            <AvatarFallback className="bg-emerald-500/10 text-emerald-400 font-semibold">
              {currentUser.name?.charAt(0)}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-auto bg-zinc-900 border-zinc-800"
        align="end"
        forceMount
      >
        <DropdownMenuLabel className="font-normal">
          <p className="text-sm font-medium leading-none text-zinc-100">
            {currentUser.name}
          </p>
          <div className="flex justify-between space-y-1">
            <p className="text-sm pt-1 text-zinc-400">{currentUser.email}</p>
            <div className="pt-1">
              <Badge
                className={`${
                  roleColors[currentUser.role as keyof typeof roleColors] || ""
                } capitalize text-xs`}
              >
                {currentUser.role}
              </Badge>
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="bg-zinc-800" />

        <DropdownMenuItem
          className="text-zinc-300 hover:bg-zinc-800 hover:text-zinc-100 cursor-pointer"
          onClick={() => onViewProfile(currentUserData || null)}
        >
          <User className="mr-2 h-4 w-4" />
          <span>View Profile</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="bg-zinc-800" />

        <DropdownMenuItem
          className="text-red-400 hover:bg-red-500/10 hover:text-red-300 cursor-pointer"
          onClick={onLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
