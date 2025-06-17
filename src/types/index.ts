export type UserRole = "admin" | "moderator" | "user";
export type TicketStatus = "open" | "in_progress" | "completed" | "closed";
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
  reply: string;
  createdAt: string;
  updatedAt: string;
}

export interface Ticket {
  id: string;
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
  skills: string[];
  helpfulNotes: string;
  category: string;
}

export interface Reply {
  id: string;
  ticketId: string;
  message: string;
  createdAt: string;
}


export interface TicketDetailModalProps {
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
    relatedSkills: string[];
    createdAt: string;
    updatedAt: string;
    canChangeStatus: boolean;
  };
  isOpen: boolean;
  onClose: () => void;
}
