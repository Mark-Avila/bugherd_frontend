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

export type ProjectWithUser = User & Project;

export interface ProjectAssign {
  id?: number;
  user_id: number;
  project_id: number;
}

export interface SelectItemBody {
  value: string;
  label: string;
}

export interface FormikNewTicket {
  title: string;
  description: string;
  type: string;
  status: string;
  priority: string;
  hours: number;
}

export type Status = "ongoing" | "completed" | "";
export type Priority = "high" | "intermediate" | "low" | "";
export type Type = "issue" | "bug" | "feature" | "error" | "other" | "";
