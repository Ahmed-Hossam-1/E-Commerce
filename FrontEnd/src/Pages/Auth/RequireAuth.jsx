import { Navigate, Outlet } from "react-router-dom";
import { useEffect } from "react";
import Forbidden from "../Errors/403";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../Featrures/userFeatures/userActions";

const RequireAuth = ({ allowedRole }) => {
  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // fetch user
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return auth?.user ? (
    allowedRole.includes(user?.user?.role) ? (
      <Outlet />
    ) : (
      <Forbidden role={user?.role} />
    )
  ) : (
    <Navigate to="/login" replace={true} />
  );
};

export default RequireAuth;
