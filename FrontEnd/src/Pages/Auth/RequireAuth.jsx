import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Forbidden from "../Errors/403";
import { USER } from "../../utils/API/Permisions";
import { Axios } from "../../utils/API/Axios";
import { useSelector } from "react-redux";

const RequireAuth = ({ allowedRole }) => {
  const [user, setUser] = useState();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth);

  // fetch user
  useEffect(() => {
    Axios.get(`${USER}`)
      .then((res) => setUser(res.data))
      .catch(() => {
        navigate("/login", { replace: true });
      });
  }, []);

  return token?.user ? (
    allowedRole.includes(user?.role) ? (
      <Outlet />
    ) : (
      <Forbidden role={user?.role} />
    )
  ) : (
    <Navigate to="/login" replace={true} />
  );
};

export default RequireAuth;
