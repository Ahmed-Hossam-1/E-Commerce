import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Bars.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Menu } from "../../Context/MenuContext";
import { WindowSize } from "../../Context/WindowContext";
import { USER } from "../../API/Api";
import { Axios } from "../../API/Axios";
import { links } from "./NavLink";

const SideBar = () => {
  const { isOpen } = useContext(Menu);
  const { windowSize } = useContext(WindowSize);
  const navigate = useNavigate();
  // User
  const [user, setUser] = useState();
  // fetch user
  useEffect(() => {
    Axios.get(`/${USER}`)
      .then((res) => setUser(res.data))
      .catch(() => {
        navigate("/login", { replace: true });
      });
  }, []);

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: "70px",
          left: "0",
          width: "100%",
          height: "100vh",
          backgroundColor: "rgba(0,0,0,0.2)",
          display: windowSize < "768" && isOpen ? "block" : "none",
        }}
      ></div>

      <div
        style={{
          left: windowSize < "768" ? (isOpen ? 0 : "-100%") : 0,
          width: isOpen ? "250px" : "fit-content",
          position: windowSize < "768" ? "fixed" : "sticky",
        }}
        className="side-bar pt-3"
      >
        {links.map(
          (link, key) =>
            user !== undefined &&
            link.role.includes(user.role) && (
              <NavLink
                key={key}
                to={link.path}
                className="d-flex align-items-center gap-2 side-bar-link"
              >
                <FontAwesomeIcon icon={link.icon} />
                {isOpen && <p className="m-0">{link.name}</p>}
              </NavLink>
            )
        )}
      </div>
    </>
  );
};

export default SideBar;
