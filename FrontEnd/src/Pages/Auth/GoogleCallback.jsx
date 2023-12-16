import axios from "axios";
import { useEffect } from "react";
import { GOOGLECALLBACK, baseURL } from "../../utils/API/Permisions";
import { useLocation } from "react-router-dom";
import Cookie from "cookie-universal";
import { Navigate } from "react-router-dom";

const GoogleCallback = () => {
  const cookie = Cookie();
  const location = useLocation();

  useEffect(() => {
    async function googleCall() {
      try {
        const res = await axios.get(
          `${baseURL}/${GOOGLECALLBACK}${location.search}`
        );
        const token = res.data.access_token;
        cookie.set("Bearer", token);
      } catch (err) {
        console.log(err);
      }
    }
    googleCall();
  }, []);

  const token = cookie.get("Bearer");

  return <dir>Google Login</dir>; //token ? <Navigate to="/" replace={true} /> : <Navigate to="/login" />;
};

export default GoogleCallback;
