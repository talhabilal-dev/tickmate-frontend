export type UserRole = "admin" | "moderator" | "user";
export type TicketStatus = "todo" | "in_progress" | "closed";
export type TicketPriority = "low" | "medium" | "high" | "urgent";
export interface UserType {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  skills: string[];
  createdAt: string;
  loginTime: string;
  isActive: boolean;
}

export interface TicketType {
  _id: string;
  title: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  category: string;
  deadline: string;
  createdBy: {
    _id: string;
    name: string;
  };
  assignedTo: {
    _id: string;
    name: string;
  };
  helpfulNotes: string;
  relatedSkills: string[];
  replies: Reply[];
  createdAt: string;
  updatedAt: string;
}

export interface Ticket {
  id: string;
  _id: string;
  title: string;
  description: string;
  status: "todo" | "in_progress" | "closed";
  priority: "low" | "medium" | "high" | "urgent";
  assignedTo: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  reply: string;
  replies: Reply[];
  skills: string[];
  helpfulNotes: string;
  category: string;
}

export interface Reply {
  _id: string;
  message: string;
  createdAt: string;
  createdBy: {
    _id: string;
    name: string;
    email?: string; // optional if you populate it
  };
}

export interface TicketDetailModalProps {
  ticket: TicketType;
  canChangeStatus: boolean;
  isOpen: boolean;
  onClose: () => void;
}
