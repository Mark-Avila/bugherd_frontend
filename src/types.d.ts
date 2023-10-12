// export type VoidFunction
export interface SignInData {
  email: string;
  password: string;
}

export interface SignUpData {
  email: string;
  fname: string;
  lname: string;
  password: string;
  contact: string;
  bday: string;
}

export interface ResponseBody<T> {
  message: string;
  stack: string | null;
  status: number;
  success: boolean;
  data: T;
}

export interface Project {
  id?: number;
  title: string;
  descr: string;
  user_id: string;
  num: number;
  createdAt: string;
}

export interface User {
  id?: number;
  fname: string;
  lname: string;
  email: string;
  password: string;
  contact: string;
  role: 0 | 1 | 2;
  bday: string;
  createdat: string;
}

// export type Status = "ongoing" | "completed" | "";
// export type PriorityString = "high" | "intermediate" | "low" | "";
export type Priority = 3 | 2 | 1;
export type Type = "issue" | "bug" | "feature" | "error" | "other";

export interface Ticket {
  id?: string;
  title: string;
  descr: string;
  priority: Priority;
  issue_type: Type;
  status: boolean; //T = ongoing, F = complete
  est: number;
  user_id: number;
  project_id: number;
  created_at: string;
}

export interface FormikNewTicket {
  title: string;
  description: string;
  type: Type | "";
  status: boolean | "";
  priority: Priority | "";
  hours: number;
}

export type ProjectWithUser = User & Project;
export type TicketWithUser = User & Ticket;

export interface ProjectAssign {
  id?: number;
  user_id: number;
  project_id: number;
}

export interface SelectItemBody<T> {
  value: T;
  label: string;
}
