import Cookie from "cookie-universal";
import { Outlet } from "react-router-dom";

const RequierBack = () => {
  //cookies
  const cookie = Cookie();
  const token = cookie.get("Bearer");
  return token ? window.history.back() : <Outlet />;
};

export default RequierBack;
