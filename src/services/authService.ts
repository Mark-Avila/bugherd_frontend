import axios from "axios";
import { SignInData, SignUpData } from "../types";

const API_URL = import.meta.env.VITE_API_ROUTE + "/user";

const signin = async (data: SignInData) => {
  const response = await axios.post(API_URL + "/signin", data);
  return response;
};

const signup = async (data: SignUpData) => {
  const response = await axios.post(API_URL + "/signup", data);
  return response;
};

const authService = {
  signin,
  signup,
};

export default authService;
