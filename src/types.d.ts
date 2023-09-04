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

export interface ResponseBody {
  message: string;
  stack: string | null;
  status: number;
  success: boolean;
}
