import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Bars.css";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Menu } from "../../Context/MenuContext";
import { useContext, useEffect, useState } from "react";
import { Axios } from "../../API/Axios";
import { LOGOUT, USER } from "../../API/Api";
import Dropdown from "react-bootstrap/Dropdown";
import Cookie from "cookie-universal";

const TopBar = () => {
  const { isOpen, setIsOpen } = useContext(Menu);
  // cookies
  const cookie = Cookie();
  // User
  const [user, setUser] = useState();
  // fetch user
  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await Axios.get(`/${USER}`);
        setUser(res.data.name);
      } catch (err) {
        console.log(err);
        navigate("/login", { replace: true });
      }
    }
    fetchUser();
  }, []);
  // LogOut User
  async function handelLogout() {
    try {
      const res = await Axios.get(`/${LOGOUT}`);
      cookie.remove("Bearer");
      window.location.pathname = "/login";
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="top-bar">
      <div className="disp  w-100">
        <div className="d-flex align-items-center gap-5">
          <h3>E-Commerce</h3>
          <FontAwesomeIcon
            cursor="Pointer"
            onClick={() => setIsOpen(!isOpen)}
            icon={faBars}
          />
        </div>
        <div>
          <Dropdown>
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
              {user}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={handelLogout}>Log Out</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
