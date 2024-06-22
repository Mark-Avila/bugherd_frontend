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

export type UpdateUserData = Omit<SignInData, "password">;

export interface ResponseBody<T> {
  message: string;
  stack: string | null;
  status: number;
  success: boolean;
  count?: number;
  data: T;
}

export interface Project {
  id?: number;
  title: string;
  descr: string;
  user_id: number;
  num: number;
  archived?: boolean;
  createdAt?: string;
}

export interface User {
  id?: number;
  fname: string;
  lname: string;
  email: string;
  password?: string;
  contact: string;
  role: 0 | 1 | 2;
  bday: string;
  createdat?: string;
  archived?: boolean;
}

export interface Comment {
  id?: number;
  msg: string;
  user_id: string;
  fname?: string;
  lname?: string;
  ticket_id: string;
  created_at?: string;
}

export type ResponseCount = {
  count: string;
};

export interface PieData {
  id: number;
  value: number;
  label: string;
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
  num?: number;
  user_id: number;
  project_title?: string;
  project_archived?: boolean;
  project_id: number;
  created_at?: string;
  fname?: string;
  lname?: string;
}

export interface UserTicketStats {
  status: PieData[];
  type: PieData[];
  priority: PieData[];
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
export type TicketWithUser = User &
  Ticket & {
    user_id: number;
    id: number;
  };

export interface Assign {
  id?: number;
  user_id: number;
  project_id: number;
}

export type ProjectAssign = Assign & User;

export interface SelectItemBody<T> {
  value: T;
  label: string;
}

export interface InputData<T> {
  value: T;
  label: string;
  isError: boolean;
  helper: string;
}

export interface BreadItem {
  label: string;
  to: string;
}

export interface Notification {
  id?: number;
  body: string;
  from_id: number;
  to_id: number;
  view_path?: string;
  fname?: string;
  lname?: string;
  createdat?: string;
}
