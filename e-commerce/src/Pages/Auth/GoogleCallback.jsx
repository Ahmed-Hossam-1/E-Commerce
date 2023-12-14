import axios from "axios";
import { useEffect } from "react";
import { GOOGLECALLBACK, baseURL } from "../../utils/API/Permisions";
import { useLocation } from "react-router-dom";
import Cookie from "cookie-universal";

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

  return <div>GoogleCallback</div>;
};

export default GoogleCallback;
