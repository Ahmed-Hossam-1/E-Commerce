import axios from "axios";
import { baseURL } from "./Permisions";
import Cookie from "cookie-universal";

const cookie = Cookie();
const token = cookie.get("Bearer");

export const Axios = axios.create({
  baseURL: baseURL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
