import Cookie from "cookie-universal";
import { LOGIN, REGISTER, baseURL } from "../API/Permisions";
import axios from "axios";

const cookie = Cookie();

const register = async (userData) => {
  const res = await axios.post(`${baseURL}/${REGISTER}`, userData);
  if (res.data) {
    cookie.set("Bearer", res.data.refreshToken);
  }
  return res.data;
};

const login = async (userData) => {
  const res = await axios.post(`${baseURL}/${LOGIN}`, userData);
  if (res.data) {
    cookie.set("Bearer", res.data.refreshToken);
  }
  return res.data;
};

const logout = async () => {
  cookie.remove("Bearer");
};

export { register, login, logout };
