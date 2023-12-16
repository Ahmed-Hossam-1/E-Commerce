import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const RequierBack = () => {
  // user
  const { user } = useSelector((state) => state.auth);
  return user ? window.history.back() : <Outlet />;
};

export default RequierBack;
