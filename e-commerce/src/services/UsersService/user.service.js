import { Axios } from "../../utils/API/Axios";
import { USER, USERS } from "../../utils/API/Permisions";

const addUser = async (userData) => {
  const res = await Axios.post(`${USER}/add`, userData);
  return res.data;
};

const editUser = async (userData, usersID) => {
  const res = await Axios.post(`${USER}/edit/${usersID}`, userData);
  return res.data;
};

const getUser = async () => {
  const res = await Axios.get(`${USER}`);
  return res.data;
};

const getUsers = async () => {
  const res = await Axios.get(`${USERS}`);
  return res.data;
};

const deleteUser = async (usersID) => {
  const res = await Axios.delete(`${USER}/${usersID}`);
  return res.data;
};

export { addUser, editUser, getUser, getUsers, deleteUser };
